import { SetAsideBtn, GetFormData, GetRowData, validInputs } from '../../../assets/js/admin.globals.js';
import { SetModal, ShowModal } from '../../../assets/js/modal.js';
import { SetPut, SetDel } from '../../../assets/js/btnOptions.js';
SetAsideBtn();
//* PUT
const SetBtnPut =()=> {
    var arrayBtnPut = Array.prototype.slice.call(document.getElementsByClassName('btn-put'));
    arrayBtnPut.forEach(Btn => {
        Btn.addEventListener('click', ()=>{
            let rowData = GetRowData(Btn);
            SetModal(
                `<h1 class="modal-title fs-4 text-primary" id="staticBackdropLabel">Editar ${rowData[1]}</h1>`,
                `
                <div class="container-fluid">
                    <div class="row mb-2">
                        <p class="text-danger fw-semibold fs-5 mb-2 d-flex align-items-center" id="lblError"></p>
                        <div class="col">
                            <label class="fs-5 fw-semibold text-black-50" for="">Nombre</label>
                            <input type="text" class="form-control form-control-lg bg-body-tertiary form-required" id="nombre" value="${rowData[1]}">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <label class="fs-5 fw-semibold text-black-50" for="">Existencias</label>
                            <input type="number" class="form-control form-control-lg bg-body-tertiary form-required" min="0" id="existencias" value="${rowData[2]}">
                        </div>
                        <div class="col">
                            <label class="fs-5 fw-semibold text-black-50" for="">Valor</label>
                            <div class="input-group">
                                <div class="input-group-text">
                                    <i class="bi bi-currency-dollar fs-5"></i>
                                </div>
                                <input type="number" class="form-control form-control-lg bg-body-tertiary form-required" min="0" step="50" id="valor" value="${rowData[3]}">
                            </div>
                        </div>
                    </div>
                </div>
                `,
                `
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" id="btnEditar">Editar</button>
                `
            );
            ShowModal();
            SetPut('');
        });
    });
}
//* DEL
const SetBtnDel =()=> {
    var arrayBtnDel = Array.prototype.slice.call(document.getElementsByClassName('btn-del'));
    arrayBtnDel.forEach(Btn => {
        Btn.addEventListener('click', ()=>{
            let rowData = GetRowData(Btn);
            SetModal(
                `<h1 class="modal-title fs-4 text-danger" id="staticBackdropLabel">Eliminar ${rowData[1]}</h1>`,
                `
                <p class="fs-5">¿Seguro que deseas eliminar la medicina "<b>${rowData[1]}</b>"?</p>
                `,
                `
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">No</button>
                <button type="button" class="btn btn-primary px-3" id="btnEliminar">Sí</button>
                `
            );
            ShowModal();
            SetDel('');
        });
    });
}
//* GET
async function GetData() {
    //TODO: API
    var response = await fetch('./js/medicinas.json');
    return response.json();
}
const SetDataTable =()=> {
    let res = GetData();
    res.then(data => {
        data.forEach(item => {
            document.getElementById('tblMedicinas').innerHTML += `
            <tr>
                <th scope="row" class="align-content-center">${item.id}</th>
                <td class="align-content-center">${item.nombre}</td>
                <td class="align-content-center">${item.existencia}</td>
                <td class="align-content-center">${item.valor}</td>
                <td>
                    <div class="d-flex justify-content-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-info btn-put">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-danger btn-del">
                                <i class="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
            `;
        });
        if (data.length < 10) {
            for (let i = 0; i < (10 - data.length); i++) {
                document.getElementById('tblMedicinas').innerHTML += `
                <tr>
                    <th colspan="4"></th>
                    <td>
                        <div class="d-flex justify-content-center">
                            <div class="btn-group opacity-25">
                                <button type="button" class="btn btn-sm btn-outline-info disabled">
                                    <i class="bi bi-pencil-square opacity-0"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-danger disabled">
                                    <i class="bi bi-trash-fill opacity-0"></i>
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
                `;
            }
        }
        SetBtnPut();
        SetBtnDel();
    })   
}
SetDataTable();

document.getElementById('btnNuevo').addEventListener('click', ()=>{
    SetModal(
        `<h1 class="modal-title text-light fs-2" id="staticBackdropLabel">Agregar Medicina</h1>`,
        `
        <div class="container-fluid">
            <div class="row mb-2">
                <p class="text-danger fw-semibold fs-5 mb-2 d-flex align-items-center" id="lblError"></p>
                <div class="col">
                    <label class="fs-5 fw-semibold text-black-50" for="">Nombre</label>
                    <input type="text" class="form-control form-control-lg bg-body-tertiary form-required" id="nombre">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <label class="fs-5 fw-semibold text-black-50" for="">Existencias</label>
                    <input type="number" class="form-control form-control-lg bg-body-tertiary form-required" min="0" id="existencias">
                </div>
                <div class="col">
                    <label class="fs-5 fw-semibold text-black-50" for="">Valor</label>
                    <div class="input-group">
                        <div class="input-group-text">
                            <i class="bi bi-currency-dollar fs-5"></i>
                        </div>
                        <input type="number" class="form-control form-control-lg bg-body-tertiary form-required" min="0" step="50" id="valor">
                    </div>
                </div>
            </div>
        </div>
        `,
        `
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" id="btnGuardar">Guardar</button>
        `
    );
    ShowModal()
    let btnGuardar = document.getElementById('btnGuardar');
    btnGuardar.addEventListener('click', ()=>{
        btnGuardar.innerHTML = `
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span role="status">Cargando...</span>
        `
        if (validInputs()) {
            let formData = GetFormData();
            //TODO: API
            fetch('', {
                method: 'POST',
                headers: '',
                body: formData
            })
            .then(response => response.json())
            .then(res => {
                SetModal(
                    `<h1 class="modal-title fs-4 text-primary" id="staticBackdropLabel">${res.title}</h1>`,
                    res.message,
                    `
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
                    `
                );
            })
        };
        btnGuardar.innerHTML = 'Guardar';
    })
})
let txtBuscar = document.getElementById('txtBuscar');
txtBuscar.addEventListener('change', (ev)=>{
    if (ev.target.value.length == 0) {

    };
});