// ============================================================
// script.js — SONIX RJ Company
// Marketplace principal: productos, modal, carrito, IA, Firebase
// ============================================================


// ============================================================
// 1. IMPORTS
//    Realtime Database: reacciones y comentarios (push/onValue)
//    Auth: detectar usuario activo
// ============================================================

import { auth, db } from "./firebase.js";

import {
  ref,
  set,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


// ============================================================
// 2. CONFIGURACIÓN DE REDES SOCIALES
//    ↓↓↓ EDITA ESTOS DATOS CON TUS DATOS REALES ↓↓↓
// ============================================================

const socialLinks = {
  whatsapp:  "573170780206",       // SIN el +
  instagram: "samuelrodriguez9855", // SIN @
  facebook:  "sonixrjcompany"      // slug de tu página
};


// ============================================================
// 3. CATÁLOGO DE PRODUCTOS
// ============================================================

const products = [
  {
    id: 1,
    name: "Audífonos Bluetooth Pro",
    summary: "Sonido envolvente, cancelación de ruido activa",
    description: "Experimenta audio de alta fidelidad con nuestros audífonos Bluetooth Pro. Cuentan con cancelación de ruido activa (ANC), autonomía de hasta 40 horas, carga rápida en 15 minutos y conectividad multipoint para dos dispositivos simultáneos. Driver de 40mm con respuesta de frecuencia extendida. Perfectos para trabajo, viajes y entretenimiento.",
    price: 1.000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format",
    badge: "AUDIO",
    keywords: ["audifono", "audifonos", "auricular", "bluetooth", "audio", "musica", "sonido", "cascos"]
  },
  {
    id: 2,
    name: "Teclado Gamer RGB",
    summary: "Mecánico, switches Cherry MX, retroiluminación RGB",
    description: "Teclado mecánico gaming con switches Cherry MX Red para una respuesta ultra rápida. Retroiluminación RGB personalizable con 16.8 millones de colores y 18 efectos predefinidos. Construcción en aluminio anodizado, anti-ghosting completo, reposamuñecas magnético incluido y cable trenzado desmontable. Compatible con Windows y macOS.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop&auto=format",
    badge: "GAMING",
    keywords: ["teclado", "keyboard", "gamer", "gaming", "mecanico", "rgb", "pc"]
  },
  {
    id: 3,
    name: "Mouse RGB Precision",
    summary: "16.000 DPI, diseño ergonómico, 8 botones",
    description: "Mouse gaming de alta precisión con sensor óptico de 16.000 DPI ajustable. 8 botones programables, retroiluminación RGB con 7 zonas independientes, clic ambidextro y diseño ergonómico para sesiones largas. Peso ajustable con sistema de contrapesos incluido. Compatible con todos los sistemas operativos.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop&auto=format",
    badge: "GAMING",
    keywords: ["mouse", "raton", "gamer", "gaming", "rgb", "pc", "periférico"]
  },
  {
    id: 4,
    name: "Laptop Ultrabook 15\"",
    summary: "Intel i7, 16GB RAM, SSD 512GB, pantalla FHD",
    description: "Potencia portátil en un diseño ultra delgado (14mm). Procesador Intel Core i7 de 12ª generación, 16GB RAM DDR5, SSD NVMe de 512GB y pantalla IPS Full HD de 15.6 pulgadas con 144Hz. Batería de 72Wh con autonomía de 10 horas, lector de huellas, teclado retroiluminado y Thunderbolt 4. Ideal para trabajo, diseño y gaming casual.",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&auto=format",
    badge: "LAPTOP",
    keywords: ["laptop", "portatil", "computadora", "notebook", "pc", "computador"]
  },
  {
    id: 5,
    name: "Parlante Bluetooth 360°",
    summary: "Sonido omnidireccional, resistente al agua IPX7",
    description: "Parlante portátil con sonido 360° omnidireccional y bajos profundos. Resistencia al agua certificada IPX7 (sumergible hasta 1 metro por 30 minutos). Autonomía de 24 horas, carga rápida USB-C, modo True Wireless Stereo para conectar dos parlantes simultáneamente y micrófono integrado para llamadas. Ideal para exteriores y fiestas.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&auto=format",
    badge: "AUDIO",
    keywords: ["parlante", "bocina", "speaker", "bluetooth", "audio", "musica", "portatil"]
  },
  {
    id: 6,
    name: "Smartwatch Series X",
    summary: "AMOLED, GPS, 100+ modos deporte, 7 días batería",
    description: "Smartwatch con pantalla AMOLED Always-On de 1.8 pulgadas, GPS integrado con 5 sistemas satelitales y más de 100 modos de ejercicio. Monitoreo continuo de frecuencia cardíaca, SpO2, estrés y ciclos de sueño. Resistencia WR50, batería de 7 días, notificaciones inteligentes y pagos NFC. Compatible con Android e iOS.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop&auto=format",
    badge: "WEARABLE",
    keywords: ["smartwatch", "reloj", "watch", "smart", "fitness", "deporte", "wearable"]
  },
  {
    id: 7,
    name: "Monitor Curvo 27\" 165Hz",
    summary: "2K QHD, 1ms, panel VA, compatible G-Sync/FreeSync",
    description: "Monitor curvo gaming 27 pulgadas con resolución 2K QHD (2560×1440), tasa de refresco de 165Hz y tiempo de respuesta de 1ms. Panel VA con curvatura 1500R, cobertura DCI-P3 del 90%, HDR400, soporte VESA 100×100, puertos HDMI 2.0 y DisplayPort 1.4. Compatible con G-Sync y AMD FreeSync Premium para una experiencia sin desgarramientos.",
    price: 329.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop&auto=format",
    badge: "MONITOR",
    keywords: ["monitor", "pantalla", "screen", "display", "gaming", "pc", "curvo"]
  },
  {
    id: 8,
    name: "Cámara Web 4K Pro",
    summary: "4K 30fps, autofoco AI, micrófono dual con cancelación",
    description: "Cámara web profesional para streaming, videoconferencias y creación de contenido. Resolución 4K Ultra HD a 30fps o Full HD a 60fps, autofoco inteligente con IA que te sigue, micrófono dual con cancelación de ruido, corrección automática de luz en entornos oscuros y campo de visión de 90°. Compatible con Zoom, Teams, OBS y todas las plataformas. Plug & Play sin drivers.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop&auto=format",
    badge: "CAMARA",
    keywords: ["camara", "webcam", "web", "streaming", "video", "conferencia", "zoom"]
  },
  {
    id: 9,
    name: "4 huecos",
    summary: "navaja de 4 huecos para defensa personal",
    description: "navaja de 4 huecos para defensa personal, con diseño ergonómico y hoja de acero inoxidable. Ideal para llevar en el bolsillo o como accesorio de seguridad. Perfecta para situaciones de emergencia y autodefensa. Compacta, ligera y fácil de usar.",
    price: 1400,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_cNv4UFUVPf6qi2XOCURqXJGQfDLZWaJYrw&s",
    badge: "DEFENSA",
    keywords: ["navaja", "cuchillo", "pata cabra", "defensa", "lata"]
  }
];


// ============================================================
// 4. ESTADO GLOBAL
// ============================================================

const state = {
  cart:           [],
  currentProduct: null,
  reactions:      {},
  comments:       {},
  aiOpen:         false
};

let currentUser          = null;
let cartListenerAttached = false; // evita registrar onValue múltiple veces

// Inicializar reacciones y comentarios para cada producto
products.forEach(p => {
  state.reactions[p.id] = { like: 0, love: 0, fire: 0 };
  state.comments[p.id]  = [];
});


// ============================================================
// 5. RENDERIZADO DE PRODUCTOS
// ============================================================

function renderProducts(list = products) {
  const grid      = document.getElementById("productsGrid");
  const noResults = document.getElementById("noResults");
  const count     = document.getElementById("productCount");

  if (!list.length) {
    grid.innerHTML = "";
    noResults.classList.remove("hidden");
    count.textContent = "0 productos";
    return;
  }

  noResults.classList.add("hidden");
  count.textContent = `${list.length} producto${list.length !== 1 ? "s" : ""} disponible${list.length !== 1 ? "s" : ""}`;

  grid.innerHTML = list.map((product, i) => `
    <article
      class="product-card"
      data-id="${product.id}"
      style="animation-delay:${i * 0.06}s"
      role="button"
      tabindex="0"
      aria-label="Ver ${product.name}"
    >
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <div class="product-overlay"><span>Ver producto</span></div>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-summary">${product.summary}</p>
        <div class="product-footer">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          <button class="btn-view" aria-label="Ver ${product.name}">Ver producto</button>
        </div>
      </div>
    </article>
  `).join("");

  // Un solo listener por tarjeta, sin duplicados
  grid.querySelectorAll(".product-card").forEach(card => {
    const open = () => openModal(parseInt(card.dataset.id));
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") open();
    });
  });
}


// ============================================================
// 6. MODAL — Apertura y cierre
// ============================================================

function openModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  state.currentProduct = product;

  document.getElementById("modalImage").src          = product.image;
  document.getElementById("modalImage").alt          = product.name;
  document.getElementById("modalTitle").textContent  = product.name;
  document.getElementById("modalPrice").textContent  = `$${product.price.toFixed(2)}`;
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("modalBadge").textContent  = product.badge;

  // Limpiar estado reacted de botones anteriores
  document.querySelectorAll(".reaction-btn").forEach(b => b.classList.remove("reacted"));

  loadReactions(productId);
  renderComments(productId);

  document.getElementById("buyOptions").classList.add("hidden");

  const overlay = document.getElementById("productModal");
  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("productModal").classList.add("hidden");
  document.body.style.overflow = "";
  state.currentProduct = null;
}

document.getElementById("modalClose").addEventListener("click", closeModal);

document.getElementById("productModal").addEventListener("click", function(e) {
  if (e.target === this) closeModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeModal();
    closeCart();
  }
});


// ============================================================
// 7. REACCIONES (👍 ❤️ 🔥)
// ============================================================

function updateReactionUI() {
  const id = state.currentProduct?.id;
  if (!id) return;
  const reactionData = state.reactions[id];

  document.querySelectorAll(".reaction-btn").forEach(btn => {
    const type = btn.dataset.reaction;
    btn.querySelector(".reaction-count").textContent = reactionData[type] ?? 0;
  });
}

function loadReactions(productId) {
  const reactionsRef = ref(db, `reactions/${productId}`);
  onValue(reactionsRef, snapshot => {
    const data = snapshot.val();
    if (data) {
      state.reactions[productId] = data;
      updateReactionUI();
    }
  });
}

// Un solo bloque de listeners para reacciones
document.querySelectorAll(".reaction-btn").forEach(btn => {
  btn.addEventListener("click", function() {
    const id = state.currentProduct?.id;
    if (!id) return;
    const type = this.dataset.reaction;

    if (this.classList.contains("reacted")) {
      this.classList.remove("reacted");
      state.reactions[id][type] = Math.max(0, state.reactions[id][type] - 1);
    } else {
      this.classList.add("reacted");
      state.reactions[id][type]++;
      set(ref(db, `reactions/${id}/${type}`), state.reactions[id][type]);
    }

    this.style.transform = "scale(1.2)";
    setTimeout(() => this.style.transform = "", 180);
    updateReactionUI();
  });
});


// ============================================================
// 8. COMPRA POR REDES SOCIALES (producto individual)
// ============================================================

// CORREGIDO: un solo listener por botón (antes había 2 en buyOptions)
document.getElementById("btnBuy").addEventListener("click", function() {
  document.getElementById("buyOptions").classList.toggle("hidden");
});

document.getElementById("cancelBuy").addEventListener("click", function() {
  document.getElementById("buyOptions").classList.add("hidden");
});

document.getElementById("btnWhatsApp").addEventListener("click", function() {
  const p = state.currentProduct;
  if (!p) return;
  const msg = encodeURIComponent(
    `¡Hola SONIX RJ Company! 👋\n\nQuiero comprar este producto:\n\n🛒 *${p.name}*\n💰 Precio: $${p.price.toFixed(2)}\n\n¿Está disponible?`
  );
  window.open(`https://wa.me/${socialLinks.whatsapp}?text=${msg}`, "_blank");
});

document.getElementById("btnInstagram").addEventListener("click", function() {
  const p = state.currentProduct;
  if (!p) return;
  window.open(`https://www.instagram.com/${socialLinks.instagram}/`, "_blank");
  showToast(`Abriendo Instagram. Menciona: "${p.name} - $${p.price.toFixed(2)}"`);
});

document.getElementById("btnFacebook").addEventListener("click", function() {
  const p = state.currentProduct;
  if (!p) return;
  window.open(`https://www.facebook.com/${socialLinks.facebook}`, "_blank");
  showToast(`Abriendo Facebook. Menciona: "${p.name} - $${p.price.toFixed(2)}"`);
});


// ============================================================
// 9. CARRITO DE COMPRAS
// ============================================================

function addToCart(product) {
  const existing = state.cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    state.cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  saveCartToFirebase();
  showToast(`"${product.name}" agregado al carrito 🛒`);

  const badge = document.getElementById("cartBadge");
  badge.style.transform = "scale(1.5)";
  setTimeout(() => badge.style.transform = "", 200);
}

document.getElementById("btnAddCart").addEventListener("click", function() {
  if (state.currentProduct) addToCart(state.currentProduct);
});

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
document.getElementById("cartOverlay").addEventListener("click", closeCart);

function openCart() {
  document.getElementById("cartSidebar").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cartSidebar").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function updateCartUI() {
  const items      = document.getElementById("cartItems");
  const badge      = document.getElementById("cartBadge");
  const totalEl    = document.getElementById("cartTotal");
  const totalItems = state.cart.reduce((s, i) => s + (i.qty || 1), 0);
  const totalPrice = state.cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);

  badge.textContent   = totalItems;
  totalEl.textContent = `$${totalPrice.toFixed(2)}`;

  if (!state.cart.length) {
    items.innerHTML = `<p class="cart-empty">Tu carrito está vacío.</p>`;
    return;
  }

  items.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)} × ${item.qty || 1}</div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}" aria-label="Eliminar">✕</button>
    </div>
  `).join("");

  items.querySelectorAll(".cart-item-remove").forEach(btn => {
    btn.addEventListener("click", function() {
      state.cart = state.cart.filter(i => i.id !== parseInt(this.dataset.id));
      updateCartUI();
      saveCartToFirebase();
    });
  });
}

// CORREGIDO: saveCartToFirebase en un solo lugar
function saveCartToFirebase() {
  const user = auth.currentUser;
  if (!user) return;
  set(ref(db, "carts/" + user.uid), state.cart);
}

// Cargar carrito del usuario (un solo listener, protegido con flag)
function loadUserCart(uid) {
  if (cartListenerAttached) return;
  cartListenerAttached = true;

  onValue(ref(db, "carts/" + uid), snapshot => {
    const data = snapshot.val();
    if (Array.isArray(data) && data.length) {
      state.cart = data;
      updateCartUI();
    }
  });
}


// ============================================================
// 10. GUARDAR PRODUCTO (btnSave)
// ============================================================

function saveProduct(product) {
  const user = auth.currentUser;
  if (!user) {
    showToast("Inicia sesión para guardar productos ⭐");
    return;
  }
  const savedRef = ref(db, `saved/${user.uid}/${product.id}`);
  set(savedRef, {
    id:    product.id,
    name:  product.name,
    price: product.price,
    image: product.image
  });
  showToast(`"${product.name}" guardado ⭐`);
}

document.getElementById("btnSave").addEventListener("click", () => {
  if (state.currentProduct) saveProduct(state.currentProduct);
});


// ============================================================
// 11. COMENTARIOS
// ============================================================

function renderComments(productId) {
  const list = document.getElementById("commentsList");
  const commentsRef = ref(db, `comments/${productId}`);

  onValue(commentsRef, snapshot => {
    const data = snapshot.val();

    if (!data) {
      list.innerHTML = `<p style="color:gray;">Sé el primero en comentar.</p>`;
      return;
    }

    list.innerHTML = Object.values(data).map(c => `
      <div class="comment-item">
        <div class="comment-author">${escapeHtml(c.author)}</div>
        <div class="comment-text">${escapeHtml(c.text)}</div>
        <div class="comment-time">${c.time}</div>
      </div>
    `).join("");
  });
}

document.getElementById("btnComment").addEventListener("click", function() {
  const authorInput = document.getElementById("commentAuthor");
  const textInput   = document.getElementById("commentText");
  const id          = state.currentProduct?.id;
  if (!id) return;

  const author = authorInput.value.trim() || "Anónimo";
  const text   = textInput.value.trim();

  if (!text) {
    textInput.focus();
    textInput.style.borderColor = "#ff4d4d";
    setTimeout(() => textInput.style.borderColor = "", 1500);
    return;
  }

  const now  = new Date();
  const time = now.toLocaleString("es-CO", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

  push(ref(db, `comments/${id}`), { author, text, time });

  textInput.value   = "";
  authorInput.value = "";
  showToast("¡Comentario enviado! 💬");
});

// Ctrl+Enter para enviar comentario
document.getElementById("commentText").addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.key === "Enter") {
    document.getElementById("btnComment").click();
  }
});

// Protección XSS — aplicada en renderComments
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}


// ============================================================
// 12. BUSCADOR
// ============================================================

const searchInput = document.getElementById("searchInput");
const searchBtn   = document.getElementById("searchBtn");

function performSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) { renderProducts(); return; }

  const results = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.summary.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query) ||
    p.keywords.some(k => k.includes(query))
  );
  renderProducts(results);
}

searchBtn.addEventListener("click", performSearch);
searchInput.addEventListener("keydown", e => { if (e.key === "Enter") performSearch(); });

let searchTimer;
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(performSearch, 300);
});

function resetSearch() {
  searchInput.value = "";
  renderProducts();
}
window.resetSearch = resetSearch;


// ============================================================
// 13. ASISTENTE DE IA
// ============================================================

const aiResponses = {
  saludo:    ["¡Hola! 👋 Soy el asistente de SONIX RJ. ¿En qué te puedo ayudar hoy?", "¡Bienvenido/a! Estoy aquí para ayudarte a encontrar el producto perfecto. ¿Qué estás buscando?"],
  despedida: ["¡Hasta luego! 👋 Fue un placer ayudarte.", "¡Cuídate mucho! Si necesitas algo más, aquí estaré. 😊"],
  precio:    ["Todos nuestros precios son competitivos y están visibles en cada producto. ¿Sobre qué producto quieres saber más?", "Tenemos productos desde $49.99 hasta $899.99. ¿Tienes un presupuesto en mente?"],
  envio:     ["📦 Coordinamos envíos a todo el país. Para más detalles, contáctanos por WhatsApp o Instagram.", "Los envíos se coordinan directamente con nosotros. ¡Escríbenos por WhatsApp!"],
  pago:      ["💳 Aceptamos transferencias, efectivo y pagos por redes sociales. Contáctanos para más info.", "Puedes pagar de varias formas. ¡Escríbenos por WhatsApp para coordinar!"],
  garantia:  ["✅ Todos nuestros productos tienen garantía. Para detalles específicos, contáctanos por WhatsApp.", "Ofrecemos garantía en todos nuestros productos. ¿Sobre cuál quieres saber más?"],
  default:   ["Hmm, no estoy seguro de entender. ¿Puedes reformular tu pregunta? 🤔", "Intenta buscar con palabras como: 'audífonos', 'laptop', 'mouse', etc.", "Puedo ayudarte a encontrar productos. ¿Qué tipo de producto buscas?"]
};

function initAI() {
  const messages = document.getElementById("aiMessages");
  messages.innerHTML = "";
  addAIMessage("bot", "¡Hola! 👋 Soy el asistente de **SONIX RJ**.\n\nPuedo ayudarte a encontrar el producto que necesitas. Escríbeme, por ejemplo:\n• \"Busco audífonos\"\n• \"Quiero un teclado gamer\"\n• \"Necesito una laptop\"");
}

function addAIMessage(type, text, suggestions = []) {
  const messages = document.getElementById("aiMessages");
  const div      = document.createElement("div");
  div.className  = `ai-msg ${type}`;
  div.innerHTML  = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
  messages.appendChild(div);

  suggestions.forEach(product => {
    const sug      = document.createElement("div");
    sug.className  = "ai-product-suggestion";
    sug.innerHTML  = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="ai-product-suggestion-info">
        <div class="ai-product-suggestion-name">${product.name}</div>
        <div class="ai-product-suggestion-price">$${product.price.toFixed(2)}</div>
      </div>
    `;
    sug.addEventListener("click", () => {
      closeAIPanel();
      openModal(product.id);
    });
    messages.appendChild(sug);
  });

  messages.scrollTop = messages.scrollHeight;
}

function processAIMessage(userText) {
  const text = userText.toLowerCase().trim();
  addAIMessage("user", userText);

  setTimeout(() => {
    if (/^(hola|hey|buenas|hi|saludos|buen[oa]s)/.test(text)) {
      addAIMessage("bot", pickRandom(aiResponses.saludo)); return;
    }
    if (/(adios|hasta luego|bye|chau|gracias|thank)/.test(text)) {
      addAIMessage("bot", pickRandom(aiResponses.despedida)); return;
    }
    if (/(precio|cuanto|cuesta|vale|cost)/.test(text)) {
      addAIMessage("bot", pickRandom(aiResponses.precio)); return;
    }
    if (/(envio|envío|despacho|delivery|llega|manda)/.test(text)) {
      addAIMessage("bot", pickRandom(aiResponses.envio)); return;
    }
    if (/(pago|pagar|transferencia|efectivo|tarjeta)/.test(text)) {
      addAIMessage("bot", pickRandom(aiResponses.pago)); return;
    }
    if (/(garantia|garantía|garantiz|devolucion|cambio)/.test(text)) {
      addAIMessage("bot", pickRandom(aiResponses.garantia)); return;
    }

    const matched = products.filter(p =>
      p.keywords.some(k => text.includes(k)) ||
      p.name.toLowerCase().split(" ").some(w => text.includes(w))
    );

    if (matched.length) {
      const intro = matched.length === 1
        ? "¡Encontré el producto perfecto para ti! 🎯"
        : `¡Encontré ${matched.length} productos que podrían interesarte! 🎯`;
      addAIMessage("bot", intro, matched.slice(0, 3));
    } else {
      const words     = text.split(/\s+/);
      const flexMatch = products.filter(p =>
        words.some(w => w.length > 2 && p.keywords.some(k => k.includes(w)))
      );
      if (flexMatch.length) {
        addAIMessage("bot", "Quizás esto te interese 👇", flexMatch.slice(0, 2));
      } else {
        addAIMessage("bot", pickRandom(aiResponses.default));
        setTimeout(() => {
          addAIMessage("bot", "Estos son algunos de nuestros productos más populares:", products.slice(0, 3));
        }, 800);
      }
    }
  }, 600);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// CORREGIDO: un solo listener para aiToggle
document.getElementById("aiToggle").addEventListener("click", function() {
  const panel  = document.getElementById("aiPanel");
  state.aiOpen = !state.aiOpen;

  if (state.aiOpen) {
    panel.classList.remove("hidden");
    if (!document.getElementById("aiMessages").children.length) initAI();
    document.getElementById("aiInput").focus();
  } else {
    panel.classList.add("hidden");
  }
});

document.getElementById("aiClose").addEventListener("click", closeAIPanel);

function closeAIPanel() {
  document.getElementById("aiPanel").classList.add("hidden");
  state.aiOpen = false;
}

document.getElementById("aiSend").addEventListener("click", sendAIMessage);

// CORREGIDO: un solo listener para aiInput
document.getElementById("aiInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") sendAIMessage();
});

function sendAIMessage() {
  const input = document.getElementById("aiInput");
  const text  = input.value.trim();
  if (!text) return;
  input.value = "";
  processAIMessage(text);
}


// ============================================================
// 14. TOAST NOTIFICATION
// ============================================================

function showToast(message) {
  const existing = document.getElementById("toastNotif");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id    = "toastNotif";
  toast.textContent = message;
  Object.assign(toast.style, {
    position:   "fixed",
    bottom:     "100px",
    right:      "28px",
    background: "#1f1f1f",
    color:      "#f0f0f0",
    border:     "1px solid rgba(61,165,255,0.3)",
    padding:    "12px 20px",
    borderRadius: "12px",
    fontSize:   "0.875rem",
    fontFamily: "var(--font-body, DM Sans)",
    zIndex:     "2000",
    boxShadow:  "0 4px 24px rgba(0,0,0,0.4)",
    animation:  "fadeInUp 0.3s ease",
    maxWidth:   "280px",
    lineHeight: "1.4"
  });

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity    = "0";
    toast.style.transition = "opacity 0.4s ease";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}


// ============================================================
// 15. CARRITO — COMPRA POR REDES SOCIALES
// ============================================================

function buildCartMessage() {
  if (!state.cart.length) {
    showToast("Tu carrito está vacío 🛒");
    return null;
  }

  let message = "¡Hola SONIX RJ Company! 👋\n\nQuiero comprar estos productos:\n\n";
  let total   = 0;

  state.cart.forEach(item => {
    const qty   = item.qty || 1;
    const price = item.price * qty;
    message += `🛒 ${item.name}\nCantidad: ${qty}\nPrecio: $${price.toFixed(2)}\n\n`;
    total   += price;
  });

  message += `💰 TOTAL: $${total.toFixed(2)}\n\n¿Están disponibles?`;
  return encodeURIComponent(message);
}

// CORREGIDO: cartBuyToggle y cartBuyAll — un listener cada uno, sin duplicados
document.getElementById("cartBuyToggle").addEventListener("click", function() {
  document.getElementById("cartBuyOptions").classList.toggle("hidden");
});

document.getElementById("cartBuyAll").addEventListener("click", function() {
  if (!state.cart.length) {
    showToast("Tu carrito está vacío 🛒");
    return;
  }
  document.getElementById("cartBuyOptions").classList.remove("hidden");
});

document.getElementById("cartWhatsApp").addEventListener("click", function() {
  const msg = buildCartMessage();
  if (!msg) return;
  window.open(`https://wa.me/${socialLinks.whatsapp}?text=${msg}`, "_blank");
});

document.getElementById("cartInstagram").addEventListener("click", function() {
  const msg = buildCartMessage();
  if (!msg) return;
  window.open(`https://www.instagram.com/direct/t/${socialLinks.instagram}`, "_blank");
});

document.getElementById("cartFacebook").addEventListener("click", function() {
  const msg = buildCartMessage();
  if (!msg) return;
  window.open(`https://www.facebook.com/messages/t/${socialLinks.facebook}`, "_blank");
});


// ============================================================
// 16. PANEL DE PERFIL
// ============================================================

function loadProfile() {
  const info = document.getElementById("profileInfo");
  if (!info) return;

  if (!currentUser) {
    info.innerHTML = `
      <div style="text-align:center;">
        <div style="font-size:40px;">👤</div>
        <div>Invitado</div>
        <small>Inicia sesión para guardar tus datos</small>
      </div>
    `;
    const profileCart = document.getElementById("profileCart");
    if (profileCart) profileCart.innerHTML = "<p>No hay datos guardados</p>";
    return;
  }

  info.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;">
      <img src="${currentUser.photoURL}" width="50" style="border-radius:50%">
      <div>
        <div>${currentUser.displayName}</div>
        <small>${currentUser.email}</small>
      </div>
    </div>
  `;

  // Renderizar carrito en el panel (sin crear un nuevo listener)
  const profileCart = document.getElementById("profileCart");
  if (profileCart) {
    if (!state.cart.length) {
      profileCart.innerHTML = "No tienes productos en el carrito.";
    } else {
      profileCart.innerHTML = state.cart.map(p => `
        <div style="display:flex;gap:10px;margin:10px 0;">
          <img src="${p.image}" width="40">
          <div>
            <div>${p.name}</div>
            <small>$${p.price.toFixed(2)} x ${p.qty || 1}</small>
          </div>
        </div>
      `).join("");
    }
  }
}

// Abrir perfil (compatible con userProfile del código anterior si existe)
document.getElementById("userProfile")?.addEventListener("click", () => {
  const panel = document.getElementById("profilePanel");
  if (panel) panel.classList.remove("hidden");
  loadProfile();
});

// Cerrar perfil — CORREGIDO: un solo listener (login.js maneja el segundo)
document.getElementById("closeProfile")?.addEventListener("click", () => {
  document.getElementById("profilePanel")?.classList.add("hidden");
});


// ============================================================
// 17. AUTH OBSERVER — detecta login/logout en tiempo real
// ============================================================

onAuthStateChanged(auth, user => {
  currentUser = user;

  if (user) {
    cartListenerAttached = false; // permite re-registrar si cambia de cuenta
    loadUserCart(user.uid);
  } else {
    // Al cerrar sesión, vaciar carrito local
    state.cart = [];
    cartListenerAttached = false;
    updateCartUI();
  }
});


// ============================================================
// 18. INICIALIZACIÓN
// ============================================================

document.addEventListener("DOMContentLoaded", function() {
  renderProducts();
  updateCartUI();
  console.log("✅ SONIX RJ Company — Marketplace iniciado correctamente");
  console.log(`📦 ${products.length} productos cargados`);
});