import { SetAsideBtn, SetNumberInput, validInputs, GetFormData, SetEspecialidades } from '../../assets/js/admin.globals.js';
import { Query } from '../../../assets/js/querys.js';
import { SetModal, ShowModal } from '../../assets/js/modal.js';

const Roles = [
    'Usuario',
    'Paciente',
    'Secretaria',
    'Dispensario',
    'Medico'
];
const EPS = [
    'Coosalud',
    'SOS',
    'Comeva',
    'Barrios Unidos'
];
SetAsideBtn();
SetNumberInput('identificacion');
let slRoles = document.getElementById('rol');
let formRol = document.getElementById('formRol');
Roles.forEach(Rol => {
    var opt = document.createElement('option');
    opt.value = Rol;
    opt.text = Rol;
    slRoles.append(opt);
});
slRoles.addEventListener('change', (ev)=>{
    switch (ev.target.value) {
        case 'Paciente':
            formRol.innerHTML = `
            <div class="col-12 col-md-6 mb-2">
                <label class="fw-normal fs-4 ms-1 mb-1" for="nombres">Nombres:</label>
                <input class="form-control form-control-lg form-required" type="text" id="nombres">
            </div>
            <div class="col-12 col-md-6 mb-2">
                <label class="fw-normal fs-4 ms-1 mb-1" for="apellidos">Apellidos:</label>
                <input class="form-control form-control-lg form-required" type="text" id="apellidos">
            </div>
            <div class="col-12 col-md-6 mb-2">
                <label class="fw-normal fs-4 ms-1 mb-1" for="fecha_nacimiento">Fecha de nacimiento:</label>
                <input class="form-control form-control-lg form-required" type="date" id="fecha_nacimiento">
            </div>
            <div class="col-12 col-md-6 mb-2">
                <label class="fw-normal fs-4 ms-1 mb-1" for="eps">EPS:</label>
                <select class="form-select form-select-lg form-required" id="eps">
                    <option value="">Seleccionar...</option>
                </select>
            </div>
            <div class="col-12 col-md-6 mb-2">
                <label class="fw-normal fs-4 ms-1 mb-1" for="movil">Movil:</label>
                <input class="form-control form-control-lg form-required" type="text" maxlength="10" id="movil">
            </div>
            <div class="col-12 col-md-6 mb-3">
                <label class="fw-normal fs-4 ms-1 mb-1" for="telefono">Teléfono:</label>
                <input class="form-control form-control-lg form-required" type="text" maxlength="10" id="telefono">
            </div>
            `;
            EPS.forEach(eps => {
                var opt = document.createElement('option');
                opt.value = eps;
                opt.text = eps;
                document.getElementById('eps').append(opt);
            });
            SetNumberInput('movil');
            SetNumberInput('telefono');
            break;
        case 'Medico':
            formRol.innerHTML = `
            <div class="col-12 col-md-6 mb-2">
                <label class="fw-normal fs-4 ms-1 mb-1" for="nombres">Nombres:</label>
                <input class="form-control form-control-lg form-required" type="text" id="nombres">
            </div>
            <div class="col-12 col-md-6 mb-2">
                <label class="fw-normal fs-4 ms-1 mb-1" for="apellidos">Apellidos:</label>
                <input class="form-control form-control-lg form-required" type="text" id="apellidos">
            </div>
            <div class="col mb-3">
                <label class="fw-normal fs-4 ms-1 mb-1" for="especialidad">Especialidad:</label>
                <select class="form-select form-select-lg form-required" id="especialidad">
                    <option value="">Seleccionar...</option>
                </select>
            </div>
            `;
            SetEspecialidades();
            break;
        default:
            formRol.innerHTML = '';
            break;
    }
})
let btnAgregar = document.getElementById('btnAgregar');
btnAgregar.addEventListener('click', ()=>{
    if (validInputs()) {
        btnAgregar.innerHTML = `
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span role="status">Cargando...</span>
        `;
        var formData = GetFormData();
        Query(endpoint, 'GET', formData).then(res => {
            if (res.ok) {
                SetModal(
                    `
                    <h1 class="modal-title fs-4 text-danger" id="staticBackdropLabel">
                        <i class="bi bi-check2-circle"></i>
                        ${res.title}
                    </h1>
                    `,
                    res.message,
                    `
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
                    `
                );
                ShowModal();
            } else {
                document.getElementById('lblError').innerHTML = `
                <i class="bi bi-exclamation-circle-fill"></i>
                ${res.message}
                `;
            };
            btnAgregar.innerHTML = 'Agregar';
        });
    };
});