import { SetAsideBtn } from '../../assets/js/admin.globals.js';
document.title += ' '+window.localStorage.getItem('userName');
SetAsideBtn();
let userData = document.getElementById('userData');
fetch('')
.then(response => response.json())
.then(res => {
    document.getElementById('lblUsername').innerHTML = `
    <i class="bi bi-person-circle me-4"></i>
    John Freddy Rivera 
    <span class="bg-primary py-1 px-2 rounded-2 text-light fw-semibold fs-6 mt-3 ms-3">
        Usuario
    </span>
    `;
    let data;
    switch ('Paciente') {
        case 'Medico':
            data = `
            <div class="row mb-2">
                <div class="col">
                    <p class="fw-normal fs-4 mb-0">Nombres:</p>
                    <div class="bg-dark-subtle rounded-2 fw-light fs-4 py-2 px-3">
                        ${res.nombres}
                    </div>
                </div>
                <div class="col">
                    <p class="fw-normal fs-4 mb-0">Apellidos:</p>
                    <div class="bg-dark-subtle rounded-2 fw-light fs-4 py-2 px-3">
                        ${res.apellidos}
                    </div>
                </div>
                <div class="col">
                    <p class="fw-normal fs-4 mb-0">Especialidad:</p>
                    <div class="bg-dark-subtle rounded-2 fw-light fs-4 py-2 px-3">
                        ${res.especialidad}
                    </div>
                </div>
            </div>
            `;
            break;
        case 'Paciente':
            data = `
            <div class="row mb-2">
                <div class="col">
                    <p class="fw-normal fs-4 mb-0">Nombres:</p>
                    <div class="bg-dark-subtle rounded-2 fw-light fs-4 py-2 px-3">
                        ${res.nombres}
                    </div>
                </div>
                <div class="col">
                    <p class="fw-normal fs-4 mb-0">Apellidos:</p>
                    <div class="bg-dark-subtle rounded-2 fw-light fs-4 py-2 px-3">
                        ${res.apellidos}
                    </div>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col">
                    <p class="fw-normal fs-4 mb-0">Fecha de nacimiento:</p>
                    <div class="bg-dark-subtle rounded-2 fw-light fs-4 py-2 px-3">
                        ${res.fecha_nacimiento}
                    </div>
                </div>
                <div class="col">
                    <p class="fw-normal fs-4 mb-0">EPS:</p>
                    <div class="bg-dark-subtle rounded-2 fw-light fs-4 py-2 px-3">
                        ${res.eps}
                    </div>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col">
                    <p class="fw-normal fs-4 mb-0">Movil:</p>
                    <div class="bg-dark-subtle rounded-2 fw-light fs-4 py-2 px-3">
                        ${res.movil}
                    </div>
                </div>
                <div class="col">
                    <p class="fw-normal fs-4 mb-0">Teléfono:</p>
                    <div class="bg-dark-subtle rounded-2 fw-light fs-4 py-2 px-3">
                        ${res.telefono}
                    </div>
                </div>
            </div>
            `;
            break;
    }
    data += `
    <div class="row mb-2">
        <div class="col">
            <p class="fw-normal fs-4 mb-0">Usuario:</p>
            <div class="bg-dark-subtle rounded-2 fw-light fs-4 py-2 px-3">
                ${res.usuario}
            </div>
        </div>
    </div>
    <div class="row mb-5">
        <div class="col">
            <p class="fw-normal fs-4 mb-0">Email:</p>
            <div class="bg-dark-subtle rounded-2 fw-light fs-4 py-2 px-3">
                ${res.email}
            </div>
        </div>
    </div>
    `;
})
userData.innerHTML = data;