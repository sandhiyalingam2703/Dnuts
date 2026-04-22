import React, { useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import GrassIcon from "@mui/icons-material/Grass";
import SpaIcon from "@mui/icons-material/Spa";
import CakeIcon from "@mui/icons-material/Cake";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

// ─── Import OrderPage ─────────────────────────────────────────────────────────
import OrderPage from "./OrderPage";

// ─── Keyframes ────────────────────────────────────────────────────────────────
const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(139,195,74,0); }
  50%       { box-shadow: 0 0 16px 4px rgba(139,195,74,0.28); }
`;

const ripple = keyframes`
  0%   { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(2.2); opacity: 0; }
`;

// ─── Styled ───────────────────────────────────────────────────────────────────
const CategoryItem = styled(Box, {
  shouldForwardProp: (p) => p !== "active",
})<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  position: relative;
  padding: 12px 20px 14px;
  border-radius: 16px;
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  background: ${({ active }) => (active ? "rgba(139,195,74,0.12)" : "transparent")};
  border: 1px solid ${({ active }) => (active ? "rgba(139,195,74,0.35)" : "transparent")};
  flex-shrink: 0;

  &:hover {
    background: rgba(139, 195, 74, 0.08);
    border-color: rgba(139, 195, 74, 0.2);
    transform: translateY(-4px);

    /* Target children on hover without using component selectors */
    .icon-circle {
      background: rgba(139, 195, 74, 0.15);
      border-color: rgba(139, 195, 74, 0.45);
      transform: scale(1.06);
    }

    .label-text {
      color: #8bc34a !important;
    }

    .tooltip-desc {
      opacity: 1;
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ active }) => (active ? "28px" : "0px")};
    height: 2.5px;
    background: linear-gradient(90deg, #5a8f1f, #8BC34A, #5a8f1f);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  &:hover::after { width: 28px; }
`;

const IconCircle = styled(Box, {
  shouldForwardProp: (p) => p !== "active" && p !== "color",
})<{ active?: boolean; color?: string }>`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${({ active, color }) =>
    active
      ? color
        ? color
        : "linear-gradient(135deg, #8BC34A, #5a8f1f)"
      : "rgba(255,255,255,0.05)"};
  border: 1.5px solid ${({ active }) =>
    active ? "rgba(139,195,74,0.6)" : "rgba(255,255,255,0.08)"};
  transition: all 0.28s ease;
  animation: ${({ active }) => (active ? glowPulse : "none")} 2.5s ease-in-out infinite;
`;

const RippleRing = styled(Box)`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid rgba(139,195,74,0.5);
  animation: ${ripple} 1.8s ease-out infinite;
  pointer-events: none;
`;

const LabelText = styled(Typography, {
  shouldForwardProp: (p) => p !== "active",
})<{ active?: boolean }>`
  font-family: "DM Sans", "Segoe UI", sans-serif !important;
  font-weight: ${({ active }) => (active ? 800 : 500)} !important;
  font-size: 0.7rem !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
  color: ${({ active }) => (active ? "#8BC34A" : "rgba(255,255,255,0.5)")} !important;
  transition: color 0.25s ease !important;
  white-space: nowrap;
`;

const Divider = styled(Box)`
  width: 1px;
  height: 32px;
  background: linear-gradient(to bottom, transparent, rgba(139,195,74,0.18), transparent);
  flex-shrink: 0;
  display: none;
  @media (min-width: 600px) { display: block; }
`;

// "SHOP NOW" pill — opens OrderPage with "All"
const ShopNowPill = styled(Box)`
  display: flex;
  align-items: center;
  gap: 7px;
  background: linear-gradient(135deg, #8BC34A, #5a8f1f);
  color: #0c1007;
  font-family: "DM Sans", sans-serif;
  font-weight: 900;
  font-size: 0.78rem;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  border-radius: 9999px;
  padding: 10px 22px;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(139,195,74,0.35);
  transition: all 0.25s ease;
  border: none;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
    transition: left 0.45s ease;
  }

  &:hover::before { left: 150%; }
  &:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 8px 24px rgba(139,195,74,0.5);
    background: linear-gradient(135deg, #9CCC65, #6aaa1f);
  }
  &:active { transform: scale(0.98); }
`;

// ─── Category → OrderPage filter map ─────────────────────────────────────────
// Maps the display label in IconModel to the category string used in OrderPage
const CATEGORY_FILTER_MAP: Record<string, string> = {
  "Shop All":    "All",
  "Nuts":        "Nuts",
  "Seeds":       "Seeds",
  "Dry Fruits":  "Dry Fruits",
  "Premium":     "Premium",
  "Gift Boxes":  "Gift Boxes",
  "Snacking":    "Snacks",
  "Sweets":      "Sweets",
  "Combo Offer": "All",       // shows all; you can add a Combos category later
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const categories = [
  {
    label: "Nuts",
    icon: <GrassIcon />,
    iconColor: "#8BC34A",
    emoji: "🥜",
    desc: "Almonds, Cashews & more",
  },
  {
    label: "Seeds",
    icon: <SpaIcon />,
    iconColor: "#8BC34A",
    emoji: "🌱",
    desc: "Chia, Flax & Sunflower",
  },
  {
    label: "Dry Fruits",
    icon: <StarIcon />,
    iconColor: "#FFD700",
    emoji: "🍇",
    desc: "Dates, Figs & Raisins",
  },
  {
    label: "Premium",
    icon: <FitnessCenterIcon />,
    iconColor: "#8BC34A",
    emoji: "✨",
    desc: "Makhana, Saffron & more",
  },
  {
    label: "Gift Boxes",
    icon: <CardGiftcardIcon />,
    iconColor: "#d4a56a",
    emoji: "🎁",
    desc: "Curated gift hampers",
  },
  {
    label: "Sweets",
    icon: <CakeIcon />,
    iconColor: "#8BC34A",
    emoji: "🍬",
    desc: "Laddus & Badam sweets",
  },
  {
    label: "Combo Offer",
    icon: <LocalOfferIcon />,
    iconColor: "#FF7043",
    emoji: "🔥",
    desc: "Best value bundles",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const IconModel: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);
  const [showOrder, setShowOrder] = useState(false);
  const [initialCategory, setInitialCategory] = useState("All");

  const handleCategoryClick = (index: number, label: string) => {
    setActive(index);
    const filter = CATEGORY_FILTER_MAP[label] ?? "All";
    setInitialCategory(filter);
    setShowOrder(true);
  };

  const handleShopAll = () => {
    setActive(null);
    setInitialCategory("All");
    setShowOrder(true);
  };

  return (
    <>
      <Box
        sx={{
          background: "linear-gradient(180deg,#0b0f06 0%,#0c1007 100%)",
          borderBottom: "1px solid rgba(139,195,74,0.12)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top green accent line */}
        <Box sx={{
          height: 2,
          background: "linear-gradient(90deg,transparent,#8BC34A 30%,#c5e27a 50%,#8BC34A 70%,transparent)",
        }} />

        {/* Glow top-center */}
        <Box sx={{
          position: "absolute", top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: 700, height: 80,
          background: "radial-gradient(ellipse,rgba(139,195,74,0.07) 0%,transparent 70%)",
          pointerEvents: "none",
        }} />

        <Container maxWidth="lg">
          <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0, md: 0.5 },
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            px: { xs: 0.5, md: 0 },
            py: { xs: 0.5, md: 0 },
          }}>

            {/* ── Category items ──────────────────────────────────────── */}
            {categories.map((item, index) => {
              const isActive = active === index;
              const isGift = item.label === "Gift Boxes";
              const isCombo = item.label === "Combo Offer";
              const accentColor = isGift
                ? "linear-gradient(135deg,#d4a56a,#a0732a)"
                : isCombo
                ? "linear-gradient(135deg,#FF7043,#BF360C)"
                : "linear-gradient(135deg,#8BC34A,#5a8f1f)";

              return (
                <React.Fragment key={index}>
                  <CategoryItem
                    active={isActive}
                    onClick={() => handleCategoryClick(index, item.label)}
                  >
                    <IconCircle
                      active={isActive}
                      color={isActive ? accentColor : undefined}
                      className="icon-circle"
                    >
                      {/* Active ripple ring */}
                      {isActive && <RippleRing />}

                      {React.cloneElement(item.icon as React.ReactElement, {
                        sx: {
                          fontSize: "1.25rem",
                          color: isActive
                            ? "#fff"
                            : item.iconColor === "#FFD700"
                            ? "#FFD700"
                            : item.iconColor === "#d4a56a"
                            ? "#d4a56a"
                            : item.iconColor === "#FF7043"
                            ? "#FF7043"
                            : "rgba(255,255,255,0.5)",
                          transition: "color 0.25s ease",
                          position: "relative",
                          zIndex: 1,
                        },
                      })}
                    </IconCircle>

                    <LabelText active={isActive} className="label-text">
                      {item.emoji} {item.label}
                    </LabelText>

                    {/* Tooltip desc on hover — desktop only */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: -30,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(12,16,7,0.95)",
                        border: "1px solid rgba(139,195,74,0.2)",
                        borderRadius: 6,
                        px: 1.2,
                        py: 0.4,
                        whiteSpace: "nowrap",
                        fontSize: "0.6rem",
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "'DM Sans',sans-serif",
                        pointerEvents: "none",
                        opacity: 0,
                        transition: "opacity 0.2s ease",
                        zIndex: 20,
                        display: { xs: "none", md: "block" },
                      }}
                      className="tooltip-desc"
                    >
                      {item.desc}
                    </Box>
                  </CategoryItem>

                  {index < categories.length - 1 && <Divider />}
                </React.Fragment>
              );
            })}

            {/* ── Spacer ──────────────────────────────────────────────── */}
            <Box sx={{ flex: 1, display: { xs: "none", md: "block" }, minWidth: 8 }} />

            {/* ── SHOP NOW pill ────────────────────────────────────────── */}
            <Box
              component={ShopNowPill}
              onClick={handleShopAll}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <ShoppingCartIcon sx={{ fontSize: "0.95rem" }} />
              Shop Now
            </Box>
          </Box>

          {/* Mobile "Shop Now" full-width bar */}
          <Box
            onClick={handleShopAll}
            sx={{
              display: { xs: "flex", sm: "none" },
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              background: "linear-gradient(135deg,#8BC34A,#5a8f1f)",
              color: "#0c1007",
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 900, fontSize: "0.8rem",
              letterSpacing: "1.2px", textTransform: "uppercase",
              py: 1.2, cursor: "pointer",
              borderTop: "1px solid rgba(139,195,74,0.2)",
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: "1rem" }} />
            Shop Now — All Products
          </Box>
        </Container>

        {/* Bottom accent line */}
        <Box sx={{
          height: 2,
          background: "linear-gradient(90deg,transparent,rgba(139,195,74,0.15) 30%,rgba(139,195,74,0.25) 50%,rgba(139,195,74,0.15) 70%,transparent)",
        }} />
      </Box>

      {/* ── OrderPage overlay — opens pre-filtered ───────────────────────── */}
      {showOrder && (
        <OrderPage
          initialCategory={initialCategory}
          onClose={() => {
            setShowOrder(false);
            setActive(null);
          }}
        />
      )}
    </>
  );
};

export default IconModel;
