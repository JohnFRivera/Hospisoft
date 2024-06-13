import { NavBarUnregister, cssStyles, spinCargando, FooterDefault } from '../../assets/helper/globals.helpers.js';
import { CreateCss, SetError, SetNavbar, SetFooter, SetTitle, validForm, formToJson } from '../../assets/js/globals.functions.js';
import { SetAsideBar} from '../assets/js/access.globals.js';
import { SetModal, ShowModal } from '../assets/js/modal.js';

CreateCss(cssStyles);
SetTitle('Separar Cita');
SetNavbar(NavBarUnregister);
SetAsideBar();
SetFooter(FooterDefault);


const cargarEspecialistas = () => {
    fetch('http://localhost:3000/cita/listingMedico')
        .then(response => response.json())
        .then(data => {
            const selectEspecialistas = document.getElementById('selectEspecialistas');
            data.forEach(especialista => {
                const option = document.createElement('option');
                option.value = especialista.id;
                option.textContent = especialista.nombres;
                selectEspecialistas.appendChild(option);
            });
        })
        .catch(err => {
            console.error('Error al cargar especialistas:', err);
            alert('Ocurrió un error al cargar los especialistas.');
        });
};

document.addEventListener('DOMContentLoaded', cargarEspecialistas);
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