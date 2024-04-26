import { SetAsideBtn, GetFormData, GetRowData, validInputs } from '../../../assets/js/admin.globals.js';
SetAsideBtn();

const SetBtnSelect =()=> {
    var arrayBtnPut = Array.prototype.slice.call(document.getElementsByClassName('btn-select'));
    arrayBtnPut.forEach(Btn => {
        Btn.addEventListener('click', ()=>{
            let rowData = GetRowData(Btn);
            window.localStorage.setItem('citaSeleccionada', rowData[0]);
            window.location.href = window.location.origin + '/front/admin/medico/citas/atender_cita.html';
        });
    });
}
//* GET
async function GetData() {
    //TODO: API
    var response = await fetch('./js/citas.json');
    return response.json();
}
const SetDataTable =()=> {
    let res = GetData();
    res.then(data => {
        data.forEach(item => {
            document.getElementById('tblCitas').innerHTML += `
            <tr>
                <th class="align-content-center">${item.id}</th>
                <td class="align-content-center">${item.paciente}</td>
                <td class="align-content-center">${item.medico}</td>
                <td class="align-content-center">${item.fecha}</td>
                <td class="align-content-center">${item.hora}</td>
                <td class="align-content-center">
                    <span class="${item.estado == 'Atendido' ? 'bg-success' : 'bg-warning'} py-1 px-2 rounded-3 fw-bold text-light">${item.estado}</span>
                </td>
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
                document.getElementById('tblCitas').innerHTML += `
                <tr>
                    <th colspan="6"></th>
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