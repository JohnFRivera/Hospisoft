import { NavBarUnregister, cssStyles, spinCargando, FooterDefault } from '../../assets/helper/globals.helpers.js';
import { CreateCss, SetError, SetNavbar, SetFooter, SetTitle, validForm, formToJson } from '../../assets/js/globals.functions.js';
import {Button_Click, SetAsideBar} from '../assets/js/access.globals.js';
import { SetModal, ShowModal } from '../assets/js/modal.js';

CreateCss(cssStyles);
SetTitle('Dashboard');
SetNavbar(NavBarUnregister);
SetAsideBar();
SetFooter(FooterDefault);

const ctxPacientesPorMes = document.getElementById('chartPacientesPorMes');
const ctxFacturacionPorMes = document.getElementById('chartFacturacionPorMes');
//* DATOS
const CrearArrayRand = (num) => {
    let arrayResult = new Array();
    for (let i = 0; i < num; i++) {
        arrayResult.push(Math.floor(Math.random() * 80));
    }
    return arrayResult
};
const Meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
let dataPacientesPorMes = {
    labels: Meses,
    datasets: [{
        label: '# de Pacientes',
        data: CrearArrayRand(12),
        backgroundColor: '#45B6FB90',
        borderColor: [ '#45B6FB' ],
        borderWidth: 2
    }]
};
let dataFacturacionPorMes = {
    labels: Meses,
    datasets: [{
        label: '$ de Citas',
        data: CrearArrayRand(12),
        borderColor: '#198754',
        borderWidth: 3
    }]
};
let Options = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                font: {
                    family: 'Arial',
                    size: 20,
                    weight: 'normal',
                }
            }
        }
    }
}
new Chart(ctxPacientesPorMes, {
    type: 'bar',
    data: dataPacientesPorMes,
    Options
});
new Chart(ctxFacturacionPorMes, {
    type: 'line',
    data: dataFacturacionPorMes,
    Options
});