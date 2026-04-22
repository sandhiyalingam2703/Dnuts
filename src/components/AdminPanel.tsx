import React, { useState } from "react";
import { ManagedProduct } from "./useProducts";
import PriceEditor from "./PriceEditor";

// ─── Re-export so other files can import Product from here too ────────────────
export type { ManagedProduct as Product };

interface AdminPanelProps {
  onClose: () => void;
  products: ManagedProduct[];
  onSave: (products: ManagedProduct[]) => void;
}

const ADMIN_USER = "dnuts";
const ADMIN_PASS = "dnuts2024";

const styles: Record<string, React.CSSProperties> = {
  overlay: { position:"fixed", inset:0, background:"rgba(10,5,2,0.85)", backdropFilter:"blur(6px)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans','Segoe UI',sans-serif" },
  loginCard: { background:"#1A0A02", border:"1px solid #5C2504", borderRadius:16, padding:"40px 36px", width:360, textAlign:"center", boxShadow:"0 24px 80px rgba(92,37,4,0.5)" },
  lockIcon: { fontSize:40, marginBottom:12 },
  loginTitle: { fontSize:"1.3rem", fontWeight:700, color:"#E87B10", marginBottom:6, fontFamily:"'Playfair Display',serif" },
  loginSub: { fontSize:"0.82rem", color:"#9C6030", marginBottom:24 },
  input: { width:"100%", background:"#2A1005", border:"1px solid #5C2504", borderRadius:8, padding:"10px 14px", color:"#FFF8F0", fontSize:"0.9rem", marginBottom:12, outline:"none", boxSizing:"border-box" },
  loginBtn: { width:"100%", background:"linear-gradient(135deg,#E87B10,#C45E08)", color:"#FFF8F0", border:"none", borderRadius:8, padding:"11px 0", fontSize:"0.95rem", fontWeight:700, cursor:"pointer", marginTop:4, letterSpacing:"0.5px" },
  errorMsg: { color:"#FF6B6B", fontSize:"0.8rem", marginTop:8 },
  adminPanel: { position:"fixed", inset:0, background:"#0F0602", zIndex:9999, display:"flex", flexDirection:"column", fontFamily:"'DM Sans','Segoe UI',sans-serif", overflowY:"auto" },
  adminHeader: { background:"#1A0A02", borderBottom:"1px solid #5C2504", padding:"16px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:10 },
  adminTitle: { fontSize:"1.2rem", fontWeight:700, color:"#E87B10", fontFamily:"'Playfair Display',serif", display:"flex", alignItems:"center", gap:10 },
  closeBtn: { background:"#2A1005", border:"1px solid #5C2504", borderRadius:8, color:"#FFF8F0", padding:"7px 16px", cursor:"pointer", fontSize:"0.85rem" },
  adminBody: { padding:"24px 28px", maxWidth:1100, width:"100%", margin:"0 auto", boxSizing:"border-box" },
  sectionTitle: { fontSize:"1rem", fontWeight:700, color:"#E87B10", marginBottom:16, marginTop:28, borderBottom:"1px solid #2A1005", paddingBottom:8 },
  productGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:16 },
  productCard: { background:"#1A0A02", border:"1px solid #2A1005", borderRadius:12, padding:16, display:"flex", flexDirection:"column", gap:10 },
  cardHeader: { display:"flex", alignItems:"center", gap:12 },
  productImg: { width:56, height:56, borderRadius:8, objectFit:"cover", border:"1px solid #3A1508", background:"#2A1005" },
  imgPlaceholder: { width:56, height:56, borderRadius:8, background:"#2A1005", border:"1px dashed #5C2504", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, color:"#5C2504" },
  productName: { color:"#FFF8F0", fontWeight:600, fontSize:"0.95rem" },
  productMeta: { color:"#9C6030", fontSize:"0.78rem" },
  inputRow: { display:"flex", gap:8 },
  smallInput: { flex:1, background:"#0F0602", border:"1px solid #3A1508", borderRadius:6, padding:"7px 10px", color:"#FFF8F0", fontSize:"0.82rem", outline:"none" },
  saveCardBtn: { background:"#E87B10", color:"#FFF8F0", border:"none", borderRadius:6, padding:"7px 14px", fontWeight:700, fontSize:"0.82rem", cursor:"pointer", alignSelf:"flex-end" },
  deleteBtn: { background:"transparent", color:"#FF6B6B", border:"1px solid #FF6B6B30", borderRadius:6, padding:"7px 14px", fontSize:"0.82rem", cursor:"pointer" },
  addProductCard: { background:"#1A0A02", border:"2px dashed #5C2504", borderRadius:12, padding:20, display:"flex", flexDirection:"column", gap:12 },
  addTitle: { color:"#E87B10", fontWeight:700, fontSize:"0.95rem", marginBottom:4 },
  fullInput: { width:"100%", background:"#0F0602", border:"1px solid #3A1508", borderRadius:8, padding:"9px 12px", color:"#FFF8F0", fontSize:"0.88rem", outline:"none", boxSizing:"border-box" },
  imgUploadLabel: { display:"flex", alignItems:"center", gap:10, background:"#0F0602", border:"1px dashed #5C2504", borderRadius:8, padding:"10px 14px", color:"#9C6030", fontSize:"0.83rem", cursor:"pointer" },
  addBtn: { background:"linear-gradient(135deg,#E87B10,#C45E08)", color:"#FFF8F0", border:"none", borderRadius:8, padding:"10px 0", fontWeight:700, fontSize:"0.9rem", cursor:"pointer", marginTop:4 },
  savedBadge: { background:"#16a34a", color:"#fff", borderRadius:6, padding:"3px 10px", fontSize:"0.75rem", fontWeight:600 },
  imagePreview: { width:60, height:60, borderRadius:8, objectFit:"cover", border:"1px solid #3A1508" },
  liveBadge: { background:"rgba(139,195,74,0.12)", border:"1px solid rgba(139,195,74,0.3)", borderRadius:8, padding:"10px 14px", color:"rgba(139,195,74,0.9)", fontSize:"0.78rem", lineHeight:1.6, marginBottom:8 },

  // ── Tool cards (quick-access buttons) ──────────────────────────────────────
  toolsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
    gap: 14,
    marginBottom: 8,
  },
  toolCard: {
    borderRadius: 14,
    padding: "18px 20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 14,
    border: "1.5px solid",
    transition: "all 0.2s",
    textAlign: "left",
  },
  toolIcon: {
    fontSize: 28,
    flexShrink: 0,
    width: 48, height: 48,
    borderRadius: 12,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  toolLabel: {
    fontWeight: 700, fontSize: "0.92rem", marginBottom: 3,
  },
  toolDesc: {
    fontSize: "0.72rem", lineHeight: 1.4, opacity: 0.6,
  },
};

const compressImage = (base64Str: string, maxWidth = 400, maxHeight = 400): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.6));
    };
  });
};

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, products, onSave }) => {
  const [authed, setAuthed]               = useState(false);
  const [username, setUsername]           = useState("");
  const [password, setPassword]           = useState("");
  const [loginError, setLoginError]       = useState("");
  const [localProducts, setLocalProducts] = useState<ManagedProduct[]>(products);
  const [savedIds, setSavedIds]           = useState<Set<string>>(new Set());
  const [showPriceEditor, setShowPriceEditor] = useState(false); // ← price editor toggle

  // New product form
  const [newName, setNewName]             = useState("");
  const [newQty, setNewQty]               = useState("");
  const [newRate, setNewRate]             = useState("");
  const [newCategory, setNewCategory]     = useState("");
  const [newUnit, setNewUnit]             = useState("g");
  const [newImage, setNewImage]           = useState("");
  const [newImagePreview, setNewImagePreview] = useState("");

  const handleLogin = () => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setAuthed(true); setLoginError("");
    } else {
      setLoginError("Invalid credentials. Try again.");
    }
  };

  const handleProductChange = (id: string, field: keyof ManagedProduct, value: string | number) => {
    setLocalProducts((prev) =>
      prev.map((p) => p.id === id ? { ...p, [field]: value } : p)
    );
  };

  const handleSaveProduct = (id: string) => {
    onSave(localProducts);
    setSavedIds((prev) => new Set([...prev, id]));
    setTimeout(() => setSavedIds((prev) => { const n = new Set(prev); n.delete(id); return n; }), 2000);
  };

  const handleSaveAll = () => {
    onSave(localProducts);
    const allIds = new Set(localProducts.map((p) => p.id));
    setSavedIds(allIds);
    setTimeout(() => setSavedIds(new Set()), 2000);
  };

  const handleDeleteProduct = (id: string) => {
    const updated = localProducts.filter((p) => p.id !== id);
    setLocalProducts(updated);
    onSave(updated);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, productId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target?.result as string;
      try {
        const compressed = await compressImage(base64);
        if (productId) {
          handleProductChange(productId, "image", compressed);
        } else {
          setNewImage(compressed);
          setNewImagePreview(compressed);
        }
      } catch (err) {
        console.error("Compression failed", err);
        if (productId) {
          handleProductChange(productId, "image", base64);
        } else {
          setNewImage(base64);
          setNewImagePreview(base64);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = () => {
    if (!newName || !newRate) return;
    const newProduct: ManagedProduct = {
      id: Date.now().toString(),
      name: newName,
      quantity: newQty || "250g",
      rate: parseFloat(newRate) || 0,
      image: newImage,
      category: newCategory || "General",
      unit: newUnit,
    };
    const updated = [...localProducts, newProduct];
    setLocalProducts(updated);
    onSave(updated);
    setNewName(""); setNewQty(""); setNewRate(""); setNewCategory("");
    setNewUnit("g"); setNewImage(""); setNewImagePreview("");
  };

  // ── Login screen ─────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={styles.overlay}>
        <div style={styles.loginCard}>
          <div style={styles.lockIcon}>🔐</div>
          <div style={styles.loginTitle}>Admin Access</div>
          <div style={styles.loginSub}>Enter your credentials to manage products</div>
          <input style={styles.input} placeholder="Username" value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
          <input style={styles.input} type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
          {loginError && <div style={styles.errorMsg}>{loginError}</div>}
          <button style={styles.loginBtn} onClick={handleLogin}>🔓 Login to Admin</button>
          <div style={{ marginTop:16, color:"#5C2504", fontSize:"0.75rem", cursor:"pointer" }} onClick={onClose}>✕ Cancel</div>
        </div>
      </div>
    );
  }

  // ── Price Editor — rendered on top of admin panel ─────────────────────────
  if (showPriceEditor) {
    return (
      <PriceEditor onClose={() => setShowPriceEditor(false)} />
    );
  }

  // ── Admin panel ──────────────────────────────────────────────────────────
  return (
    <div style={styles.adminPanel}>
      <div style={styles.adminHeader}>
        <div style={styles.adminTitle}>
          <span>🥜</span> Dnuts Admin — Product Manager
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button style={styles.saveCardBtn} onClick={handleSaveAll}>💾 Save All</button>
          <button style={styles.closeBtn} onClick={onClose}>✕ Close</button>
        </div>
      </div>

      <div style={styles.adminBody}>

        {/* ── Live sync notice ── */}
        <div style={styles.liveBadge}>
          ⚡ <strong>Live sync enabled</strong> — Changes saved here instantly appear in the Order Screen.
          Product name, price, quantity, image, and category are all controlled from this panel.
        </div>

        {/* ── Quick Tools ── */}
        <div style={styles.sectionTitle}>🛠 Admin Tools</div>
        <div style={styles.toolsGrid}>

          {/* Price Editor tool card */}
          <div
            style={{
              ...styles.toolCard,
              background: "rgba(139,195,74,0.06)",
              borderColor: "rgba(139,195,74,0.25)",
              color: "#fff",
            }}
            onClick={() => setShowPriceEditor(true)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "rgba(139,195,74,0.12)";
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,195,74,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "rgba(139,195,74,0.06)";
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,195,74,0.25)";
            }}
          >
            <div style={{
              ...styles.toolIcon,
              background: "rgba(139,195,74,0.12)",
              fontSize: 22,
            }}>
              💰
            </div>
            <div>
              <div style={{ ...styles.toolLabel, color: "#8BC34A" }}>Price Editor</div>
              <div style={styles.toolDesc}>
                Edit prices &amp; package sizes for all products by category. Live sync to Order Screen.
              </div>
            </div>
          </div>

          {/* Product Manager tool card (current page — inactive) */}
          <div
            style={{
              ...styles.toolCard,
              background: "rgba(232,123,16,0.06)",
              borderColor: "rgba(232,123,16,0.25)",
              color: "#fff",
              opacity: 0.7,
              cursor: "default",
            }}
          >
            <div style={{
              ...styles.toolIcon,
              background: "rgba(232,123,16,0.12)",
              fontSize: 22,
            }}>
              📦
            </div>
            <div>
              <div style={{ ...styles.toolLabel, color: "#E87B10" }}>Product Manager</div>
              <div style={styles.toolDesc}>
                Add, edit, delete products and upload images. Currently active ↓
              </div>
            </div>
          </div>

        </div>

        {/* ── Manage existing products ── */}
        <div style={styles.sectionTitle}>📦 Manage Products ({localProducts.length})</div>
        <div style={styles.productGrid}>
          {localProducts.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <div style={styles.cardHeader}>
                {product.image
                  ? <img src={product.image} alt={product.name} style={styles.productImg as React.CSSProperties & { objectFit: "cover" }} />
                  : <div style={styles.imgPlaceholder}>🥜</div>
                }
                <div style={{ flex:1 }}>
                  <div style={styles.productName}>{product.name}</div>
                  <div style={styles.productMeta}>{product.category} · ₹{product.rate} · {product.quantity}</div>
                </div>
                {savedIds.has(product.id) && <span style={styles.savedBadge}>✓ Saved</span>}
              </div>

              <label style={styles.imgUploadLabel}>
                📷 Change Image
                <input type="file" accept="image/*" style={{ display:"none" }}
                  onChange={(e) => handleImageUpload(e, product.id)} />
              </label>

              <div style={styles.inputRow}>
                <input style={styles.smallInput} placeholder="Product Name"
                  value={product.name}
                  onChange={(e) => handleProductChange(product.id, "name", e.target.value)} />
                <input style={{ ...styles.smallInput, maxWidth:110 }} placeholder="Category"
                  value={product.category}
                  onChange={(e) => handleProductChange(product.id, "category", e.target.value)} />
              </div>

              <div style={styles.inputRow}>
                <input style={styles.smallInput} placeholder="Qty e.g. 250g"
                  value={product.quantity}
                  onChange={(e) => handleProductChange(product.id, "quantity", e.target.value)} />
                <input style={{ ...styles.smallInput, maxWidth:110 }} type="number" placeholder="Rate ₹"
                  value={product.rate}
                  onChange={(e) => handleProductChange(product.id, "rate", parseFloat(e.target.value) || 0)} />
              </div>

              <div style={{ display:"flex", gap:8, marginTop:4 }}>
                <button style={styles.saveCardBtn} onClick={() => handleSaveProduct(product.id)}>
                  💾 Save
                </button>
                <button style={styles.deleteBtn} onClick={() => handleDeleteProduct(product.id)}>
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Add new product ── */}
        <div style={styles.sectionTitle}>➕ Add New Product</div>
        <div style={styles.addProductCard}>
          <div style={styles.addTitle}>New Product Details</div>
          {newImagePreview && <img src={newImagePreview} alt="preview" style={styles.imagePreview as React.CSSProperties & { objectFit: "cover" }} />}
          <label style={styles.imgUploadLabel}>
            📸 Upload Product Image
            <input type="file" accept="image/*" style={{ display:"none" }}
              onChange={(e) => handleImageUpload(e)} />
          </label>
          <div style={styles.inputRow}>
            <input style={styles.fullInput} placeholder="Product Name *"
              value={newName} onChange={(e) => setNewName(e.target.value)} />
            <input style={{ ...styles.fullInput, maxWidth:160 }} placeholder="Category"
              value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
          </div>
          <div style={styles.inputRow}>
            <input style={styles.fullInput} placeholder="Quantity (e.g. 250g)"
              value={newQty} onChange={(e) => setNewQty(e.target.value)} />
            <input style={{ ...styles.fullInput, maxWidth:70 }} placeholder="Unit"
              value={newUnit} onChange={(e) => setNewUnit(e.target.value)} />
            <input style={{ ...styles.fullInput, maxWidth:120 }} type="number" placeholder="Rate ₹ *"
              value={newRate} onChange={(e) => setNewRate(e.target.value)} />
          </div>
          <button style={styles.addBtn} onClick={handleAddProduct}>
            ✅ Add Product to Store
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;
