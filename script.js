// ============================================================
// script.js — SONIX RJ Company
// Marketplace principal: productos, modal, carrito, IA, Firebase
// ============================================================


// ============================================================
// 1. IMPORTS
//    Realtime Database: reacciones y comentarios (push/onValue)
//    Auth: detectar usuario activo
// ============================================================

import { 
  auth, 
  db, 
  ref, 
  set, 
  push, 
  onValue, 
  onAuthStateChanged 
} from "./firebase.js";

// ============================================================
// 2. CONFIGURACIÓN DE REDES SOCIALES
//    ↓↓↓ EDITA ESTOS DATOS CON TUS DATOS REALES ↓↓↓
// ============================================================

const socialLinks = {
  whatsapp:  "573170780206",       // SIN el +
  instagram: "sonix.company", // SIN @
  facebook:  "sonixrjcompany"      // slug de tu página
};


// ============================================================
// 3. CATÁLOGO DE PRODUCTOS
// ============================================================

const products = [
  {
    id: 1,
    name: "COMBO SMARTBAND 2 EN 1",
    summary: "Sonido envolvente, Reloj inteligente,la bateria de 4 horas ",
    description: "Reloj inteligente con mas de 15 funciones distintas con audífonos TWS inalámbricos V5.2, duración de la bateria de 4 horas y rango de 10m",
    price: 59900,
    images: [
      "img/nose1.png",
      "img/nose2.png",
      "img/nose3.png",
      "img/nose4.png",
      "img/nose5.png",
      "img/nose6.png"
    ],
    badge: "AUDIO",
    keywords: ["audifono", "audifonos", "auricular", "bluetooth", "audio", "musica", "sonido", "cascos", "reloj", "smartwatch", "reloj inteligente", "fitness", "deporte", "wearable"]
  },
  {
    id: 2,
    name: "AUDIFONOS A2",
    summary: "Conectividad Bluetooth 5.3, Colores: Negro, ",
    description: "Conectividad Bluetooth 5.3Colores: Blanco, Azul, Negroy Rosado con hasta 4h deuso + carga extra con el estuche",
    price: 29900,
    images: [
      "img/A2-1.png",
      "img/A2-2.png",
      "img/A2-3.png"
    ],
    badge: "AUDIO",
    keywords: ["audifono", "audifonos", "auricular", "bluetooth", "audio", "musica", "sonido", "cascos"]
  },
  {
    id: 3,
    name: "AIRPODS A6S",
    summary: "resistencia al agua IPX4,auriculares in-ear,conocidos por su diseño compacto",
    description: "Bluetooth V 5.0Tiempo de trabajo 3-4 horasSon de alta resistencia con estilodeportivo auriculares in-ear inalámbricos de gama económica con Bluetooth 5.0/5.1, conocidos por su diseño compacto, resistencia al agua IPX4 y estuche de carga magnético",
    price: 26000,
    images: [
      "img/A6S-1.png",
      "img/A6S-2.png"
    ],
    badge: "AUDIO",
    keywords: ["audifono", "audifonos", "auricular", "bluetooth", "audio", "musica", "sonido", "cascos"]
  },
  {
    id: 4,
    name: "AURICULARES X15 GAMING",
    summary: "diseñados para gaming, iluminación RGB, sin almohadillas",
    description: "son audífonos TWS (True Wireless) diseñados para gaming, destacados por su iluminación RGB, Bluetooth 5.0/5.1 y un diseño ergonómico",
    price: 25000,
    images: [
      "img/x15-1.png",
      "img/x15-2.png",
    ],
    badge: "GAMING",
    keywords: ["auricular", "audifono", "audifonos", "bluetooth", "audio", "musica", "sonido", "cascos", "gaming", "rgb"]
  },
  {
    id: 5,
    name: "PARLANTE MS-1695BT",
    summary: "Color: Negro, Potencia: 5W Bocina de 3 pulgadas Con TF card, USB, FM y Bluetooth",
    description: "dispositivo compacto de audio inalámbrico con conectividad Bluetooth, luces LED integradas y batería recargable. Ofrece funciones versátiles como radio FM, lector de tarjetas TF/MicroSD y puerto USB, ideal para reproducir música en exteriores o espacios pequeños con una potencia de 5W",
    price: 33000,
    images: [
       "img/MS-1695BT1.png",
      "img/MS-1695BT2.png",
      "img/MS-1695BT3.png",
      "img/MS-1695BT4.png",
      "img/MS-1695BT5.png",
      "img/MS-1695BT6.png"
    ],
    badge: "AUDIO",
    keywords: ["parlante", "bocina", "speaker", "bluetooth", "audio", "musica", "portatil"]
  },
  {
    id: 6,
    name: "PARLANTE MS-1693BT ",
    summary: "Color: Negro, Potencia: 5W Bocina de 3 pulgadas, Con TF card, USB, FM y Bluetooth",
    description: "dispositivo compacto y versátil de 5W de potencia con conectividad Bluetooth, radio FM y lector de memorias USB/Micro SD. Cuenta con batería recargable, luces LED decorativas, entrada auxiliar y opción de uso con batería externa, ideal para llevar a cualquier lugar.",
    price: 35000,
    images: [
      "img/MS-1693BT1.png",
      "img/MS-1693BT2.png",
      "img/MS-1693BT3.png",
      "img/MS-1693BT4.png",
      "img/MS-1693BT5.png",
      "img/MS-1693BT6.png"
    ],
    badge: "AUDIO",
    keywords: ["parlante", "bocina", "speaker", "bluetooth", "audio", "musica", "portatil"]
  },
  {
    id: 7,
    name: "DIADEMAS i23",
    summary: "cancelación de ruidoColores: Negro, plateado,morado, verde, rosado y azul",
    description: "La Diadema i23 / BG-123 es un sistema de audio inalámbrico de alto rendimiento que combina conectividad Bluetooth 5.1 con controladores dinámicos de 40 mm para una experiencia de sonido Hi-Fi superior. Su diseño ergonómico y plegable integra almohadillas de alto confort, garantizando aislamiento pasivo y durabilidad. Ofrece versatilidad total mediante soporte para tarjetas Micro SD, Radio FM y entrada auxiliar, además de un micrófono omnidireccional para llamadas en manos libres con una autonomía de hasta 8 horas de uso continuo.",
    price: 38000,
    images: [
      "img/23i1.png",
      "img/23i3.png",
      "img/23i4.png",
      "img/23i5.png",
      "img/23i6.png"
    ],
    badge: "AUDIO",
    keywords: ["diadema", "auricular", "audifono", "bluetooth", "audio", "musica", "sonido"]
  },


   {
    id: 8,
    name: "DIADEMAS i25",
    summary: "cancelación de ruidoColores: Negro, plateado,morado, verde, rosado y azul",
    description: "La Diadema i23 / BG-123 es un sistema de audio inalámbrico de alto rendimiento que combina conectividad Bluetooth 5.1 con controladores dinámicos de 40 mm para una experiencia de sonido Hi-Fi superior. Su diseño ergonómico y plegable integra almohadillas de alto confort, garantizando aislamiento pasivo y durabilidad. Ofrece versatilidad total mediante soporte para tarjetas Micro SD, Radio FM y entrada auxiliar, además de un micrófono omnidireccional para llamadas en manos libres con una autonomía de hasta 8 horas de uso continuo.",
    price: 39900,
    images: [
      "img/25i1.png",
      "img/25i2.png",
      "img/25i3.png",
      "img/25i4.png",
      "img/25i5.png",
      "img/25i6.png"
    ],
    badge: "AUDIO",
    keywords: ["diadema", "auricular", "audifono", "bluetooth", "audio", "musica", "sonido"]
  },
  
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
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
        <div class="product-overlay"><span>Ver producto</span></div>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-summary">${product.summary}</p>
        <div class="product-footer">
          <span class="product-price">$${product.price.toFixed("es-CO")}</span>
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

  document.getElementById("modalImage").src          = product.images[0];
  const gallery = document.getElementById("modalGallery");
  gallery.innerHTML = product.images.map(img => `
    <img src="${img}" class="gallery-thumb">
  `).join("");

  gallery.querySelectorAll(".gallery-thumb").forEach(img => {

  img.addEventListener("click", () => {

    document.getElementById("modalImage").src = img.src;

  });

});
  document.getElementById("modalImage").alt          = product.name;
  document.getElementById("modalTitle").textContent  = product.name;
  document.getElementById("modalPrice").textContent  = `$${product.price.toFixed("es-CO")}`;
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

    const user = auth.currentUser;

    if (!user) {
      showToast("Inicia sesión para reaccionar 🔐");
      return;
    }

    const id = state.currentProduct?.id;

    if (!id) return;

    const type = this.dataset.reaction;

    const reactionRef = ref(
      db,
      `userReactions/${user.uid}/${id}/${type}`
    );

    // Si YA reaccionó
    if (this.classList.contains("reacted")) {

      this.classList.remove("reacted");

      state.reactions[id][type] =
        Math.max(0, state.reactions[id][type] - 1);

      set(
        ref(db, `reactions/${id}/${type}`),
        state.reactions[id][type]
      );

      // borrar reacción del usuario
      set(reactionRef, null);

    } else {

      this.classList.add("reacted");

      state.reactions[id][type]++;

      set(
        ref(db, `reactions/${id}/${type}`),
        state.reactions[id][type]
      );

      // guardar reacción del usuario
      set(reactionRef, true);
    }

    this.style.transform = "scale(1.2)";

    setTimeout(() => {
      this.style.transform = "";
    }, 180);

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
    `¡Hola SONIX RJ Company! 👋\n\nQuiero comprar este producto:\n\n🛒 *${p.name}*\n💰 Precio: $${p.price.toFixed("es-CO")}\n\n¿Está disponible?`
  );
  window.open(`https://wa.me/${socialLinks.whatsapp}?text=${msg}`, "_blank");
});

document.getElementById("btnInstagram").addEventListener("click", function() {
  const p = state.currentProduct;
  if (!p) return;
  window.open(`https://www.instagram.com/${socialLinks.instagram}/`, "_blank");
  showToast(`Abriendo Instagram. Menciona: "${p.name} - $${p.price.toFixed("es-CO")}"`);
});

document.getElementById("btnFacebook").addEventListener("click", function() {
  const p = state.currentProduct;
  if (!p) return;
  window.open(`https://www.facebook.com/${socialLinks.facebook}`, "_blank");
  showToast(`Abriendo Facebook. Menciona: "${p.name} - $${p.price.toFixed("es-CO")}"`);
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
  totalEl.textContent = `$${totalPrice.toFixed("es-CO")}`;

  if (!state.cart.length) {
    items.innerHTML = `<p class="cart-empty">Tu carrito está vacío.</p>`;
    return;
  }

  items.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed("es-CO")} × ${item.qty || 1}</div>
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
      <img src="${product.images[0]}" alt="${product.name}" />
      <div class="ai-product-suggestion-info">
        <div class="ai-product-suggestion-name">${product.name}</div>
        <div class="ai-product-suggestion-price">$${product.price.toFixed("es-CO")}</div>
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
    message += `🛒 ${item.name}\nCantidad: ${qty}\nPrecio: $${price.toFixed("es-CO")}\n\n`;
    total   += price;
  });

  message += `💰 TOTAL: $${total.toFixed("es-CO")}\n\n¿Están disponibles?`;
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
            <small>$${p.price.toFixed("es-CO")} x ${p.qty || 1}</small>
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
