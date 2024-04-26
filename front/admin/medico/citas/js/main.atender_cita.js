import { SetAsideBtn, GetFormData, GetRowData, validInputs } from '../../../assets/js/admin.globals.js';
SetAsideBtn();

const SetBtnAgregar =()=> {
    var arrayBtnPut = Array.prototype.slice.call(document.getElementsByClassName('btn-agregar'));
    arrayBtnPut.forEach(Btn => {
        Btn.addEventListener('click', ()=>{
            let rowData = GetRowData(Btn);
            document.getElementById('medicinas').value += rowData[0] + ', ';
        });
    });
}
//* GET
async function GetData() {
    //TODO: API
    var response = await fetch('../../dispensario/medicinas/js/medicinas.json');
    return response.json();
}
const SetDataTable =()=> {
    let res = GetData();
    res.then(data => {
        data.forEach(item => {
            document.getElementById('tblMedicinas').innerHTML += `
            <tr>
                <td class="align-content-center">${item.nombre}</td>
                <td class="align-content-center">${item.existencia}</td>
                <td>
                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn btn-sm btn-success btn-agregar">
                            <i class="bi bi-plus-lg"></i>
                        </button>
                    </div>
                </td>
            </tr>
            `;
        });
        SetBtnAgregar();
    });
}
SetDataTable();

document.getElementById('ckExamenesMedicos').addEventListener('change', (ev)=>{
    if (ev.target.checked) {
        document.getElementById('nuevaCita').innerHTML = `
        <div class="border border-secondary rounded-2 p-3">
            <div class="row mb-2">
                <div class="col">
                    <label class="fw-semibold fs-4 ms-1" for="">Exámenes solicitados:</label>
                    <input type="text" class="form-control form-control-lg bg-body-tertiary form-required" id="fecha">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label class="fw-semibold fs-4 ms-1" for="">Especialista:</label>
                    <select class="mb-2 form-control form-select form-select-lg bg-body-tertiary form-required" id="idmedico">
                        <option value="">Seleccionar...</option>
                    </select>
                </div>
                <div class="col">
                    <label class="fw-semibold fs-4 ms-1" for="">Fecha para Nueva cita:</label>
                    <div class="input-group">
                        <input type="date" class="form-control form-control-lg bg-body-tertiary form-required" id="fecha">
                        <input type="time" class="form-control form-control-lg bg-body-tertiary form-required" id="hora">
                    </div>
                </div>
            </div>
        </div>
        `;
    } else {
        document.getElementById('nuevaCita').innerHTML = '';
    }
})