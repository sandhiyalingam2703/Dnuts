import React, { useState } from "react";
import Header from "./components/Header";
import IconModel from "./components/IconModel";
import Banner from "./components/Banner";
import CategoryCards from "./components/CategoryCards";
import ProductShowcase from "./components/ProductShowcase";
import AboutSection from "./components/AboutSection";
import ProductSection from "./components/ProductSection";
import HealthBenefits from "./components/HealthBenefits";
import Testimonials from "./components/Testimonials";
import ClosingSection from "./components/ClosingSection";
import Footer from "./components/Footer";
import { CssBaseline, Box } from "@mui/material";
import KeyHealthBenefits from "./components/KeyHealthBenefits";
import OrderPage from "./components/OrderPage";
import AdminPanel, { Product } from "./components/AdminPanel";

const DEFAULT_PRODUCTS: Product[] = [
  { id: "1", name: "Premium Mixed Nuts", quantity: "500g", rate: 450, image: "", category: "Nuts", unit: "g" },
  { id: "2", name: "Roasted Almonds", quantity: "250g", rate: 280, image: "", category: "Nuts", unit: "g" },
];

function App() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [showOrderPage, setShowOrderPage] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <Box>
      <CssBaseline />
      <Header onShopNow={() => setShowOrderPage(true)} />
      <Box id="section-home">
        <IconModel />
        <Banner />
      </Box>
      <Box id="section-products">
        <ProductShowcase />
      </Box>
      <CategoryCards />
      <Box id="section-benefits">
        <KeyHealthBenefits />
      </Box>
      <Box id="section-about">
        <AboutSection />
      </Box>
      <ProductSection />
      <HealthBenefits />
      <Testimonials />
      <Box id="section-contact">
        <Footer onAdminClick={() => setShowAdmin(true)} />
      </Box>

      {showOrderPage && (
        <OrderPage
          onClose={() => setShowOrderPage(false)}
        />
      )}

      {showAdmin && (
        <AdminPanel
          products={products}
          onSave={(updated) => setProducts(updated)}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </Box>
  );
}

export default App;