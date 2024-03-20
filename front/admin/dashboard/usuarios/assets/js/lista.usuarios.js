let usuariosArray = new Array;

function fillTable() {
    let table = document.getElementById("table");
    table.innerHTML = "";
    if (usuariosArray.length > 0) {
        usuariosArray.forEach(Usuario => {
            table.innerHTML += `
            <tr>
                <th>${Usuario.id}</th>
                <td>
                    <img class="img-table border" src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="img_usuario">
                </td>
                <td>${Usuario.nombre}</td>
                <td>Rivera</td>
                <td>John@gmail.com</td>
                <td>12345</td>
                <td>
                    <span class="badge text-bg-warning fs-6">
                        Administrador
                    </span>
                </td>
                <td>
                    <div class="btn-group w-100">
                        <button type="button" class="btn btn-outline-info btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd"
                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                        </button>
                        <button type="button" class="btn btn-danger btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
            `;
        });
    }
}

async function getUsuarios() {
    fetch("./assets/js/Usuarios.json")
    .then(Response => Response.json())
    .then(Data => {
        usuariosArray = Data;
        fillTable();
    })
};

getUsuarios();