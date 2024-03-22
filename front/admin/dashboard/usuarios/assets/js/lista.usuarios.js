let usuariosArray = new Array();

function fillTable() {
  let table = document.getElementById("table");
  table.innerHTML = "";
  if (usuariosArray.length > 0) {
    usuariosArray.forEach((Usuario) => {
      table.innerHTML += `
            <tr>
                <th class="id">${Usuario.id}</th>
                <td class="foto">
                    <img class="img-table" src="../assets/pic/profile-placeholder.png"
                        alt="${Usuario.foto}">
                </td>
                <td class="nombre">${Usuario.nombre}</td>
                <td class="apellidos">${Usuario.apellidos}</td>
                <td class="email">${Usuario.email}</td>
                <td class="contrasena">${Usuario.contrasena}</td>
                <td class="rol fw-bold text-primary">${Usuario.rol}</td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button type="button" class="btn btn-outline-info btnEditar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd"
                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                        </button>
                        <button type="button" class="btn btn-danger btnEliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
            `;
    });
  }
}

async function getUsuarios(URL) {
  fetch(URL, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((Response) => Response.json())
    .then((Data) => {
      usuariosArray = Data;
      fillTable();
    });
}

//* FILTRO ROL
function filtroRol() {
  let slFiltroRol = document.getElementById('slFiltroRol');
  getUsuarios("http://localhost:3000/usuarios/listingRol"+slFiltroRol.value);
}


//* BUSCADOR
function Buscador() {
  let txtBuscador = document.getElementById("txtBuscador");
  if (txtBuscador.value) {
    txtBuscador.classList.remove("border-danger");
    getUsuarios("http://localhost:3000/usuarios/listingNombre/"+txtBuscador.value);
  } else {
    txtBuscador.classList.add("border-danger");
  }
}

//* PAGINACION
function backPage() {
  var numPage = parseInt(location.hash.replace("#", ""));
  if (numPage > 1) {
    numPage--;
    location.href = location.pathname + `#${numPage}`;
  }
}

function nextPage() {
  if (!location.hash) {
    location.hash = "#1";
  }
  var numPage = parseInt(location.hash.replace("#", ""));
  if (numPage < 3) {
    numPage++;
    location.href = location.pathname + `#${numPage}`;
  }
}

getUsuarios("http://localhost:3000/usuarios/listing");

document.getElementById("btnBackPage").addEventListener("click", backPage);
document.getElementById("btnNextPage").addEventListener("click", nextPage);

document.getElementById('slFiltroRol').addEventListener("change", filtroRol);
document.getElementById('btnBackFiltro').addEventListener("click", getUsuarios("http://localhost:3000/usuarios/listing"));
document.getElementById("btnBuscar").addEventListener("click", Buscador);
