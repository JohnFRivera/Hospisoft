import { NavBarUnregister, cssStyles, FooterDefault, GetSpanishLanguage } from '../../assets/helper/globals.helpers.js';
import { CreateCss, SetNavbar, SetFooter, SetTitle } from '../../assets/js/globals.functions.js';
import { SetAsideBar } from '../assets/js/access.globals.js';
import { SetModal, ShowModal } from '../assets/js/modal.js';

CreateCss(cssStyles);
SetTitle('Historias Clínicas');
SetNavbar(NavBarUnregister);
SetAsideBar();
SetFooter(FooterDefault);

fetch('http://localhost:3000/historial/gethistorial/'+window.location.hash.replace('#',''))
    .then(response => response.json())
    .then(data => {
        document.getElementById('nombrePaciente').innerText = data.paciente;
        data.data.forEach(item => {
            document.getElementById('dataTable').lastElementChild.innerHTML += `
            <tr>
                <td class="align-content-center">${item.diagnostico}</td>
                <td class="align-content-center">${item.medicinas}</td>
                <td class="align-content-center">${item.examenes_medicos}</td>
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