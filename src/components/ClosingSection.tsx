import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

// ─── Almond image ─────────────────────────────────────────────────────────────
import almondImg from "../oderassets/almond.jpg.png";

const scaleUp = keyframes`
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1); }
`;

const floatLeft = keyframes`
  from { opacity: 0; transform: translateX(-60px) rotate(-15deg); }
  to   { opacity: 1; transform: translateX(0px) rotate(-15deg); }
`;

const floatRight = keyframes`
  from { opacity: 0; transform: translateX(60px) rotate(15deg); }
  to   { opacity: 1; transform: translateX(0px) rotate(15deg); }
`;

const gentleFloat = keyframes`
  0%,100% { transform: translateY(0px)   rotate(-15deg); }
  50%      { transform: translateY(-12px) rotate(-15deg); }
`;

const gentleFloatR = keyframes`
  0%,100% { transform: translateY(0px)   rotate(15deg); }
  50%      { transform: translateY(-12px) rotate(15deg); }
`;

const AnimatedTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "visible",
})<{ visible: boolean }>`
  opacity: 0;
  ${({ visible }) =>
    visible &&
    `animation: ${scaleUp} 1.4s cubic-bezier(0.34,1.56,0.64,1) forwards;`}
`;

const ClosingSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fallback = setTimeout(() => setIsVisible(true), 1000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(fallback);
        }
      },
      { threshold: 0 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 10, md: 15 },
        backgroundColor: "#0c1007",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background radial glow */}
      <Box sx={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "100%", height: "100%",
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(139,195,74,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Left floating almond ── */}
      <Box
        component="img"
        src={almondImg}
        alt=""
        sx={{
          position: "absolute",
          left: { xs: "-20px", md: "4%", lg: "8%" },
          top: "50%",
          marginTop: { xs: "-50px", md: "-70px" },
          width: { xs: 90, sm: 120, md: 160, lg: 200 },
          height: { xs: 90, sm: 120, md: 160, lg: 200 },
          objectFit: "cover",
          borderRadius: "50%",
          border: "3px solid rgba(139,195,74,0.25)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(139,195,74,0.08)",
          filter: "brightness(0.9)",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0,
          ...(isVisible && {
            animation: `${floatLeft} 1s ease-out 0.2s forwards, ${gentleFloat} 4s ease-in-out 1.2s infinite`,
          }),
        }}
      />

      {/* ── Right floating almond ── */}
      <Box
        component="img"
        src={almondImg}
        alt=""
        sx={{
          position: "absolute",
          right: { xs: "-20px", md: "4%", lg: "8%" },
          top: "50%",
          marginTop: { xs: "-50px", md: "-70px" },
          width: { xs: 90, sm: 120, md: 160, lg: 200 },
          height: { xs: 90, sm: 120, md: 160, lg: 200 },
          objectFit: "cover",
          borderRadius: "50%",
          border: "3px solid rgba(139,195,74,0.25)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(139,195,74,0.08)",
          filter: "brightness(0.9)",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0,
          ...(isVisible && {
            animation: `${floatRight} 1s ease-out 0.4s forwards, ${gentleFloatR} 4s ease-in-out 1.4s infinite`,
          }),
        }}
      />

      {/* ── Centre text ── */}
      <Container
        maxWidth="md"
        sx={{ position: "relative", zIndex: 1, px: { xs: 6, md: 4 } }}
      >
        {/* Small icon */}
        <Typography
          variant="h6"
          sx={{
            color: "#8bc34a",
            mb: 2,
            fontSize: "1.2rem",
            letterSpacing: 4,
          }}
        >
          ✦
        </Typography>

        {/* Main quote */}
        <AnimatedTypography
          visible={isVisible}
          variant="h2"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontStyle: "italic",
            color: "#fff",
            fontSize: { xs: "2rem", sm: "2.8rem", md: "3.8rem" },
            lineHeight: 1.25,
            textShadow: "0 10px 40px rgba(0,0,0,0.6)",
            mb: 3,
          }}
        >
          {"\u201CQuality first,"}
          <Box
            component="span"
            sx={{
              display: "block",
              background: "linear-gradient(90deg,#8bc34a,#c5e27a,#8bc34a)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Quantity must.{"\u201D"}
          </Box>
        </AnimatedTypography>

        {/* Divider */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mt: 1,
          }}
        >
          <Box sx={{ width: 50, height: "1px", background: "linear-gradient(90deg,transparent,rgba(139,195,74,0.5))" }} />
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#8bc34a", opacity: 0.7 }} />
          <Box sx={{ width: 50, height: "1px", background: "linear-gradient(90deg,rgba(139,195,74,0.5),transparent)" }} />
        </Box>

        {/* Tagline */}
        <Typography
          sx={{
            color: "rgba(255,255,255,0.35)",
            fontSize: "0.78rem",
            letterSpacing: 3,
            textTransform: "uppercase",
            mt: 2.5,
            fontWeight: 500,
          }}
        >
          Dnuts — Premium Dry Fruits Since 2020
        </Typography>
      </Container>
    </Box>
  );
};

export default ClosingSection;
