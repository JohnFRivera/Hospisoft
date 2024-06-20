import { NavBarUnregister, cssStyles, FooterDefault, GetSpanishLanguage } from '../../assets/helper/globals.helpers.js';
import { CreateCss, SetNavbar, SetFooter, SetTitle } from '../../assets/js/globals.functions.js';
import {SetAsideBar} from '../assets/js/access.globals.js';

CreateCss(cssStyles);
SetTitle('Historias Clínicas');
SetNavbar(NavBarUnregister);
SetAsideBar();
SetFooter(FooterDefault);

fetch('http://localhost:3000/historial/getpaciente')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            document.getElementById('dataTable').lastElementChild.innerHTML += `
            <tr id="row-${item.id}">
                <td class="align-content-center">${item.nombres}</td>
                <td class="align-content-center">${item.apellidos}</td>
                <td class="align-content-center">${item.eps}</td>
                <td>
                    <div class="d-flex justify-content-center">
                        <a class="btn btn-sm btn-outline-primary" href="./historial.html#${item.id}">
                            Seleccionar
                        </a>
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