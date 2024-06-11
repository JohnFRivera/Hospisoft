import { NavBarUnregister, cssStyles, scriptBS, spinCargando, FooterDefault, GetSpanishLanguage } from '../../assets/helper/globals.helpers.js';
import { CreateCss, CreateScript, SetConfirmPass, SetError, SetNavbar, SetFooter, SetNumberInput, SetTitle, validForm, formToJson } from '../../assets/js/globals.functions.js';
import { SetModal, ShowModal } from '../assets/js/modal.js';
const btnNuevo = document.getElementById('btnNuevo');
CreateCss(cssStyles);
SetTitle('Usuarios');
SetNavbar(NavBarUnregister);
SetFooter(FooterDefault);

fetch('Usuarios.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            document.getElementById('dataTable').lastElementChild.innerHTML += `
            <tr id="row-${item.id}">
                <td>${item.identificacion}</td>
                <td>${item.usuario}</td>
                <td>${item.email}</td>
                <td>
                    <div class="d-flex justify-content-center">
                        <span class="badge text-bg-success fs-6">${item.rol}</span>
                    </div>
                </td>
                <td>
                    <div class="d-flex justify-content-center">
                        <div class="btn-group">
                            <button class="btn btn-sm btn-outline-info" id="edit-${item.id}">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" id="delet-${item.id}">
                                <i class="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
            `;
        });
    })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        const dataTable = new DataTable('#dataTable', {
            language: GetSpanishLanguage('usuarios'),
            columnDefs: [
                { target: 0, className: 'text-start' },
                { target: 4, orderable: false }
            ]
        });
    });

btnNuevo.addEventListener('click', () => {
    SetModal(
        `
        <h1 class="fs-3">
            <i class="bi bi-person-plus-fill"></i>
            Agregar Usuario
        </h1>
        `,
        `
        <form id="frmNuevo">
            <div class="row flex-column">
                <div class="col mb-2">
                    <label class="fs-5 text-black-50 mb-1 ms-1" for="identificacion">Identificación</label>
                    <input class="form-control" type="text" name="identificacion" id="identificacion" required>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col mb-2">
                            <label class="fs-5 text-black-50 mb-1 ms-1" for="usuario">Usuario</label>
                            <input class="form-control" type="text" name="usuario" id="usuario" required>
                        </div>
                        <div class="col mb-2">
                            <label class="fs-5 text-black-50 mb-1 ms-1" for="rol">Rol</label>
                            <select class="form-select" name="rol" id="rol" required>
                                <option value="">Seleccionar...</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col mb-2">
                    <label class="fs-5 text-black-50 mb-1 ms-1" for="email">Email</label>
                    <input class="form-control" type="email" name="email" id="email" required>
                </div>
                <div class="col mb-2">
                    <label class="fs-5 text-black-50 mb-1 ms-1" for="contraseña">Contraseña</label>
                    <input class="form-control mb-2" type="password" name="contraseña" id="contraseña" required>
                    <input class="form-control" type="password" id="confirmPass" placeholder="Confirmar contraseña" required>
                </div>
            </div>
        </form>
        `,
        `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="btnAgregar">
            <i class="bi bi-plus-lg"></i>
            Agregar
        </button>
        `
    );
    ShowModal();
    let btnAgregar = document.getElementById('btnAgregar');
    btnAgregar.addEventListener('click', ()=>{
        btnAgregar.innerHTML = spinCargando;
        if (validForm('frmNuevo')) {
            var json = formToJson('frmNuevo')
            fetch('', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            }).then(response => response.json())
            .then(data => {
                
            })
        }
    });
});