import { GetHost, validForm, formToJson, SetError } from '../../../assets/js/globals.functions.js';
import { spinCargando } from '../../../assets/helper/globals.helpers.js';
import { SetModal } from './modal.js';

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
    var buttonsJson = JSON.parse(window.localStorage.getItem('btnAside'));
    var asideBtn = document.getElementById('asideBtn');
    asideBtn.innerHTML = '';
    if (buttonsJson) {
        buttonsJson.forEach(item => {
            asideBtn.innerHTML += `
            <li class="nav-item border-end btn-aside">
                <a class="nav-link text-aside fs-5" href="${GetHost()}${item.href}">
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
    button.addEventListener('click', () => {
        if (btn == 'Eliminar') {
            button.innerHTML = spinCargando;
            fetch(URL, {
                method: 'delete'
            }).then(response => response.json())
                .then(data => {
                    SetModal(
                        `
                        <h1 class="fs-3 text-info">
                            <i class="bi bi-info-circle-fill"></i>
                            ${data.title}
                        </h1>
                        `,
                        `
                        <span class="fs-5">
                            ${data.message}
                        </span>
                        `,
                        `<button class="btn btn-info" type="button" id="btnReload">Aceptar</button>`
                    );
                    document.getElementById('btnReload').addEventListener('click', () => {
                        window.location.reload();
                    });
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
                        SetModal(
                            `
                            <h1 class="fs-3 text-info">
                                <i class="bi bi-info-circle-fill"></i>
                                ${data.title}
                            </h1>
                            `,
                            `
                            <span class="fs-5">
                                ${data.message}
                            </span>
                            `,
                            `<button class="btn btn-info" type="button" id="btnReload">Aceptar</button>`
                        );
                        document.getElementById('btnReload').addEventListener('click', () => {
                            window.location.reload();
                        });
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