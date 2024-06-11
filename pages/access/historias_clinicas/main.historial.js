import { NavBarUnregister, cssStyles, FooterDefault, GetSpanishLanguage } from '../../assets/helper/globals.helpers.js';
import { CreateCss, SetNavbar, SetFooter, SetTitle } from '../../assets/js/globals.functions.js';
import { SetAsideBar } from '../assets/js/access.globals.js';
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
            <tr>
                <td class="align-content-center">${item.nombres} ${item.apellidos}</td>
                <td class="align-content-center">${item.diagnostico}</td>
                <td class="align-content-center">${item.medicamentos}</td>
                <td class="align-content-center">${item.examenes}</td>
            </tr>
            `;
        });
    })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        new DataTable('#dataTable', {
            language: GetSpanishLanguage('historias clínicas')
        });
    });