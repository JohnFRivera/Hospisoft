import { CreateCss, SetTitle, SetNavbar, SetNumberInput, validForm, formToJson, SetError, SetFooter, CreateScript, GetHost } from '../assets/js/globals.functions.js';
import { cssStyles, NavBarUnregister, FooterDefault, spinCargando, scriptBS } from '../assets/helper/globals.helpers.js';
CreateCss(cssStyles);
const pageName = 'Ingresar';
SetTitle(pageName);
SetNavbar(NavBarUnregister);
SetFooter(FooterDefault);
CreateScript(scriptBS);
SetNumberInput('identificacion');
// se crea una funcion para hacer visible una contraseña 
let inpPass = document.getElementById('contraseña');
document.getElementById('ckShowPass').addEventListener('change', (ev) => {
    if (ev.target.checked) {
        inpPass.type = 'text';
    } else {
        inpPass.type = 'password';
    }
});
let btnEntrar = document.getElementById('btnEntrar');
btnEntrar.addEventListener('click', () => {
    btnEntrar.innerHTML = spinCargando;
    if (validForm('frmLogin')) {
        /* API */
        fetch('http://localhost:3000/usuario/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formToJson('frmLogin'))
        })
            .then(response => response.json())
            .then(data => {
                if (data.access) {
                    // lo que recibimos desde el backend lo mandamos al local storage para confirmar su inicio de sesion 
                    window.localStorage.setItem('userInfo', JSON.stringify(data.userInfo));
                    window.localStorage.setItem('btnAside', JSON.stringify(data.asideBtn));
                    window.localStorage.setItem('btnNavbar', data.btnNavbar);
                    window.location.href = GetHost() + data.route;
                } else {
                    SetError(data.title);
                }
            }).catch(err => {
                SetError(err);
            })
    };
    btnEntrar.innerHTML = 'Entrar';
});