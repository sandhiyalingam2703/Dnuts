import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

// ─── Logo image ───────────────────────────────────────────────────────────────
import dnutsLogo from "../oderassets/dnutslogo.jpg.png";

// ─── Keyframes ────────────────────────────────────────────────────────────────
const rotateSlow = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const rotateReverse = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(-360deg); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 30px rgba(139,195,74,0.2), 0 0 60px rgba(139,195,74,0.05); }
  50%       { box-shadow: 0 0 50px rgba(139,195,74,0.45), 0 0 90px rgba(139,195,74,0.15); }
`;

const shimmerGreen = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

// ─── Styled Components ────────────────────────────────────────────────────────
const SlideInBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "visible" && prop !== "side" && prop !== "delay",
})<{ visible: boolean; side: "left" | "right"; delay?: number }>`
  opacity: 0;
  transform: translateX(${({ side }) => (side === "left" ? "-50px" : "50px")});
  transition: opacity 0.8s ease-out ${({ delay }) => delay ?? 0}ms,
              transform 0.8s ease-out ${({ delay }) => delay ?? 0}ms;
  ${({ visible }) =>
    visible &&
    `
    opacity: 1;
    transform: translateX(0);
  `}
`;

const BenefitItem = styled(Box)<{ align: "left" | "right" }>`
  text-align: ${({ align }) => align};
  padding: 20px 24px;
  border-radius: 16px;
  border: 1px solid rgba(139,195,74,0.1);
  background: rgba(255,255,255,0.02);
  transition: all 0.3s ease;
  cursor: default;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    ${({ align }) => (align === "left" ? "right: 0;" : "left: 0;")}
    top: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, transparent, #8BC34A, transparent);
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(139,195,74,0.06);
    border-color: rgba(139,195,74,0.3);
    transform: translateX(${({ align }) => (align === "left" ? "-4px" : "4px")});

    &::before {
      opacity: 1;
    }
  }
`;

const NumberBadge = styled(Box)`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8BC34A, #5a8f1f);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 900;
  color: #0e1208;
  flex-shrink: 0;
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const benefits = [
  {
    title: "Packed with protein & healthy fats",
    description: "Essential building blocks for your body and long-lasting energy.",
    icon: "💪",
  },
  {
    title: "Rich in vitamins & antioxidants",
    description: "Natural defense against oxidative stress and overall well-being.",
    icon: "🛡️",
  },
  {
    title: "Supports heart & brain health",
    description: "Omega fatty acids that keep your vital organs functioning at their best.",
    icon: "❤️",
  },
  {
    title: "Perfect for everyday energy",
    description: "The ultimate natural fuel to power you through your busy schedule.",
    icon: "⚡",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const HealthBenefits: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: 10,
        background: "linear-gradient(180deg, #0e1208 0%, #111a09 50%, #0e1208 100%)",
        color: "#fff",
        overflow: "hidden",
        position: "relative",
        borderTop: "1px solid rgba(139,195,74,0.1)",
        borderBottom: "1px solid rgba(139,195,74,0.1)",
      }}
    >
      {/* Background glows */}
      <Box sx={{ position:"absolute", top:-100, left:-100, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,195,74,0.06) 0%,transparent 70%)", pointerEvents:"none" }} />
      <Box sx={{ position:"absolute", bottom:-80, right:-80, width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,195,74,0.05) 0%,transparent 70%)", pointerEvents:"none" }} />

      <Container maxWidth="lg">

        {/* ── Heading ──────────────────────────────────────────────────── */}
        <Box sx={{ textAlign:"center", mb:8 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily:"'Playfair Display',serif",
              fontWeight:900,
              fontSize:{ xs:"2rem", md:"3.2rem" },
              color:"#fff",
              lineHeight:1.15,
              mb:1,
            }}
          >
            Quality First,{" "}
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
             Quantity Must!
            </Box>
          </Typography>

          <Typography sx={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(255,255,255,0.4)", fontSize:"0.85rem", letterSpacing:"0.5px" }}>
            Nature's finest — crafted for your daily well-being
          </Typography>

          <Box sx={{ width:50, height:2, background:"linear-gradient(90deg,transparent,#8BC34A,transparent)", borderRadius:2, mx:"auto", mt:2 }} />
        </Box>

        {/* ── Three Column Layout ───────────────────────────────────────── */}
        <Grid container spacing={4} alignItems="center">

          {/* ── LEFT benefits ─────────────────────────────────────────── */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display:"flex", flexDirection:"column", gap:3 }}>
              {[0, 1].map((idx) => (
                <SlideInBox key={idx} visible={isVisible} side="left" delay={idx * 150}>
                  <BenefitItem align="left">
                    <Box sx={{ display:"flex", alignItems:"flex-start", gap:1.5, justifyContent:"flex-end", flexDirection:"row-reverse" }}>
                      <Box sx={{ flex:1, textAlign:"right" }}>
                        <Box sx={{ display:"flex", alignItems:"center", justifyContent:"flex-end", gap:1, mb:0.8 }}>
                          <Typography sx={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"0.95rem", color:"#8BC34A" }}>
                            {benefits[idx].title}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.82rem", color:"rgba(255,255,255,0.45)", lineHeight:1.65 }}>
                          {benefits[idx].description}
                        </Typography>
                      </Box>
                      <Box sx={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0.5, flexShrink:0 }}>
                        <Box sx={{ fontSize:"1.4rem" }}>{benefits[idx].icon}</Box>
                        <NumberBadge>{idx + 1}</NumberBadge>
                      </Box>
                    </Box>
                  </BenefitItem>
                </SlideInBox>
              ))}
            </Box>
          </Grid>

          {/* ── CENTER: Logo ──────────────────────────────────────────── */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display:"flex", justifyContent:"center", alignItems:"center", position:"relative", py:{ xs:4, md:0 } }}>

              {/* Outermost dashed ring — slow spin */}
              <Box sx={{
                position:"absolute",
                width:{ xs:260, md:320 }, height:{ xs:260, md:320 },
                borderRadius:"50%",
                border:"1.5px dashed rgba(139,195,74,0.2)",
                animation:`${rotateSlow} 25s linear infinite`,
                pointerEvents:"none",
              }} />

              {/* Middle ring — reverse spin */}
              <Box sx={{
                position:"absolute",
                width:{ xs:220, md:275 }, height:{ xs:220, md:275 },
                borderRadius:"50%",
                border:"1px solid rgba(139,195,74,0.12)",
                animation:`${rotateReverse} 18s linear infinite`,
                pointerEvents:"none",
              }} />

              {/* Dot accents on the ring */}
              {[0,90,180,270].map((deg) => (
                <Box
                  key={deg}
                  sx={{
                    position:"absolute",
                    width:8, height:8, borderRadius:"50%",
                    background:"#8BC34A",
                    top:"50%", left:"50%",
                    transform:`rotate(${deg}deg) translateX(${155}px) translateY(-50%)`,
                    transformOrigin:"0 50%",
                    boxShadow:"0 0 8px rgba(139,195,74,0.6)",
                    opacity:0.7,
                  }}
                />
              ))}

              {/* Inner decorative ring */}
              <Box sx={{
                position:"absolute",
                width:{ xs:178, md:218 }, height:{ xs:178, md:218 },
                borderRadius:"50%",
                background:"linear-gradient(135deg,rgba(139,195,74,0.08),rgba(90,143,31,0.04))",
                border:"1px solid rgba(139,195,74,0.2)",
                pointerEvents:"none",
              }} />

              {/* ── The actual logo image ── */}
              <Box
                component="img"
                src={dnutsLogo}
                alt="Dnuts — Premium Dry Fruits"
                sx={{
                  width:{ xs:150, md:190 },
                  height:{ xs:150, md:190 },
                  borderRadius:"50%",
                  objectFit:"cover",
                  border:"4px solid rgba(139,195,74,0.5)",
                  position:"relative",
                  zIndex:2,
                  animation:`${float} 5s ease-in-out infinite, ${glowPulse} 3s ease-in-out infinite`,
                  display:"block",
                }}
              />

              {/* Green check badge */}
              <Box sx={{
                position:"absolute",
                bottom:{ xs:58, md:72 }, right:{ xs:"calc(50% - 85px)", md:"calc(50% - 108px)" },
                zIndex:3,
                width:28, height:28, borderRadius:"50%",
                background:"linear-gradient(135deg,#8BC34A,#5a8f1f)",
                border:"3px solid #0e1208",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"0.7rem", fontWeight:900, color:"#0e1208",
                boxShadow:"0 4px 12px rgba(139,195,74,0.5)",
              }}>
                ✓
              </Box>

              {/* Brand label below image */}
              <Box sx={{
                position:"absolute",
                bottom:{ xs:10, md:16 },
                left:"50%", transform:"translateX(-50%)",
                zIndex:3, whiteSpace:"nowrap",
                background:"rgba(12,16,7,0.85)",
                border:"1px solid rgba(139,195,74,0.25)",
                borderRadius:8,
                px:1.5, py:0.4,
              }}>
  
              </Box>
            </Box>
          </Grid>

          {/* ── RIGHT benefits ────────────────────────────────────────── */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display:"flex", flexDirection:"column", gap:3 }}>
              {[2, 3].map((idx) => (
                <SlideInBox key={idx} visible={isVisible} side="right" delay={(idx - 2) * 150}>
                  <BenefitItem align="right">
                    <Box sx={{ display:"flex", alignItems:"flex-start", gap:1.5 }}>
                      <Box sx={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0.5, flexShrink:0 }}>
                        <Box sx={{ fontSize:"1.4rem" }}>{benefits[idx].icon}</Box>
                        <NumberBadge>{idx + 1}</NumberBadge>
                      </Box>
                      <Box sx={{ flex:1 }}>
                        <Typography sx={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"0.95rem", color:"#8BC34A", mb:0.8 }}>
                          {benefits[idx].title}
                        </Typography>
                        <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.82rem", color:"rgba(255,255,255,0.45)", lineHeight:1.65 }}>
                          {benefits[idx].description}
                        </Typography>
                      </Box>
                    </Box>
                  </BenefitItem>
                </SlideInBox>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* ── Bottom stats row ──────────────────────────────────────────── */}
        <Box sx={{
          mt:8,
          display:"grid",
          gridTemplateColumns:{ xs:"repeat(2,1fr)", sm:"repeat(4,1fr)" },
          gap:2,
        }}>
          {[
            { num:"100%", label:"Natural & Pure",      icon:"🌿" },
            { num:"0%",   label:"Added Sugar",          icon:"✅" },
            { num:"18g",  label:"Protein per 100g",     icon:"💪" },
            { num:"40+",   label:"Nut Varieties",        icon:"🥜" },
          ].map((stat) => (
            <Box
              key={stat.label}
              sx={{
                textAlign:"center",
                background:"rgba(255,255,255,0.02)",
                border:"1px solid rgba(139,195,74,0.12)",
                borderRadius:14, py:2.5,
                transition:"all 0.2s",
                "&:hover":{ background:"rgba(139,195,74,0.06)", borderColor:"rgba(139,195,74,0.3)" },
              }}
            >
              <Typography sx={{ fontSize:"1.5rem", mb:0.5 }}>{stat.icon}</Typography>
              <Typography sx={{
                fontFamily:"'Playfair Display',serif", fontWeight:900,
                fontSize:{ xs:"1.4rem", md:"1.7rem" }, color:"#8BC34A",
                background:"linear-gradient(90deg,#8BC34A,#c5e27a,#8BC34A)",
                backgroundSize:"200% auto",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                backgroundClip:"text",
                animation:`${shimmerGreen} 4s linear infinite`,
              }}>
                {stat.num}
              </Typography>
              <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.72rem", color:"rgba(255,255,255,0.38)", mt:0.3, letterSpacing:"0.5px", textTransform:"uppercase" }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>

      </Container>
    </Box>
  );
};

export default HealthBenefits;
