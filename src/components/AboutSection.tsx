import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Divider } from "@mui/material";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

// ─── Since image ──────────────────────────────────────────────────────────────
import sinceImg from "../oderassets/sinceimage,jpg.jpeg";
import dnutsLogo from "../oderassets/dnutslogo.jpg.png";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const ScrollReveal = styled(Box, {
  shouldForwardProp: (p) => p !== "visible" && p !== "dir" && p !== "delay",
})<{ visible: boolean; dir?: "up" | "left" | "right"; delay?: number }>`
  opacity: 0;
  transition: opacity 0.9s ease-out, transform 0.9s ease-out;
  transition-delay: ${({ delay }) => delay ?? 0}ms;
  ${({ visible, dir }) =>
    visible &&
    `
    opacity: 1;
    transform: none;
    animation: ${
      dir === "left" ? fadeInLeft : dir === "right" ? fadeInRight : fadeInUp
    } 0.9s ease-out forwards;
  `}
`;

// ─── Policy card data ─────────────────────────────────────────────────────────
const POLICIES = [
  {
    icon: "🚫",
    title: "No Returns or Exchanges",
    body: "All sales are final. As we deal in food-grade products, we do not accept returns or exchanges once an order has been delivered. Please review your order carefully before confirming.",
  },
  {
    icon: "📦",
    title: "Freshness Guarantee",
    body: "Every product is packed fresh on the day of dispatch. If you receive a damaged or incorrectly packed order, please contact us within 24 hours of delivery with a photo.",
  },
  {
    icon: "🚚",
    title: "Delivery Policy",
    body: "We deliver across Puducherry and nearby areas. Orders are typically dispatched within 1–2 business days. Delivery times may vary during peak seasons or festivals.",
  },
  {
    icon: "💳",
    title: "Payment Policy",
    body: "We accept Google Pay, PhonePe, Paytm, Net Banking, and Cash on Delivery. Orders are confirmed only after payment is received (except COD). UPI is our preferred payment mode.",
  },
  {
    icon: "⚖️",
    title: "Quality & Weight",
    body: "All products are weighed and packed with care. Minor variations of ±2–3% may occur due to natural settling. We ensure every pack meets our quality standards before dispatch.",
  },
  {
    icon: "🔒",
    title: "Privacy Policy",
    body: "Your personal details (name, phone, address) are collected solely for order fulfilment. We do not share your information with any third parties. Your data stays with Dnuts.",
  },
  {
    icon: "📱",
    title: "Order Confirmation",
    body: "Orders are placed via WhatsApp and are confirmed only after our team responds. If you do not receive a confirmation within 2 hours, please reach out directly to our store.",
  },
  {
    icon: "🌿",
    title: "Organic & Natural",
    body: "All our products are 100% natural with no artificial preservatives, colours, or flavours. We source directly from trusted suppliers to ensure purity and freshness.",
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "2020", label: "Est. Since" },
  { value: "20000+", label: "Happy Customers" },
  { value: "30+",  label: "Premium Products" },
  { value: "100%", label: "Natural & Pure" },
];

const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible]   = useState(false);
  const sectionRef                  = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={sectionRef} sx={{ backgroundColor: "#0a0a0a", position: "relative", overflow: "hidden" }}>

      {/* ══════════ HERO ABOUT SECTION ══════════ */}
      <Box sx={{ py: { xs: 8, md: 12 }, position: "relative" }}>
        <Box sx={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "80%", height: "80%",
          background: "radial-gradient(ellipse, rgba(139,195,74,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">

            {/* ── Left: Image ── */}
            <Grid item xs={12} md={5}>
              <ScrollReveal visible={isVisible} dir="left">
                <Box sx={{ position: "relative" }}>
                  {/* Decorative border frame */}
                  <Box sx={{
                    position: "absolute", top: -12, left: -12,
                    width: "100%", height: "100%",
                    border: "2px solid rgba(139,195,74,0.2)",
                    borderRadius: "20px", zIndex: 0,
                  }} />
                  <Box
                    component="img"
                    src={sinceImg}
                    alt="Dnuts since 2020"
                    sx={{
                      width: "100%",
                      borderRadius: "16px",
                      objectFit: "cover",
                      maxHeight: 440,
                      position: "relative",
                      zIndex: 1,
                      filter: "brightness(0.92)",
                      border: "1px solid rgba(139,195,74,0.15)",
                    }}
                  />
                  {/* Since badge */}
                  <Box sx={{
                    position: "absolute", bottom: 20, left: 20, zIndex: 2,
                    background: "rgba(12,16,7,0.9)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(139,195,74,0.3)",
                    borderRadius: "14px",
                    px: 2.5, py: 1.5,
                  }}>
                    <Typography sx={{ color: "#8bc34a", fontSize: "0.65rem", letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>
                      Trusted Since
                    </Typography>
                    <Typography sx={{
                      color: "#fff", fontFamily: "'Playfair Display',serif",
                      fontWeight: 900, fontSize: "1.6rem", lineHeight: 1,
                    }}>
                      2020
                    </Typography>
                  </Box>
                </Box>
              </ScrollReveal>
            </Grid>

            {/* ── Right: Story ── */}
            <Grid item xs={12} md={7}>
              <ScrollReveal visible={isVisible} dir="right" delay={150}>
                <Typography sx={{ color: "#8bc34a", fontSize: "0.72rem", letterSpacing: 4, textTransform: "uppercase", fontWeight: 700, mb: 2 }}>
                  ✦ Our Story
                </Typography>
                <Typography variant="h3" sx={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 900, fontStyle: "italic",
                  color: "#fff", lineHeight: 1.2, mb: 3,
                  fontSize: { xs: "2rem", md: "2.8rem" },
                }}>
                  {"\u201CA Tradition of Goodness\u201D"}
                </Typography>

                <Typography sx={{ color: "#B8AF9F", lineHeight: 2, fontSize: "1rem", mb: 2.5 }}>
                  Dnuts was born in 2020 from a simple belief — that good food should be honest, pure, and nourishing. Founded in the heart of Puducherry, we set out to bring the finest hand-picked dry fruits, nuts, seeds, and traditional sweets directly to your doorstep.
                </Typography>
                <Typography sx={{ color: "#B8AF9F", lineHeight: 2, fontSize: "1rem", mb: 2.5 }}>
                  Every product in our range is carefully sourced, naturally packed, and free from artificial preservatives. We work closely with trusted suppliers to ensure that what reaches your family carries the same care we would want for our own.
                </Typography>
                <Typography sx={{ color: "#B8AF9F", lineHeight: 2, fontSize: "1rem", mb: 3.5 }}>
                  From premium almonds and walnuts to rare seeds and festive gift boxes — Dnuts is more than a store. It is a promise of quality, freshness, and love in every bite.
                </Typography>

                {/* Divider with leaf */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3.5 }}>
                  <Box sx={{ flex: 1, height: "1px", background: "rgba(139,195,74,0.2)" }} />
                  <Typography sx={{ color: "#8bc34a", fontSize: "1rem" }}>🌿</Typography>
                  <Box sx={{ flex: 1, height: "1px", background: "rgba(139,195,74,0.2)" }} />
                </Box>

                {/* Stats row */}
                <Box sx={{ display: "flex", gap: { xs: 2, md: 4 }, flexWrap: "wrap" }}>
                  {STATS.map((s) => (
                    <Box key={s.label}>
                      <Typography sx={{
                        fontFamily: "'Playfair Display',serif",
                        fontWeight: 900, fontSize: "1.6rem", color: "#8bc34a", lineHeight: 1,
                      }}>
                        {s.value}
                      </Typography>
                      <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.65rem", letterSpacing: 2, textTransform: "uppercase", mt: 0.5 }}>
                        {s.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </ScrollReveal>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* ══════════ VALUES STRIP ══════════ */}
      <Box sx={{ borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", py: 4, background: "#0c1007" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "center", gap: { xs: 3, md: 8 }, flexWrap: "wrap" }}>
            {[
              { icon: "🥜", text: "Hand-picked Nuts" },
              { icon: "🌱", text: "No Preservatives" },
              { icon: "📦", text: "Fresh Packing" },
              { icon: "🎁", text: "Gift Ready" },
              { icon: "🚚", text: "Local Delivery" },
            ].map((v) => (
              <Box key={v.text} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Typography sx={{ fontSize: "1.2rem" }}>{v.icon}</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
                  {v.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ══════════ TERMS & CONDITIONS ══════════ */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: "#080c05" }}>
        <Container maxWidth="lg">
          <ScrollReveal visible={isVisible} dir="up" delay={200}>

            {/* Section heading */}
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography sx={{ color: "#8bc34a", fontSize: "0.72rem", letterSpacing: 4, textTransform: "uppercase", fontWeight: 700, mb: 1.5 }}>
                ✦ Policies & Information
              </Typography>
              <Typography variant="h3" sx={{
                fontFamily: "'Playfair Display',serif",
                fontWeight: 900, color: "#fff",
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                mb: 1.5, lineHeight: 1.2,
              }}>
                Terms & Conditions
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: "0.88rem", maxWidth: 540, mx: "auto", lineHeight: 1.8 }}>
                By placing an order with Dnuts, you agree to the following policies. Please read them carefully before making a purchase.
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mt: 3 }}>
                <Box sx={{ width: 60, height: "1px", background: "linear-gradient(90deg, transparent, #8bc34a44)" }} />
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#8bc34a", opacity: 0.6 }} />
                <Box sx={{ width: 60, height: "1px", background: "linear-gradient(90deg, #8bc34a44, transparent)" }} />
              </Box>
            </Box>

            {/* Policy cards grid */}
            <Box sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr 1fr" },
              gap: 2,
            }}>
              {POLICIES.map((policy, i) => (
                <Box
                  key={policy.title}
                  sx={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(139,195,74,0.1)",
                    borderRadius: "16px",
                    p: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "rgba(139,195,74,0.05)",
                      border: "1px solid rgba(139,195,74,0.25)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Typography sx={{ fontSize: "1.6rem", mb: 1.5, display: "block" }}>{policy.icon}</Typography>
                  <Typography sx={{
                    color: "#fff", fontWeight: 700, fontSize: "0.9rem",
                    mb: 1.5, letterSpacing: "0.3px",
                  }}>
                    {policy.title}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", lineHeight: 1.8 }}>
                    {policy.body}
                  </Typography>
                </Box>
              ))}
            </Box>

=
          </ScrollReveal>
        </Container>
      </Box>

    </Box>
  );
};

export default AboutSection;
