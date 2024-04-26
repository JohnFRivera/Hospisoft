import { SetAsideBtn, GetFormData,validInputs } from '../../assets/js/admin.globals.js';
SetAsideBtn();
let btnAgregar = document.getElementById('btnAgendar');
btnAgregar.addEventListener('click', ()=>{
    btnAgregar.innerHTML = `
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span role="status">Cargando...</span>
    `;
    if (validInputs()) {
        let formData = GetFormData();
        fetch('', {
            method: 'POST',
            headers: '',
            body: formData
        })
        .then(response => response.json())
        .then(res => {
            
        })
    }
    btnAgregar.innerHTML = 'Agendar';
});