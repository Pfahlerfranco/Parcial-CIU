const filtroInput = document.getElementById("filtro");
const productosUl = document.getElementById("productos");
const btnAgregar = document.getElementById("btnAgregar");
const seccionAgregar = document.getElementById("seccionAgregar");
const btnGuardarNuevo = document.getElementById("btnGuardarNuevo");
const nuevoNombre = document.getElementById("nuevoNombre");
const nuevoPrecio = document.getElementById("nuevoPrecio");
const contadorSeleccionados = document.getElementById("contadorSeleccionados");

let productos = [];

filtroInput.addEventListener("input", () => {
  const texto = filtroInput.value.toLowerCase();
  renderizarProductos(productos.filter(prod => prod.nombre.toLowerCase().includes(texto)));
});

btnAgregar.addEventListener("click", () => {
  seccionAgregar.style.display = "block";
});

btnGuardarNuevo.addEventListener("click", () => {
  const nombre = nuevoNombre.value.trim();
  const precio = nuevoPrecio.value.trim();

  if (!nombre || !precio || isNaN(precio)) {
    alert("Por favor, completá los campos correctamente.");
    return;
  }

  productos.push({ nombre, precio });
  nuevoNombre.value = "";
  nuevoPrecio.value = "";
  seccionAgregar.style.display = "none";
  renderizarProductos(productos);
});

function renderizarProductos(lista) {
  productosUl.innerHTML = "";

  lista.forEach((producto, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${producto.nombre}</strong> - $${producto.precio}</span>
      <div>
        <input type="checkbox" class="check-producto">
        <button class="btnModificar btn btn-sm btn-warning mx-1">Modificar</button>
        <button class="btnQuitar btn btn-sm btn-danger">Quitar</button>
      </div>
    `;
    li.addEventListener("mouseenter", () => li.style.backgroundColor = "#f0e8e2");
    li.addEventListener("mouseleave", () => li.style.backgroundColor = "white");
    li.querySelector(".btnQuitar").addEventListener("click", () => {
      productos.splice(index, 1);
      renderizarProductos(productos);
    });

    li.querySelector(".btnModificar").addEventListener("click", () => {
      const nuevo = prompt("Nuevo precio:");
      if (nuevo !== null && !isNaN(nuevo)) {
        productos[index].precio = nuevo;
        renderizarProductos(productos);
      }
    });

    li.querySelector(".check-producto").addEventListener("change", actualizarContador);

    productosUl.appendChild(li);
  });

  actualizarContador();
}

function actualizarContador() {
  const checks = document.querySelectorAll(".check-producto:checked");
  contadorSeleccionados.textContent = checks.length;
}

async function cargarRecomendaciones() {
  const recomendacionesDiv = document.getElementById("recomendaciones");
  recomendacionesDiv.innerHTML = "<p>Cargando recomendaciones de la casa...</p>";

  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await fetch("../src/data/recomendaciones.json");
    if (!response.ok) {
      throw new Error("No se pudo cargar: " + response.status);
    }

    const data = await response.json();

    recomendacionesDiv.innerHTML = "<h3>Recomendaciones de la casa</h3>";
    data.forEach(rec => {
      const div = document.createElement("div");
      div.classList.add("recomendacion");
      div.innerHTML = `<strong>${rec.producto}</strong><p>${rec.descripcion}</p>`;
      recomendacionesDiv.appendChild(div);
    });
  } catch (error) {
    recomendacionesDiv.innerHTML = "<p>Error al cargar las recomendaciones.</p>";
    console.error(error);
  }
}

cargarRecomendaciones();