import { useState, useEffect } from "react";
import * as db from "../utils/db";

// ─── Default product list (fallback if no admin data saved) ───────────────────
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
import gift1Img   from "../oderassets/gift2about.jpg.jpeg";
import gift2Img   from "../oderassets/giftabout.jpg.jpeg";
import gift3Img   from "../oderassets/goft2.jpg.jpeg";
import vegChatImg from "../oderassets/vegetablechat.jpg.jpeg";
import strawImg   from "../oderassets/straw.jpg.jpeg";
import badamImg   from "../oderassets/badam.jpg.jpeg";
import wallnutImg from "../oderassets/wallnut.jpg.jpeg";

export interface ManagedProduct {
  id: string;
  name: string;
  image: string;
  rate: number;
  quantity: string;
  category: string;
  unit: string;
}

const STORAGE_KEY = "dnuts_admin_products";

export const DEFAULT_PRODUCTS: ManagedProduct[] = [
  // Nuts
  { id: "1",  name: "Almonds",           image: almondImg,       rate: 320,  quantity: "250g",   category: "Nuts",       unit: "g" },
  { id: "2",  name: "Cashews",           image: cashewImg,       rate: 280,  quantity: "250g",   category: "Nuts",       unit: "g" },
  { id: "3",  name: "Pistachios",        image: pistachioImg,    rate: 360,  quantity: "200g",   category: "Nuts",       unit: "g" },
  { id: "4",  name: "Walnuts",           image: walnutImg,       rate: 340,  quantity: "250g",   category: "Nuts",       unit: "g" },
  // Dry Fruits
  { id: "5",  name: "Black Raisins",     image: blackRaisinImg,  rate: 130,  quantity: "250g",   category: "Dry Fruits", unit: "g" },
  { id: "6",  name: "Yellow Raisins",    image: yellowRaisinImg, rate: 120,  quantity: "250g",   category: "Dry Fruits", unit: "g" },
  { id: "7",  name: "Dates",             image: datesImg,        rate: 180,  quantity: "500g",   category: "Dry Fruits", unit: "g" },
  // Berries
  { id: "8",  name: "Blueberries",       image: blueberryImg,    rate: 290,  quantity: "150g",   category: "Berries",    unit: "g" },
  { id: "9",  name: "Cranberries",       image: cranberriesImg,  rate: 260,  quantity: "150g",   category: "Berries",    unit: "g" },
  // Snacks
  { id: "10", name: "Makhana",           image: makhanaImg,      rate: 210,  quantity: "200g",   category: "Snacks",     unit: "g" },
  { id: "11", name: "Chikki",            image: chikkiImg,       rate: 90,   quantity: "200g",   category: "Snacks",     unit: "g" },
  { id: "12", name: "Coconut Cookies",   image: cookiesImg,      rate: 110,  quantity: "150g",   category: "Snacks",     unit: "g" },
  { id: "13", name: "Vegetable Chat",    image: vegChatImg,      rate: 130,  quantity: "200g",   category: "Snacks",     unit: "g" },
  { id: "14", name: "Straw Snack",       image: strawImg,        rate: 100,  quantity: "150g",   category: "Snacks",     unit: "g" },
  // Sweets
  { id: "15", name: "Dry Fruits Laddu",  image: ladduImg,        rate: 240,  quantity: "300g",   category: "Sweets",     unit: "g" },
  { id: "16", name: "Badam Sweet",       image: badamImg,        rate: 260,  quantity: "250g",   category: "Sweets",     unit: "g" },
  { id: "17", name: "Walnut Sweet",      image: wallnutImg,      rate: 280,  quantity: "250g",   category: "Sweets",     unit: "g" },
  // Gift Boxes
  { id: "18", name: "Gift Box Classic",  image: gift2Img,        rate: 699,  quantity: "1 Box",  category: "Gift Boxes", unit: "box" },
  { id: "19", name: "Gift Box Premium",  image: gift1Img,        rate: 999,  quantity: "1 Box",  category: "Gift Boxes", unit: "box" },
  { id: "20", name: "Gift Box Deluxe",   image: gift3Img,        rate: 1299, quantity: "1 Box",  category: "Gift Boxes", unit: "box" },
];

// ─── Hook — shared product state backed by IndexedDB ───────────────────────
export function useProducts() {
  const [products, setProducts] = useState<ManagedProduct[]>(DEFAULT_PRODUCTS);

  useEffect(() => {
    const load = async () => {
      try {
        // Try IndexedDB first
        let stored = await db.getItem<ManagedProduct[]>(STORAGE_KEY);
        
        // Migration from localStorage if IndexedDB is empty
        if (!stored) {
          const legacy = localStorage.getItem(STORAGE_KEY);
          if (legacy) {
            stored = JSON.parse(legacy);
            await db.setItem(STORAGE_KEY, stored);
            // Optional: localStorage.removeItem(STORAGE_KEY);
          }
        }

        if (stored) setProducts(stored);
      } catch (err) {
        console.error("Failed to load products from DB:", err);
      }
    };
    load();
  }, []);

  // Persist every change to IndexedDB
  const saveProducts = async (updated: ManagedProduct[]) => {
    setProducts(updated);
    try {
      await db.setItem(STORAGE_KEY, updated);
    } catch (err) {
      console.error("Failed to save products to DB:", err);
      alert("❌ Database error! Storage might be full or restricted.");
    }
  };

  // Reset to defaults
  const resetProducts = () => saveProducts(DEFAULT_PRODUCTS);

  return { products, saveProducts, resetProducts };
}
