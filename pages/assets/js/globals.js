//* NAVBAR
const SetNavActive = () => {
  var arrayNavBtn = Array.prototype.slice.call(
    document.getElementsByClassName("nav-btn")
  );
  arrayNavBtn.forEach((NavBtn) => {
    if (NavBtn.innerText == GetTitle()) {
      NavBtn.classList.add("active");
      if (NavBtn.innerText == "Ingresar") {
        NavBtn.classList.replace("btn-outline-primary", "btn-primary");
      }
    }
  });
};
//! ERROR MESSAGE
const SetError = (Mensaje) => {
  document.getElementById("lblError").innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="me-2" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
    </svg>
    ${Mensaje}
    `;
};
const ClearError = () => {
  document.getElementById("lblError").innerHTML = "";
};
//? INPUTS
const SetNumberInput =(id)=> {
  document.getElementById(id).addEventListener('input', (ev)=>{
    var result = ev.target.value.match(/[0-9]/g);
    ev.target.value = '';
    if (result) {
        result.forEach(char => {
            ev.target.value += char;
        });
    };
  });
};
const GetArrayForm = () => {
  return Array.prototype.slice.call(
    document.getElementsByClassName("form-required")
  );
};
const GetFormData = () => {
  let formData = new FormData();
  let arrayInputs = GetArrayForm();
  arrayInputs.forEach((Input) => {
    formData.append(Input.id, Input.value);
  });
  return formData;
};
const validInputs = () => {
  let result = true;
  var arrayInputs = GetArrayForm();
  arrayInputs.forEach((Input) => {
    if (Input.value.length == 0) {
      Input.classList.add("is-invalid");
      SetError("Faltan campos por llenar.");
      Input.addEventListener("input", (ev) => {
        if (ev.target.classList.contains("is-invalid")) {
          if (ev.target.value.length > 0) {
            ev.target.classList.remove("is-invalid");
            ClearError();
          }
        }
      });
      result = false;
    }
  });
  return result;
};
function SetConfirmPass() {
    let txtContrasena = document.getElementById('contraseña');
  let txtConfirmPass = document.getElementById('txtConfirmPass');
  let lblError = document.getElementById('confirmPassError')
  txtConfirmPass.addEventListener('focusout', () => {
    if (txtContrasena.value.length > 0) {
        if (txtContrasena.value == txtConfirmPass.value) {
            txtConfirmPass.classList.remove('is-invalid');
            txtConfirmPass.classList.add('is-valid');
            lblError.innerText = '';
          } else {
            txtConfirmPass.classList.remove('is-valid');
            txtConfirmPass.classList.add('is-invalid');
            lblError.innerText = 'Las contraseñas no coinciden.';
          }
    }
  });
}
export { GetTitle, SetNavBar, SetNumberInput, GetFormData, GetArrayForm, validInputs, SetConfirmPass, SetFooter };