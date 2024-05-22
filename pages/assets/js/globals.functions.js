const GetHost = () => {
  return window.location.origin;
};
const SetTitle = (title) => {
  document.title = `Hospisoft | ${title}`;
};
const SetError = (Err) => {
  var lblErr = document.getElementById('lblErr');
  lblErr.className = 'text-danger fw-bold text-center mb-0';
  if (Err.length > 0) {
    lblErr.innerHTML = `
      <i class="bi bi-exclamation-circle-fill"></i>
      ${Err}
      `;
  } else {
    lblErr.innerHTML = Err;
  }
};
const SetNumberInput = (id) => {
  document.getElementById(id).addEventListener('input', (ev) => {
    var result = ev.target.value.match(/[0-9]/g); // Extrae los dígitos del valor ingresado
    ev.target.value = ''; // Limpia el valor del campo de entrada
    if (result) {
      result.forEach(char => {
        ev.target.value += char; // Vuelve a agregar solo los dígitos al campo de entrada
      });
    }
  });
};
function validConfirmPass(value, txtConfirmPass, lblErr) {
  if (value.length > 0) {
    if (value == txtConfirmPass.value) {
      txtConfirmPass.classList.remove('is-invalid');
      txtConfirmPass.classList.add('is-valid');
      lblErr.innerText = '';
    } else {
      txtConfirmPass.classList.remove('is-valid');
      txtConfirmPass.classList.add('is-invalid');
      lblErr.innerText = 'Las contraseñas no coinciden.';
    }
  } else {
    if (value == txtConfirmPass.value) {
      txtConfirmPass.classList.remove('is-invalid');
      txtConfirmPass.classList.remove('is-valid');
      lblErr.innerText = '';
    } else {
      txtConfirmPass.classList.remove('is-valid');
      txtConfirmPass.classList.add('is-invalid');
      lblErr.innerText = 'Las contraseñas no coinciden.';
    }
  }
};
const SetConfirmPass = () => {
  const txtContrasena = document.getElementById('contraseña');
  let txtConfirmPass = document.getElementById('txtConfirmPass');
  let lblErr = document.getElementById('confirmPassErr')
  txtContrasena.addEventListener('focusout', () => {
    validConfirmPass(txtContrasena.value, txtConfirmPass, lblErr);
  });
  txtConfirmPass.addEventListener('focusout', () => {
    validConfirmPass(txtContrasena.value, txtConfirmPass, lblErr);
  });
};
const FillSelect = (id, data) => {
  let select = document.getElementById(id);
  data.forEach(item => {
    select.innerHTML += `
    <option value="${item.value}">${item.text}</option>
    `;
  });
};
const validForm = (id) => {
  var form = document.getElementById(id);
  return form.reportValidity();
};
const formToJson = (id) => {
  let obj = new Object;
  var formData = new FormData(document.getElementById(id));
  // iteramos sobre los datos recolectados del fomulario 
  formData.forEach((value, key) => {
    // se agregan los datos a un arreglo 
    obj[key] = value;
  });
  return obj;
};
const SetNavbar = (Content) => {
  document.getElementById('header').innerHTML = Content;
};
const SetFooter = (Content) => {
  document.getElementById('footer').innerHTML = Content;
};
const CreateCss = (url) => {
  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = url;
  document.head.appendChild(css);
};
const CreateScript = (url) => {
  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
};
const LogOut_Click = () => {
  window.localStorage.removeItem('userInfo');
  window.localStorage.removeItem('btnAside');
  window.localStorage.removeItem('btnNavbar');
  window.location.href = `${GetHost()}/pages/inicio/`;
};
export {
  GetHost,
  SetTitle,
  SetError,
  SetNumberInput,
  SetConfirmPass,
  FillSelect,
  validForm,
  formToJson,
  SetNavbar,
  SetFooter,
  CreateCss,
  CreateScript,
  LogOut_Click
};