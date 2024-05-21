import {} from '../assets/helper/layout.js';

document.title += ' | Registrarme';

/*creacion de una funcion donde se pueda pueda confirmar la contraseña con otro input  */ 
let confirmPassErr = document.getElementById('confirmPassErr');
document.getElementById('inpConfirmPass').addEventListener('focusout', (ev)=>{
  //validamos de que haya informacion
  if (ev.target.value.length > 0) {
    // se compara ambos inputs si no son iguales manda un mensaje "Las contraseñas no coinciden"
    if (ev.target.value == document.getElementById('contraseña').value) {
      confirmPassErr.innerHTML = '';
      ev.target.classList.remove('is-invalid');
      ev.target.classList.add('is-valid');
    } else {
      confirmPassErr.innerHTML = 'Las contraseñas no coinciden';
      ev.target.classList.remove('is-valid');
      ev.target.classList.add('is-invalid');
    }
  } else {
    //valida que el input no se envie vacio 
    confirmPassErr.innerText = 'Tienes que llenar este campo';
    ev.target.classList.remove('is-valid');
    ev.target.classList.add('is-invalid');
  }
});


const EPS = [
  'Seleccionar...',
  'Coosalud',
  'Barrios Unidos'
];
//iteramos sobre el arreglo [EPS] para ingresar la informacion en un select 
EPS.forEach(item => {
  document.getElementById('eps').innerHTML += `
  <option value="${item}">${item}</option>
  `;
});
// 
let btnRegistrarse = document.getElementById('btnRegistrarse');
btnRegistrarse.addEventListener('click', ()=>{
    btnRegistrarse.innerHTML = `
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span role="status">Cargando...</span>
    `;
    let form = document.querySelector('form');
    //se extrae el form y se valida la informacion con la funcion reportVality() 
    if (form.reportValidity()) {
        let obj = new Object;
        var formData = new FormData(form);
        // iteramos sobre los datos recolectados del fomulario 
        formData.forEach((value, key)=>{
          // se agregan los datos a un arreglo 
            obj[key] = value;
        });
        /* API */
        fetch('http://localhost:3000/pacientes/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(data => {
          // si la respuesta successs es true, en un modal le mostrar al usuario un titulo y un mensaje 
            if (data.success) {
                document.getElementById('staticBackdrop').innerHTML = `
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">${data.title}</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      ${data.message}
                    </div>
                    <div class="modal-footer">
                      <a class="btn btn-primary" href="${window.location.origin}/pages/ingresar/">Aceptar</a>
                    </div>
                  </div>
                </div>
                `;
                const modal = new bootstrap.Modal('#staticBackdrop');
                modal.show();
            } else {
              // si la respuesta succes es false, enviara un mensaje de error al usuario
                document.getElementById('lblErr').innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="mb-1" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                </svg>
                ${data.title}
                `;
            }
        }).catch(err => {
              // si hay un error con el fetch enviara un mensaje de error al programador
            document.getElementById('lblErr').innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="mb-1" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
            </svg>
            ${err}
            `;
        })
    };
    btnRegistrarse.innerHTML = 'Registrarse';
});