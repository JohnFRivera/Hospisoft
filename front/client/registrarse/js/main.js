import { SetNavBar, GetFormData, validInputs, SetConfirmPass, SetFooter } from '../../../assets/js/globals.js';
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
    formData.append('rol', 'Usuario');

    fetch('http://localhost:3000/usuarios/create', {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        document.getElementById("modal").innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title text-primary fs-5">
                                ${res.title}
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${res.message}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
                        </div>
                    </div>
                </div>
                `;
        const modal = new bootstrap.Modal("#modal", {
          backdrop: "static",
        });
        modal.show();
      });
  }
  btnRegistrarme.innerHTML = 'Registrarme';
});
SetFooter();