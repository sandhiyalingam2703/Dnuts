import React from "react";
import { Box, Typography } from "@mui/material";
import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";

const CARD_CLASS = "category-card";

// ─── Keyframes ───────────────────────────────────────────────────────────────

const floatA = keyframes`
  0%,100% { transform: translateY(0) rotate(-2deg); }
  50%      { transform: translateY(-8px) rotate(2deg); }
`;
const floatB = keyframes`
  0%,100% { transform: translateY(0) rotate(1deg); }
  50%      { transform: translateY(-10px) rotate(-1deg); }
`;
const floatC = keyframes`
  0%,100% { transform: translateY(0) scale(1); }
  50%      { transform: translateY(-12px) scale(1.05); }
`;
const floatD = keyframes`
  0%,100% { transform: translateY(0) rotate(-1deg); }
  50%      { transform: translateY(-9px) rotate(2deg); }
`;
const floatE = keyframes`
  0%,100% { transform: translateY(0) rotate(2deg); }
  50%      { transform: translateY(-7px) rotate(-2deg); }
`;
const riseCard = keyframes`
  from { opacity: 0; transform: translateY(calc(var(--offset) + 50px)); }
  to   { opacity: 1; transform: translateY(var(--offset)); }
`;
const pulseRingGreen = keyframes`
  0%,100% { box-shadow: 0 0 0 0 rgba(139,195,74,0.3), 0 20px 60px rgba(0,0,0,0.5); }
  50%      { box-shadow: 0 0 0 10px rgba(139,195,74,0), 0 20px 60px rgba(0,0,0,0.5); }
`;
const shimmerBg = keyframes`
  0%,100% { opacity: 0.03; }
  50%      { opacity: 0.07; }
`;
const glowLine = keyframes`
  0%,100% { opacity: 0.4; }
  50%      { opacity: 1; }
`;
const spinRingAnim = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

// ─── Styled Components ────────────────────────────────────────────────────────

const Section = styled(Box)`
  background: #0c1007;
  padding: 56px 24px 64px;
  overflow: hidden;
  position: relative;

  /* Top border glow */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, transparent, #8BC34A 30%, #c5e27a 50%, #8BC34A 70%, transparent);
    animation: ${glowLine} 3s ease-in-out infinite;
  }
`;

const BgWatermark = styled(Typography)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Playfair Display', serif;
  font-size: 140px;
  font-weight: 900;
  color: rgba(139, 195, 74, 0.035);
  letter-spacing: 24px;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  animation: ${shimmerBg} 5s ease-in-out infinite;
`;

/* Green radial glow blobs */
const GlowBlob = styled(Box)`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
`;

const ArchRow = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 12px;
  position: relative;
  z-index: 2;
`;

const Card = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'featured' && prop !== 'offset' && prop !== 'delay'
})<{ featured?: boolean; offset: number; delay: number }>`
  --offset: ${({ offset }) => offset}px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 14px 12px 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  opacity: 0;
  animation:
    ${riseCard} 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${({ delay }) => delay}ms forwards,
    ${({ featured }) => (featured ? css`${pulseRingGreen} 3s ease-in-out 1s infinite` : "none")};
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;

  background: ${({ featured }) =>
    featured
      ? "linear-gradient(160deg, #1e3a0a 0%, #143008 60%, #0c1f05 100%)"
      : "linear-gradient(160deg, #141a0c 0%, #0e1208 100%)"};
  border: ${({ featured }) =>
    featured
      ? "1.5px solid rgba(139,195,74,0.45)"
      : "1px solid rgba(139,195,74,0.12)"};

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 20px;
    border: 2px solid #8BC34A;
    opacity: 0;
    transition: opacity 0.22s ease;
    pointer-events: none;
  }
  &:hover::after,
  &.active::after {
    opacity: 1;
  }
  &:hover {
    box-shadow: ${({ featured }) =>
      featured
        ? "0 24px 56px rgba(0,0,0,0.6), 0 0 30px rgba(139,195,74,0.2)"
        : "0 14px 36px rgba(0,0,0,0.4), 0 0 16px rgba(139,195,74,0.1)"};
  }
`;

/* Spinning dashed ring on featured card */
const SpinRingDecor = styled(Box)`
  position: absolute;
  inset: -14px;
  border-radius: 50%;
  border: 1.5px dashed rgba(139,195,74,0.22);
  animation: ${spinRingAnim} 20s linear infinite;
  pointer-events: none;
`;

const IconWrap = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'featured'
})<{ featured?: boolean }>`
  width: ${({ featured }) => (featured ? "80px" : "64px")};
  height: ${({ featured }) => (featured ? "80px" : "64px")};
  border-radius: 50%;
  background: ${({ featured }) =>
    featured
      ? "radial-gradient(circle, rgba(139,195,74,0.18) 0%, rgba(139,195,74,0.05) 100%)"
      : "rgba(139,195,74,0.07)"};
  border: ${({ featured }) =>
    featured
      ? "1px solid rgba(139,195,74,0.3)"
      : "1px solid rgba(139,195,74,0.12)"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  .${CARD_CLASS}:hover & {
    transform: scale(1.12) translateY(-6px);
  }
`;

const FloatWrapA = styled(Box)`animation: ${floatA} 3.4s ease-in-out infinite;`;
const FloatWrapB = styled(Box)`animation: ${floatB} 4s ease-in-out 0.5s infinite;`;
const FloatWrapC = styled(Box)`animation: ${floatC} 3.8s ease-in-out 0.2s infinite;`;
const FloatWrapD = styled(Box)`animation: ${floatD} 4.2s ease-in-out 0.8s infinite;`;
const FloatWrapE = styled(Box)`animation: ${floatE} 3.6s ease-in-out 0.4s infinite;`;

const CardTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'featured'
})<{ featured?: boolean }>`
  font-family: ${({ featured }) =>
    featured ? "'Playfair Display', serif" : "'DM Sans', sans-serif"};
  font-size: ${({ featured }) => (featured ? "0.9rem" : "0.75rem")};
  font-weight: ${({ featured }) => (featured ? 700 : 600)};
  color: ${({ featured }) => (featured ? "#ffffff" : "rgba(255,255,255,0.75)")};
  text-align: center;
  line-height: 1.35;
  position: relative;
  z-index: 1;
`;

const CardSub = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'featured'
})<{ featured?: boolean }>`
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem;
  color: ${({ featured }) =>
    featured ? "rgba(139,195,74,0.85)" : "rgba(139,195,74,0.5)"};
  text-align: center;
  margin-top: 3px;
  position: relative;
  z-index: 1;
  letter-spacing: 0.5px;
`;

const Badge = styled(Box)`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #8BC34A, #5a8f1f);
  color: #0c1007;
  font-family: 'DM Mono', monospace;
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 9999px;
  white-space: nowrap;
  z-index: 3;
  box-shadow: 0 3px 10px rgba(139,195,74,0.4);
`;

const AccentLine = styled(Box)`
  width: 48px;
  height: 2.5px;
  background: linear-gradient(90deg, #8BC34A, #5a8f1f);
  border-radius: 2px;
  margin: 12px auto 0;
`;

const CtaBtn = styled("button", {
  shouldForwardProp: (prop) => prop !== 'variant'
})<{ variant: "primary" | "ghost" }>`
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  padding: 11px 26px;
  border-radius: 30px;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;

  background: ${({ variant }) =>
    variant === "primary"
      ? "linear-gradient(135deg, #8BC34A, #5a8f1f)"
      : "transparent"};
  color: ${({ variant }) =>
    variant === "primary" ? "#0c1007" : "#8BC34A"};
  border: ${({ variant }) =>
    variant === "primary" ? "none" : "1.5px solid rgba(139,195,74,0.4)"};

  box-shadow: ${({ variant }) =>
    variant === "primary" ? "0 6px 20px rgba(139,195,74,0.35)" : "none"};

  &::before {
    content: '';
    position: absolute;
    top: 0; left: -100%; width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
    transition: left 0.45s ease;
  }
  &:hover::before { left: 140%; }
  &:hover {
    transform: translateY(-2px);
    background: ${({ variant }) =>
      variant === "primary"
        ? "linear-gradient(135deg, #9CCC65, #6aaa1f)"
        : "rgba(139,195,74,0.1)"};
    box-shadow: ${({ variant }) =>
      variant === "primary"
        ? "0 10px 28px rgba(139,195,74,0.5)"
        : "0 4px 14px rgba(139,195,74,0.15)"};
    border-color: ${({ variant }) =>
      variant === "ghost" ? "#8BC34A" : "transparent"};
  }
`;

// ─── SVG Nut Icons — recolored to green palette ───────────────────────────────

const AlmondSVG: React.FC = () => (
  <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
    <ellipse cx="22" cy="26" rx="14" ry="11" fill="#4a7a1a"/>
    <ellipse cx="22" cy="23" rx="11" ry="9" fill="#8BC34A"/>
    <path d="M22 15 C22 15 28 8 25 4 C23 8 16 8 22 15Z" fill="#2d5a0a"/>
    <ellipse cx="22" cy="24" rx="7" ry="5.5" fill="#6aaa1f"/>
    <ellipse cx="19" cy="21" rx="2" ry="1.5" fill="#c5e27a" opacity="0.6"/>
  </svg>
);

const CashewSVG: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
    <path d="M11 27 Q9 18 17 13 Q22 9 27 13 Q36 19 33 28 Q31 36 22 36 Q11 36 11 27Z" fill="#4a7a1a"/>
    <path d="M14 26 Q13 19 19 15 Q22 12 26 15 Q32 20 30 27 Q28 33 22 33 Q14 33 14 26Z" fill="#8BC34A"/>
    <ellipse cx="22" cy="23" rx="6" ry="5" fill="#558B2F" opacity="0.6"/>
    <circle cx="18" cy="19" r="2" fill="#c5e27a" opacity="0.5"/>
  </svg>
);

const DnutsMixSVG: React.FC = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <circle cx="25" cy="25" r="17" fill="#2d5a0a"/>
    <path d="M16 25 Q16 15 25 13 Q34 15 34 25 Q34 35 25 37 Q16 35 16 25Z" fill="#558B2F"/>
    <path d="M19 25 Q19 19 25 17 Q31 19 31 25 Q31 31 25 33 Q19 31 19 25Z" fill="#8BC34A"/>
    <circle cx="25" cy="25" r="5" fill="#6aaa1f"/>
    <circle cx="25" cy="25" r="2.5" fill="#c5e27a"/>
    <line x1="25" y1="8" x2="25" y2="4" stroke="#8BC34A" strokeWidth="2" strokeLinecap="round"/>
    <path d="M25 4 Q28 1 31 4" fill="none" stroke="#8BC34A" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="18" cy="20" r="2" fill="#c5e27a" opacity="0.4"/>
  </svg>
);

const PistachioSVG: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
    <ellipse cx="22" cy="26" rx="13" ry="11" fill="#4a7a1a"/>
    <path d="M12 23 Q14 13 22 11 Q30 13 32 23" fill="#8BC34A"/>
    <path d="M12 23 Q22 20 32 23" stroke="#558B2F" strokeWidth="1" fill="none" opacity="0.7"/>
    <ellipse cx="22" cy="26" rx="7" ry="6" fill="#6aaa1f" opacity="0.6"/>
    <path d="M16 21 Q22 18 28 21" fill="none" stroke="#c5e27a" strokeWidth="1" opacity="0.4"/>
    <circle cx="26" cy="20" r="2" fill="#c5e27a" opacity="0.5"/>
  </svg>
);

const WalnutSVG: React.FC = () => (
  <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
    <path d="M9 26 Q9 14 22 12 Q35 14 35 26 Q33 37 22 37 Q11 37 9 26Z" fill="#4a7a1a"/>
    <path d="M14 25 Q14 17 22 15 Q30 17 30 25 Q28 32 22 32 Q16 32 14 25Z" fill="#8BC34A"/>
    <path d="M22 15 L22 32" stroke="#558B2F" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 25 Q22 22 30 25" stroke="#558B2F" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="17" cy="20" r="1.5" fill="#c5e27a" opacity="0.5"/>
  </svg>
);

// ─── Card Data ────────────────────────────────────────────────────────────────

interface CardData {
  title: string;
  sub: string;
  offset: number;
  delay: number;
  width: { xs: number; sm: number; md: number };
  height: { xs: number; sm: number; md: number };
  featured: boolean;
  badge: string | null;
  FloatWrap: React.FC<{ children: React.ReactNode }>;
  Icon: React.FC;
}

const cardData: CardData[] = [
  {
    title: "Premium\nAlmonds",
    sub: "raw · roasted",
    offset: 58,
    delay: 0,
    width: { xs: 78, sm: 92, md: 108 },
    height: { xs: 108, sm: 126, md: 148 },
    featured: false,
    badge: null,
    FloatWrap: FloatWrapA,
    Icon: AlmondSVG,
  },
  {
    title: "Cashew\nJumbo",
    sub: "W240 grade",
    offset: 28,
    delay: 100,
    width: { xs: 92, sm: 108, md: 128 },
    height: { xs: 128, sm: 152, md: 178 },
    featured: false,
    badge: null,
    FloatWrap: FloatWrapB,
    Icon: CashewSVG,
  },
  {
    title: "Dnuts Special\nMix",
    sub: "signature blend",
    offset: 0,
    delay: 200,
    width: { xs: 108, sm: 128, md: 152 },
    height: { xs: 156, sm: 184, md: 216 },
    featured: true,
    badge: "bestseller",
    FloatWrap: FloatWrapC,
    Icon: DnutsMixSVG,
  },
  {
    title: "Pistachio\nRoasted",
    sub: "lightly salted",
    offset: 28,
    delay: 300,
    width: { xs: 92, sm: 108, md: 128 },
    height: { xs: 128, sm: 152, md: 178 },
    featured: false,
    badge: null,
    FloatWrap: FloatWrapD,
    Icon: PistachioSVG,
  },
  {
    title: "Walnut\nKernels",
    sub: "halves & pieces",
    offset: 58,
    delay: 400,
    width: { xs: 78, sm: 92, md: 108 },
    height: { xs: 108, sm: 126, md: 148 },
    featured: false,
    badge: null,
    FloatWrap: FloatWrapE,
    Icon: WalnutSVG,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const CategoryCards: React.FC = () => {
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null);

  return (
    <Section sx={{ mt: { xs: 0, md: 0 }, zIndex: 10 }}>
      {/* Background glow blobs */}
      <GlowBlob sx={{
        width: 420, height: 420, top: -100, left: -100,
        background: "radial-gradient(circle, rgba(139,195,74,0.07) 0%, transparent 65%)",
      }} />
      <GlowBlob sx={{
        width: 360, height: 360, bottom: -80, right: -80,
        background: "radial-gradient(circle, rgba(139,195,74,0.06) 0%, transparent 65%)",
      }} />

      <BgWatermark>DNUTS</BgWatermark>

      {/* Section header */}
      <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 }, position: "relative", zIndex: 2 }}>
        <Typography sx={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.68rem",
          fontWeight: 600,
          letterSpacing: "3.5px",
          color: "rgba(139,195,74,0.6)",
          textTransform: "uppercase",
          mb: 1,
        }}>
          our premium range
        </Typography>
        <Typography sx={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: { xs: "1.6rem", md: "2.3rem" },
          color: "#ffffff",
          letterSpacing: "-0.3px",
        }}>
          Shop by{" "}
          <span style={{ color: "#8BC34A", fontStyle: "italic" }}>variety</span>
        </Typography>
        <AccentLine />
      </Box>

      {/* Arch cards */}
      <ArchRow sx={{
        gap: { xs: "8px", sm: "10px", md: "12px" },
        overflowX: { xs: "auto", md: "visible" },
        pb: { xs: 2, md: 0 },
      }}>
        {cardData.map((card, i) => {
          const { FloatWrap, Icon } = card;
          return (
            <Card
              key={i}
              featured={card.featured}
              offset={card.offset}
              delay={card.delay}
              className={`${CARD_CLASS} ${activeIdx === i ? "active" : ""}`}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              sx={{
                width: card.width,
                height: card.height,
                transform: `translateY(${card.offset}px)`,
              }}
            >
              {/* Spinning dashed ring on featured only */}
              {card.featured && <SpinRingDecor />}

              {card.badge && <Badge>{card.badge}</Badge>}

              <IconWrap featured={card.featured}>
                <FloatWrap>
                  <Icon />
                </FloatWrap>
              </IconWrap>

              <CardTitle featured={card.featured} sx={{ whiteSpace: "pre-line" }}>
                {card.title}
              </CardTitle>
              <CardSub featured={card.featured}>{card.sub}</CardSub>
            </Card>
          );
        })}
      </ArchRow>

      {/* Spacer for arch */}
      <Box sx={{ height: { xs: 48, md: 64 } }} />

      {/* CTA buttons */}
      <Box sx={{
        display: "flex", justifyContent: "center",
        gap: 1.5, flexWrap: "wrap", position: "relative", zIndex: 2,
      }}>
        <CtaBtn variant="primary">Explore all varieties →</CtaBtn>
        <CtaBtn variant="ghost">Health benefits →</CtaBtn>
      </Box>

      {/* Bottom separator */}
      <Box sx={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(139,195,74,0.2) 30%, rgba(139,195,74,0.2) 70%, transparent)",
      }} />
    </Section>
  );
};

export default CategoryCards;
