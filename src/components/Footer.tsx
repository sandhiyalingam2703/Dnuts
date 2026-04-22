import React from "react";
import { Box, Container, Typography, Grid, IconButton, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { keyframes } from "@emotion/react";
import dnutsLogo from "../oderassets/dnutslogo.jpg.png";

const shimmerGreen = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

interface FooterProps {
  onAdminClick?: () => void;
}

// ─── Smooth scroll helper ─────────────────────────────────────────────────────
const scrollTo = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Footer = ({ onAdminClick }: FooterProps) => {
  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", py: 8, borderTop: "1px solid #333", position: "relative" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>

          {/* Brand */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Box
                component="img"
                src={dnutsLogo}
                alt="DNUTS Logo"
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1.5px solid rgba(139,195,74,0.3)",
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#8bc34a" }}>
                DNUTS
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#aaa", lineHeight: 1.8 }}>
              Nature's finest harvest delivered to your doorstep. Pure, organic, and wholesome nutrition for your daily life.
            </Typography>
          </Grid>

          {/* Quick Links — scroll to section ids */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Quick Links</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                { label: "Home",       id: "section-home" },
                { label: "Products",   id: "section-products" },
                { label: "About Us",   id: "section-about" },
                { label: "Contact",    id: "section-contact" },
              ].map(({ label, id }) => (
                <Link
                  key={id}
                  href={`#${id}`}
                  onClick={scrollTo(id)}
                  sx={{
                    color: "#aaa", textDecoration: "none",
                    "&:hover": { color: "#8bc34a" },
                    transition: "color 0.2s",
                    fontSize: "0.9rem",
                  }}
                >
                  {label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Follow Us */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Follow Us</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton sx={{ color: "#fff", "&:hover": { backgroundColor: "rgba(139,195,74,0.2)" } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.instagram.com/d_nuts_since2020"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fff", "&:hover": { backgroundColor: "rgba(139,195,74,0.2)" } }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff", "&:hover": { backgroundColor: "rgba(139,195,74,0.2)" } }}>
                <TwitterIcon />
              </IconButton>
            </Box>
            <Typography variant="caption" sx={{ color: "#555", mt: 1, display: "block" }}>
              @d_nuts_since2020
            </Typography>
          </Grid>

          {/* Visit Us */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Visit Us</Typography>
            <Link
              href="https://maps.app.goo.gl/jA3kmjEi9riFmxtL7?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#8bc34a", textDecoration: "none",
                display: "flex", alignItems: "center", gap: 0.5,
                fontSize: "0.875rem",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              <LocationOnIcon fontSize="small" />
              Find us on Google Maps
            </Link>
          </Grid>
        </Grid>
      
                  {/* Final note */}
                  <Box sx={{
                    mt: 6, textAlign: "center",
                    background: "rgba(139,195,74,0.04)",
                    border: "1px solid rgba(139,195,74,0.15)",
                    borderRadius: "16px",
                    p: 4,
                  }}>
                               <Box
                                  component="span"
                                  sx={{
                                    background:"linear-gradient(90deg,#8BC34A 0%,#c5e27a 40%,#8BC34A 60%,#5a8f1f 100%)",
                                    backgroundSize:"200% auto",
                                    WebkitBackgroundClip:"text",
                                    WebkitTextFillColor:"transparent",
                                    backgroundClip:"text",
                                    animation:`${shimmerGreen} 4s linear infinite`,
                                  }}
                                >
                                  Naturally
                                </Box>
                    <Typography sx={{ color: "#8bc34a", fontSize: "1.1rem", mb: 1 }}>🌿</Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", lineHeight: 2, maxWidth: 600, mx: "auto" }}>
                      For any queries, complaints, or assistance, please contact us directly on WhatsApp.
                      We are committed to resolving any genuine concerns promptly and fairly.
                      Dnuts reserves the right to update these policies at any time without prior notice.
                    </Typography>
                    <Typography sx={{ color: "#8bc34a", fontWeight: 700, fontSize: "0.78rem", letterSpacing: 2, textTransform: "uppercase", mt: 2 }}>
                      📲 Contact: +91 7373695325
                    </Typography>
                  </Box>
      


        {/* Bottom bar */}
        <Box sx={{ textAlign: "center", mt: 8, pt: 4, borderTop: "1px solid #222", position: "relative" }}>
          <Typography variant="caption" sx={{ color: "#555" }}>
            © {new Date().getFullYear()} DNUTS. All rights reserved.
          </Typography>
          <IconButton
            onClick={onAdminClick}
            sx={{ position: "absolute", right: 0, bottom: 0, color: "#333", "&:hover": { color: "#555" } }}
          >
            <AdminPanelSettingsIcon fontSize="small" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
