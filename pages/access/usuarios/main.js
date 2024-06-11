import { NavBarUnregister, cssStyles, spinCargando, FooterDefault, GetSpanishLanguage, arrayRoles } from '../../assets/helper/globals.helpers.js';
import { CreateCss, SetConfirmPass, SetError, SetNavbar, SetFooter, SetNumberInput, SetTitle, validForm, formToJson, FillSelect } from '../../assets/js/globals.functions.js';
import {Button_Click, GetArrayData, SetAsideBar} from '../assets/js/access.globals.js';
import { SetModal, ShowModal } from '../assets/js/modal.js';

CreateCss(cssStyles);
SetTitle('Usuarios');
SetNavbar(NavBarUnregister);
SetAsideBar();
SetFooter(FooterDefault);
const btnNuevo = document.getElementById('btnNuevo');

fetch('Usuarios.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            document.getElementById('dataTable').lastElementChild.innerHTML += `
            <tr id="row-${item.id}">
                <th class="align-content-center">${item.identificacion}</th>
                <td class="align-content-center">${item.usuario}</td>
                <td class="align-content-center">${item.email}</td>
                <th class="text-primary align-content-center">${item.rol}</th>
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
        let btnEdits = document.querySelectorAll('.btn-outline-info');
        btnEdits.forEach(item => {
            item.addEventListener('click', ()=>{
                var arrayData = GetArrayData(document.getElementById(`row-${item.id.replace('edit-', '')}`));
                SetModal(
                    `
                    <h1 class="fs-3 text-primary">
                        <i class="bi bi-person-fill-gear"></i>
                        Editar Usuario
                    </h1>
                    `,
                    `
                    <form id="formUsuario">
                        <div class="row flex-column">
                            <div class="col">
                                <div class="row row-cols-1 row-cols-md-2">
                                    <div class="col mb-2">
                                        <label class="fs-5 mb-1 ms-1" for="usuario">Usuario</label>
                                        <input class="form-control" type="text" name="usuario" id="usuario" value="${arrayData[1]}" required />
                                    </div>
                                    <div class="col mb-2">
                                        <label class="fs-5 mb-1 ms-1" for="rol">Rol</label>
                                        <select class="form-select" name="rol" id="rol" required></select>
                                    </div>
                                </div>
                            </div>
                            <div class="col mb-2">
                                <label class="fs-5 mb-1 ms-1" for="email">Email</label>
                                <input class="form-control" type="text" name="email" id="email" value="${arrayData[2]}" required />
                            </div>
                            <p class="mb-0" id="lblErr"></p>
                        </div>
                    </form>
                    `,
                    `
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" id="btnModificar">Modificar</button>
                    `
                );
                FillSelect('rol', arrayRoles);
                ShowModal();
                Button_Click('Modificar', '');
            });
        });
        let btnDeletes = document.querySelectorAll('.btn-danger');
        btnDeletes.forEach(item => {
            item.addEventListener('click', ()=>{
                var arrayData = GetArrayData(document.getElementById(`row-${item.id.replace('delet-', '')}`));
                SetModal(
                    `
                    <h1 class="fs-3 text-danger">
                        <i class="bi bi-person-fill-x"></i>
                        Eliminar Usuario
                    </h1>
                    `,
                    `
                    <span class="fs-5">
                        ¿Seguro que deseas eliminar a <b>'${arrayData[1]}'</b> permanentemente?
                    </span>
                    `,
                    `
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-danger" id="btnEliminar">Eliminar</button>
                    `
                );
                ShowModal();
                Button_Click('Eliminar', '');
            });
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
        <h1 class="fs-3 text-primary">
            <i class="bi bi-person-plus-fill"></i>
            Agregar Usuario
        </h1>
        `,
        `
<<<<<<< HEAD
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
=======
        <form id="formUsuario">
            <div class="row flex-column">
                <div class="col mb-2">
                    <label class="fs-5 mb-1 ms-1" for="identificacion">Identificación</label>
                    <input class="form-control" type="text" name="identificacion" id="identificacion" required />
                </div>
                <div class="col">
                    <div class="row row-cols-1 row-cols-md-2">
                        <div class="col mb-2">
                            <label class="fs-5 mb-1 ms-1" for="usuario">Usuario</label>
                            <input class="form-control" type="text" name="usuario" id="usuario" required />
                        </div>
                        <div class="col mb-2">
                            <label class="fs-5 mb-1 ms-1" for="rol">Rol</label>
                            <select class="form-select" name="rol" id="rol" required></select>
>>>>>>> 906889409e6d564434249560f6b7995e5b476df3
                        </div>
                    </div>
                </div>
                <div class="col mb-2">
<<<<<<< HEAD
                    <label class="fs-5 text-black-50 mb-1 ms-1" for="email">Email</label>
                    <input class="form-control" type="email" name="email" id="email" required>
                </div>
                <div class="col mb-2">
                    <label class="fs-5 text-black-50 mb-1 ms-1" for="contraseña">Contraseña</label>
                    <input class="form-control mb-2" type="password" name="contraseña" id="contraseña" required>
                    <input class="form-control" type="password" id="confirmPass" placeholder="Confirmar contraseña" required>
                </div>
=======
                    <label class="fs-5 mb-1 ms-1" for="email">Email</label>
                    <input class="form-control" type="text" name="email" id="email" required />
                </div>
                <div class="col">
                    <label class="fs-5 mb-1 ms-1" for="contraseña">Contraseña</label>
                    <input class="form-control mb-3" type="password" name="contraseña" id="contraseña" required />
                    <input class="form-control" type="password" id="txtConfirmPass" placeholder="Confirmar contraseña" required />
                    <p class="text-danger ms-1 mt-1 mb-0" id="confirmPassErr"></p>
                </div>
                <p class="mb-1" id="lblErr"></p>
>>>>>>> 906889409e6d564434249560f6b7995e5b476df3
            </div>
        </form>
        `,
        `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
<<<<<<< HEAD
        <button type="button" class="btn btn-primary" id="btnAgregar">
            <i class="bi bi-plus-lg"></i>
            Agregar
        </button>
=======
        <button type="button" class="btn btn-primary" id="btnGuardar">Guardar</button>
>>>>>>> 906889409e6d564434249560f6b7995e5b476df3
        `
    );
    SetNumberInput('identificacion');
    FillSelect('rol', arrayRoles);
    SetConfirmPass();
    ShowModal();
<<<<<<< HEAD
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
=======
    Button_Click('Guardar', '');
>>>>>>> 906889409e6d564434249560f6b7995e5b476df3
});