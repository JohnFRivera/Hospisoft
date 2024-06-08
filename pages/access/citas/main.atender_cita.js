import { NavBarUnregister, cssStyles, spinCargando, FooterDefault, GetSpanishLanguage } from '../../assets/helper/globals.helpers.js';
import { CreateCss, SetConfirmPass, SetError, SetNavbar, SetFooter, SetNumberInput, SetTitle, validForm, formToJson, FillSelect } from '../../assets/js/globals.functions.js';
import {Button_Click, GetArrayData, SetAsideBar} from '../assets/js/access.globals.js';
import { SetModal, ShowModal } from '../assets/js/modal.js';

CreateCss(cssStyles);
SetTitle('Citas');
SetNavbar(NavBarUnregister);
SetAsideBar();
SetFooter(FooterDefault);

const btnAgendar = document.getElementById('btnAgendar');
fetch('Medicinas.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            document.getElementById('dataTable').lastElementChild.innerHTML += `
            <tr id="row-${item.id}">
                <td class="align-content-center">${item.nombre}</td>
                <td class="align-content-center ${item.existencias <= 10 ? 'text-warning fw-bold': '' }">${item.existencias}</td>
                <td class="align-content-center">${item.valor}</td>
                <td>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-sm btn-outline-info" id="edit-${item.id}">
                            <i class="bi bi-pencil-square"></i>
                        </button>
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
                        <i class="bi bi-pencil-square"></i>
                        Editar Medicinas
                    </h1>
                    `,
                    `
                    <form id="formMedicina">
                        <div class="row flex-column">
                            <div class="col mb-2">
                                <label class="fs-5 mb-1 ms-1" for="nombre">Nombre</label>
                                <input class="form-control" type="text" name="nombre" id="nombre" value="${arrayData[0]}" required />
                            </div>
                            <div class="col mb-2">
                                <label class="fs-5 mb-1 ms-1" for="existencias">Existencias</label>
                                <input class="form-control" type="text" name="existencias" id="existencias" value="${arrayData[1]}" required />
                            </div>
                            <div class="col">
                                <label class="fs-5 mb-1 ms-1" for="valor">Valor</label>
                                <input class="form-control mb-3" type="text" name="valor" id="valor" value="${arrayData[2]}" required />
                            </div>
                            <p class="mb-1" id="lblErr"></p>
                        </div>
                    </form>
                    `,
                    `
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" id="btnModificar">Modificar</button>
                    `
                );
                ShowModal();
                Button_Click('Modificar', '', 'formMedicina');
            });
        });
    })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        const dataTable = new DataTable('#dataTable', {
            language: GetSpanishLanguage('medicinas'),
            columnDefs: [
                { target: 3, orderable: false }
            ]
        });
    });

btnAgendar.addEventListener('click', ()=> {
    if (validForm('formCamp')) {
        btnAgendar.innerHTML = spinCargando;
        var json = formToJson('formCamp');
        fetch('http://localhost:3000/historia_clinica/add', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }).then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.reload();
            } else {
                SetError(data.title);
            }
        }).catch(err => {
            SetError(err);
        }).finally(()=>{
            btnAgendar.innerHTML = `
            <i class="bi bi-check2-circle"></i>
            Terminar atención
            `;
        });
    };
});

document.getElementById('ckExamenesMedicos').addEventListener('change', (ev)=>{
    if (ev.target.checked) {
        document.getElementById('nuevaCita').innerHTML = `
        <div class="bg-body-tertiary rounded-2 p-4 mb-3 shadow">
            <div class="row mb-2">
                <div class="col">
                    <label class="fs-5 mb-1 ms-1" for="examenes_medicos">Exámenes solicitados</label>
                    <input type="text" class="form-control" id="examenes_medicos" required>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col">
                    <label class="fs-5 mb-1 ms-1" for="idmedico">Especialista</label>
                    <select class="mb-2 form-control form-selec" id="idmedico" required>
                        <option value="">Seleccionar...</option>
                    </select>
                </div>
                <div class="col">
                    <label class="fs-5 mb-1 ms-1" for="fecha">Fecha para Nueva cita</label>
                    <div class="input-group">
                        <input type="date" class="form-control" id="fecha" required>
                        <input type="time" class="form-control" id="hora" required>
                    </div>
                </div>
            </div>
        </div>
        `;
    } else {
        document.getElementById('nuevaCita').innerHTML = '';
    }
})