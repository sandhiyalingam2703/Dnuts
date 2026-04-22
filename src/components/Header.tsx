import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  useScrollTrigger,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import dnutsLogo from "../oderassets/dnutslogo.jpg.png";

// ─── Keyframes ────────────────────────────────────────────────────────────────
const shimmerGreen = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

const underlineGrow = keyframes`
  from { width: 0; }
  to   { width: 100%; }
`;

// ─── Styled Components ────────────────────────────────────────────────────────

// Nav link with animated green underline on hover
const NavLink = styled(Button)`
  font-family: "DM Sans", sans-serif;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
  text-transform: none;
  font-size: 0.92rem;
  letter-spacing: 0.3px;
  padding: 6px 4px;
  min-width: auto;
  position: relative;
  border-radius: 0;
  background: transparent !important;

  &::after {
    content: "";
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 0;
    height: 2px;
    background: #8bc34a;
    border-radius: 2px;
    transition: width 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    color: #8bc34a;
    &::after {
      width: 100%;
    }
  }
`;

// Logo shimmer text
const LogoText = styled(Typography)`
  font-family: "Playfair Display", serif;
  font-weight: 900;
  letter-spacing: 3px;
  cursor: pointer;
  background: linear-gradient(
    90deg,
    #8bc34a 0%,
    #c5e27a 35%,
    #8bc34a 55%,
    #5a8f1f 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmerGreen} 4s linear infinite;
  transition: letter-spacing 0.3s ease;

  &:hover {
    letter-spacing: 5px;
  }
`;

// Shop Now CTA
const ShopNowBtn = styled(Button)`
  background: linear-gradient(135deg, #8bc34a 0%, #6aaa1f 100%);
  color: #0c1007;
  font-family: "DM Sans", sans-serif;
  text-transform: none;
  font-weight: 800;
  font-size: 0.88rem;
  letter-spacing: 0.8px;
  border-radius: 24px;
  padding: 8px 22px;
  box-shadow: 0 4px 14px rgba(139, 195, 74, 0.35);
  position: relative;
  overflow: hidden;
  transition: all 0.25s ease !important;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.22),
      transparent
    );
    transition: left 0.45s ease;
  }

  &:hover::before {
    left: 150%;
  }

  &:hover {
    background: linear-gradient(135deg, #9ccc65 0%, #7ab828 100%);
    box-shadow: 0 8px 24px rgba(139, 195, 74, 0.55);
    transform: translateY(-2px);
    color: #0c1007;
  }

  &:active {
    transform: translateY(0);
  }
`;

// Cart icon button with green glow on hover
const GreenIconBtn = styled(IconButton)`
  color: rgba(255, 255, 255, 0.7) !important;
  border-radius: 10px !important;
  transition: all 0.22s ease !important;

  &:hover {
    color: #8bc34a !important;
    background: rgba(139, 195, 74, 0.1) !important;
  }
`;

// Cart badge
const CartBadge = styled(Box)`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #8bc34a;
  box-shadow: 0 0 6px rgba(139, 195, 74, 0.8);
`;

// Drawer mobile nav item
const MobileNavItem = styled(ListItemButton)`
  border-radius: 10px !important;
  margin: 2px 8px !important;
  transition: all 0.2s ease !important;

  &:hover {
    background: rgba(139, 195, 74, 0.1) !important;

    .MuiListItemText-primary {
      color: #8bc34a !important;
    }
  }
`;

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Home",     id: "section-home" },
  { label: "Products",   id: "section-products" },
  { label: "Benefits",   id: "section-benefits" },
  { label: "About",      id: "section-about" },
  { label: "Contact",    id: "section-contact" },
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface HeaderProps {
  onShopNow?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
const Header: React.FC<HeaderProps> = ({ onShopNow }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setDrawerOpen(false);
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: trigger
            ? "rgba(10, 14, 6, 0.97)"
            : "rgba(12, 16, 7, 0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: trigger
            ? "0 2px 24px rgba(0,0,0,0.55), 0 1px 0 rgba(139,195,74,0.18)"
            : "none",
          borderBottom: trigger
            ? "1px solid rgba(139,195,74,0.2)"
            : "1px solid rgba(139,195,74,0.1)",
          transition: "all 0.35s ease",
        }}
      >
        {/* Top micro-bar accent */}
        <Box
          sx={{
            height: "2.5px",
            background:
              "linear-gradient(90deg, transparent, #8BC34A 30%, #c5e27a 50%, #8BC34A 70%, transparent)",
          }}
        />

        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              height: trigger ? 62 : 76,
              transition: "height 0.3s ease",
            }}
          >
            {/* ── Logo ──────────────────────────────────────────────────── */}
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, cursor: "pointer" }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {/* Logo Image */}
              <Box
                component="img"
                src={dnutsLogo}
                alt="DNUTS Logo"
                sx={{
                  width: { xs: 40, md: 48 },
                  height: { xs: 40, md: 48 },
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                  flexShrink: 0,
                  border: "2px solid rgba(139,195,74,0.3)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />

              <LogoText variant="h5">
                DNUTS
              </LogoText>

              {/* Tagline — desktop only */}
              <Box
                sx={{
                  display: { xs: "none", lg: "flex" },
                  flexDirection: "column",
                  ml: 0.5,
                  borderLeft: "1px solid rgba(139,195,74,0.25)",
                  pl: 1.5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.55rem",
                    color: "rgba(139,195,74,0.7)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                  }}
                >
                  Premium
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.55rem",
                    color: "rgba(139,195,74,0.45)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                  }}
                >
                  Dry Fruits
                </Typography>
              </Box>
            </Box>

            {/* ── Desktop Nav ───────────────────────────────────────────── */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 3.5,
                alignItems: "center",
              }}
            >
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.id} disableRipple onClick={() => scrollTo(item.id)}>
                  {item.label}
                </NavLink>
              ))}
            </Box>

            {/* ── Actions ───────────────────────────────────────────────── */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.5, sm: 1 },
              }}
            >
              {/* Search */}
              <GreenIconBtn
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
                size="small"
              >
                <SearchIcon fontSize="small" />
              </GreenIconBtn>

              {/* Cart */}
              <GreenIconBtn size="small" sx={{ position: "relative" }}>
                <ShoppingCartIcon fontSize="small" />
                <CartBadge />
              </GreenIconBtn>

              {/* Shop Now — desktop */}
              <ShopNowBtn
                sx={{ display: { xs: "none", md: "inline-flex" }, ml: 0.5 }}
                onClick={onShopNow}
              >
                Shop Now
              </ShopNowBtn>

              {/* Hamburger — mobile */}
              <GreenIconBtn
                size="small"
                sx={{ display: { xs: "inline-flex", md: "none" }, ml: 0.5 }}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon fontSize="small" />
              </GreenIconBtn>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ── Mobile Drawer ─────────────────────────────────────────────────── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: "#0c1007",
            borderLeft: "1px solid rgba(139,195,74,0.18)",
          },
        }}
      >
        {/* Drawer header */}
        <Box
          sx={{
            px: 2,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(139,195,74,0.12)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              component="img"
              src={dnutsLogo}
              alt="DNUTS Logo"
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid rgba(139,195,74,0.3)",
              }}
            />
            <Typography
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "1.15rem",
                color: "#8BC34A",
                letterSpacing: 2,
              }}
            >
              DNUTS
            </Typography>
          </Box>

          <IconButton
            onClick={() => setDrawerOpen(false)}
            size="small"
            sx={{ color: "rgba(255,255,255,0.5)", "&:hover": { color: "#8BC34A" } }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Nav items */}
        <List sx={{ pt: 2 }}>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.id} disablePadding>
              <MobileNavItem onClick={() => scrollTo(item.id)}>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    color: "rgba(255,255,255,0.75)",
                  }}
                />
              </MobileNavItem>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: "rgba(139,195,74,0.1)", mx: 2, my: 1 }} />

        {/* Mobile CTA */}
        <Box sx={{ px: 2, pb: 3, pt: 1 }}>
          <Button
            fullWidth
            onClick={() => { onShopNow?.(); setDrawerOpen(false); }}
            sx={{
              background: "linear-gradient(135deg, #8BC34A, #6aaa1f)",
              color: "#0c1007",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 800,
              fontSize: "0.9rem",
              textTransform: "none",
              borderRadius: "12px",
              py: 1.3,
              boxShadow: "0 6px 20px rgba(139,195,74,0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #9CCC65, #7ab828)",
              },
            }}
          >
            🛒 Shop Now
          </Button>

          {/* Social / info strip */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography
              sx={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem",
                color: "rgba(139,195,74,0.4)",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              100% Natural · Farm Sourced
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
