import { NavBarUnregister, cssStyles, spinCargando, FooterDefault } from '../../assets/helper/globals.helpers.js';
import { CreateCss, SetError, SetNavbar, SetFooter, SetTitle, validForm, formToJson } from '../../assets/js/globals.functions.js';
import { Button_Click, SetAsideBar } from '../assets/js/access.globals.js';
import { SetModal, ShowModal } from '../assets/js/modal.js';

CreateCss(cssStyles);
SetTitle('Crear Campaña');
SetNavbar(NavBarUnregister);
SetAsideBar();
SetFooter(FooterDefault);

const btnNuevo = document.getElementById('btnNuevo');
fetch('http://localhost:3000/campana/listing').then(response => response.json())
    .then(data => {
        data.forEach(item => {
            var dateTime = new Date(item.fecha);
            document.getElementById('dtCamps').innerHTML += `
            <div class="col">
                <div class="alert alert-light alert-dismissible fade show camp-hover">
                    <div class="d-flex justify-content-between">
                        <h3 class="mt-4" id="campTitulo-${item.id}">${item.titulo}</h3>
                        <span class="flex-column">
                            <p class="mb-0">${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}</p>
                            <p class="mb-0 small">${item.hora}</p>
                        </span>
                    </div>
                    <button type="button" class="btn-close" id="${item.id}"></button>
                </div>
            </div>
            `;
        });
        let btnDeletes = document.querySelectorAll('.btn-close');
        btnDeletes.forEach(item => {
            item.addEventListener('click', () => {
                var titulo = document.getElementById(`campTitulo-${item.id}`).innerText;
                SetModal(
                    `
                    <h1 class="fs-3 text-danger">
                        <i class="bi bi-trash-fill"></i>
                        Eliminar Campaña
                    </h1>
                    `,
                    `
                    <span class="fs-5">
                        ¿Seguro que deseas eliminar a <b>'${titulo}'</b> permanentemente?
                    </span>
                    `,
                    `
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-danger" id="btnEliminar">Eliminar</button>
                    `
                );
                ShowModal();
                Button_Click('Eliminar', `http://localhost:3000/campana/delete/${item.id}`, '');
            });
        });
    }).catch(err => {
        document.getElementById('dtCamps').innerHTML = `
        <div class="col">
            <div class="alert bg-danger text-light alert-dismissible fade show camp-hover">
                <h5 class="mt-4">${err}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
        `;
    });

btnNuevo.addEventListener('click', () => {
    if (validForm('formCamp')) {
        btnNuevo.innerHTML = spinCargando;
        var json = formToJson('formCamp');
        fetch('http://localhost:3000/campana/add', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    SetModal(
                        `
                        <h1 class="fs-3 text-danger">
                            <i class="bi bi-info-circle-fill"></i>
                            ${data.title}
                        </h1>
                        `,
                        `
                        <span class="fs-5">
                            ${data.message}
                        </span>
                        `,
                        `<button class="btn btn-secondary" type="button" id="btnReload">Aceptar</button>`
                    );
                    document.getElementById('btnReload').addEventListener('click', () => {
                        window.location.reload();
                    });
                    ShowModal();
                } else {
                    SetError(data.message);
                }
            }).catch(err => {
                SetError(err);
            }).finally(()=>{
                btnNuevo.innerHTML = 'Realizar campaña';
            });
    };
});