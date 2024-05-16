import { SetAsideBtn, GetRowData } from '../../../assets/js/admin.globals.js';
import { Query, NonQuery } from '../../../../assets/js/querys.js';

SetAsideBtn();
const SetMedicos =()=> {
    NonQuery('', 'GET')
    .then(res => {
        if (res) {
            if (res.length > 0) {
                res.forEach(item => {
                    document.getElementById('idMedico').innerHTML += `<option value="${item.id}">${item.nombres} ${item.apellidos}</option>`;
                });
            };
        };
    });
};
const SetBtnSelect =()=> {
    var arrayBtnPut = Array.prototype.slice.call(document.getElementsByClassName('btn-select'));
    arrayBtnPut.forEach(Btn => {
        Btn.addEventListener('click', ()=>{
            let rowData = GetRowData(Btn);
            window.localStorage.setItem('citaSeleccionada', rowData[0]);
            window.location.href = window.location.origin + '/front/admin/medico/citas/atender_cita.html';
        });
    });
};
const SetFiltro =()=> {
    var idMedico = document.getElementById('idMedico');
    if (idMedico.value.length > 0) {
        var formData = new FormData();
        formData.append('filtro', document.getElementById('filtrar').value);
        formData.append('idMedico', idMedico.value)
        Query('', 'GET', formData)
        .then(res => {
            if (res.ok) {
                FillTable(res.data, 'No hay ningún dato aún.');
            } else {
                //! ERROR
            };
        }).catch(error => {
            FillTable([], 'Ha ocurrido un problema con el servidor.');
        });
    };
};
const FillTable = (data, empty) => {
    let table = document.getElementById('tblCitas');
    table.innerHTML = null;
    if (data.length > 0) {
        data.forEach(item => {
            table.innerHTML += `
            <tr>
                <th scope="row" class="align-content-center">${item.id}</th>
                <td class="align-content-center">${item.paciente}</td>
                <td class="align-content-center">${item.medico}</td>
                <td class="align-content-center">${item.fecha}</td>
                <td class="align-content-center">${item.hora}</td>
                <td class="align-content-center">
                    <span class="badge ${item.estado == 'Atendido' ? 'text-bg-success' : 'text-bg-warning'}">${item.estado}</span>
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
        SetBtnSelect();
    } else {
        table.innerHTML = `
        <tr>
            <td scope="row" colspan="7" class="text-center">${empty}</td>
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
    SetMedicos();
    GetData('');
});
document.getElementById('filtrar').addEventListener('', SetFiltro);
document.getElementById('idMedico').addEventListener('', SetFiltro);
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