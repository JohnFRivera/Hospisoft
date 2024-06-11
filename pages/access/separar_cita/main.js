import { NavBarUnregister, cssStyles, spinCargando, FooterDefault } from '../../assets/helper/globals.helpers.js';
import { CreateCss, SetError, SetNavbar, SetFooter, SetTitle, validForm, formToJson } from '../../assets/js/globals.functions.js';
import { SetAsideBar} from '../assets/js/access.globals.js';
import { SetModal, ShowModal } from '../assets/js/modal.js';

CreateCss(cssStyles);
SetTitle('Separar Cita');
SetNavbar(NavBarUnregister);
SetAsideBar();
SetFooter(FooterDefault);

let btnAgendar = document.getElementById('btnAgendar');
btnAgendar.addEventListener('click', ()=>{
    if (validForm('formCita')) {
        btnAgendar.innerHTML = spinCargando;
        var json = formToJson('formCita');
        fetch('', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }).then(response => response.json())
        .then(data => {

        }).catch(err => {

        }).finally(()=>{
            btnAgendar.innerHTML = `
            <i class="bi bi-plus-lg"></i>
            Agendar
            `;
        });
    };
});