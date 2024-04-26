import { SetNavBar, validInputs, SetFooter } from '../../../assets/js/globals.js';
SetNavBar();
//* INPUTS Y BOTÓN
let txtEmail = document.getElementById('email');
let txtContrasena = document.getElementById('contraseña');
let btnEntrar = document.getElementById('btnEntrar');
btnEntrar.addEventListener('click', () => {
    btnEntrar.innerHTML = `
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span role="status">Cargando...</span>
    `;
    if (validInputs()) {
        fetch("http://localhost:3000/usuarios/login", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: txtEmail.value,
                contrasena: txtContrasena.value,
            }),
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.access == true) {
                    window.localStorage.setItem(
                        "userData",
                        JSON.stringify({
                            access: res.access,
                            id: res.id,
                            nombre: res.nombre,
                        })
                    );
                    window.location.href =
                        window.location.origin + "/front/admin/dashboard/";
                } else {
                    SetError(res.title);
                };
                btnEntrar.innerHTML = 'Entrar';
            });
    } else {
        btnEntrar.innerHTML = 'Entrar';
    }
});
document.getElementById('ckShowPass').addEventListener('change', () => { txtContrasena.type == 'password' ? txtContrasena.type = "text" : txtContrasena.type = "password"; });
SetFooter();