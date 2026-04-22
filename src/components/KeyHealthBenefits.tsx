import React from "react";
import {
  Box,
  Typography,
  Container,
  Chip,
  Grid,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

// ─── Logo image — your local asset ───────────────────────────────────────────
import dnutsLogo from "../oderassets/dnutslogo.jpg.png";

// ─── Keyframes ────────────────────────────────────────────────────────────────

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const popIn = keyframes`
  0%   { opacity: 0; transform: scale(0.88); }
  70%  { transform: scale(1.04); }
  100% { opacity: 1; transform: scale(1); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

const logoPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(139,195,74,0), 0 8px 24px rgba(139,195,74,0.2); }
  50%       { box-shadow: 0 0 0 10px rgba(139,195,74,0.08), 0 8px 24px rgba(139,195,74,0.35); }
`;

const rotateSlow = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

// ─── Styled Components ────────────────────────────────────────────────────────

const SectionWrapper = styled(Box)`
  background: #0e1208;
  padding: 80px 0 100px;
  border-top: 1px solid rgba(139, 195, 74, 0.1);
  position: relative;
  overflow: hidden;
`;

const NutPill = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 9999px;
  cursor: pointer;
  border: 1.5px solid ${({ active }) => (active ? "#8BC34A" : "rgba(139,195,74,0.2)")};
  background: ${({ active }) => (active ? "#8BC34A" : "transparent")};
  color: ${({ active }) => (active ? "#0e1208" : "#8BC34A")};
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  letter-spacing: 0.5px;
  &:hover {
    border-color: #8BC34A;
    background: ${({ active }) => (active ? "#8BC34A" : "rgba(139,195,74,0.1)")};
  }
`;

const BenefitCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "delay",
})<{ delay: number }>`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(139,195,74,0.15);
  border-radius: 20px;
  padding: 32px 24px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: ${fadeInUp} 0.8s cubic-bezier(0.22,1,0.36,1) ${({ delay }) => delay}ms forwards;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  &:hover {
    border-color: #8BC34A;
    transform: translateY(-6px);
    background: rgba(255,255,255,0.06);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
  }
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg,#8BC34A,#c5e27a,#8BC34A);
    background-size: 200% auto;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  &:hover::before {
    transform: scaleX(1);
  }
`;

const IconCircle = styled(Box)`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: rgba(139,195,74,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 28px;
  animation: ${float} 4s ease-in-out infinite;
  border: 1px solid rgba(139,195,74,0.2);
`;

const ProgressTrack = styled(Box)`
  height: 6px;
  background: rgba(139,195,74,0.05);
  border-radius: 99px;
  overflow: hidden;
  margin-top: 20px;
`;

const ProgressFill = styled(Box, {
  shouldForwardProp: (prop) => prop !== "pct" && prop !== "visible",
})<{ pct: number; visible: boolean }>`
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(90deg,#8BC34A,#c5e27a);
  width: ${({ visible, pct }) => (visible ? `${pct}%` : "0%")};
  transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
`;

const NutrientCard = styled(Box)`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(139,195,74,0.1);
  border-radius: 14px;
  padding: 16px 18px;
  animation: ${popIn} 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards;
  transition: all 0.2s ease;
  &:hover {
    background: rgba(255,255,255,0.05);
    border-color: #8BC34A;
  }
`;

const DetailPanel = styled(Box)`
  background: rgba(255,255,255,0.02);
  border: 1.5px solid rgba(139,195,74,0.15);
  border-radius: 20px;
  padding: 32px;
  animation: ${fadeInUp} 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
  backdrop-filter: blur(10px);
`;

// ─── Data ─────────────────────────────────────────────────────────────────────

const benefits = [
  { icon:"❤️", title:"Heart health",      desc:"Monounsaturated fats reduce LDL cholesterol and support long-term cardiovascular function.", pct:92, tag:"cardiovascular" },
  { icon:"🧠", title:"Brain function",    desc:"Omega-3 fatty acids and Vitamin E fuel cognitive clarity and protect long-term brain health.", pct:88, tag:"cognitive" },
  { icon:"⚡", title:"Sustained energy",  desc:"Protein and healthy fats deliver slow-release energy — no sugar spikes, no crashes.", pct:95, tag:"energy" },
  { icon:"🛡️", title:"Antioxidant rich", desc:"Polyphenols and tocopherols actively combat oxidative stress and reduce inflammation.", pct:85, tag:"immunity" },
  { icon:"🦴", title:"Bone strength",     desc:"Calcium, magnesium, and phosphorus work together to keep bones dense and resilient.", pct:78, tag:"structural" },
  { icon:"⚖️", title:"Weight balance",   desc:"High satiety index means you feel fuller longer and naturally snack less throughout the day.", pct:82, tag:"metabolic" },
];

type NutKey = "almond" | "cashew" | "pistachio" | "walnut" | "pecan" | "hazelnut";

const nuts: Record<NutKey, { label: string; nutrients: { name: string; value: string }[] }> = {
  almond:    { label:"Almonds",    nutrients:[{ name:"Protein",value:"21g"},{ name:"Healthy fats",value:"50g"},{ name:"Vitamin E",value:"26mg"},{ name:"Magnesium",value:"270mg"},{ name:"Fiber",value:"12g"},{ name:"Calcium",value:"264mg"}] },
  cashew:    { label:"Cashews",    nutrients:[{ name:"Protein",value:"18g"},{ name:"Healthy fats",value:"44g"},{ name:"Iron",value:"6mg"},{ name:"Zinc",value:"5.8mg"},{ name:"Magnesium",value:"292mg"},{ name:"Fiber",value:"3g"}] },
  pistachio: { label:"Pistachios", nutrients:[{ name:"Protein",value:"20g"},{ name:"Healthy fats",value:"45g"},{ name:"Vitamin B6",value:"1.7mg"},{ name:"Potassium",value:"1025mg"},{ name:"Fiber",value:"10g"},{ name:"Copper",value:"1.3mg"}] },
  walnut:    { label:"Walnuts",    nutrients:[{ name:"Protein",value:"15g"},{ name:"Omega-3",value:"9g"},{ name:"Antioxidants",value:"High"},{ name:"Magnesium",value:"158mg"},{ name:"Fiber",value:"7g"},{ name:"Folate",value:"98mcg"}] },
  pecan:     { label:"Pecans",     nutrients:[{ name:"Protein",value:"9g"},{ name:"Healthy fats",value:"72g"},{ name:"Vitamin A",value:"56 IU"},{ name:"Zinc",value:"4.5mg"},{ name:"Fiber",value:"10g"},{ name:"Manganese",value:"4.5mg"}] },
  hazelnut:  { label:"Hazelnuts",  nutrients:[{ name:"Protein",value:"15g"},{ name:"Healthy fats",value:"61g"},{ name:"Vitamin E",value:"15mg"},{ name:"Folate",value:"113mcg"},{ name:"Fiber",value:"10g"},{ name:"Copper",value:"1.7mg"}] },
};

const nutKeys: NutKey[] = ["almond","cashew","pistachio","walnut","pecan","hazelnut"];

// ─── Component ────────────────────────────────────────────────────────────────

const KeyHealthBenefits: React.FC = () => {
  const [selectedNut, setSelectedNut] = React.useState<NutKey>("almond");
  const [barsVisible, setBarsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setBarsVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const currentNut = nuts[selectedNut];

  return (
    <SectionWrapper ref={sectionRef}>

      {/* ── Background glow blobs ──────────────────────────────────────── */}
      <Box sx={{ position:"absolute", top:-120, left:-100, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,195,74,0.05) 0%,transparent 65%)", pointerEvents:"none" }} />
      <Box sx={{ position:"absolute", bottom:-80, right:-80, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,195,74,0.04) 0%,transparent 65%)", pointerEvents:"none" }} />

      <Container maxWidth="lg">

        {/* ── Section Header ─────────────────────────────────────────── */}
        <Box sx={{ textAlign:"center", mb:7 }}>

          {/* ── Logo with rings ──────────────────────────────────────── */}
          <Box sx={{ position:"relative", display:"inline-block", mb:3 }}>

            {/* Outer spinning dashed ring */}
            <Box sx={{
              position:"absolute", inset:-18,
              borderRadius:"50%",
              border:"1.5px dashed rgba(139,195,74,0.25)",
              animation:`${rotateSlow} 20s linear infinite`,
              pointerEvents:"none",
            }} />

            {/* Middle ring */}
            <Box sx={{
              position:"absolute", inset:-8,
              borderRadius:"50%",
              border:"1px solid rgba(139,195,74,0.15)",
              animation:`${rotateSlow} 12s linear infinite reverse`,
              pointerEvents:"none",
            }} />

            {/* Logo image */}
            <Box
              component="img"
              src={dnutsLogo}
              alt="Dnuts Logo"
              sx={{
                width: { xs:80, md:96 },
                height: { xs:80, md:96 },
                borderRadius:"50%",
                objectFit:"cover",
                display:"block",
                border:"3px solid rgba(139,195,74,0.45)",
                boxShadow:"0 8px 32px rgba(139,195,74,0.25), 0 0 0 6px rgba(139,195,74,0.08)",
                animation:`${logoPulse} 3s ease-in-out infinite`,
                position:"relative",
                zIndex:1,
              }}
            />

            {/* Green dot badge */}
            <Box sx={{
              position:"absolute", bottom:4, right:4, zIndex:2,
              width:18, height:18, borderRadius:"50%",
              background:"linear-gradient(135deg,#8BC34A,#5a8f1f)",
              border:"2px solid #0e1208",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"0.55rem",
            }}>
              ✓
            </Box>
          </Box>

          {/* Brand label under logo */}
          <Typography sx={{
            fontFamily:"'DM Mono',monospace",
            fontSize:"0.65rem", color:"rgba(139,195,74,0.55)",
            letterSpacing:"3px", textTransform:"uppercase", mb:2,
          }}>
            Dnuts — Premium Dry Fruits
          </Typography>

          <Chip
            label="Why choose Dnuts"
            size="small"
            sx={{
              background:"rgba(139,195,74,0.12)",
              color:"#8BC34A",
              border:"1px solid rgba(139,195,74,0.3)",
              fontFamily:"'DM Sans',sans-serif",
              fontWeight:600, fontSize:"0.72rem",
              letterSpacing:"1px", textTransform:"uppercase",
              mb:2, height:"24px",
            }}
          />

          <Typography
            variant="h2"
            sx={{
              fontFamily:"'Playfair Display',serif",
              fontWeight:800, color:"#ffffff",
              fontSize:{ xs:"1.8rem", md:"2.8rem" },
              lineHeight:1.15, mb:1.5,
            }}
          >
            Key health benefits
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily:"'DM Sans','Segoe UI',sans-serif",
              color:"#B8AF9F", lineHeight:1.7,
              fontSize:{ xs:"0.9rem", md:"1.05rem" },
              maxWidth:"520px", mx:"auto",
            }}
          >
            Every Dnuts variety is a nutrient powerhouse. Here's what each handful delivers for your body and mind.
          </Typography>

          {/* Green underline accent */}
          <Box sx={{ width:60, height:3, background:"linear-gradient(90deg,transparent,#8BC34A,transparent)", borderRadius:2, mx:"auto", mt:2.5 }} />
        </Box>

        {/* ── Benefits Grid ──────────────────────────────────────────── */}
        <Grid container spacing={2.5} sx={{ mb:6 }}>
          {benefits.map((b, i) => (
            <Grid item xs={12} sm={6} md={4} key={b.title}>
              <BenefitCard delay={i * 100}>
                <Box sx={{ position:"absolute", top:16, right:16 }}>
                  <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:"0.62rem", color:"rgba(139,195,74,0.4)", letterSpacing:"1px", textTransform:"uppercase" }}>
                    {b.tag}
                  </Typography>
                </Box>
                <IconCircle sx={{ animationDelay:`${i*0.3}s` }}>{b.icon}</IconCircle>
                <Typography sx={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:"1.15rem", color:"#ffffff", mb:1 }}>
                  {b.title}
                </Typography>
                <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", color:"#B8AF9F", lineHeight:1.65 }}>
                  {b.desc}
                </Typography>
                <ProgressTrack>
                  <ProgressFill pct={b.pct} visible={barsVisible} />
                </ProgressTrack>
                <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:"0.68rem", color:"rgba(139,195,74,0.4)", mt:0.5, textAlign:"right" }}>
                  {b.pct}% efficacy score
                </Typography>
              </BenefitCard>
            </Grid>
          ))}
        </Grid>

        {/* ── Nutrient Breakdown ─────────────────────────────────────── */}
        <Box>
          <Box sx={{ display:"flex", alignItems:{ xs:"flex-start", sm:"center" }, justifyContent:"space-between", flexDirection:{ xs:"column", sm:"row" }, gap:2, mb:2.5 }}>
            <Box>
              <Typography sx={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:{ xs:"1.2rem", md:"1.5rem" }, color:"#ffffff" }}>
                Nutrient breakdown
              </Typography>
              <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.82rem", color:"#B8AF9F", mt:0.25 }}>
                Select a nut to view per-100g values
              </Typography>
            </Box>
            <Box sx={{ display:"flex", gap:1, flexWrap:"wrap" }}>
              {nutKeys.map((key) => (
                <NutPill key={key} active={selectedNut === key} onClick={() => setSelectedNut(key)}>
                  {nuts[key].label}
                </NutPill>
              ))}
            </Box>
          </Box>

          <DetailPanel key={selectedNut}>
            <Box sx={{ display:"flex", alignItems:"center", gap:2, mb:2.5 }}>
              {/* Mini logo in panel */}
              <Box
                component="img"
                src={dnutsLogo}
                alt="Dnuts"
                sx={{
                  width:36, height:36, borderRadius:"50%",
                  objectFit:"cover",
                  border:"2px solid rgba(139,195,74,0.4)",
                  boxShadow:"0 4px 12px rgba(139,195,74,0.2)",
                }}
              />
              <Typography sx={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.1rem", color:"#8BC34A" }}>
                {currentNut.label} — per 100g
              </Typography>
            </Box>
            <Grid container spacing={1.5}>
              {currentNut.nutrients.map((n) => (
                <Grid item xs={6} sm={4} md={2} key={n.name}>
                  <NutrientCard>
                    <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.72rem", color:"#B8AF9F", mb:0.4 }}>
                      {n.name}
                    </Typography>
                    <Typography sx={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.1rem", color:"#ffffff" }}>
                      {n.value}
                    </Typography>
                  </NutrientCard>
                </Grid>
              ))}
            </Grid>
          </DetailPanel>
        </Box>

        {/* ── Bottom CTA strip ───────────────────────────────────────── */}
        <Box sx={{
          mt:6,
          background:"linear-gradient(135deg,rgba(139,195,74,0.12) 0%,rgba(139,195,74,0.04) 100%)",
          borderRadius:"16px",
          border:"1px solid rgba(139,195,74,0.2)",
          px:{ xs:2.5, md:4 }, py:3,
          display:"flex", alignItems:"center",
          justifyContent:"space-between",
          flexWrap:"wrap", gap:2,
          backdropFilter:"blur(10px)",
        }}>
          {/* Left: logo + text */}
          <Box sx={{ display:"flex", alignItems:"center", gap:2 }}>
            <Box
              component="img"
              src={dnutsLogo}
              alt="Dnuts"
              sx={{
                width:44, height:44, borderRadius:"50%",
                objectFit:"cover",
                border:"2px solid rgba(139,195,74,0.4)",
                boxShadow:"0 4px 12px rgba(139,195,74,0.2)",
                flexShrink:0,
              }}
            />
            <Box>
              <Typography sx={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:{ xs:"1.1rem", md:"1.4rem" }, color:"#ffffff", mb:0.4 }}>
                Ready to feel the difference?
              </Typography>
              <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.82rem", color:"#B8AF9F" }}>
                Use code{" "}
                <Box component="span" sx={{ background:"#8BC34A", color:"#0e1208", fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:"0.8rem", px:"8px", py:"1px", borderRadius:"5px", letterSpacing:"1px", mx:0.5 }}>
                  GRANOLA
                </Box>
                for 20% off your first order.
              </Typography>
            </Box>
          </Box>

          <Box
            component="button"
            sx={{
              background:"linear-gradient(135deg,#8BC34A 0%,#6aaa1f 100%)",
              color:"#0e1208",
              fontFamily:"'DM Sans',sans-serif",
              fontWeight:700, fontSize:"0.88rem",
              px:3, py:1.25,
              borderRadius:"9999px",
              border:"none", cursor:"pointer",
              letterSpacing:"1px", textTransform:"uppercase",
              transition:"all 0.2s ease",
              boxShadow:"0 4px 14px rgba(139,195,74,0.3)",
              "&:hover": {
                transform:"translateY(-2px)",
                boxShadow:"0 6px 20px rgba(139,195,74,0.5)",
                background:"linear-gradient(135deg,#9CCC65 0%,#7ab828 100%)",
              },
            }}
          >
            Shop Dnuts →
          </Box>
        </Box>

      </Container>
    </SectionWrapper>
  );
};

export default KeyHealthBenefits;
