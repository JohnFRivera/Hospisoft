const Origen = window.location.origin;
const GetTitle = () => {
  return document.title.split("|")[1].trimStart();
};
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
const SetNavBar = () => {
  var navBar = document.getElementById("navBar");
  navBar.innerHTML = `
    <nav class="container-fluid px-5 py-3">
        <!--? LOGO -->
        <a class="display-6 fw-bold text-decoration-none fs-responsive mb-3 mb-md-0" href="${Origen}/front/client/inicio/">
            HOSPISOFT
        </a>
        <!--? LINKS -->
        <ul class="nav nav-pills row" id="navBarLinks">
            <li class="nav-item col-12 col-md-auto">
                <a class="nav-link nav-btn fs-4 fw-semibold text-center" href="${Origen}/front/client/inicio/">Inicio</a>
            </li>
            <li class="nav-item col-12 col-md-auto">
                <div class="btn-group mt-3 mt-md-0">
                    <a class="nav-btn btn btn-outline-primary fw-normal fs-4 px-4" href="${Origen}/front/client/iniciar_sesion/">Ingresar</a>
                    <a class="nav-btn btn btn-primary fw-normal fs-4 px-4" href="${Origen}/front/client/registrarse/">Registrarse</a>
                </div>
            </li>
        </ul>
    </nav>
    `;
  SetNavActive();
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

//* FOOTER
const SetFooter = () => {
  var footer = document.getElementById("footer");
  footer.innerHTML = `
    <div class="row px-4">
        <!--? DESARROLLADORES -->
        <div class="col col-lg-5">
            <div class="row mb-3 mb-md-0">
                <div class="col col-xxl-5 align-content-center">
                    <h4 class="fw-bold fs-2 mb-4">Desarrolladores</h4>
                </div>
                <div class="col">
                    <h5 class="fw-semibold fs-5 mb-0">Front</h5>
                    <p class="text-white-50 fw-light fs-5 mb-1">John Freddy Rivera Ayala</p>
                    <!--? REDES -->
                    <ul class="nav mb-4">
                        <li class="nav-item">
                            <a href="https://github.com/JohnFRivera" target="_blank" class="link-light link-opacity-50 link-opacity-100-hover me-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                </svg>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="https://co.linkedin.com/in/john-freddy-rivera-ayala" target="_blank" class="link-light link-opacity-50 link-opacity-100-hover me-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                    <h5 class="fw-semibold fs-5 mb-0">Back</h5>
                    <p class="text-white-50 fw-light fs-5 mb-1">Kevinn Andrés Álzate Pino</p>
                    <!--? REDES -->
                    <ul class="nav mb-4">
                        <li class="nav-item">
                            <a href="" class="link-light link-opacity-50 link-opacity-100-hover me-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                </svg>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="link-light link-opacity-50 link-opacity-100-hover me-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--? INSTRUCTOR -->
        <div class="col-12 col-lg-3 mt-5">
            <h4 class="fw-bold fs-2">Instructor</h4>
            <p class="text-white-50 fw-light fs-5">Walter Arias Aguirre</p>
        </div>
        <!--? CENTRO FORMATIVO -->
        <div class="col mt-5">
            <h4 class="fw-bold fs-2">Centro Formativo</h4>
            <p class="text-white-50 fw-light fs-5">Centro de Tecnologías Agroindustriales SENA</p>
        </div>
    </div>
    `;
};

export { GetTitle, SetNavBar, SetNumberInput, GetFormData, GetArrayForm, validInputs, SetConfirmPass, SetFooter };
