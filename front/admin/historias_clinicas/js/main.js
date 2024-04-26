import { SetAsideBtn, GetFormData, GetRowData, validInputs } from '../../assets/js/admin.globals.js';
SetAsideBtn();

const SetBtnSelect =()=> {
    var arrayBtnPut = Array.prototype.slice.call(document.getElementsByClassName('btn-select'));
    arrayBtnPut.forEach(Btn => {
        Btn.addEventListener('click', ()=>{
            let rowData = GetRowData(Btn);
            window.localStorage.setItem('citaSeleccionada', rowData[0]);
            window.location.href = window.location.origin + '/front/admin/historias_clinicas/historial.html';
        });
    });
}
//* GET
async function GetData() {
    //TODO: API
    var response = await fetch('./js/pacientes.json');
    return response.json();
}
const SetDataTable =()=> {
    let res = GetData();
    res.then(data => {
        data.forEach(item => {
            document.getElementById('tblPacientes').innerHTML += `
            <tr>
                <th class="align-content-center">${item.id}</th>
                <td class="align-content-center">${item.nombres}</td>
                <td class="align-content-center">${item.apellidos}</td>
                <td class="align-content-center text-primary fw-semibold">${item.eps}</td>
                <td>
                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn btn-sm btn-primary btn-select">
                            Seleccionar
                        </button>
                    </div>
                </td>
            </tr>
            `;
        });
        if (data.length < 10) {
            for (let i = 0; i < (10 - data.length); i++) {
                document.getElementById('tblPacientes').innerHTML += `
                <tr>
                    <th colspan="4"></th>
                    <td>
                        <div class="d-flex justify-content-center">
                            <button type="button" class="btn btn-sm btn-primary opacity-25 disabled">
                                <span class="opacity-0">Seleccionar</span>
                            </button>
                        </div>
                    </td>
                </tr>
                `;
            }
        };
        SetBtnSelect();
    });
}
SetDataTable();