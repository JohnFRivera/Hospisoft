import { SetAsideBtn, GetFormData, validInputs } from '../../../assets/js/admin.globals.js';
import { Query } from '../../../../assets/js/querys.js';

SetAsideBtn();
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
                
            };
        });
        btnAgregar.innerHTML = 'Agendar';
    };
});