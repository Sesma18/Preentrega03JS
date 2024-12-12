export function filtrarDiscos(discos, filters) {
  const { searchText, minPrice, maxPrice, year } = filters;

  return discos.filter(({ titulo, precio, anio }) => {
      const searchTextMatch = titulo.toLowerCase().includes(searchText.toLowerCase());
      const priceMatch = (!minPrice || precio >= minPrice) && (!maxPrice || precio <= maxPrice);
      const yearMatch = !year || anio === year;

      return searchTextMatch && priceMatch && yearMatch;
  });
}

export function mostrarDiscos(discos, container, carrito, carritoContainer, totalContainer) {
  container.innerHTML = "";
  discos.forEach(({ titulo, precio, anio, imagen }) => {
      const card = document.createElement("div");
      card.className = "bg-gray-800 rounded-lg shadow-md p-4";
      card.innerHTML = `
          <div class="overflow-hidden mb-4">
              <img src="${imagen}" alt="${titulo}" class="w-full h-48 object-contain rounded-md">
          </div>
          <h2 class="text-xl font-bold text-teal-400 mb-2">${titulo}</h2>
          <p class="text-gray-300">Precio: $${precio}</p>
          <p class="text-gray-300">Año: ${anio}</p>
          <button class="add-to-cart mt-4 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded" text-align: center; style="background-color: #008080;">Agregar al carrito</button>

      `;
      const addToCartBtn = card.querySelector(".add-to-cart");
      addToCartBtn.addEventListener("click", () => {
          agregarAlCarrito({ titulo, precio, anio, imagen }, carrito, carritoContainer, totalContainer);
      });
      container.appendChild(card);
  });
}

export function agregarAlCarrito(disco, carrito, carritoContainer, totalContainer) {
  carrito.push(disco);
  actualizarCarrito(carrito, carritoContainer, totalContainer);
}

export function actualizarCarrito(carrito, container, totalContainer) {
  container.innerHTML = "";
  let total = 0;

  carrito.forEach(({ titulo, precio }, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "flex justify-between items-center bg-gray-700 p-2 rounded mb-2";
      itemDiv.innerHTML = `
          <span>${titulo} - $${precio}</span>
          <button class="remove-item bg-red-500 px-2 py-1 rounded text-white">X</button>
      `;
      const removeBtn = itemDiv.querySelector(".remove-item");
      removeBtn.addEventListener("click", () => {
          carrito.splice(index, 1);
          actualizarCarrito(carrito, container, totalContainer);
      });
      container.appendChild(itemDiv);
      total += precio;
  });

  totalContainer.textContent = `Total: $${total}`;
}
