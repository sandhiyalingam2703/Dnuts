# Dnuts - Ecommerce Store with Admin Panel & WhatsApp Orders 🍩

**GitHub:** https://sandhiyalingam2703.github.io/Dnuts/

---

## 🚀 Project Overview
Dnuts is a responsive ecommerce web application built with React.js. It simulates a real-world online donut store with customer ordering, admin management, and WhatsApp-based order processing. Built as a frontend-only project to demonstrate React concepts, state management, and third-party integrations without backend cost.

---

## ✨ Key Features

### **Customer Features**
- **Product Catalog:** Browse donuts with image, name, price, and ratings fetched from LocalStorage
- **Shopping Cart:** Add/Remove items, update quantity, real-time total calculation
- **Cart Persistence:** Cart data saved to LocalStorage - items remain even after page refresh/close
- **Responsive UI:** Mobile-first design built with Material-UI (MUI v5) components
- **Order Flow:** Clean checkout page with order summary before placing order

### **Business Feature: WhatsApp Order Integration 📱**
- **Zero-Cost Order Management:** On "Place Order", user is auto-redirected to WhatsApp with pre-filled order details
- **Auto-Generated Message:** Sends product list, quantity, price, total amount to owner's WhatsApp number
- **Tech Used:** `window.open('https://wa.me/91XXXXXXXXXX?text=...')` with `encodeURIComponent` for formatting
- **User Experience:** After redirect, confirmation screen shows "Order Placed! Owner will call you shortly"
- **Why This Matters:** Solves real problem for small businesses - no backend/payment gateway needed

### **Admin Features**
- **Hidden Admin Panel:** Route `/admin` - not visible in main UI, accessible only to developer/owner
- **Real-Time CRUD:** Update product price, image URL, name, description from admin dashboard
- **Instant Sync:** Changes in Admin Panel reflect immediately on customer side via LocalStorage
- **No Database Needed:** Uses LocalStorage as pseudo-DB for demo purposes

---

## 🛠️ Tech Stack

| Category | Technologies |
| --- | --- |
| **Frontend** | React.js, JavaScript ES6, HTML5, CSS3 |
| **UI Library** | Material-UI (MUI v5) - AppBar, Card, Grid, Button, Dialog, TextField, Snackbar |
| **State Management** | React Context API + useReducer + useState + useEffect |
| **Data Persistence** | Browser LocalStorage with JSON.stringify/parse |
| **Routing** | React Router v6 |
| **Integration** | WhatsApp Click-to-Chat API |
| **Deployment** | Vercel |
| **Version Control** | Git + GitHub |

---

