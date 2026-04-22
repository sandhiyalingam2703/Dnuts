import React, { useState, useRef, useEffect } from "react";
import * as db from "../utils/db";

export const PRICE_STORAGE_KEY = "dnuts_product_prices";

export interface PriceRecord {
  id: number;
  name: string;
  price: number;
  qty: string;
  category: string;
  image?: string; // base64
}

export const DEFAULT_PRICES: PriceRecord[] = [
  { id: 101, name: "Pumpkin Seeds",       price: 80,  qty: "100g", category: "Seeds" },
  { id: 102, name: "Sabja Seeds",         price: 50,  qty: "100g", category: "Seeds" },
  { id: 103, name: "Badam Pisin",         price: 70,  qty: "100g", category: "Seeds" },
  { id: 104, name: "Chia Seeds",          price: 50,  qty: "100g", category: "Seeds" },
  { id: 105, name: "Flax Seeds",          price: 25,  qty: "100g", category: "Seeds" },
  { id: 106, name: "Sunflower Seeds",     price: 50,  qty: "100g", category: "Seeds" },
  { id: 107, name: "Cucumber Seeds",      price: 100, qty: "100g", category: "Seeds" },
  { id: 108, name: "Watermelon Seeds",    price: 100, qty: "100g", category: "Seeds" },
  { id: 109, name: "Dried Mango",         price: 90,  qty: "100g", category: "Seeds" },
  { id: 110, name: "Halim Seeds",         price: 30,  qty: "100g", category: "Seeds" },
  { id: 1,   name: "Almonds (Badam)",     price: 250, qty: "250g", category: "Nuts" },
  { id: 2,   name: "Cashews",             price: 250, qty: "250g", category: "Nuts" },
  { id: 3,   name: "Salted Pista",        price: 350, qty: "250g", category: "Nuts" },
  { id: 4,   name: "Walnuts",             price: 500, qty: "250g", category: "Nuts" },
  { id: 5,   name: "Dates",               price: 125, qty: "250g", category: "Dry Fruits" },
  { id: 6,   name: "Fig (Anjeer)",        price: 400, qty: "250g", category: "Dry Fruits" },
  { id: 7,   name: "Black Raisins",       price: 150, qty: "200g", category: "Dry Fruits" },
  { id: 8,   name: "Yellow Raisins",      price: 150, qty: "200g", category: "Dry Fruits" },
  { id: 9,   name: "Apricot",             price: 300, qty: "200g", category: "Dry Fruits" },
  { id: 10,  name: "Honey Amla",          price: 150, qty: "200g", category: "Premium" },
  { id: 11,  name: "Salted Badam",        price: 300, qty: "200g", category: "Premium" },
  { id: 12,  name: "Pista Without Shell", price: 500, qty: "200g", category: "Premium" },
  { id: 13,  name: "Makhana",             price: 400, qty: "200g", category: "Premium" },
  { id: 14,  name: "Saffron",             price: 350, qty: "200g", category: "Premium" },
];

export const loadPrices = async (): Promise<PriceRecord[]> => {
  try {
    let stored = await db.getItem<PriceRecord[]>(PRICE_STORAGE_KEY);
    if (!stored) {
      const legacy = localStorage.getItem(PRICE_STORAGE_KEY);
      if (legacy) {
        stored = JSON.parse(legacy);
        await db.setItem(PRICE_STORAGE_KEY, stored);
      }
    }
    return stored || DEFAULT_PRICES;
  } catch (err) {
    console.error("Load failed", err);
    return DEFAULT_PRICES;
  }
};

export const savePrices = async (prices: PriceRecord[]) => {
  try {
    await db.setItem(PRICE_STORAGE_KEY, prices);
  } catch (err) {
    console.error("Failed to save prices to DB:", err);
    alert("❌ Database error! Storage might be full.");
  }
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
      resolve(canvas.toDataURL("image/jpeg", 0.6)); // Compress to JPEG with 0.6 quality
    };
  });
};

interface PriceEditorProps { onClose: () => void; }

const ADMIN_USER = "dnuts";
const ADMIN_PASS = "dnuts2024";

const CAT_EMOJI: Record<string, string> = {
  Seeds: "🌱", Nuts: "🥜", "Dry Fruits": "🍇", Premium: "✨", "Gift Boxes": "🎁", Snacks: "🍿", Sweets: "🍬",
};

const CORE_CATEGORIES = ["Seeds", "Nuts", "Dry Fruits", "Premium", "Gift Boxes", "Snacks", "Sweets"];

type SnackType = "success" | "error";
interface Snack { msg: string; type: SnackType; }

const S: Record<string, React.CSSProperties> = {
  overlay: { position:"fixed", inset:0, background:"rgba(5,8,3,0.95)", backdropFilter:"blur(10px)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans','Segoe UI',sans-serif" },
  loginCard: { background:"#0c1007", border:"1px solid rgba(139,195,74,0.3)", borderRadius:18, padding:"40px 36px", width:360, textAlign:"center", boxShadow:"0 24px 80px rgba(0,0,0,0.7)" },
  loginIcon: { fontSize:44, marginBottom:12 },
  loginTitle: { fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:"1.3rem", color:"#8BC34A", marginBottom:6 },
  loginSub: { fontSize:"0.82rem", color:"rgba(255,255,255,0.4)", marginBottom:24 },
  loginInput: { width:"100%", background:"rgba(255,255,255,0.05)", border:"1.5px solid rgba(139,195,74,0.2)", borderRadius:8, padding:"10px 14px", color:"#fff", fontSize:"0.9rem", marginBottom:12, outline:"none", boxSizing:"border-box", fontFamily:"'DM Sans',sans-serif" },
  loginBtn: { width:"100%", background:"linear-gradient(135deg,#8BC34A,#5a8f1f)", color:"#0c1007", border:"none", borderRadius:8, padding:"11px 0", fontSize:"0.95rem", fontWeight:900, cursor:"pointer", marginTop:4, letterSpacing:"0.5px" },
  cancelLink: { marginTop:16, color:"rgba(255,255,255,0.3)", fontSize:"0.75rem", cursor:"pointer" },
  errMsg: { color:"#ef4444", fontSize:"0.8rem", marginTop:8 },
  panel: { position:"fixed", inset:0, background:"#080c05", zIndex:9999, display:"flex", flexDirection:"column", fontFamily:"'DM Sans','Segoe UI',sans-serif", overflowY:"auto" },
  topGreenLine: { height:3, flexShrink:0, background:"linear-gradient(90deg,transparent,#8BC34A 30%,#c5e27a 50%,#8BC34A 70%,transparent)" },
  header: { background:"#0c1007", borderBottom:"1px solid rgba(139,195,74,0.18)", padding:"14px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:10, flexShrink:0 },
  headerTitle: { fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:"1.2rem", color:"#8BC34A", display:"flex", alignItems:"center", gap:10 },
  headerBtns: { display:"flex", gap:10 },
  saveAllBtn: { background:"linear-gradient(135deg,#8BC34A,#5a8f1f)", color:"#0c1007", border:"none", borderRadius:8, padding:"8px 18px", fontWeight:900, fontSize:"0.85rem", cursor:"pointer", letterSpacing:"0.5px" },
  closeBtn: { background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"rgba(255,255,255,0.6)", padding:"8px 16px", cursor:"pointer", fontSize:"0.85rem" },
  body: { maxWidth:1100, margin:"0 auto", width:"100%", padding:"28px 20px 50px", boxSizing:"border-box" },
  infoBanner: { background:"rgba(139,195,74,0.07)", border:"1px solid rgba(139,195,74,0.2)", borderRadius:12, padding:"14px 18px", marginBottom:28, display:"flex", alignItems:"flex-start", gap:12 },
  infoBannerText: { color:"rgba(255,255,255,0.55)", fontSize:"0.82rem", lineHeight:1.6 },
  catSection: { marginBottom:32 },
  catTitle: { fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:"1.1rem", color:"#fff", marginBottom:14, display:"flex", alignItems:"center", gap:8 },
  catLine: { flex:1, height:1, background:"rgba(139,195,74,0.12)" },
  grid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:12 },
  card: { background:"#0c1007", border:"1.5px solid rgba(139,195,74,0.1)", borderRadius:14, padding:"14px 16px", display:"flex", flexDirection:"column", gap:10, transition:"border-color 0.2s" },
  cardSaved: { borderColor:"#8BC34A", boxShadow:"0 0 14px rgba(139,195,74,0.15)" },
  cardNew: { borderColor:"rgba(139,195,74,0.5)", boxShadow:"0 0 20px rgba(139,195,74,0.12)" },
  productName: { color:"#fff", fontWeight:700, fontSize:"0.88rem", display:"flex", alignItems:"center", gap:8 },
  savedBadge: { background:"rgba(139,195,74,0.15)", border:"1px solid rgba(139,195,74,0.35)", color:"#8BC34A", borderRadius:6, padding:"2px 8px", fontSize:"0.68rem", fontWeight:700, marginLeft:"auto" },
  newBadge: { background:"rgba(139,195,74,0.2)", border:"1px solid #8BC34A", color:"#8BC34A", borderRadius:6, padding:"2px 8px", fontSize:"0.68rem", fontWeight:700, marginLeft:"auto" },
  label: { color:"rgba(255,255,255,0.35)", fontSize:"0.67rem", letterSpacing:"0.8px", textTransform:"uppercase", marginBottom:3 },
  inputField: { width:"100%", background:"rgba(255,255,255,0.04)", border:"1.5px solid rgba(139,195,74,0.15)", borderRadius:8, padding:"8px 12px", color:"#fff", fontSize:"0.88rem", outline:"none", boxSizing:"border-box", fontFamily:"'DM Sans',sans-serif", transition:"border-color 0.2s" },
  pricePrefix: { color:"#8BC34A", fontWeight:900, fontSize:"1rem", fontFamily:"'Playfair Display',serif", flexShrink:0 },
  saveBtn: { background:"linear-gradient(135deg,#8BC34A,#5a8f1f)", color:"#0c1007", border:"none", borderRadius:8, padding:"8px 0", fontWeight:900, fontSize:"0.78rem", cursor:"pointer", letterSpacing:"0.8px", width:"100%", fontFamily:"'DM Sans',sans-serif" },
  deleteBtn: { background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:8, padding:"7px 0", color:"#ef4444", fontSize:"0.75rem", fontWeight:700, cursor:"pointer", width:"100%", fontFamily:"'DM Sans',sans-serif" },
  resetBtn: { background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:8, padding:"10px 0", color:"#ef4444", fontSize:"0.82rem", fontWeight:700, cursor:"pointer", width:"100%", fontFamily:"'DM Sans',sans-serif", marginTop:8 },

  // ── Add new item card ──────────────────────────────────────────────────────
  addCard: { background:"linear-gradient(135deg,rgba(139,195,74,0.06),rgba(90,143,31,0.03))", border:"2px dashed rgba(139,195,74,0.35)", borderRadius:16, padding:"22px 24px", marginBottom:36, display:"flex", flexDirection:"column", gap:16 },
  addCardTitle: { fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:"1.1rem", color:"#8BC34A", display:"flex", alignItems:"center", gap:10, marginBottom:2 },
  addCardSub: { color:"rgba(255,255,255,0.35)", fontSize:"0.78rem", marginTop:-10 },
  addRow: { display:"flex", gap:10, flexWrap:"wrap" },
  addInput: { flex:1, minWidth:120, background:"rgba(255,255,255,0.05)", border:"1.5px solid rgba(139,195,74,0.2)", borderRadius:8, padding:"10px 14px", color:"#fff", fontSize:"0.88rem", outline:"none", boxSizing:"border-box", fontFamily:"'DM Sans',sans-serif" },
  addInputErr: { borderColor:"#ef4444" },
  catSelectRow: { display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" },
  catSelect: { flex:1, minWidth:180, background:"rgba(255,255,255,0.05)", border:"1.5px solid rgba(139,195,74,0.2)", borderRadius:8, padding:"10px 14px", color:"#fff", fontSize:"0.88rem", outline:"none", boxSizing:"border-box", fontFamily:"'DM Sans',sans-serif", cursor:"pointer" },
  newCatInput: { flex:1, minWidth:150, background:"rgba(255,255,255,0.05)", border:"1.5px dashed rgba(139,195,74,0.3)", borderRadius:8, padding:"10px 14px", color:"#fff", fontSize:"0.88rem", outline:"none", boxSizing:"border-box", fontFamily:"'DM Sans',sans-serif" },
  addToOrderBtn: { width:"100%", background:"linear-gradient(135deg,#8BC34A,#5a8f1f)", color:"#0c1007", border:"none", borderRadius:10, padding:"13px 0", fontSize:"0.95rem", fontWeight:900, cursor:"pointer", letterSpacing:"0.8px", fontFamily:"'DM Sans',sans-serif", boxShadow:"0 6px 20px rgba(139,195,74,0.3)" },

  // ── Image upload zone ──────────────────────────────────────────────────────
  imgUploadZone: { border:"2px dashed rgba(139,195,74,0.3)", borderRadius:12, padding:"18px 14px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, cursor:"pointer", transition:"all 0.2s", background:"rgba(255,255,255,0.02)" },
  imgUploadZoneHover: { borderColor:"#8BC34A", background:"rgba(139,195,74,0.06)" },
  imgUploadIcon: { fontSize:28, lineHeight:1 },
  imgUploadLabel: { color:"rgba(255,255,255,0.5)", fontSize:"0.78rem", textAlign:"center" },
  imgUploadHint: { color:"rgba(255,255,255,0.25)", fontSize:"0.68rem" },
  imgPreviewWrap: { position:"relative", display:"inline-block" },
  imgPreview: { width:90, height:90, borderRadius:12, objectFit:"cover", border:"2px solid #8BC34A", display:"block" },
  imgRemoveBtn: { position:"absolute", top:-8, right:-8, width:22, height:22, borderRadius:"50%", background:"#ef4444", border:"2px solid #080c05", color:"#fff", fontSize:"0.7rem", fontWeight:900, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 },

  // ── Snackbar ───────────────────────────────────────────────────────────────
  snackSuccess: { position:"fixed", bottom:28, left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#8BC34A,#5a8f1f)", color:"#0c1007", borderRadius:12, padding:"13px 28px", fontWeight:800, fontSize:"0.9rem", zIndex:99999, boxShadow:"0 8px 28px rgba(139,195,74,0.45)", textAlign:"center", maxWidth:380, lineHeight:1.5, whiteSpace:"pre-line" },
  snackError: { position:"fixed", bottom:28, left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#ef4444,#b91c1c)", color:"#fff", borderRadius:12, padding:"13px 28px", fontWeight:800, fontSize:"0.9rem", zIndex:99999, boxShadow:"0 8px 28px rgba(239,68,68,0.4)", textAlign:"center", maxWidth:380, lineHeight:1.5, whiteSpace:"pre-line" },
};

const PriceEditor: React.FC<PriceEditorProps> = ({ onClose }) => {
  const [authed, setAuthed]           = useState(false);
  const [username, setUsername]       = useState("");
  const [password, setPassword]       = useState("");
  const [loginError, setLoginError]   = useState("");
  const [prices, setPrices]           = useState<PriceRecord[]>(DEFAULT_PRICES);
  const [savedIds, setSavedIds]       = useState<Set<number>>(new Set());
  const [allSaved, setAllSaved]       = useState(false);
  const [snack, setSnack]             = useState<Snack | null>(null);
  const [imgHover, setImgHover]       = useState(false);

  const [edits, setEdits] = useState<Record<number, { price: string; qty: string }>>({});

  useEffect(() => {
    const load = async () => {
      try {
        let stored = await db.getItem<PriceRecord[]>(PRICE_STORAGE_KEY);
        if (!stored) {
          const legacy = localStorage.getItem(PRICE_STORAGE_KEY);
          if (legacy) {
            stored = JSON.parse(legacy);
            await db.setItem(PRICE_STORAGE_KEY, stored);
          }
        }
        if (stored) {
          setPrices(stored);
          const map: Record<number, { price: string; qty: string }> = {};
          stored.forEach((p) => { map[p.id] = { price: String(p.price), qty: p.qty }; });
          setEdits(map);
        } else {
          const map: Record<number, { price: string; qty: string }> = {};
          DEFAULT_PRICES.forEach((p) => { map[p.id] = { price: String(p.price), qty: p.qty }; });
          setEdits(map);
        }
      } catch (err) {
        console.error("Load failed", err);
      }
    };
    load();
  }, []);

  // ── New item form ─────────────────────────────────────────────────────────
  const [newName, setNewName]             = useState("");
  const [newPrice, setNewPrice]           = useState("");
  const [newQty, setNewQty]               = useState("");
  const [newCategory, setNewCategory]     = useState("");
  const [newCustomCat, setNewCustomCat]   = useState("");
  const [newImage, setNewImage]           = useState<string>("");       // base64
  const [newFormErrors, setNewFormErrors] = useState<Record<string, boolean>>({});
  const [justAddedId, setJustAddedId]     = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const existingCategories = Array.from(new Set([...CORE_CATEGORIES, ...prices.map((p) => p.category)]));

  const showSnack = (msg: string, type: SnackType) => {
    setSnack({ msg, type });
    setTimeout(() => setSnack(null), 3000);
  };

  // ── Image upload handler ──────────────────────────────────────────────────
  const handleImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showSnack("❌ Please upload an image file (JPG, PNG, WEBP).", "error");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      showSnack("❌ Image too large. Please use an image under 10MB.", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      try {
        const compressed = await compressImage(base64);
        setNewImage(compressed);
      } catch (err) {
        console.error("Compression failed", err);
        setNewImage(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setImgHover(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleLogin = () => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setAuthed(true); setLoginError("");
    } else {
      setLoginError("Invalid credentials. Try again.");
    }
  };

  const handleEdit = (id: number, field: "price" | "qty", value: string) => {
    setEdits((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const handleSaveOne = async (id: number) => {
    const edit = edits[id];
    if (!edit) return;
    const updated = prices.map((p) =>
      p.id === id ? { ...p, price: parseFloat(edit.price) || p.price, qty: edit.qty || p.qty } : p
    );
    setPrices(updated);
    await savePrices(updated);
    setSavedIds((prev) => new Set([...prev, id]));
    window.dispatchEvent(new CustomEvent("dnuts_prices_updated"));
    showSnack("✅ Price updated successfully!", "success");
    setTimeout(() => { setSavedIds((prev) => { const n = new Set(prev); n.delete(id); return n; }); }, 2000);
  };

  const handleSaveAll = async () => {
    const updated = prices.map((p) => {
      const edit = edits[p.id];
      if (!edit) return p;
      return { ...p, price: parseFloat(edit.price) || p.price, qty: edit.qty || p.qty };
    });
    setPrices(updated);
    await savePrices(updated);
    window.dispatchEvent(new CustomEvent("dnuts_prices_updated"));
    setAllSaved(true);
    showSnack(`✅ All ${updated.length} products saved!`, "success");
    setTimeout(() => setAllSaved(false), 2500);
  };

  const handleReset = async () => {
    if (!window.confirm("Reset all prices to default values?")) return;
    // localStorage.removeItem(PRICE_STORAGE_KEY); // optional cleanup
    setPrices(DEFAULT_PRICES);
    await savePrices(DEFAULT_PRICES);
    const map: Record<number, { price: string; qty: string }> = {};
    DEFAULT_PRICES.forEach((p) => { map[p.id] = { price: String(p.price), qty: p.qty }; });
    setEdits(map);
    window.dispatchEvent(new CustomEvent("dnuts_prices_updated"));
    showSnack("🔄 All prices reset to defaults.", "success");
  };

  const handleDeleteItem = async (id: number) => {
    const item = prices.find((p) => p.id === id);
    if (!item) return;
    if (!window.confirm(`Delete "${item.name}" from the order screen?`)) return;
    const updated = prices.filter((p) => p.id !== id);
    setPrices(updated);
    await savePrices(updated);
    window.dispatchEvent(new CustomEvent("dnuts_prices_updated"));
    showSnack(`🗑 "${item.name}" removed from order screen.`, "success");
  };

  // ── Add new item ──────────────────────────────────────────────────────────
  const handleAddItem = async () => {
    const errors: Record<string, boolean> = {};
    if (!newName.trim())                        errors.name = true;
    if (!newPrice || parseFloat(newPrice) <= 0) errors.price = true;
    if (!newQty.trim())                         errors.qty = true;
    const finalCategory = newCustomCat.trim() || newCategory;
    if (!finalCategory)                         errors.category = true;

    if (Object.keys(errors).length > 0) {
      setNewFormErrors(errors);
      showSnack("❌ Please fill all required fields before adding.", "error");
      return;
    }

    setNewFormErrors({});
    const newId = Date.now();
    const newItem: PriceRecord = {
      id: newId,
      name: newName.trim(),
      price: parseFloat(newPrice),
      qty: newQty.trim(),
      category: finalCategory,
      image: newImage || undefined,
    };

    const updated = [...prices, newItem];
    setPrices(updated);
    await savePrices(updated);
    setEdits((prev) => ({ ...prev, [newId]: { price: String(newItem.price), qty: newItem.qty } }));
    window.dispatchEvent(new CustomEvent("dnuts_prices_updated"));
    setJustAddedId(newId);
    setTimeout(() => setJustAddedId(null), 3000);

    // Reset form
    setNewName(""); setNewPrice(""); setNewQty("");
    setNewCategory(""); setNewCustomCat(""); setNewImage("");
    if (fileInputRef.current) fileInputRef.current.value = "";

    showSnack(`🎉 "${newItem.name}" added to the Order Screen!\nCategory: ${newItem.category}`, "success");
  };

  const categories = Array.from(new Set(prices.map((p) => p.category)));

  // ── Login ─────────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={S.overlay}>
        <div style={S.loginCard}>
          <div style={S.loginIcon}>🔐</div>
          <div style={S.loginTitle}>Price Editor</div>
          <div style={S.loginSub}>Admin access required to edit product prices</div>
          <input style={S.loginInput} placeholder="Username" value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
          <input style={S.loginInput} type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
          {loginError && <div style={S.errMsg}>{loginError}</div>}
          <button style={S.loginBtn} onClick={handleLogin}>🔓 Login</button>
          <div style={S.cancelLink} onClick={onClose}>✕ Cancel</div>
        </div>
      </div>
    );
  }

  // ── Editor panel ──────────────────────────────────────────────────────────
  return (
    <>
      <div style={S.panel}>
        <div style={S.topGreenLine} />
        <div style={S.header}>
          <div style={S.headerTitle}><span>💰</span> Dnuts — Price Editor</div>
          <div style={S.headerBtns}>
            <button style={S.saveAllBtn} onClick={handleSaveAll}>
              {allSaved ? "✅ All Saved!" : "💾 Save All"}
            </button>
            <button style={S.closeBtn} onClick={onClose}>✕ Close</button>
          </div>
        </div>

        <div style={S.body}>

          {/* Info banner */}
          <div style={S.infoBanner}>
            <span style={{ fontSize:26, flexShrink:0 }}>⚡</span>
            <div style={S.infoBannerText}>
              <strong style={{ color:"#8BC34A" }}>Live sync enabled.</strong>{" "}
              Changes save instantly to the Order Screen. Add new products with images below — they appear immediately after adding.
            </div>
          </div>

          {/* ════ ADD NEW ITEM ════ */}
          <div style={S.addCard}>
            <div style={S.addCardTitle}><span>➕</span> Add New Item to Order Screen</div>
            <div style={S.addCardSub}>Fill in the details below and click "Add to Order Screen"</div>

            {/* ── Image Upload Zone ── */}
            <div>
              <div style={S.label}>Product Image (optional)</div>
              {newImage ? (
                /* Preview */
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <div style={S.imgPreviewWrap}>
                    <img src={newImage} alt="preview" style={S.imgPreview as React.CSSProperties} />
                    <button
                      style={S.imgRemoveBtn as React.CSSProperties}
                      onClick={() => { setNewImage(""); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                    >✕</button>
                  </div>
                  <div>
                    <div style={{ color:"#8BC34A", fontSize:"0.78rem", fontWeight:700, marginBottom:4 }}>✅ Image ready</div>
                    <label
                      style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.72rem", cursor:"pointer", textDecoration:"underline" }}
                    >
                      Change image
                      <input ref={fileInputRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleFileInputChange} />
                    </label>
                  </div>
                </div>
              ) : (
                /* Drop zone */
                <div
                  style={{ ...S.imgUploadZone, ...(imgHover ? S.imgUploadZoneHover : {}) }}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setImgHover(true); }}
                  onDragLeave={() => setImgHover(false)}
                  onDrop={handleDrop}
                >
                  <div style={S.imgUploadIcon}>📸</div>
                  <div style={S.imgUploadLabel}>Click to upload or drag & drop image here</div>
                  <div style={S.imgUploadHint}>JPG, PNG, WEBP — max 4MB</div>
                  <input ref={fileInputRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleFileInputChange} />
                </div>
              )}
            </div>

            {/* Name + Price + Qty */}
            <div style={S.addRow}>
              <div style={{ flex:2, minWidth:160 }}>
                <div style={S.label}>Item Name *</div>
                <input
                  style={{ ...S.addInput, ...(newFormErrors.name ? S.addInputErr : {}) }}
                  placeholder="e.g. Mixed Nuts, Anjeer..."
                  value={newName}
                  onChange={(e) => { setNewName(e.target.value); setNewFormErrors((p) => ({ ...p, name: false })); }}
                />
                {newFormErrors.name && <div style={{ color:"#ef4444", fontSize:"0.7rem", marginTop:4 }}>Required</div>}
              </div>
              <div style={{ flex:1, minWidth:100 }}>
                <div style={S.label}>Price (₹) *</div>
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ color:"#8BC34A", fontWeight:900, fontSize:"1rem", flexShrink:0 }}>₹</span>
                  <input
                    style={{ ...S.addInput, ...(newFormErrors.price ? S.addInputErr : {}) }}
                    type="number" min={0} placeholder="0"
                    value={newPrice}
                    onChange={(e) => { setNewPrice(e.target.value); setNewFormErrors((p) => ({ ...p, price: false })); }}
                  />
                </div>
                {newFormErrors.price && <div style={{ color:"#ef4444", fontSize:"0.7rem", marginTop:4 }}>Required</div>}
              </div>
              <div style={{ flex:1, minWidth:100 }}>
                <div style={S.label}>Package Size *</div>
                <input
                  style={{ ...S.addInput, ...(newFormErrors.qty ? S.addInputErr : {}) }}
                  placeholder="e.g. 250g, 1 Box"
                  value={newQty}
                  onChange={(e) => { setNewQty(e.target.value); setNewFormErrors((p) => ({ ...p, qty: false })); }}
                />
                {newFormErrors.qty && <div style={{ color:"#ef4444", fontSize:"0.7rem", marginTop:4 }}>Required</div>}
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <div style={S.label}>Category *</div>
              <div style={S.catSelectRow}>
                <select
                  style={{ ...S.catSelect, ...(newFormErrors.category ? { borderColor: "#ef4444" } : {}) }}
                  value={newCustomCat ? "NEW" : newCategory}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "NEW") {
                      setNewCategory("");
                      setNewCustomCat("");
                    } else {
                      setNewCategory(val);
                      setNewCustomCat("");
                      setNewFormErrors((p) => ({ ...p, category: false }));
                    }
                  }}
                >
                  <option value="" disabled>-- Select Category --</option>
                  {existingCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {CAT_EMOJI[cat] ?? "📦"} {cat}
                    </option>
                  ))}
                  <option value="NEW">+ Add New Category...</option>
                </select>

                {(newCustomCat !== "" || (newCategory === "" && !existingCategories.includes(newCategory))) && (
                  <input
                    style={{ ...S.newCatInput, borderColor: "#8BC34A" }}
                    placeholder="Type new category name..."
                    value={newCustomCat}
                    onChange={(e) => {
                      setNewCustomCat(e.target.value);
                      setNewCategory("");
                      setNewFormErrors((p) => ({ ...p, category: false }));
                    }}
                  />
                )}
              </div>
              {newFormErrors.category && <div style={{ color: "#ef4444", fontSize: "0.7rem", marginTop: 4 }}>Please select or type a category</div>}
            </div>

            <button style={S.addToOrderBtn} onClick={handleAddItem}>
              🛒 Add to Order Screen
            </button>
          </div>

          {/* ════ EXISTING PRODUCTS ════ */}
          {categories.map((cat) => {
            const catProducts = prices.filter((p) => p.category === cat);
            return (
              <div key={cat} style={S.catSection}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                  <div style={S.catTitle}>{CAT_EMOJI[cat] ?? "📦"} {cat}</div>
                  <div style={S.catLine} />
                  <span style={{ color:"rgba(255,255,255,0.25)", fontSize:"0.72rem", whiteSpace:"nowrap" }}>
                    {catProducts.length} items
                  </span>
                </div>
                <div style={S.grid}>
                  {catProducts.map((product) => {
                    const edit     = edits[product.id] ?? { price: String(product.price), qty: product.qty };
                    const isSaved  = savedIds.has(product.id);
                    const isNew    = product.id === justAddedId;
                    const isCustom = !DEFAULT_PRICES.find((d) => d.id === product.id);

                    return (
                      <div key={product.id} style={{ ...S.card, ...(isNew ? S.cardNew : {}), ...(isSaved ? S.cardSaved : {}) }}>

                        {/* Name + image thumbnail */}
                        <div style={S.productName}>
                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{ width:36, height:36, borderRadius:8, objectFit:"cover", border:"1px solid rgba(139,195,74,0.3)", flexShrink:0 }}
                            />
                          )}
                          <span style={{ flex:1 }}>{product.name}</span>
                          {isNew   && <span style={S.newBadge}>✦ New</span>}
                          {isSaved && !isNew && <span style={S.savedBadge}>✓ Saved</span>}
                        </div>

                        <div>
                          <div style={S.label}>Price (₹)</div>
                          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                            <span style={S.pricePrefix}>₹</span>
                            <input style={S.inputField} type="number" min={0}
                              value={edit.price}
                              onChange={(e) => handleEdit(product.id, "price", e.target.value)} />
                          </div>
                        </div>

                        <div>
                          <div style={S.label}>Package Size</div>
                          <input style={S.inputField} type="text"
                            value={edit.qty}
                            onChange={(e) => handleEdit(product.id, "qty", e.target.value)} />
                        </div>

                        <button style={S.saveBtn} onClick={() => handleSaveOne(product.id)}>
                          {isSaved ? "✅ Saved!" : "💾 Save Changes"}
                        </button>

                        <button style={S.deleteBtn} onClick={() => handleDeleteItem(product.id)}>
                          🗑 Remove from Order Screen
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div style={{ maxWidth:320, margin:"0 auto" }}>
            <button style={S.resetBtn} onClick={handleReset}>🔄 Reset All Prices to Default</button>
          </div>
        </div>
      </div>

      {snack && (
        <div style={snack.type === "success" ? S.snackSuccess : S.snackError}>
          {snack.msg}
        </div>
      )}
    </>
  );
};

export default PriceEditor;
