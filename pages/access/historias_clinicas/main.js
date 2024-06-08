import { NavBarUnregister, cssStyles, spinCargando, FooterDefault, GetSpanishLanguage, arrayRoles } from '../../assets/helper/globals.helpers.js';
import { CreateCss, SetConfirmPass, SetError, SetNavbar, SetFooter, SetNumberInput, SetTitle, validForm, formToJson, FillSelect } from '../../assets/js/globals.functions.js';
import {Button_Click, GetArrayData, SetAsideBar} from '../assets/js/access.globals.js';
import { SetModal, ShowModal } from '../assets/js/modal.js';

CreateCss(cssStyles);
SetTitle('Historias Clínicas');
SetNavbar(NavBarUnregister);
SetAsideBar();
SetFooter(FooterDefault);

fetch('Medicinas.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            document.getElementById('dataTable').lastElementChild.innerHTML += `
            <tr id="row-${item.id}">
                <td class="align-content-center">${item.nombre}</td>
                <td class="align-content-center">${item.apellido}</td>
                <td class="align-content-center">${item.eps}</td>
                <td>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-sm btn-outline-info" id="edit-${item.id}">
                            Seleccionar
                        </button>
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
            language: GetSpanishLanguage('historias clínicas'),
            columnDefs: [
                { target: 3, width: '10%', orderable: false }
            ]
        });
    });