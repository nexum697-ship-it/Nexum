/* ============================================================
   NEXUM — script.js
   ============================================================
   ADMINISTRACIÓN DE PRODUCTOS
   Para agregar, editar o quitar productos, sólo tenés que
   modificar el arreglo "productos" de acá abajo. Cada producto
   necesita estos 5 campos:

   {
     nombre:    "Nombre del producto",
     precio:    "$0",              -> como texto, con el formato que quieras
     imagen:    "URL de la imagen",
     categoria: "Nombre de categoría",
     link:      "URL de la publicación en Mercado Libre"
   }

   Las categorías del filtro se generan solas a partir de los
   productos: no hace falta tocarlas a mano.
   ============================================================ */

const productos = [
  {
    nombre: "Reloj Nexum Automático Acero",
    precio: "$189.999",
    imagen: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop",
    categoria: "Relojes",
    link: "https://www.mercadolibre.com.ar/"
  },
  {
    nombre: "Reloj Nexum Cronógrafo Negro",
    precio: "$214.999",
    imagen: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=800&auto=format&fit=crop",
    categoria: "Relojes",
    link: "https://www.mercadolibre.com.ar/"
  },
  {
    nombre: "Billetera Cuero Legítimo Nexum",
    precio: "$44.999",
    imagen: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
    categoria: "Billeteras",
    link: "https://www.mercadolibre.com.ar/"
  },
  {
    nombre: "Billetera Slim Bicolor",
    precio: "$38.499",
    imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    categoria: "Billeteras",
    link: "https://www.mercadolibre.com.ar/"
  },
  {
    nombre: "Cinturón Cuero Hebilla Dorada",
    precio: "$32.999",
    imagen: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop",
    categoria: "Cinturones",
    link: "https://www.mercadolibre.com.ar/"
  },
  {
    nombre: "Cinturón Reversible Negro/Marrón",
    precio: "$29.999",
    imagen: "https://images.unsplash.com/photo-1553704571-c8830b0cf539?q=80&w=800&auto=format&fit=crop",
    categoria: "Cinturones",
    link: "https://www.mercadolibre.com.ar/"
  },
  {
    nombre: "Lentes de Sol Nexum Edición Negra",
    precio: "$54.999",
    imagen: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    categoria: "Lentes",
    link: "https://www.mercadolibre.com.ar/"
  },
  {
    nombre: "Lentes de Sol Aviador Dorado",
    precio: "$49.999",
    imagen: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    categoria: "Lentes",
    link: "https://www.mercadolibre.com.ar/"
  },
  {
    nombre: "Perfume Nexum Signature 100ml",
    precio: "$67.999",
    imagen: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
    categoria: "Perfumes",
    link: "https://www.mercadolibre.com.ar/"
  },
  {
    nombre: "Gorra Nexum Bordado Dorado",
    precio: "$24.999",
    imagen: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800&auto=format&fit=crop",
    categoria: "Gorras",
    link: "https://www.mercadolibre.com.ar/"
  }
];

/* ============================================================
   Estado y referencias del DOM
   ============================================================ */
const grid        = document.getElementById("grid");
const gridEmpty    = document.getElementById("gridEmpty");
const filtrosCont  = document.getElementById("filtros");
const searchInput  = document.getElementById("searchInput");
const burger       = document.getElementById("burger");
const navLinks     = document.getElementById("navLinks");
const yearEl       = document.getElementById("year");

let categoriaActiva = "Todos";
let terminoBusqueda  = "";

/* ============================================================
   Ícono flecha para el botón "Comprar ahora"
   ============================================================ */
const ICONO_FLECHA = `
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 18 18 6M9 6h9v9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

/* ============================================================
   Genera los botones de categoría a partir de "productos"
   ============================================================ */
function renderFiltros(){
  const categorias = ["Todos", ...new Set(productos.map(p => p.categoria))];

  filtrosCont.innerHTML = categorias.map(cat => `
    <button class="filtro ${cat === categoriaActiva ? "is-active" : ""}" data-cat="${cat}">
      ${cat}
    </button>
  `).join("");

  filtrosCont.querySelectorAll(".filtro").forEach(btn => {
    btn.addEventListener("click", () => {
      categoriaActiva = btn.dataset.cat;
      renderFiltros();
      renderProductos();
    });
  });
}

/* ============================================================
   Filtra por categoría activa + término de búsqueda
   ============================================================ */
function obtenerProductosFiltrados(){
  return productos.filter(p => {
    const coincideCategoria = categoriaActiva === "Todos" || p.categoria === categoriaActiva;
    const coincideBusqueda  = p.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });
}

/* ============================================================
   Dibuja las tarjetas de producto en la grilla
   ============================================================ */
function renderProductos(){
  const lista = obtenerProductosFiltrados();

  gridEmpty.dataset.show = lista.length === 0;

  grid.innerHTML = lista.map(p => `
    <article class="card" tabindex="0" role="link" aria-label="Ver ${p.nombre} en Mercado Libre" data-link="${p.link}">
      <div class="card__img">
        <span class="card__cat">${p.categoria}</span>
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
      </div>
      <div class="card__body">
        <h3 class="card__nombre">${p.nombre}</h3>
        <p class="card__precio">${p.precio}</p>
        <button class="card__cta" type="button" data-link="${p.link}">
          Comprar ahora ${ICONO_FLECHA}
        </button>
      </div>
    </article>
  `).join("");
}

/* ============================================================
   Redirección a Mercado Libre
   Se dispara al tocar la tarjeta completa o el botón.
   ============================================================ */
function irAMercadoLibre(link){
  if (!link) return;
  window.open(link, "_blank", "noopener");
}

grid.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  irAMercadoLibre(card.dataset.link);
});

grid.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const card = e.target.closest(".card");
  if (!card) return;
  e.preventDefault();
  irAMercadoLibre(card.dataset.link);
});

/* ============================================================
   Buscador
   ============================================================ */
searchInput.addEventListener("input", (e) => {
  terminoBusqueda = e.target.value;
  renderProductos();
});

/* ============================================================
   Menú móvil
   ============================================================ */
burger.addEventListener("click", () => {
  const abierto = navLinks.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", abierto);
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  });
});

/* ============================================================
   Año dinámico en el footer
   ============================================================ */
yearEl.textContent = new Date().getFullYear();

/* ============================================================
   Inicialización
   ============================================================ */
renderFiltros();
renderProductos();
