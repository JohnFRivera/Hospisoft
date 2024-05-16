import { SetAsideBtn } from '../../assets/js/admin.globals.js';
import { NonQuery } from '../../../assets/js/querys.js';

SetAsideBtn();
const FillTable = (data, empty) => {
    let table = document.getElementById('tblPacientes');
    table.innerHTML = null;
    if (data.length > 0) {
        data.forEach(item => {
            table.innerHTML += `
            <tr>
                <th scope="row" class="align-content-center">${item.id}</th>
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
        SetBtnSelect();
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