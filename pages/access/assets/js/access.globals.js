import { GetHost, validForm, formToJson, SetError } from '../../../assets/js/globals.functions.js';
import { spinCargando } from '../../../assets/helper/globals.helpers.js';

function SetActiveAside() {
    var navItems = document.querySelectorAll('.nav-item.border-end');
    var title = document.title.split('|')[1].trim();
    navItems.forEach(item => {
        if (item.textContent.trim() == title) {
            item.classList.add('active');
            item.firstElementChild.classList.add('active');
        };
    });
};
const SetAsideBar = () => {
    const json = [
        { text: 'Dashboard', href: `${GetHost()}/pages/access/dashboard/`, icon: 'bi-graph-up-arrow' },
        { text: 'Usuarios', href: `${GetHost()}/pages/access/usuarios/`, icon: 'bi-people' },
        { text: 'Medicinas', href: `${GetHost()}/pages/access/medicinas/`, icon: 'bi-prescription2' },
        { text: 'Agenda Especialista', href: `${GetHost()}/pages/access/agenda_especialista/`, icon: 'bi-calendar4-range' },
        { text: 'Citas', href: `${GetHost()}/pages/access/citas/`, icon: 'bi-calendar4-week' },
        { text: 'Separar Cita', href: `${GetHost()}/pages/access/separar_cita/`, icon: 'bi-calendar2-plus' },
        { text: 'Historias Clínicas', href: `${GetHost()}/pages/access/historias_clinicas/`, icon: 'bi-clipboard2-pulse' },
        { text: 'Crear Campaña', href: `${GetHost()}/pages/access/crear_campaña/`, icon: 'bi-envelope-plus' }
    ];
    var buttonsJson = json //JSON.parse(window.localStorage.getItem('asideButtons'));
    var asideBtn = document.getElementById('asideBtn');
    asideBtn.innerHTML = '';
    if (buttonsJson) {
        buttonsJson.forEach(item => {
            asideBtn.innerHTML += `
            <li class="nav-item border-end btn-aside">
                <a class="nav-link text-aside fs-5" href="${item.href}">
                    <i class="bi ${item.icon} me-2"></i>
                    ${item.text}
                </a>
            </li>
            `;
        });
    } else {
        asideBtn.innerHTML = `
        <li class="nav-item">
                <p class="nav-link text-aside fs-5">
                    <i class="bi bi-exclamation-circle-fill me-2"></i>
                    Error
                </p>
            </li>
        `;
    };
    SetActiveAside();
};
const Button_Click = (btn, URL, idForm) => {
    let button = document.getElementById(`btn${btn}`);
    button.addEventListener('click', ()=>{
        if (btn == 'Eliminar') {
            button.innerHTML = spinCargando;
            fetch(URL, {
                method: 'delete'
            }).then(response => response.json())
            .then(data => {
                button.innerHTML = btn;
            }).catch(err => {
                console.error(err);
                SetError(`ERROR: ${err}`);
            });
        } else {
            if (validForm(idForm)) {
                button.innerHTML = spinCargando;
                var method = '';
                if (btn == 'Guardar') {
                    method = 'post';
                } else {
                    method = 'put';
                };
                var json = formToJson(idForm);
                fetch(URL, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(json)
                }).then(response => response.json())
                .then(data => {
                    button.innerHTML = btn;
                }).catch(err => {
                    console.error(err);
                    SetError(`ERROR: ${err}`);
                });
            };
        };
    });
};
const GetArrayData = (row) => {
    var arrayData = new Array();
    row.childNodes.forEach(item => {
        if (item.innerText != undefined && item.innerText != '') {
            arrayData.push(item.innerText);
        };
    });
    return arrayData;
};

export { SetAsideBar, Button_Click, GetArrayData };