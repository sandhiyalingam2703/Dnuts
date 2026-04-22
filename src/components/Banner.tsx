import React from "react";
import { Box, Typography, Container, Chip } from "@mui/material";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

// ─── Import your local assets ─────────────────────────────────────────────────
// Transparent PNG of nuts product (main hero image)
import nutsProductImg from "../assets/717AyYFdJzL._SL1400-removebg-preview.png";
// Background banner image
import bannerBg from "../asset2/banner.jpg";

// ─── Keyframes ────────────────────────────────────────────────────────────────
const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(-48px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(48px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;
const typewriter = keyframes`
  from { width: 0; }
  to   { width: 100%; }
`;
const pulseBadge = keyframes`
  0%, 100% { transform: scale(1) rotate(-12deg); }
  50%       { transform: scale(1.1) rotate(-12deg); }
`;
const floatImg = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50%       { transform: translateY(-12px) rotate(1.5deg); }
`;
const spinSlow = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const shimmerGreen = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

// ─── Styled Components ────────────────────────────────────────────────────────

const HeroWrapper = styled(Box)`
  position: relative;
  width: 100%;
  overflow: hidden;
  font-family: 'DM Sans', 'Segoe UI', sans-serif;
`;

const HeroBg = styled(Box)`
  position: relative;
  width: 100%;
  min-height: 440px;
  background-color: #0e1208;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const BgImageLayer = styled("img")`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.18;
  mix-blend-mode: luminosity;
`;

const CircleRing = styled(Box)`
  position: relative;
  width: 310px;
  height: 310px;
  border-radius: 50%;
  background: linear-gradient(145deg, #2d4a14 0%, #1a2d0a 60%, #0e1a06 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow:
    0 0 0 10px rgba(139,195,74,0.12),
    0 0 0 22px rgba(139,195,74,0.06),
    0 32px 80px rgba(0,0,0,0.6),
    inset 0 2px 0 rgba(139,195,74,0.15);
  animation: ${fadeInLeft} 0.95s cubic-bezier(0.22,1,0.36,1) forwards;

  @media (max-width: 600px) {
    width: 210px;
    height: 210px;
  }
  @media (min-width: 601px) and (max-width: 900px) {
    width: 260px;
    height: 260px;
  }
`;

const SpinRing = styled(Box)`
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  border: 1.5px dashed rgba(139,195,74,0.3);
  animation: ${spinSlow} 22s linear infinite;
  pointer-events: none;
`;

const SpinRing2 = styled(Box)`
  position: absolute;
  inset: -38px;
  border-radius: 50%;
  border: 1px dashed rgba(139,195,74,0.14);
  animation: ${spinSlow} 35s linear infinite reverse;
  pointer-events: none;
`;

const FloatingNutImg = styled("img")`
  width: 120%;
  height: 120%;
  object-fit: contain;
  position: absolute;
  top: -10%;
  left: -10%;
  animation: ${floatImg} 5s ease-in-out infinite;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.55));
  z-index: 2;
`;

const DiscountBadge = styled(Box)`
  position: absolute;
  top: -14px;
  right: -14px;
  width: 78px;
  height: 78px;
  background: linear-gradient(145deg, #8BC34A, #5a8f1f);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: rotate(-12deg);
  box-shadow:
    0 8px 24px rgba(139,195,74,0.5),
    inset 0 1px 0 rgba(255,255,255,0.25);
  animation: ${pulseBadge} 2.8s ease-in-out infinite;
  z-index: 10;
  border: 3px solid rgba(255,255,255,0.18);
`;

const TextSide = styled(Box)`
  animation: ${fadeInRight} 0.95s cubic-bezier(0.22,1,0.36,1) 0.12s both;
`;

const SlideAnim = styled(Box)`
  animation: ${slideUp} 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
`;

const BigHeadline = styled(Typography)`
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.06;
  letter-spacing: -0.5px;
`;

const GreenItalic = styled("span")`
  color: #8BC34A;
  font-style: italic;
`;

const TaglineMono = styled(Typography)`
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #8BC34A;
  width: 0;
  font-family: 'DM Mono', monospace;
  color: #8BC34A;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  animation:
    ${typewriter} 2.6s steps(36, end) 1.2s forwards,
    ${fadeIn}     0.01s              1.2s forwards;
`;

const GetNowBtn = styled("button")`
  background: linear-gradient(135deg, #8BC34A 0%, #6aaa1f 100%);
  color: #0e1208;
  border: none;
  border-radius: 30px;
  padding: 13px 38px;
  font-family: 'DM Sans', 'Segoe UI', sans-serif;
  font-weight: 900;
  font-size: 0.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(139,195,74,0.45);
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  &:hover::before { left: 140%; }
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(139,195,74,0.6);
    background: linear-gradient(135deg, #9CCC65 0%, #7ab828 100%);
  }
  &:active { transform: translateY(0); }
`;

const DotNav = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>`
  width: ${({ active }) => (active ? "22px" : "8px")};
  height: 8px;
  border-radius: 9999px;
  background: ${({ active }) => (active ? "#8BC34A" : "rgba(139,195,74,0.28)")};
  cursor: pointer;
  transition: all 0.35s ease;
  &:hover { background: rgba(139,195,74,0.6); }
`;

const GreenShimmerStat = styled(Box)`
  display: inline-block;
  background: linear-gradient(90deg, #8BC34A 0%, #c5e27a 40%, #8BC34A 60%, #5a8f1f 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmerGreen} 3s linear infinite;
  font-family: 'Playfair Display', serif;
  font-weight: 900;
`;

// Decorative scattered dots
const Dot = styled(Box)`
  position: absolute;
  border-radius: 50%;
  background: #8BC34A;
  pointer-events: none;
`;

// ─── Slide data ───────────────────────────────────────────────────────────────
const slides = [
  {
    badge: "100% organic",
    headline: "Organic Products",
    sub: "For a Healthier Life",
    body: "Store opening 20th of July — Premium dry fruits & nuts sourced straight from nature's finest farms.",
    tagline: "Fresh. Crunchy. Wholesome. Natural.",
    discountNum: "40%",
    discountSub: "Discount",
  },
  {
    badge: "protein rich",
    headline: "Pure Nutrition",
    sub: "In Every Handful",
    body: "Packed with protein, healthy fats, vitamins & antioxidants — fuel your body the natural way every day.",
    tagline: "Protein. Fats. Vitamins. Energy.",
    discountNum: "18g",
    discountSub: "Protein",
  },
  {
    badge: "no additives",
    headline: "Snack Smart.",
    sub: "Live Better.",
    body: "Elevate your daily routine with premium cashews, almonds, pistachios & more — only from Dnuts.",
    tagline: "Almonds. Cashews. Pistachios.",
    discountNum: "0%",
    discountSub: "Sugar",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const Banner: React.FC = () => {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <HeroWrapper>
      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <HeroBg>
        {/* Background image with dark overlay */}
        <BgImageLayer src={bannerBg} alt="" />

        {/* Dark overlay gradient */}
        <Box sx={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(135deg, rgba(10,15,5,0.96) 0%, rgba(15,20,8,0.88) 45%, rgba(20,28,10,0.82) 100%)",
        }} />

        {/* Green glow top-left */}
        <Box sx={{
          position: "absolute", top: -120, left: -120, width: 500, height: 500,
          borderRadius: "50%", zIndex: 1,
          background: "radial-gradient(circle, rgba(139,195,74,0.1) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        {/* Green glow bottom-right */}
        <Box sx={{
          position: "absolute", bottom: -100, right: -80, width: 400, height: 400,
          borderRadius: "50%", zIndex: 1,
          background: "radial-gradient(circle, rgba(139,195,74,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        {/* Scatter dots decoration */}
        <Dot sx={{ width: 5, height: 5, top: "22%", left: "47%", opacity: 0.55, zIndex: 1 }} />
        <Dot sx={{ width: 4, height: 4, top: "68%", left: "52%", opacity: 0.3, zIndex: 1 }} />
        <Dot sx={{ width: 7, height: 7, top: "38%", right: "8%", opacity: 0.2, zIndex: 1 }} />
        <Dot sx={{ width: 4, height: 4, bottom: "28%", left: "38%", opacity: 0.4, zIndex: 1 }} />
        <Dot sx={{ width: 10, height: 10, top: "14%", right: "22%", opacity: 0.12, zIndex: 1 }} />

        {/* Top green accent line */}
        <Box sx={{
          position: "absolute", top: 0, left: 0, right: 0, height: "3px", zIndex: 3,
          background: "linear-gradient(90deg, transparent, #8BC34A 30%, #c5e27a 50%, #8BC34A 70%, transparent)",
        }} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", md: "space-between" },
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 5 },
            py: { xs: 5, md: 6 },
          }}>

            {/* ── LEFT: Circular nut image ──────────────────────────────── */}
            <Box sx={{ position: "relative", flexShrink: 0 }}>
              <CircleRing>
                <SpinRing />
                <SpinRing2 />
                <FloatingNutImg src={nutsProductImg} alt="Dnuts Premium Collection" />

                {/* Discount badge */}
                <DiscountBadge>
                  <Typography sx={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 900,
                    fontSize: "1.1rem", color: "#fff", lineHeight: 1,
                  }}>
                    {slide.discountNum}
                  </Typography>
                  <Typography sx={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                    fontSize: "0.5rem", color: "rgba(255,255,255,0.9)",
                    letterSpacing: "0.5px", textTransform: "uppercase",
                    lineHeight: 1.2, mt: "2px",
                  }}>
                    {slide.discountSub}
                  </Typography>
                </DiscountBadge>
              </CircleRing>

              {/* Leaf logo icon */}
              <Box sx={{
                position: "absolute", top: -8, left: -8,
                width: 40, height: 40, borderRadius: "50%",
                background: "linear-gradient(135deg, #8BC34A, #5a8f1f)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 14px rgba(139,195,74,0.5)",
                fontSize: "1.2rem", zIndex: 5,
              }}>
                🌿
              </Box>
            </Box>

            {/* ── RIGHT: Text content ───────────────────────────────────── */}
            <TextSide sx={{
              maxWidth: { xs: "100%", md: "54%" },
              textAlign: { xs: "center", md: "left" },
            }}>
              <SlideAnim key={current}>
                {/* Eyebrow badge */}
                <Box sx={{ mb: 1.5 }}>
                  <Chip
                    label={slide.badge}
                    size="small"
                    sx={{
                      background: "rgba(139,195,74,0.12)",
                      color: "#8BC34A",
                      border: "1px solid rgba(139,195,74,0.3)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.68rem",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      height: 24,
                    }}
                  />
                </Box>

                {/* Main headline */}
                <BigHeadline sx={{ fontSize: { xs: "2rem", sm: "2.6rem", md: "3.8rem" }, mb: 0.5 }}>
                  {slide.headline}
                </BigHeadline>

                {/* Green italic subheadline */}
                <BigHeadline sx={{ fontSize: { xs: "1.55rem", sm: "2rem", md: "2.85rem" }, mb: 2.5 }}>
                  <GreenItalic>{slide.sub}</GreenItalic>
                </BigHeadline>

                {/* Body text */}
                <Typography sx={{
                  color: "rgba(255,255,255,0.52)",
                  fontSize: { xs: "0.8rem", md: "0.92rem" },
                  lineHeight: 1.75,
                  mb: 2.5,
                  maxWidth: 430,
                  mx: { xs: "auto", md: 0 },
                }}>
                  {slide.body}
                </Typography>

                {/* Typewriter tagline */}
                <Box sx={{ mb: 3, display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
                  <TaglineMono sx={{ fontSize: { xs: "0.6rem", md: "0.75rem" } }}>
                    {slide.tagline}
                  </TaglineMono>
                </Box>

                {/* CTA + Stars */}
                <Box sx={{
                  display: "flex", alignItems: "center",
                  gap: { xs: 2, md: 3 }, flexWrap: "wrap",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}>
                  <GetNowBtn>GET NOW →</GetNowBtn>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}>
                    <Box sx={{ display: "flex", gap: "2px" }}>
                      {[1,2,3,4,5].map((i) => (
                        <span key={i} style={{ color: "#8BC34A", fontSize: "0.9rem" }}>★</span>
                      ))}
                    </Box>
                    <Typography sx={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.7rem",
                      fontFamily: "'DM Sans', sans-serif",
                      letterSpacing: "0.3px",
                    }}>
                      4.9 · 2,400+ happy customers
                    </Typography>
                  </Box>
                </Box>
              </SlideAnim>
            </TextSide>
          </Box>
        </Container>

        {/* Dot navigation */}
        <Box sx={{
          position: "absolute", bottom: 18, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", gap: "6px", alignItems: "center", zIndex: 10,
        }}>
          {slides.map((_, i) => (
            <DotNav key={i} active={i === current} onClick={() => setCurrent(i)} />
          ))}
        </Box>

        {/* Bottom accent line */}
        <Box sx={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", zIndex: 3,
          background: "linear-gradient(90deg, transparent, #5a8f1f 30%, #8BC34A 50%, #5a8f1f 70%, transparent)",
        }} />
      </HeroBg>

      {/* ── STATS STRIP ───────────────────────────────────────────────────── */}
      <Box sx={{
        background: "#0c1007",
        borderTop: "2px solid #8BC34A",
        borderBottom: "1px solid rgba(139,195,74,0.15)",
        py: { xs: 2, md: 2.5 },
        px: 2,
      }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2,1fr)", sm: "repeat(4,1fr)" },
            gap: { xs: 2, md: 0 },
          }}>
            {[
              { icon: "🥜", num: "6+",   label: "Nut Varieties" },
              { icon: "💪", num: "18g",  label: "Protein / 100g" },
              { icon: "🌿", num: "100%", label: "Natural & Pure" },
              { icon: "🚚", num: "Free", label: "Delivery ₹999+" },
            ].map((stat, i) => (
              <Box key={stat.label} sx={{
                textAlign: "center", px: { xs: 1, md: 2 },
                borderRight: { sm: i < 3 ? "1px solid rgba(139,195,74,0.12)" : "none" },
                display: "flex", flexDirection: "column", alignItems: "center",
              }}>
                <Typography sx={{ fontSize: "1.4rem", mb: 0.3 }}>{stat.icon}</Typography>
                <GreenShimmerStat sx={{ fontSize: { xs: "1.3rem", md: "1.65rem" }, display: "block" }}>
                  {stat.num}
                </GreenShimmerStat>
                <Typography sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem", letterSpacing: "0.8px",
                  color: "rgba(255,255,255,0.42)", mt: 0.4, textTransform: "uppercase",
                }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── PROMO BAR ─────────────────────────────────────────────────────── */}
      <Box sx={{
        background: "#8BC34A",
        py: "9px", px: 2,
        display: "flex", alignItems: "center",
        justifyContent: "center", gap: { xs: 1, md: 2 }, flexWrap: "wrap",
      }}>
        <Typography sx={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem",
          color: "#0c1007", fontWeight: 600,
        }}>
          🎉 First order discount — use code
        </Typography>
        <Box sx={{
          background: "#0c1007", color: "#8BC34A",
          fontFamily: "'DM Mono', monospace", fontWeight: 700,
          fontSize: "0.76rem", px: 1.5, py: "3px",
          borderRadius: "5px", letterSpacing: "1.5px",
        }}>
          GRANOLA
        </Box>
        <Typography sx={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem",
          color: "#0c1007", fontWeight: 600,
        }}>
          for 20% off your purchase
        </Typography>
      </Box>
    </HeroWrapper>
  );
};

export default Banner;
