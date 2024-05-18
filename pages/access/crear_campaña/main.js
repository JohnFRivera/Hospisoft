import { } from '../../assets/helper/layout.js';
import { } from '../assets/js/access.globals.js';
document.title += ' | Crear Campaña';
const deletBtn = () => {
    let btn = document.getElementsByClassName('btn-close');
    for (let i = 0; i < btn.length; i++) {
        btn.item(i).addEventListener('click', () => {
            document.getElementById('myModal').innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Eliminar Campaña</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ¿Seguro que deseas eliminar la campaña <b>"${btn.item(i).parentElement.childNodes[1].childNodes[1].innerText}"</b>?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" id="btnEliminar">Eliminar</button>
                </div>
                </div>
            </div>
            `;
            const modal = new bootstrap.Modal('#myModal');
            modal.show();
            document.getElementById('btnEliminar').addEventListener('click', ()=>{
                fetch('http://localhost:3000/campana/delete/'+btn.item(i).id, {
                    method: 'delete'
                }).then(response => response.json())
                .then(data => {
                    document.getElementById('myModal').innerHTML = `
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">${data.title}</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                ${data.message}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
                            </div>
                        </div>
                    </div>
                    `;
                    getCamp();
                })
            })
        })
    }
}
const getCamp = () => {
    let dtCamps = document.getElementById('dtCamps');
    dtCamps.innerHTML = '';
    fetch('http://localhost:3000/campana/listing')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                var dateTime = new Date(item.fecha);
                var arrayTime = item.hora.split(':');
                dtCamps.innerHTML += `
                <div class="col">
                    <div class="alert alert-light alert-dismissible fade show camp-hover">
                        <div class="d-flex justify-content-between">
                            <h3 class="mt-4">${item.titulo}</h3>
                            <span class="flex-column">
                                <p class="mb-0">${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}</p>
                                <p class="mb-0 small">${arrayTime[0]}:${arrayTime[1]}</p>
                            </span>
                        </div>
                        <button type="button" class="btn-close" id="${item.id}"></button>
                    </div>
                </div>
                `;
            });
            deletBtn();
        }).catch(err => {
            console.error(err);
            dtCamps.innerHTML += `
            <div class="col">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <p>Ha ocurrido un error de conexión</p>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
            `;
        })
}
getCamp();
let btnCrear = document.getElementById('btnCrear');
btnCrear.addEventListener('click', () => {
    btnCrear.innerHTML = `
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span role="status">Cargando...</span>
    `;
    let form = document.querySelector('form');
    if (form.reportValidity()) {
        let obj = new Object;
        var formData = new FormData(form);
        formData.forEach((value, key) => {
            obj[key] = value;
        });
        /* API */
        fetch('http://localhost:3000/campana/add', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(data => {
                if (data.succes) {
                    document.getElementById('myModal').innerHTML = `
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">${data.title}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${data.message}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
                        </div>
                        </div>
                    </div>
                    `;
                    const modal = new bootstrap.Modal('#myModal');
                    modal.show();
                    getCamp();
                } else {
                    document.getElementById('lblErr').innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="mb-1" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                    </svg>
                    ${data.title}
                    `;
                }
            }).catch(err => {
                document.getElementById('lblErr').innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="mb-1" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
            </svg>
            ${err}
            `;
            })
    };
    btnCrear.innerHTML = 'Entrar';
});