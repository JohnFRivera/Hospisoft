import { NavBarUnregister, cssStyles, spinCargando, FooterDefault } from '../../assets/helper/globals.helpers.js';
import { CreateCss, SetNavbar, SetFooter, SetTitle, validForm, formToJson, FillSelect } from '../../assets/js/globals.functions.js';
import { SetAsideBar} from '../assets/js/access.globals.js';
import { SetModal, ShowModal } from '../assets/js/modal.js';

CreateCss(cssStyles);
SetTitle('Separar Cita');
SetNavbar(NavBarUnregister);
SetAsideBar();
SetFooter(FooterDefault);

fetch('http://localhost:3000/medicos/select').then(response => response.json())
.then(data => {
    data
    FillSelect('idmedico', data)
})
let btnAgendar = document.getElementById('btnAgendar');
btnAgendar.addEventListener('click', ()=>{
    if (validForm('formCita')) {
        btnAgendar.innerHTML = spinCargando;
        var json = formToJson('formCita');
        fetch('http://localhost:3000/cita/verificar', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }).then(response => response.json())
        .then(data => {
            if (data.title) {
                alert('cita agregada')
            }
        }).catch(err => {
            console.error('Error:', err);
            alert('Ocurrió un error al intentar crear la cita.');
        }).finally(()=>{
            btnAgendar.innerHTML = `
            <i class="bi bi-plus-lg"></i>
            Agendar
            `;
        });
    };
});