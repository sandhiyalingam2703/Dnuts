import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Container, Dialog, DialogContent, IconButton } from "@mui/material";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";

// Import images
import almondImg from "../assets/717AyYFdJzL._SL1400-removebg-preview.png";
import cashewImg from "../assets/cashew-removebg-preview.png";
import pistachioImg from "../asset2/Pistachio-Single-New-removebg-preview.png";
import blackRaisinImg from "../assets/single-raisin-isolated-on-white-260nw-2342152475-removebg-preview.png";
import yellowRaisinImg from "../assets/single-raisin-isolated-white-background-52741118-removebg-preview.png";
import datesImg from "../assets/delicious-single-date-fruit-isolated-png-removebg-preview.png";
import walnutImg from "../assets/walnut.jpg__-removebg-preview.png";
import blueberryImg from "../assets/bad-single-dehydrated-dried-blueberry-260nw-2616337075-removebg-preview.png";
import cookiesImg from "../assets/coconut-cookies-removebg-preview.png";
import ladduImg from "../assets/dry-fruits-laddu-1-removebg-preview.png";
import makhanaImg from "../assets/dry-whole-makhana-500x500-removebg-preview.png";
import chikkiImg from "../assets/sattur-black-sesame-chikki-removebg-preview.png";
import cranberriesImg from "../assets/two-tasty-dried-cranberries-isolated-600nw-2430320429-removebg-preview (1).png";

// ---------- Keyframes ----------
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const handSwipe = keyframes`
  0%   { transform: translateX(0px) rotate(-10deg); opacity: 0; }
  20%  { opacity: 1; }
  50%  { transform: translateX(40px) rotate(-10deg); opacity: 1; }
  70%  { transform: translateX(40px) rotate(-10deg); opacity: 0; }
  100% { transform: translateX(0px) rotate(-10deg); opacity: 0; }
`;

const handPulse = keyframes`
  0%, 100% { transform: scale(1) rotate(-10deg); }
  50%       { transform: scale(1.15) rotate(-10deg); }
`;

const fadeInScale = keyframes`
  from { opacity: 0; transform: scale(0.85) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
`;

const ripple = keyframes`
  0%   { transform: scale(0); opacity: 0.6; }
  100% { transform: scale(2.5); opacity: 0; }
`;

// ---------- Styled ----------
const MarqueeBox = styled(Box)`
  display: flex;
  width: max-content;
  animation: ${scroll} 45s linear infinite;
  &.paused { animation-play-state: paused; }
`;

// ---------- Data ----------
const products = [
  { name: "Almond",          img: almondImg,       bgColor: "#a67c52", accent: "#d4a56a", tag: "Rich in Vitamin E",  desc: "Premium sun-dried almonds packed with healthy fats, fibre and Vitamin E. A perfect daily snack." },
  { name: "Cashew",          img: cashewImg,        bgColor: "#cbb185", accent: "#e8c99a", tag: "Heart Healthy",      desc: "Creamy whole cashews sourced from the finest farms — rich in magnesium and heart-friendly fats." },
  { name: "Pistachio",       img: pistachioImg,     bgColor: "#4a6741", accent: "#7aab6e", tag: "Antioxidant Rich",   desc: "Vibrant green pistachios loaded with antioxidants, protein and a satisfying crunch." },
  { name: "Raisins Black",   img: blackRaisinImg,   bgColor: "#3a2a3e", accent: "#7b5ea7", tag: "Natural Sweetness",  desc: "Sun-ripened black raisins — naturally sweet, iron-rich and great for digestion." },
  { name: "Raisins Yellow",  img: yellowRaisinImg,  bgColor: "#7a5c2e", accent: "#d4a373", tag: "Energy Boost",       desc: "Golden raisins bursting with natural sugars and B-vitamins for an instant energy lift." },
  { name: "Dates",           img: datesImg,         bgColor: "#6b3220", accent: "#c4622d", tag: "High in Fiber",      desc: "Soft Medjool-style dates — nature's candy, high in fibre and minerals." },
  { name: "Walnut",          img: walnutImg,        bgColor: "#5c4a35", accent: "#9e7e5e", tag: "Brain Food",         desc: "Crunchy whole walnuts rich in Omega-3 fatty acids — the ultimate brain-boosting snack." },
  { name: "Blueberry",       img: blueberryImg,     bgColor: "#2d1b4e", accent: "#7b4fbb", tag: "Super Berry",        desc: "Freeze-dried blueberries with intense flavour and maximum antioxidant power." },
  { name: "Coconut Cookies", img: cookiesImg,       bgColor: "#4a3f35", accent: "#c4a882", tag: "Handcrafted",        desc: "Artisan coconut cookies made with real dry fruits — a wholesome indulgence." },
  { name: "Dry Fruit Laddu", img: ladduImg,         bgColor: "#5c3510", accent: "#bc6c25", tag: "Traditional",        desc: "Traditional laddus crafted with almonds, cashews and dates — zero refined sugar." },
  { name: "Makhana",         img: makhanaImg,       bgColor: "#3a3620", accent: "#a89c6a", tag: "Low Calorie",        desc: "Roasted fox nuts — light, crunchy and the perfect guilt-free munch." },
  { name: "Sesame Chikki",   img: chikkiImg,        bgColor: "#1e2810", accent: "#5a7a2a", tag: "Calcium Rich",       desc: "Classic sesame chikki made with jaggery — crunchy, sweet and rich in calcium." },
  { name: "Cranberries",     img: cranberriesImg,   bgColor: "#4a0e0e", accent: "#c0392b", tag: "Immunity Boost",     desc: "Dried cranberries with a tangy-sweet bite — packed with Vitamin C and antioxidants." },
];

// ---------- Modal ----------
const ProductModal = ({
  product, open, onClose,
}: {
  product: typeof products[0] | null;
  open: boolean;
  onClose: () => void;
}) => {
  if (!product) return null;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          background: `linear-gradient(160deg, ${product.bgColor}dd 0%, #0d0d0d 100%)`,
          border: `1px solid ${product.accent}44`,
          borderRadius: "24px",
          overflow: "hidden",
          animation: `${fadeInScale} 0.35s cubic-bezier(0.34,1.56,0.64,1)`,
        },
      }}
      BackdropProps={{ sx: { backdropFilter: "blur(8px)", backgroundColor: "rgba(0,0,0,0.75)" } }}
    >
      <DialogContent sx={{ p: 0, position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 12, right: 12, color: "#fff", zIndex: 10,
                background: "rgba(255,255,255,0.08)", "&:hover": { background: "rgba(255,255,255,0.16)" } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* Top glow stripe */}
        <Box sx={{ height: "2px", background: `linear-gradient(90deg, transparent, ${product.accent}, transparent)` }} />

        <Box sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          {/* Tag */}
          <Box sx={{ background: `${product.accent}22`, border: `1px solid ${product.accent}55`,
                     borderRadius: "20px", px: 2, py: 0.5 }}>
            <Typography sx={{ fontSize: "0.65rem", color: product.accent, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
              {product.tag}
            </Typography>
          </Box>

          {/* Image */}
          <Box
            component="img"
            src={product.img}
            alt={product.name}
            sx={{ width: "55%", height: 160, objectFit: "contain",
                  filter: `drop-shadow(0 16px 32px ${product.accent}66)` }}
          />

          {/* Name */}
          <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "1.4rem", letterSpacing: 3,
                            textTransform: "uppercase", fontFamily: "'Playfair Display', serif",
                            textAlign: "center", lineHeight: 1.2 }}>
            {product.name}
          </Typography>

          {/* Divider */}
          <Box sx={{ width: 50, height: "1px", background: `linear-gradient(90deg, transparent, ${product.accent}, transparent)` }} />

          {/* Description */}
          <Typography sx={{ color: "#aaa", fontSize: "0.88rem", textAlign: "center", lineHeight: 1.7, px: 1 }}>
            {product.desc}
          </Typography>

          {/* Label */}
          <Typography sx={{ color: product.accent, fontSize: "0.65rem", letterSpacing: 2,
                            textTransform: "uppercase", opacity: 0.7, mt: 1 }}>
            ✦ Premium Quality ✦
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// ---------- Card ----------
const ProductCard = ({
  product, onClick,
}: {
  product: typeof products[0];
  onClick: () => void;
}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
    onClick();
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        width: 220,
        height: 300,
        m: "0 12px",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        background: `linear-gradient(160deg, ${product.bgColor}cc 0%, #0a0a0a 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        py: 3,
        px: 2,
        cursor: "pointer",
        border: `1px solid ${product.accent}33`,
        transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
        flexShrink: 0,
        userSelect: "none",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "20px",
          background: `radial-gradient(ellipse at 50% 0%, ${product.accent}22 0%, transparent 70%)`,
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${product.accent}88, transparent)`,
        },
        "&:hover": {
          transform: "translateY(-12px) scale(1.03)",
          border: `1px solid ${product.accent}66`,
          boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 40px ${product.accent}22`,
        },
        "&:hover .product-img": {
          transform: "scale(1.15) translateY(-6px)",
          filter: `drop-shadow(0 20px 30px ${product.accent}66)`,
        },
        "&:hover .float-tag": { opacity: 1, transform: "translateY(0)" },
        "&:active": { transform: "scale(0.97)" },
      }}
    >
      {/* Ripple on click */}
      {clicked && (
        <Box sx={{
          position: "absolute", top: "50%", left: "50%",
          width: 80, height: 80,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `${product.accent}44`,
          animation: `${ripple} 0.6s ease-out forwards`,
          pointerEvents: "none",
          zIndex: 10,
        }} />
      )}

      {/* Hover tag */}
      <Box className="float-tag" sx={{
        opacity: 0, transform: "translateY(-6px)", transition: "all 0.3s ease",
        background: `${product.accent}22`, border: `1px solid ${product.accent}55`,
        borderRadius: "20px", px: 1.5, py: 0.4, alignSelf: "flex-end", zIndex: 2,
      }}>
        <Typography sx={{ fontSize: "0.6rem", color: product.accent, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
          {product.tag}
        </Typography>
      </Box>

      {/* Image */}
      <Box className="product-img" component="img" src={product.img} alt={product.name}
        sx={{
          width: "75%", height: "160px", objectFit: "contain",
          transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
          zIndex: 1,
        }}
      />

      {/* Bottom */}
      <Box sx={{ textAlign: "center", zIndex: 2, width: "100%" }}>
        <Box sx={{
          width: "40px", height: "2px", mx: "auto", mb: 1, borderRadius: "2px",
          background: `linear-gradient(90deg, transparent, ${product.accent}, transparent)`,
        }} />
        <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                          letterSpacing: "2px", textTransform: "uppercase",
                          textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
          {product.name}
        </Typography>
        <Typography sx={{ color: product.accent, fontSize: "0.65rem", letterSpacing: "1px", mt: 0.3, opacity: 0.8 }}>
          TAP TO EXPLORE
        </Typography>
      </Box>
    </Box>
  );
};

// ---------- Main Component ----------
const ProductShowcase: React.FC = () => {
  const [selected, setSelected]     = useState<typeof products[0] | null>(null);
  const [modalOpen, setModalOpen]   = useState(false);
  const [paused, setPaused]         = useState(false);
  const [showHint, setShowHint]     = useState(true);
  const marqueeRef                  = useRef<HTMLDivElement>(null);

  // Hide swipe hint after 4s
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const handleCardClick = (product: typeof products[0]) => {
    setSelected(product);
    setModalOpen(true);
    setShowHint(false);
  };

  return (
    <Box sx={{ py: 10, backgroundColor: "#0a0a0a", overflow: "hidden", position: "relative" }}>

      {/* Ambient glow */}
      <Box sx={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "60%", height: "60%",
        background: "radial-gradient(ellipse, rgba(139,195,74,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <Container maxWidth="lg" sx={{ mb: 6, position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ color: "#8bc34a", fontSize: "0.75rem", letterSpacing: "4px",
                            textTransform: "uppercase", fontWeight: 600, mb: 1.5 }}>
            ✦ Handpicked & Sourced Naturally ✦
          </Typography>
          <Typography variant="h3" sx={{
            color: "#fff", fontWeight: 800, fontStyle: "italic",
            fontSize: { xs: "2rem", md: "3rem" },
            fontFamily: "'Playfair Display', serif", mb: 1.5, lineHeight: 1.2,
          }}>
            Our{" "}
            <Box component="span" sx={{
              background: "linear-gradient(90deg, #8bc34a, #aed581, #8bc34a)",
              backgroundSize: "200% auto", WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: `${shimmer} 3s linear infinite`,
            }}>
              Premium
            </Box>{" "}
            Selection
          </Typography>
          <Typography sx={{ color: "#666", fontSize: "0.95rem", letterSpacing: "1px" }}>
            Nature's finest, delivered to your door
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mt: 3 }}>
            <Box sx={{ width: 60, height: "1px", background: "linear-gradient(90deg, transparent, #8bc34a44)" }} />
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#8bc34a", opacity: 0.6 }} />
            <Box sx={{ width: 60, height: "1px", background: "linear-gradient(90deg, #8bc34a44, transparent)" }} />
          </Box>
        </Box>
      </Container>

      {/* Marquee */}
      <Box
        sx={{ display: "flex", width: "100%", position: "relative" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fades */}
        <Box sx={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
                   background: "linear-gradient(90deg, #0a0a0a, transparent)", pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
                   background: "linear-gradient(270deg, #0a0a0a, transparent)", pointerEvents: "none" }} />

        <MarqueeBox ref={marqueeRef} className={paused ? "paused" : ""}>
          {[...products, ...products].map((product, index) => (
            <ProductCard key={index} product={product} onClick={() => handleCardClick(product)} />
          ))}
        </MarqueeBox>

        {/* Swipe hint hand */}
        {showHint && (
          <Box sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            pointerEvents: "none",
          }}>
            <Box sx={{
              fontSize: "2rem",
              animation: `${handSwipe} 2s ease-in-out infinite`,
              display: "inline-block",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.8))",
            }}>
              👆
            </Box>
            <Typography sx={{
              color: "#8bc34a",
              fontSize: "0.65rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 600,
              opacity: 0.9,
              background: "rgba(0,0,0,0.6)",
              px: 1.5,
              py: 0.3,
              borderRadius: "10px",
              border: "1px solid #8bc34a33",
            }}>
              Tap a card to explore
            </Typography>
          </Box>
        )}
      </Box>

      {/* Stats */}
      <Container maxWidth="lg" sx={{ mt: 8, position: "relative", zIndex: 1 }}>
        <Box sx={{
          display: "flex", justifyContent: "center",
          gap: { xs: 4, md: 8 }, flexWrap: "wrap",
          borderTop: "1px solid #1a1a1a", pt: 5,
        }}>
          {[
            { value: "13+", label: "Premium Products" },
            { value: "100%", label: "Natural & Pure" },
            { value: "2020", label: "Est. Since" },
          ].map((stat) => (
            <Box key={stat.label} sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: "1.8rem", fontWeight: 800, color: "#8bc34a",
                                fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>
                {stat.value}
              </Typography>
              <Typography sx={{ color: "#555", fontSize: "0.7rem", letterSpacing: "2px",
                                textTransform: "uppercase", mt: 0.5 }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Modal */}
      <ProductModal product={selected} open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  );
};

export default ProductShowcase;
