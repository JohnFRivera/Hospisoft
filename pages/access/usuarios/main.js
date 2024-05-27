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
                { target: 0, width: '10%', className: 'text-start' },
                { target: 4, width: '10%', orderable: false }
            ]
        });
    });

btnNuevo.addEventListener('click', ()=> {
    SetModal(
        `
        <h1 class="fs-3">
            <i class="bi bi-person-plus-fill"></i>
            Agregar Usuario
        </h1>
        `,
        `
        
        `,
        `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary">Guardar</button>
        `
    );
    ShowModal();
});