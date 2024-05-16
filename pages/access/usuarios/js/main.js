import { SetAsideBtn, GetRowData } from '../../assets/js/admin.globals.js';
import { SetPut, SetDel } from '../../assets/js/btnOptions.js';
import { SetModal, ShowModal } from '../../assets/js/modal.js';
import { NonQuery } from '../../../assets/js/querys.js';

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
                `<h1 class="modal-title fs-4 text-danger" id="staticBackdropLabel">Eliminar Usuario</h1>`,
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
const FillTable = (data, empty) => {
    let table = document.getElementById('tblUsuarios');
    table.innerHTML = null;
    if (data.length > 0) {
        data.forEach(item => {
            table.innerHTML += `
            <tr>
                <th scope="row" class="align-content-center">${item.identificacion}</th>
                <td class="align-content-center">${item.usuario}</td>
                <td class="align-content-center">${item.email}</td>
                <td class="align-content-center fw-semibold text-primary">${item.rol}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-outline-info btn-put" type="button">
                            <i class="bi bi-pencil-square fs-6"></i>
                        </button>
                        <button class="btn btn-sm btn-danger btn-del" type="button">
                            <i class="bi bi-trash-fill fs-6"></i>
                        </button>
                    </div>
                </td>
            </tr>
            `;
        });
        SetBtnPut();
        SetBtnDel();
    } else {
        table.innerHTML = `
        <tr>
            <td scope="row" colspan="5" class="text-center">${empty}</td>
        </tr>
        `;
    }

};
const GetData = (endpoint) => {
    NonQuery(endpoint, 'GET').then(res => {
        if (res.ok) {
            FillTable(res.data, 'No hay ningún dato aún.');
        } else {
            //! ERROR
        };
    }).catch(error => {
        FillTable([], 'Ha ocurrido un problema con el servidor.');
    });
};

document.addEventListener('DOMContentLoaded', () => {
    GetData('');
});
document.getElementById('txtBuscar').addEventListener('change', (ev) => {
    if (ev.target.value.length == 0) {
        GetData('');
    };
});
document.getElementById('btnBuscar').addEventListener('click', ()=>{
    var txtBuscar = document.getElementById('txtBuscar');
    if (txtBuscar.value.length > 0) {
        GetData(`${txtBuscar.value}`);
    }
});