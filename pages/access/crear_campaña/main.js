import {} from '../../assets/helper/layout.js';
import { SetAsideBtn } from '../assets/js/access.globals.js';
document.title += ' | Crear Campaña';
SetAsideBtn();
let btnCrear = document.getElementById('btnCrear');
btnCrear.addEventListener('click', ()=>{
    btnCrear.innerHTML = `
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span role="status">Cargando...</span>
    `;
    let form = document.querySelector('form');
    if (form.reportValidity()) {
        let obj = new Object;
        var formData = new FormData(form);
        formData.forEach((value, key)=>{
            obj[key] = value;
        });
        /* API */
        fetch('', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(data => {
            if (data.access) {
                window.localStorage.setItem('userInfo', data.userInfo);
                window.localStorage.setItem('btnAside', data.asideBtn);
                window.localStorage.setItem('btnNavbar', data.btnNavbar);
                window.location.href = data.route;
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