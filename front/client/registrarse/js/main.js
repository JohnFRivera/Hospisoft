import { SetNavBar, GetFormData, validInputs, SetConfirmPass, SetFooter } from '../../../assets/js/globals.js';
import { Query } from '../../../assets/js/querys.js';
import {} from '';
SetNavBar();
SetConfirmPass();
let btnRegistrarme = document.getElementById("btnRegistrarme");
btnRegistrarme.addEventListener("click", () => {
  btnRegistrarme.innerHTML = `
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span role="status">Cargando...</span>
    `;
  if (validInputs()) {
    let formData = GetFormData();
    Query('', 'POST', formData)
    .then(res => {
      if (res.ok) {

      } else {

      }
    });
  }
  btnRegistrarme.innerHTML = 'Registrarme';
});
SetFooter();