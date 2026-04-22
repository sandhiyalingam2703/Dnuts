import React from "react";
import { Box, Container, Grid, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";

const products = [
  {
    id: 1,
    name: "Original Granola",
    weight: "350 grams",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    price: "$8.75",
    image: "https://via.placeholder.com/200x250?text=Granola+Bag+1",
  },
  {
    id: 2,
    name: "Original Granola",
    weight: "550 grams",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    price: "$12.50",
    image: "https://via.placeholder.com/200x250?text=Granola+Bag+2",
  },
];

const ProductSection: React.FC = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: "#0e1208", borderTop: "1px solid rgba(139, 195, 74, 0.1)" }}>
      <Container maxWidth="lg">
        {/* Product Highlight Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900, 
              mb: 2, 
              color: "#fff" 
            }}
          >
            More Than Just a Snack
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: "'DM Sans', sans-serif",
              color: "#B8AF9F", 
              maxWidth: "700px", 
              mx: "auto" 
            }}
          >
            Whether it’s almonds, cashews, or pistachios — each nut is a powerhouse of nutrition, 
            crafted by nature and delivered fresh to you.
          </Typography>
        </Box>

  
      </Container>
    </Box>
  );
};

export default ProductSection;
