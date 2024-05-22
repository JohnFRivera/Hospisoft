import { GetHost, CreateCss, SetTitle, SetNavbar, SetNumberInput, SetConfirmPass, FillSelect, validForm, formToJson, SetError, SetFooter, CreateScript } from '../assets/js/globals.functions.js';
import { cssStyles, NavBarUnregister, arrayEPS, spinCargando, FooterDefault, scriptBS } from '../assets/helper/globals.helpers.js';
import { ModalConstructor, SetModal, ShowModal } from '../assets/js/modal.js';
CreateCss(cssStyles);
const pageName = 'Registrarme';
SetTitle(pageName);
SetNavbar(NavBarUnregister);
FillSelect('eps', arrayEPS);
SetFooter(FooterDefault);
ModalConstructor();
CreateScript(scriptBS);
SetNumberInput('identificacion');
SetConfirmPass();
SetNumberInput('movil');
SetNumberInput('telefono');
let btnRegistrarse = document.getElementById('btnRegistrarse');
btnRegistrarse.addEventListener('click', () => {
  btnRegistrarse.innerHTML = spinCargando;
  //se extrae el form y se valida la informacion con la funcion reportVality() 
  if (validForm('frmRegister')) {
    /* API */
    fetch('http://localhost:3000/pacientes/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formToJson('frmRegister'))
    })
      .then(response => response.json())
      .then(data => {
        // si la respuesta successs es true, en un modal le mostrar al usuario un titulo y un mensaje 
        if (data.success) {
          SetModal(
            data.title,
            data.message,
            `<a class="btn btn-primary" href="${GetHost()}/pages/ingresar/">Aceptar</a>`
          );
          ShowModal();
        } else {
          // si la respuesta succes es false, enviara un mensaje de error al usuario
          SetError(data.title);
        }
      }).catch(err => {
        // si hay un error con el fetch enviara un mensaje de error al programador
        SetError(err);
      })
  };
  btnRegistrarse.innerHTML = 'Registrarse';
});