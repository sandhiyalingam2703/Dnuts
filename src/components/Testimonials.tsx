import React from "react";
import { Box, Container, Grid, Typography, Rating, Paper } from "@mui/material";

const reviews = [
  {
    title: "Totally Amazing!",
    rating: 5,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    title: "Fantastic Training!",
    rating: 5,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    title: "Great benefits from!",
    rating: 5,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
];

const Testimonials: React.FC = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: "#0e1208" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {reviews.map((review, index) => (
            <Grid item key={index} xs={12} md={4}>
              <Box
                sx={{
                  p: 4,
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(139, 195, 74, 0.15)",
                  borderRadius: 4,
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    borderColor: "#8bc34a"
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic", 
                    mb: 1, 
                    fontWeight: 700,
                    color: "#fff"
                  }}
                >
                    ' {review.title} '
                </Typography>
                <Rating value={review.rating} readOnly sx={{ mb: 2, color: "#8bc34a" }} />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#B8AF9F", 
                    lineHeight: 1.8 
                  }}
                >
                  {review.content}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
