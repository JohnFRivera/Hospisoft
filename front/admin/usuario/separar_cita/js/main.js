import { SetAsideBtn, GetFormData, validInputs } from '../../../assets/js/admin.globals.js';
import { Query, NonQuery } from '../../../../assets/js/querys.js';
import { SetModal, ShowModal } from '../../../assets/js/modal.js';

SetAsideBtn();
const SetMedicos =()=> {
    NonQuery('', 'GET')
    .then(res => {
        if (res) {
            if (res.length > 0) {
                res.forEach(item => {
                    document.getElementById('idmedico').innerHTML += `<option value="${item.id}">${item.especialidad}</option>`;
                });
            };
        };
    });
};
document.addEventListener('DOMContentLoaded', ()=>{
    SetMedicos();
});
let btnAgregar = document.getElementById('btnAgendar');
btnAgregar.addEventListener('click', ()=>{
    if (validInputs()) {
        btnAgregar.innerHTML = `
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span role="status">Cargando...</span>
        `;
        let formData = GetFormData();
        Query('', 'POST', formData).then(res => {
            if (res.ok) {
                SetModal(
                    `
                    <h1 class="modal-title text-light fs-2" id="staticBackdropLabel">
                        ¡Felicidades!
                    </h1>
                    `,
                    `La cita ha sido agendada correctamente para ${formData.get('fecha')}.`,
                    `
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
                    `
                );
                ShowModal();
            } else {
                document.getElementById('lblError').innerHTML = `${res.message}`;
            };
        });
        btnAgregar.innerHTML = 'Agendar';
    };
});