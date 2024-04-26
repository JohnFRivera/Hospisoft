import { GetFormData } from './admin.globals.js';
import { NonQuery, Query } from '../../../assets/js/querys.js';
import { SetModal } from './modal.js';

const loadingSpinner = `
<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
<span role="status">Cargando...</span>
`;
const SetPut =(endpoint)=> {
    let btnEditar = document.getElementById('btnEditar');
    btnEditar.addEventListener('click', ()=>{
        btnEditar.innerHTML = loadingSpinner;
        if (validInputs()) {
            let formData = GetFormData();
            //TODO: API
            Query(endpoint, 'PUT', formData).then(res => {
                SetModal(
                    `<h1 class="modal-title fs-4 text-primary" id="staticBackdropLabel">${res.title}</h1>`,
                    res.message,
                    `
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
                    `
                );
            });
        };
        btnEditar.innerHTML = 'Editar';
    });
};
const SetDel =(endpoint)=> {
    let btnEliminar = document.getElementById('btnEliminar');
    btnEliminar.addEventListener('click', ()=>{
        btnEliminar.innerHTML = loadingSpinner;
        //TODO: API
        NonQuery(endpoint, 'DELETE').then(res => {
            SetModal(
                `<h1 class="modal-title fs-4 text-primary" id="staticBackdropLabel">${res.title}</h1>`,
                res.message,
                `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
                `
            );
        });
    });
};

export { SetPut, SetDel };