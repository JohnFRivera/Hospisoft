import { NavBarUnregister, cssStyles, spinCargando, FooterDefault, GetSpanishLanguage } from '../../assets/helper/globals.helpers.js';
import { CreateCss, SetConfirmPass, SetError, SetNavbar, SetFooter, SetNumberInput, SetTitle, validForm, formToJson, FillSelect } from '../../assets/js/globals.functions.js';
import {Button_Click, GetArrayData, SetAsideBar} from '../assets/js/access.globals.js';
import { SetModal, ShowModal } from '../assets/js/modal.js';

CreateCss(cssStyles);
SetTitle('Citas');
SetNavbar(NavBarUnregister);
SetAsideBar();
SetFooter(FooterDefault);

const btnNuevo = document.getElementById('btnNuevo');
fetch('http://localhost:3000/cita/listing')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            document.getElementById('dataTable').lastElementChild.innerHTML += `
            <tr id="row-${item.id}">
                <td class="align-content-center">${item.nombre}</td>
                <td class="align-content-center ${item.existencia <= 10 ? 'text-warning fw-bold': '' }">${item.existencia}</td>
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
            language: GetSpanishLanguage('citas'),
            columnDefs: [
                { target: 5, width: '10%', orderable: false }
            ]
        });
    });

btnNuevo.addEventListener('click', ()=> {
    SetModal(
        `
        <h1 class="fs-3 text-primary">
            <i class="bi bi-plus-lg"></i>
            Agregar Medicinas
        </h1>
        `,
        `
        <form id="formMedicina">
            <div class="row flex-column">
                <div class="col mb-2">
                    <label class="fs-5 mb-1 ms-1" for="nombre">Nombre</label>
                    <input class="form-control" type="text" name="nombre" id="nombre" required />
                </div>
                <div class="col mb-2">
                    <label class="fs-5 mb-1 ms-1" for="existencias">Existencias</label>
                    <input class="form-control" type="text" name="existencias" id="existencias" required />
                </div>
                <div class="col">
                    <label class="fs-5 mb-1 ms-1" for="valor">Valor</label>
                    <input class="form-control mb-3" type="text" name="valor" id="valor" required />
                </div>
                <p class="mb-1" id="lblErr"></p>
            </div>
        </form>
        `,
        `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="btnGuardar">Guardar</button>
        `
    );
    SetNumberInput('existencias');
    SetNumberInput('valor');
    ShowModal();
    Button_Click('Guardar', '', 'formMedicina');
});