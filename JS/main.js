import { mostrarDiscos } from "./methods.js";

const { 
    cardsContainer, 
    searchInput, 
    minPriceInput, 
    maxPriceInput, 
    yearFilterInput, 
    filterBtn, 
    carritoContainer, 
    totalContainer 
} = {
    cardsContainer: document.getElementById("cards-container"),
    searchInput: document.getElementById("search"),
    minPriceInput: document.getElementById("min-price"),
    maxPriceInput: document.getElementById("max-price"),
    yearFilterInput: document.getElementById("year-filter"),
    filterBtn: document.getElementById("filter-btn"),
    carritoContainer: document.getElementById("carrito-items"),
    totalContainer: document.getElementById("carrito-total")
};

const carrito = [];

async function cargarDiscos() {
    const response = await fetch('./JSON/discos.json');  
    const discos = await response.json(); 
    return discos;
}

function aplicarFiltros(discos) {
    const { value: searchText } = searchInput;
    const { value: minPrice } = minPriceInput;
    const { value: maxPrice } = maxPriceInput;
    const { value: year } = yearFilterInput;

    const filters = {
        searchText,
        minPrice: parseInt(minPrice),
        maxPrice: parseInt(maxPrice),
        year: parseInt(year),
    };

    const discosFiltrados = discos.filter(disco => {
        const matchesSearchText = disco.titulo.toLowerCase().includes(filters.searchText.toLowerCase());
        const matchesMinPrice = !filters.minPrice || disco.precio >= filters.minPrice;
        const matchesMaxPrice = !filters.maxPrice || disco.precio <= filters.maxPrice;
        const matchesYear = !filters.year || disco.anio === filters.year;
        
        return matchesSearchText && matchesMinPrice && matchesMaxPrice && matchesYear;
    });

    mostrarDiscos(discosFiltrados, cardsContainer, carrito, carritoContainer, totalContainer);
}

async function iniciar() {
    const discos = await cargarDiscos();
    mostrarDiscos(discos, cardsContainer, carrito, carritoContainer, totalContainer);

    filterBtn.addEventListener("click", () => aplicarFiltros(discos));
    searchInput.addEventListener("input", () => aplicarFiltros(discos));
    minPriceInput.addEventListener("input", () => aplicarFiltros(discos));
    maxPriceInput.addEventListener("input", () => aplicarFiltros(discos));
    yearFilterInput.addEventListener("input", () => aplicarFiltros(discos));
}

iniciar();
