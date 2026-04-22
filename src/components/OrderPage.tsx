import React, { useState, useEffect } from "react";
import { loadPrices, PriceRecord } from "./PriceEditor";

// ─── Asset Imports ────────────────────────────────────────────────────────────
import almondImg       from "../assets/717AyYFdJzL._SL1400-removebg-preview.png";
import cashewImg       from "../assets/cashew-removebg-preview.png";
import pistachioImg    from "../asset2/Pistachio-Single-New-removebg-preview.png";
import blackRaisinImg  from "../assets/single-raisin-isolated-on-white-260nw-2342152475-removebg-preview.png";
import yellowRaisinImg from "../assets/single-raisin-isolated-white-background-52741118-removebg-preview.png";
import datesImg        from "../assets/delicious-single-date-fruit-isolated-png-removebg-preview.png";
import walnutImg       from "../assets/walnut.jpg__-removebg-preview.png";
import blueberryImg    from "../assets/bad-single-dehydrated-dried-blueberry-260nw-2616337075-removebg-preview.png";
import cookiesImg      from "../assets/coconut-cookies-removebg-preview.png";
import ladduImg        from "../assets/dry-fruits-laddu-1-removebg-preview.png";
import makhanaImg      from "../assets/dry-whole-makhana-500x500-removebg-preview.png";
import chikkiImg       from "../assets/sattur-black-sesame-chikki-removebg-preview.png";
import cranberriesImg  from "../assets/two-tasty-dried-cranberries-isolated-600nw-2430320429-removebg-preview (1).png";
import gift1Img        from "../oderassets/gift2about.jpg.jpeg";
import gift2Img        from "../oderassets/giftabout.jpg.jpeg";
import gift3Img        from "../oderassets/goft2.jpg.jpeg";
import vegChatImg      from "../oderassets/vegetablechat.jpg.jpeg";
import strawImg        from "../oderassets/straw.jpg.jpeg";
import badamImg        from "../oderassets/badam.jpg.jpeg";
import wallnutImg      from "../oderassets/wallnut.jpg.jpeg";

// ─── Image map ────────────────────────────────────────────────────────────────
const IMAGE_MAP: Record<number, string> = {
  1: almondImg, 2: cashewImg, 3: pistachioImg, 4: walnutImg,
  5: datesImg,  6: cranberriesImg, 7: blackRaisinImg, 8: yellowRaisinImg, 9: blueberryImg,
  10: makhanaImg, 11: badamImg, 12: pistachioImg, 13: makhanaImg, 14: almondImg,
  18: gift2Img, 19: gift1Img, 20: gift3Img,
  21: vegChatImg, 22: strawImg, 23: chikkiImg, 24: cookiesImg,
  25: ladduImg,   26: badamImg, 27: wallnutImg,
};

const SEED_IDS    = [101,102,103,104,105,106,107,108,109,110];
const SEED_EMOJI: Record<number, string> = {
  101:"🎃", 102:"🌿", 103:"🌰", 104:"🖤",
  105:"🟤", 106:"🌻", 107:"🥒", 108:"🍉",
  109:"🥭", 110:"🌱",
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface CartItem extends PriceRecord { quantity: number; }

// ── KEY CHANGE: initialCategory prop added ────────────────────────────────────
interface OrderPageProps {
  onClose: () => void;
  initialCategory?: string;   // ← passed from IconModel or Banner "Buy Now"
}

// ─── Constants ────────────────────────────────────────────────────────────────
const OWNER_PHONE = "917373695325";

const PAYMENT_METHODS = [
  { id:"gpay",       label:"Google Pay",      icon:"💚", desc:"UPI: dnuts@okaxis" },
  { id:"phonepe",    label:"PhonePe",          icon:"💜", desc:"UPI: dnuts@ybl" },
  { id:"paytm",      label:"Paytm",            icon:"🔵", desc:"UPI: dnuts@paytm" },
  { id:"upi",        label:"Other UPI",        icon:"🏦", desc:"Any UPI app" },
  { id:"netbanking", label:"Net Banking",      icon:"🌐", desc:"All major banks" },
  { id:"cod",        label:"Cash on Delivery", icon:"💵", desc:"Pay when you receive" },
];

const CATEGORIES = ["All", "Seeds", "Nuts", "Dry Fruits", "Premium", "Gift Boxes", "Snacks", "Sweets"];

const STEPS = [
  { num:1, label:"Select Items" },
  { num:2, label:"Your Details" },
  { num:3, label:"Payment" },
];

const GIFT_BOXES: PriceRecord[] = [
  { id:18, name:"Gift Box Classic", price:699,  qty:"1 Box", category:"Gift Boxes" },
  { id:19, name:"Gift Box Premium", price:999,  qty:"1 Box", category:"Gift Boxes" },
  { id:20, name:"Gift Box Deluxe",  price:1299, qty:"1 Box", category:"Gift Boxes" },
];

// ─── Category colours ─────────────────────────────────────────────────────────
const CAT_ACCENT: Record<string, { color: string; bg: string; border: string }> = {
  "Gift Boxes": { color:"#d4a56a", bg:"rgba(212,165,106,0.1)", border:"rgba(212,165,106,0.3)" },
  "default":    { color:"#8BC34A", bg:"rgba(139,195,74,0.1)",  border:"rgba(139,195,74,0.3)"  },
};
const accent = (cat: string) => CAT_ACCENT[cat] ?? CAT_ACCENT["default"];

// ─── Styles ───────────────────────────────────────────────────────────────────
const S: Record<string, React.CSSProperties> = {
  overlay:     { position:"fixed", inset:0, background:"rgba(5,8,3,0.97)", backdropFilter:"blur(12px)", zIndex:9000, display:"flex", flexDirection:"column", fontFamily:"'DM Sans','Segoe UI',sans-serif", overflowY:"auto" },
  topGreenLine:{ height:3, flexShrink:0, background:"linear-gradient(90deg,transparent,#8BC34A 30%,#c5e27a 50%,#8BC34A 70%,transparent)" },
  topBar:      { background:"#0c1007", borderBottom:"1px solid rgba(139,195,74,0.18)", position:"sticky", top:0, zIndex:10, flexShrink:0 },
  topBarInner: { maxWidth:1100, margin:"0 auto", padding:"14px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" },
  logo:        { fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:"1.2rem", color:"#8BC34A", letterSpacing:2, display:"flex", alignItems:"center", gap:8 },
  logoLeaf:    { width:30, height:30, borderRadius:"50%", background:"linear-gradient(135deg,#8BC34A,#5a8f1f)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.9rem" },
  closeBtn:    { background:"rgba(139,195,74,0.08)", border:"1px solid rgba(139,195,74,0.25)", borderRadius:10, color:"rgba(255,255,255,0.65)", fontSize:"0.82rem", padding:"7px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:6 },
  body:        { maxWidth:1100, margin:"0 auto", width:"100%", padding:"28px 20px 50px", boxSizing:"border-box", flex:1 },
  stepTracker: { display:"flex", alignItems:"flex-start", justifyContent:"center", gap:0, marginBottom:36 },
  sectionTitle:{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:"1.55rem", color:"#fff", marginBottom:6 },
  sectionSub:  { color:"rgba(255,255,255,0.4)", fontSize:"0.85rem", marginBottom:20 },
  filterRow:   { display:"flex", gap:8, flexWrap:"wrap", marginBottom:14 },
  searchBar:   { width:"100%", position:"relative", marginBottom:22 },
  searchInput: { width:"100%", background:"rgba(255,255,255,0.05)", border:"1.5px solid rgba(139,195,74,0.15)", borderRadius:12, padding:"12px 18px 12px 42px", color:"#fff", fontSize:"0.9rem", outline:"none", boxSizing:"border-box", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" },
  searchIcon:  { position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", fontSize:"1rem", opacity:0.4 },
  productGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))", gap:12, marginBottom:28 },
  giftGrid:    { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:14, marginBottom:28 },
  seedGrid:    { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:10, marginBottom:28 },
  formCard:    { background:"#0c1007", border:"1px solid rgba(139,195,74,0.14)", borderRadius:16, padding:"22px", marginBottom:16 },
  formLabel:   { color:"#8BC34A", fontWeight:700, fontSize:"0.7rem", letterSpacing:"1.2px", textTransform:"uppercase", marginBottom:14, display:"block", borderBottom:"1px solid rgba(139,195,74,0.1)", paddingBottom:8 },
  inputGrid:   { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 },
  inputFull:   { display:"grid", gridTemplateColumns:"1fr",     gap:10, marginBottom:10 },
  input:       { width:"100%", background:"rgba(255,255,255,0.04)", border:"1.5px solid rgba(139,195,74,0.14)", borderRadius:8, padding:"10px 14px", color:"#fff", fontSize:"0.88rem", outline:"none", boxSizing:"border-box", fontFamily:"'DM Sans',sans-serif" },
  inputErr:    { borderColor:"#ef4444" },
  errTxt:      { color:"#ef4444", fontSize:"0.74rem", marginTop:4 },
  locationBtn: { display:"flex", alignItems:"center", gap:8, background:"rgba(139,195,74,0.07)", border:"1.5px solid rgba(139,195,74,0.2)", borderRadius:8, padding:"9px 14px", color:"#8BC34A", fontSize:"0.83rem", cursor:"pointer", width:"100%", boxSizing:"border-box", marginBottom:10 },
  locationOk:  { background:"rgba(139,195,74,0.07)", border:"1px solid rgba(139,195,74,0.25)", borderRadius:8, padding:"8px 12px", color:"#8BC34A", fontSize:"0.78rem", marginBottom:10, wordBreak:"break-word" },
  cartBar:     { background:"linear-gradient(135deg,rgba(139,195,74,0.08),rgba(90,143,31,0.05))", border:"1px solid rgba(139,195,74,0.25)", borderRadius:14, padding:"16px 20px", marginBottom:10, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 },
  cartCount:   { width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,#8BC34A,#5a8f1f)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:"1rem", color:"#0c1007" },
  cartItemRow: { display:"flex", alignItems:"center", gap:12, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(139,195,74,0.1)", borderRadius:10, padding:"10px 14px", marginBottom:8 },
  qtyBtn:      { width:26, height:26, borderRadius:"50%", background:"rgba(139,195,74,0.12)", border:"1px solid rgba(139,195,74,0.3)", color:"#8BC34A", fontWeight:900, fontSize:"1rem", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 },
  orderSummaryBox: { background:"rgba(139,195,74,0.04)", border:"1px solid rgba(139,195,74,0.14)", borderRadius:10, padding:"14px 16px", marginBottom:20 },
  summaryRow:  { display:"flex", justifyContent:"space-between", color:"rgba(255,255,255,0.5)", fontSize:"0.8rem", marginBottom:6 },
  summaryTotal:{ display:"flex", justifyContent:"space-between", color:"#fff", fontWeight:800, fontSize:"1rem", borderTop:"1px solid rgba(139,195,74,0.15)", paddingTop:10, marginTop:8 },
  primaryBtn:  { width:"100%", background:"linear-gradient(135deg,#8BC34A,#5a8f1f)", color:"#0c1007", border:"none", borderRadius:10, padding:"13px 0", fontSize:"0.95rem", fontWeight:900, cursor:"pointer", letterSpacing:"0.8px", marginTop:16, boxShadow:"0 6px 20px rgba(139,195,74,0.35)", fontFamily:"'DM Sans',sans-serif" },
  ghostBtn:    { background:"rgba(139,195,74,0.07)", border:"1.5px solid rgba(139,195,74,0.18)", borderRadius:10, padding:"13px 0", color:"rgba(255,255,255,0.55)", fontSize:"0.88rem", fontWeight:700, cursor:"pointer", marginTop:16, flex:"0 0 110px", fontFamily:"'DM Sans',sans-serif" },
  waHint:      { textAlign:"center", color:"rgba(255,255,255,0.28)", fontSize:"0.72rem", marginTop:10 },
  snackbar:    { position:"fixed", bottom:28, left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#8BC34A,#5a8f1f)", color:"#0c1007", borderRadius:12, padding:"14px 28px", fontWeight:800, fontSize:"0.9rem", zIndex:99999, boxShadow:"0 8px 28px rgba(139,195,74,0.45)", textAlign:"center", maxWidth:360, lineHeight:1.5 },
  // banners
  catBanner:   { borderRadius:14, padding:"12px 18px", marginBottom:20, display:"flex", alignItems:"center", gap:12 },
  liveTag:     { display:"inline-flex", alignItems:"center", gap:5, background:"rgba(139,195,74,0.1)", border:"1px solid rgba(139,195,74,0.25)", borderRadius:6, padding:"3px 10px", color:"#8BC34A", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.8px", textTransform:"uppercase", marginBottom:18 },
};

// ─── Banner config per category ───────────────────────────────────────────────
const CAT_BANNER: Record<string, { emoji: string; title: string; desc: string; style: React.CSSProperties }> = {
  "Gift Boxes": {
    emoji:"🎁", title:"Premium Gift Boxes",
    desc:"Beautifully curated dry fruit gift boxes — perfect for festivals, birthdays & celebrations. Hand-packed to order.",
    style:{ background:"linear-gradient(135deg,rgba(212,165,106,0.12),rgba(139,195,74,0.06))", border:"1px solid rgba(212,165,106,0.3)" },
  },
  Seeds: {
    emoji:"🌱", title:"Health Seeds",
    desc:"All seeds are sold in 100g packs. Rich in omega-3, protein & fibre. A daily wellness essential.",
    style:{ background:"rgba(139,195,74,0.06)", border:"1px solid rgba(139,195,74,0.18)" },
  },
  Nuts: {
    emoji:"🥜", title:"Premium Nuts",
    desc:"Freshly sourced almonds, cashews, pistachios & walnuts — packed with protein and healthy fats.",
    style:{ background:"rgba(139,195,74,0.06)", border:"1px solid rgba(139,195,74,0.18)" },
  },
  "Dry Fruits": {
    emoji:"🍇", title:"Dry Fruits",
    desc:"Natural dates, figs, raisins & apricots — no sugar added, pure goodness in every bite.",
    style:{ background:"rgba(139,195,74,0.06)", border:"1px solid rgba(139,195,74,0.18)" },
  },
  Premium: {
    emoji:"✨", title:"Premium Collection",
    desc:"Makhana, saffron, pista without shell & more — our finest, hand-selected range.",
    style:{ background:"rgba(139,195,74,0.06)", border:"1px solid rgba(139,195,74,0.18)" },
  },
  Snacks: {
    emoji:"🍿", title:"Healthy Snacks",
    desc:"Guilt-free snacking — chikki, cookies, vegetable chaat & more crispy goodness.",
    style:{ background:"rgba(139,195,74,0.06)", border:"1px solid rgba(139,195,74,0.18)" },
  },
  Sweets: {
    emoji:"🍬", title:"Traditional Sweets",
    desc:"Dry fruit laddus, badam sweets & walnut sweets — handmade with love and zero artificial colours.",
    style:{ background:"rgba(139,195,74,0.06)", border:"1px solid rgba(139,195,74,0.18)" },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
const OrderPage: React.FC<OrderPageProps> = ({ onClose, initialCategory = "All" }) => {
  const [step, setStep]                     = useState<1 | 2 | 3>(1);
  // ── Pre-select category from IconModel ────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery]       = useState("");
  const [cart, setCart]                     = useState<CartItem[]>([]);
  const [showSnackbar, setShowSnackbar]     = useState(false);
  const [snackbarMsg, setSnackbarMsg]       = useState("");
  const [priceList, setPriceList]           = useState<PriceRecord[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await loadPrices();
      setPriceList(data);
    };
    load();
  }, []);

  const showSnackbarMsg = (msg: string) => {
    setSnackbarMsg(msg);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  // Sync price updates from PriceEditor
  useEffect(() => {
    const handler = async () => {
      const data = await loadPrices();
      setPriceList(data);
    };
    window.addEventListener("dnuts_prices_updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("dnuts_prices_updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  // Sync cart prices
  useEffect(() => {
    setCart((prev) =>
      prev.map((c) => {
        const u = priceList.find((p) => p.id === c.id);
        return u ? { ...c, price:u.price, qty:u.qty } : c;
      })
    );
  }, [priceList]);

  // All products
  const ALL_PRODUCTS: PriceRecord[] = [...priceList, ...GIFT_BOXES];

  // Form state
  const [name,setName]             = useState("");
  const [place,setPlace]           = useState("");
  const [town,setTown]             = useState("");
  const [estatecode,setEstatecode] = useState("");
  const [pincode,setPincode]       = useState("");
  const [phone,setPhone]           = useState("");
  const [address,setAddress]       = useState("");
  const [paymentMethod,setPaymentMethod] = useState("");
  const [errors,setErrors]         = useState<Record<string,string>>({});

  // Cart
  const totalItems = cart.reduce((s,i)=>s+i.quantity,0);
  const totalPrice = cart.reduce((s,i)=>s+i.price*i.quantity,0);
  const isSelected = (id:number) => cart.some((c)=>c.id===id);

  const toggleProduct = (p:PriceRecord) => {
    setCart((prev) => prev.find((c)=>c.id===p.id) ? prev.filter((c)=>c.id!==p.id) : [...prev,{...p,quantity:1}]);
  };
  const updateQty = (id:number, delta:number) => {
    setCart((prev) => prev.map((c)=>c.id===id?{...c,quantity:c.quantity+delta}:c).filter((c)=>c.quantity>0));
  };

  const filtered = (activeCategory==="All" ? ALL_PRODUCTS : ALL_PRODUCTS.filter((p)=>p.category===activeCategory))
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const isSeedCat = activeCategory==="Seeds";
  const gridStyle = activeCategory==="Gift Boxes" ? S.giftGrid : isSeedCat ? S.seedGrid : S.productGrid;
  const banner = CAT_BANNER[activeCategory];

  // Validate
  const validateStep2 = () => {
    const e:Record<string,string> = {};
    if(!name.trim())             e.name    = "Name is required";
    if(!/^\d{10}$/.test(phone))  e.phone   = "Valid 10-digit number required";
    if(!address.trim())          e.address = "Address is required";
    if(!/^\d{6}$/.test(pincode)) e.pincode = "Valid 6-digit pincode required";
    setErrors(e);
    return Object.keys(e).length===0;
  };
  const validateStep3 = () => {
    if(!paymentMethod){ setErrors({payment:"Please select a payment method"}); return false; }
    return true;
  };

  // Place order
  const handlePlaceOrder = () => {
    if(!validateStep3()) return;
    const payLabel = PAYMENT_METHODS.find((p)=>p.id===paymentMethod)?.label||paymentMethod;
    const itemsList = cart.map((c)=>`  • ${c.name} ×${c.quantity} (${c.qty}) — ₹${c.price*c.quantity}`).join("\n");
    const msg =
`🥜 *DNUTS ORDER*
━━━━━━━━━━━━━━━━━━━━━━
*Items Ordered:*
${itemsList}

*Total: ₹${totalPrice}*
━━━━━━━━━━━━━━━━━━━━━━
*Customer Details:*
👤 Name: ${name}
📱 Phone: ${phone}
🏠 Address: ${address}
📍 Place: ${place}
🏙 Town: ${town}
🗺 Estate Code: ${estatecode}
📮 Pincode: ${pincode}
━━━━━━━━━━━━━━━━━━━━━━
💳 Payment: ${payLabel}
━━━━━━━━━━━━━━━━━━━━━━
Please confirm my order. Thank you! 🙏`;

    setSnackbarMsg(""); // Clear for default order message
    setShowSnackbar(true);
    
    // Redirect immediately to avoid popup blockers and for a faster experience
    const whatsappUrl = `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(msg)}`;
    window.location.href = whatsappUrl;
    
    // Optional: close the modal after a short delay so the user sees the snackbar for a split second
    setTimeout(onClose, 500);
  };

  // ── Product card ───────────────────────────────────────────────────────────
  const renderCard = (p:PriceRecord) => {
    const sel     = isSelected(p.id);
    const a       = accent(p.category);
    const isGift  = p.category==="Gift Boxes";
    const isSeed  = SEED_IDS.includes(p.id);
    const imgSrc  = IMAGE_MAP[p.id];

    return (
      <div key={p.id} onClick={()=>toggleProduct(p)} style={{
        background: sel ? a.bg : "rgba(255,255,255,0.03)",
        border: sel ? `2px solid ${a.color}` : "1.5px solid rgba(255,255,255,0.08)",
        borderRadius:14, padding:"14px 12px", cursor:"pointer",
        transition:"all 0.22s cubic-bezier(0.22,1,0.36,1)",
        position:"relative", display:"flex", flexDirection:"column", alignItems:"center", gap:8,
        boxShadow: sel ? `0 0 20px ${a.bg}` : "none",
      }}>
        {isGift && (
          <div style={{ position:"absolute", top:0, left:0, background:"linear-gradient(135deg,#d4a56a,#a0732a)", color:"#0c1007", fontSize:"0.55rem", fontWeight:800, letterSpacing:"0.5px", textTransform:"uppercase", padding:"3px 10px 3px 8px", borderRadius:"14px 0 12px 0" }}>
            🎁 Gift
          </div>
        )}
        {sel && (
          <div style={{ position:"absolute", top:8, right:8, width:20, height:20, borderRadius:"50%", background:`linear-gradient(135deg,${a.color},${isGift?"#a0732a":"#5a8f1f"})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.65rem", color:"#0c1007", fontWeight:800 }}>✓</div>
        )}

        {p.image ? (
          <img src={p.image} alt={p.name} style={{ width:110, height:110, objectFit:"cover", borderRadius:12, border:"1px solid rgba(139,195,74,0.2)", marginTop:isGift?18:0 }} />
        ) : (isSeed||!imgSrc) ? (
          <div style={{ width:110, height:110, borderRadius:12, background:"rgba(139,195,74,0.08)", border:"1.5px solid rgba(139,195,74,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2.5rem" }}>
            {SEED_EMOJI[p.id]??"🌱"}
          </div>
        ) : (
          <img src={imgSrc} alt={p.name} style={{ width:110, height:110, objectFit:"cover", borderRadius:12, border:"1px solid rgba(139,195,74,0.2)", marginTop:isGift?18:0 }} />
        )}

        <div style={{ color:"#fff", fontWeight:700, fontSize:"0.78rem", textAlign:"center", lineHeight:1.3 }}>{p.name}</div>
        <div style={{ color:a.color, fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.8px", textTransform:"uppercase" }}>{p.qty}</div>
        <div style={{ color:"#fff", fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:"1rem" }}>₹{p.price}</div>
        <button style={{ width:"100%", background:sel?`linear-gradient(135deg,${a.color},${isGift?"#a0732a":"#5a8f1f"})`:a.bg, border:sel?"none":`1px solid ${a.border}`, borderRadius:8, color:sel?"#0c1007":a.color, fontSize:"0.66rem", fontWeight:700, letterSpacing:"0.8px", padding:"6px 0", cursor:"pointer", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif" }}>
          {sel ? "✓ Added" : isGift ? "🎁 Add Gift" : "+ Add"}
        </button>
      </div>
    );
  };

  return (
    <>
      <div style={S.overlay}>
        {/* TOP BAR */}
        <div style={S.topBar}>
          <div style={S.topGreenLine} />
          <div style={S.topBarInner}>
            <div style={S.logo}>
              <div style={S.logoLeaf}>🌿</div>
              DNUTS
              <span style={{ color:"rgba(255,255,255,0.22)", fontSize:"0.72rem", fontFamily:"'DM Mono',monospace", letterSpacing:1, marginLeft:4 }}>Premium Store</span>
            </div>
            <button style={S.closeBtn} onClick={onClose}>✕ Close</button>
          </div>
        </div>

        <div style={S.body}>
          {/* STEP TRACKER */}
          <div style={S.stepTracker}>
            {STEPS.map((s,i) => (
              <React.Fragment key={s.num}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:"0.85rem", background:step>s.num?"#8BC34A":step===s.num?"linear-gradient(135deg,#8BC34A,#5a8f1f)":"rgba(255,255,255,0.06)", color:step>=s.num?"#0c1007":"rgba(255,255,255,0.3)", border:step>=s.num?"2px solid #8BC34A":"2px solid rgba(255,255,255,0.1)", boxShadow:step===s.num?"0 0 16px rgba(139,195,74,0.45)":"none", transition:"all 0.3s", flexShrink:0 }}>
                    {step>s.num?"✓":s.num}
                  </div>
                  <span style={{ fontSize:"0.68rem", fontWeight:step===s.num?700:500, color:step===s.num?"#8BC34A":"rgba(255,255,255,0.3)", letterSpacing:"0.5px", textTransform:"uppercase", whiteSpace:"nowrap" }}>{s.label}</span>
                </div>
                {i<STEPS.length-1 && <div style={{ width:55, height:2, background:"rgba(139,195,74,0.18)", margin:"0 6px 22px", flexShrink:0 }} />}
              </React.Fragment>
            ))}
          </div>

          {/* ════ STEP 1 ════ */}
          {step===1 && (
            <>
              <div style={S.sectionTitle}>Choose Your Products</div>
              <div style={S.sectionSub}>Tap any item to add it to your cart</div>

              {/* Live tag */}
              <div style={S.liveTag}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#8BC34A", display:"inline-block" }} />
                Prices live from admin
              </div>

              {/* Category filter pills */}
              <div style={S.filterRow}>
                {CATEGORIES.map((cat) => {
                  const isGiftCat = cat==="Gift Boxes";
                  const isActive  = activeCategory===cat;
                  const a         = accent(cat);
                  return (
                    <button key={cat} onClick={()=>setActiveCategory(cat)} style={{
                      padding:"7px 16px", borderRadius:20, fontSize:"0.72rem", fontWeight:600,
                      letterSpacing:"0.8px", textTransform:"uppercase", cursor:"pointer",
                      border: isActive ? `1.5px solid ${a.color}` : "1.5px solid rgba(255,255,255,0.1)",
                      background: isActive ? a.bg : "rgba(255,255,255,0.04)",
                      color: isActive ? a.color : "rgba(255,255,255,0.45)",
                      transition:"all 0.18s", fontFamily:"'DM Sans',sans-serif",
                      position:"relative",
                    }}>
                      {cat==="Gift Boxes"?"🎁 ":""}{cat}
                      {/* active dot */}
                      {isActive && (
                        <span style={{ position:"absolute", top:-4, right:-4, width:8, height:8, borderRadius:"50%", background:a.color, boxShadow:`0 0 6px ${a.color}` }} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div style={S.searchBar}>
                <span style={S.searchIcon}>🔍</span>
                <input
                  style={S.searchInput}
                  placeholder={`Search in ${activeCategory}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category banner */}
              {banner && (
                <div style={{ ...S.catBanner, ...banner.style }}>
                  <span style={{ fontSize:28, flexShrink:0 }}>{banner.emoji}</span>
                  <div>
                    <div style={{ color: activeCategory==="Gift Boxes"?"#d4a56a":"#8BC34A", fontWeight:800, fontSize:"0.9rem", marginBottom:3 }}>{banner.title}</div>
                    <div style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.78rem", lineHeight:1.5 }}>{banner.desc}</div>
                  </div>
                </div>
              )}

              {/* Product grid */}
              <div style={gridStyle}>{filtered.map(renderCard)}</div>

              {/* Cart */}
              {cart.length>0 && (
                <>
                  <div style={{ color:"#8BC34A", fontWeight:700, fontSize:"0.72rem", letterSpacing:"1.2px", textTransform:"uppercase", marginBottom:12, borderBottom:"1px solid rgba(139,195,74,0.1)", paddingBottom:8 }}>
                    🛒 Your Cart ({totalItems} item{totalItems>1?"s":""})
                  </div>
                  {cart.map((item) => (
                    <div key={item.id} style={S.cartItemRow}>
                      {item.image || (IMAGE_MAP[item.id]&&!SEED_IDS.includes(item.id)) ? (
                        <img src={item.image || IMAGE_MAP[item.id]} alt={item.name} style={{ width:42, height:42, objectFit:"contain", borderRadius:item.category==="Gift Boxes"?8:0 }} />
                      ) : (
                        <div style={{ width:42, height:42, borderRadius:"50%", background:"rgba(139,195,74,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem" }}>
                          {SEED_EMOJI[item.id]??"🌱"}
                        </div>
                      )}
                      <div style={{ flex:1 }}>
                        <div style={{ color:"#fff", fontWeight:600, fontSize:"0.85rem" }}>{item.category==="Gift Boxes"?"🎁 ":""}{item.name}</div>
                        <div style={{ color:"rgba(255,255,255,0.38)", fontSize:"0.7rem" }}>{item.qty} · ₹{item.price} each</div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                        <button style={S.qtyBtn} onClick={(e)=>{e.stopPropagation();updateQty(item.id,-1);}}>−</button>
                        <span style={{ color:"#fff", fontWeight:700, fontSize:"0.85rem", minWidth:18, textAlign:"center" }}>{item.quantity}</span>
                        <button style={S.qtyBtn} onClick={(e)=>{e.stopPropagation();updateQty(item.id,1);}}>+</button>
                      </div>
                      <div style={{ color:"#8BC34A", fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:"0.95rem", marginLeft:8 }}>₹{item.price*item.quantity}</div>
                    </div>
                  ))}

                  <div style={S.cartBar}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={S.cartCount}>{totalItems}</div>
                      <div>
                        <div style={{ color:"#fff", fontWeight:700, fontSize:"0.9rem" }}>{totalItems} item{totalItems>1?"s":""} in cart</div>
                        <div style={{ color:"rgba(255,255,255,0.38)", fontSize:"0.72rem" }}>Ready to checkout</div>
                      </div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:18 }}>
                      <div style={{ color:"#8BC34A", fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:"1.3rem" }}>₹{totalPrice}</div>
                      <button style={{ background:"linear-gradient(135deg,#8BC34A,#5a8f1f)", color:"#0c1007", border:"none", borderRadius:10, padding:"11px 28px", fontWeight:900, fontSize:"0.88rem", letterSpacing:"1px", textTransform:"uppercase", cursor:"pointer", boxShadow:"0 4px 16px rgba(139,195,74,0.35)", fontFamily:"'DM Sans',sans-serif" }} onClick={()=>setStep(2)}>
                        Continue →
                      </button>
                    </div>
                  </div>
                </>
              )}
              {cart.length===0 && (
                <div style={{ textAlign:"center", color:"rgba(255,255,255,0.22)", fontSize:"0.85rem", padding:"20px 0 8px", fontStyle:"italic" }}>
                  Select at least one item to continue
                </div>
              )}
            </>
          )}

          {/* ════ STEP 2 ════ */}
          {step===2 && (
            <>
              <div style={S.sectionTitle}>Your Details</div>
              <div style={S.sectionSub}>Where should we deliver your order?</div>
              <div style={S.formCard}>
                <span style={S.formLabel}>Personal Information</span>
                <div style={S.inputGrid}>
                  <div>
                    <input style={{...S.input,...(errors.name?S.inputErr:{})}} placeholder="Full Name *" value={name} onChange={(e)=>setName(e.target.value)} />
                    {errors.name&&<div style={S.errTxt}>{errors.name}</div>}
                  </div>
                  <div>
                    <input style={{...S.input,...(errors.phone?S.inputErr:{})}} placeholder="Phone Number *" value={phone} maxLength={10} onChange={(e)=>setPhone(e.target.value.replace(/\D/,""))} />
                    {errors.phone&&<div style={S.errTxt}>{errors.phone}</div>}
                  </div>
                </div>
              </div>
              <div style={S.formCard}>
                <span style={S.formLabel}>Delivery Address</span>
                <div style={S.inputFull}>
                  <div>
                    <input style={{...S.input,...(errors.address?S.inputErr:{})}} placeholder="Full Address *" value={address} onChange={(e)=>setAddress(e.target.value)} />
                    {errors.address&&<div style={S.errTxt}>{errors.address}</div>}
                  </div>
                </div>
                <div style={S.inputGrid}>
                  <input style={S.input} placeholder="Place"       value={place}      onChange={(e)=>setPlace(e.target.value)} />
                  <input style={S.input} placeholder="Town"        value={town}       onChange={(e)=>setTown(e.target.value)} />
                  <input style={S.input} placeholder="Estate Code" value={estatecode} onChange={(e)=>setEstatecode(e.target.value)} />
                  <div>
                    <input style={{...S.input,...(errors.pincode?S.inputErr:{})}} placeholder="Pincode *" maxLength={6} value={pincode} onChange={(e)=>setPincode(e.target.value.replace(/\D/,""))} />
                    {errors.pincode&&<div style={S.errTxt}>{errors.pincode}</div>}
                  </div>
                </div>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button style={S.ghostBtn} onClick={()=>setStep(1)}>← Back</button>
                <button style={{...S.primaryBtn,flex:1,marginTop:0}} onClick={()=>{if(validateStep2())setStep(3);}}>Continue to Payment →</button>
              </div>
            </>
          )}

          {/* ════ STEP 3 ════ */}
          {step===3 && (
            <>
              <div style={S.sectionTitle}>Payment</div>
              <div style={S.sectionSub}>Choose how you'd like to pay</div>
              <div style={S.orderSummaryBox}>
                <div style={{color:"#8BC34A",fontWeight:700,fontSize:"0.7rem",letterSpacing:"1.2px",textTransform:"uppercase",marginBottom:12,borderBottom:"1px solid rgba(139,195,74,0.1)",paddingBottom:8}}>Order Summary</div>
                {cart.map((item)=>(
                  <div key={item.id} style={S.summaryRow}>
                    <span>{item.category==="Gift Boxes"?"🎁 ":""}{item.name} × {item.quantity} ({item.qty})</span>
                    <span style={{color:"#8BC34A"}}>₹{item.price*item.quantity}</span>
                  </div>
                ))}
                <div style={S.summaryTotal}>
                  <span>Total Amount</span>
                  <span style={{color:"#8BC34A",fontFamily:"'Playfair Display',serif"}}>₹{totalPrice}</span>
                </div>
              </div>
              {PAYMENT_METHODS.map((method)=>{
                const sel=paymentMethod===method.id;
                return (
                  <div key={method.id} style={{ display:"flex", alignItems:"center", gap:12, borderRadius:10, padding:"12px 14px", cursor:"pointer", marginBottom:8, transition:"all 0.2s", background:sel?"rgba(139,195,74,0.1)":"rgba(255,255,255,0.03)", border:sel?"2px solid #8BC34A":"1.5px solid rgba(255,255,255,0.08)" }} onClick={()=>{setPaymentMethod(method.id);setErrors({});}}>
                    <div style={{fontSize:22,width:36,textAlign:"center"}}>{method.icon}</div>
                    <div>
                      <div style={{fontWeight:600,color:"#fff",fontSize:"0.9rem"}}>{method.label}</div>
                      <div style={{color:"rgba(255,255,255,0.38)",fontSize:"0.73rem"}}>{method.desc}</div>
                    </div>
                    <div style={{ width:18,height:18,borderRadius:"50%",border:sel?"2px solid #8BC34A":"2px solid rgba(255,255,255,0.2)",background:sel?"#8BC34A":"transparent",marginLeft:"auto",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
                      {sel&&<div style={{width:7,height:7,borderRadius:"50%",background:"#0c1007"}} />}
                    </div>
                  </div>
                );
              })}
              {errors.payment&&<div style={S.errTxt}>{errors.payment}</div>}
              <div style={{display:"flex",gap:10}}>
                <button style={S.ghostBtn} onClick={()=>setStep(2)}>← Back</button>
                <button style={{...S.primaryBtn,flex:1,marginTop:0}} onClick={handlePlaceOrder}>🚀 Place Order via WhatsApp</button>
              </div>
              <div style={S.waHint}>📲 You'll be redirected to WhatsApp to confirm with the Dnuts shop</div>
            </>
          )}
        </div>
      </div>

      {showSnackbar&&(
        <div style={S.snackbar}>
          {snackbarMsg ? (
            <span>{snackbarMsg}</span>
          ) : (
            <>
              🎉 Order Sent!<br />
              <span style={{fontWeight:500,fontSize:"0.82rem"}}>You'll receive a confirmation call from the Dnuts shop shortly.</span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default OrderPage;
