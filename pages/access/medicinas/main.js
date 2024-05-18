import { } from '../../assets/helper/layout.js';
import { } from '../assets/js/access.globals.js';
import { SetModal, ShowModal } from '../assets/js/modal.js';

const Editar_Click = (id) => {
    let btnEditar = document.getElementById(`btnEditar-${id}`);
    btnEditar.addEventListener('click', () => {
        let form = document.querySelector('form');
        if (form.reportValidity()) {
            btnEditar.innerHTML = `
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status">Cargando...</span>
            `;
            let obj = new Object;
            var formData = new FormData(form);
            formData.forEach((value, key) => {
                obj[key] = value;
            });
            fetch(`http://localhost:3000/medicamentos/edit/${id}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then(response => response.json())
                .then(data => {
                    SetModal(
                        '¡Felicidades!',
                        data.title,
                        `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>`
                    );
                    btnEditar.innerHTML = 'Editar';
                }).catch(err => {
                    SetModal(
                        `
                        <h4 class="text-danger">
                            <i class="bi bi-emoji-frown-fill"></i>
                            Ha ocurrido un fallo en el sistema
                        </h4>
                        `,
                        err,
                        `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>`
                    );
                    btnEditar.innerHTML = 'Editar';
                });
        };
    });
};
const Eliminar_Click = (id) => {
    let btnEliminar = document.getElementById(`btnEliminar-${id}`);
    btnEliminar.addEventListener('click', () => {
        btnEliminar.innerHTML = `
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span role="status">Cargando...</span>
        `;
        fetch(`http://localhost:3000/medicamentos/delete/${id}`, {
            method: 'delete'
        }).then(response => response.json())
            .then(data => {
                SetModal(
                    '¡Felicidades!',
                    data.title,
                    `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>`
                );
                btnEliminar.innerHTML = 'Editar';
            }).catch(err => {
                SetModal(
                    `
                    <h4 class="text-danger">
                        <i class="bi bi-emoji-frown-fill"></i>
                        Ha ocurrido un fallo en el sistema
                    </h4>
                    `,
                    err,
                    `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>`
                );
                btnEliminar.innerHTML = 'Eliminar';
            });
    });
};
const setEditModal =()=> {
    let buttons = document.querySelectorAll('.btn-outline-info');
    buttons.forEach(Button => {
        Button.addEventListener('click', ()=>{
            var id = Button.id.replace('edit-', '');
            var row = document.getElementById(`row-${id}`);
            SetModal(
                `
                <h4>
                    <i class="bi bi-pencil-square"></i>
                    Editar Medicina
                </h4>
                `,
                `
                <form>
                    <div class="row flex-column p-2">
                        <div class="col mb-2">
                            <label class="fs-5" for="nombre">Nombre</label>
                            <div class="input-group">
                                <div class="input-group-text">
                                    <i class="bi bi-capsule"></i>
                                </div>
                                <input class="form-control" type="text" name="nombre" id="nombre" value="${row.childNodes[1].textContent}" required>
                            </div>
                        </div>
                        <div class="col mb-2">
                            <label class="fs-5" for="existencias">Existencias</label>
                            <div class="input-group">
                                <div class="input-group-text">
                                    <i class="bi bi-box-seam"></i>
                                </div>
                                <input class="form-control" type="text" name="existencias" id="existencias" value="${row.childNodes[3].textContent}" required>
                            </div>
                        </div>
                        <div class="col mb-2">
                            <label class="fs-5" for="valor">Valor</label>
                            <div class="input-group">
                                <div class="input-group-text">
                                    <i class="bi bi-currency-dollar"></i>
                                </div>
                                <input class="form-control" type="text" name="valor" id="valor" value="${row.childNodes[5].textContent}" required>
                            </div>
                        </div>
                    </div>
                </form>
                `,
                `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" id="btnEditar-${id}">Editar</button>
                `
            );
            Editar_Click(id);
            ShowModal();
        });
    });
};
const setDelModal =()=> {
    let buttons = document.querySelectorAll('.btn-danger');
    buttons.forEach(Button => {
        Button.addEventListener('click', ()=>{
            var id = Button.id.replace('del-', '');
            var row = document.getElementById(`row-${id}`);
            SetModal(
                `
                <h4>
                    <i class="bi bi-trash"></i>
                    Eliminar Medicina
                </h4>
                `,
                `
                <p class="fs-5 mb-1">¿Seguro que quieres eliminar "<b>${row.childNodes[1].textContent}</b>"?</p>
                `,
                `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-danger" id="btnEliminar-${id}">Eliminar</button>
                `
            );
            Eliminar_Click(id);
            ShowModal();
        });
    });
};
const setTable = async () => {
    let tbody = document.querySelector('tbody');
    fetch('Medicinas.json').then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                tbody.innerHTML = '';
                data.forEach(Medicina => {
                    var colorMedicinas = '';
                    if (Medicina.existencias <= 10) {
                        colorMedicinas = 'text-danger fw-bolder';
                    }
                    tbody.innerHTML += `
                    <tr id="row-${Medicina.id}">
                        <td scope="row" class="align-content-center">${Medicina.nombre}</td>
                        <td class="align-content-center text-center ${colorMedicinas}">${Medicina.existencias}</td>
                        <td class="align-content-center text-center"><i class="bi bi-currency-dollar"></i>${Medicina.valor}</td>
                        <td>
                            <div class="d-flex justify-content-center">
                                <div class="btn-group">
                                    <button class="btn btn-sm btn-outline-info" type="button" id="edit-${Medicina.id}">
                                        <i class="bi bi-pencil-square"></i>
                                    </button>
                                    <button class="btn btn-sm btn-danger" type="button" id="del-${Medicina.id}">
                                        <i class="bi bi-trash-fill"></i>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    `;
                });
                setEditModal();
                setDelModal();
            } else {
                tbody.innerHTML = `
                <tr>
                    <td class="text-center" colspan="4">No hay datos aún</td>
                </tr>
                `;
            }
        }).catch(err => {
            console.error(err);
            tbody.innerHTML = `
            <tr>
                <td class="text-center" colspan="4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="mb-1" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                    </svg>
                    Ha ocurrido un fallo
                </td>
            </tr>
            `;
        })
};
setTable();
const Guardar_Click = () => {
    let btnGuardar = document.getElementById('btnGuardar');
    btnGuardar.addEventListener('click', () => {
        let form = document.querySelector('form');
        if (form.reportValidity()) {
            btnGuardar.innerHTML = `
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status">Cargando...</span>
            `;
            let obj = new Object;
            var formData = new FormData(form);
            formData.forEach((value, key) => {
                obj[key] = value;
            });
            fetch('http://localhost:3000/medicamentos/add', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then(response => response.json())
                .then(data => {
                    SetModal(
                        '¡Felicidades!',
                        data.title,
                        `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>`
                    );
                    btnGuardar.innerHTML = 'Guardar';
                }).catch(err => {
                    SetModal(
                        `
                        <h4 class="text-danger">
                            <i class="bi bi-emoji-frown-fill"></i>
                            Ha ocurrido un fallo en el sistema
                        </h4>
                        `,
                        err,
                        `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>`
                    );
                    btnGuardar.innerHTML = 'Guardar';
                });
        };
    });
};
let btnNuevo = document.getElementById('btnNuevo');
btnNuevo.addEventListener('click', () => {
    SetModal(
        `
        <h4>
            <i class="bi bi-plus-lg"></i>
            Crear Medicina
        </h4>
        `,
        `
        <form>
            <div class="row flex-column p-2">
                <div class="col mb-2">
                    <label class="fs-5" for="nombre">Nombre</label>
                    <div class="input-group">
                        <div class="input-group-text">
                            <i class="bi bi-capsule"></i>
                        </div>
                        <input class="form-control" type="text" name="nombre" id="nombre" required>
                    </div>
                </div>
                <div class="col mb-2">
                    <label class="fs-5" for="existencias">Existencias</label>
                    <div class="input-group">
                        <div class="input-group-text">
                            <i class="bi bi-box-seam"></i>
                        </div>
                        <input class="form-control" type="text" name="existencias" id="existencias" required>
                    </div>
                </div>
                <div class="col mb-2">
                    <label class="fs-5" for="valor">Valor</label>
                    <div class="input-group">
                        <div class="input-group-text">
                            <i class="bi bi-currency-dollar"></i>
                        </div>
                        <input class="form-control" type="text" name="valor" id="valor" required>
                    </div>
                </div>
            </div>
        </form>
        `,
        `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="btnGuardar">Guardar</button>
        `
    );
    Guardar_Click();
    ShowModal();
});