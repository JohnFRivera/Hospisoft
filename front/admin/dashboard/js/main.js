import { SetAsideBtn } from '../../assets/js/admin.globals.js';
SetAsideBtn();

const ctxPacientesPorMes = document.getElementById('chartPacientesPorMes');
const ctxMedicosPorMes = document.getElementById('chartMedicosPorMes');
const ctxFacturacionPorMes = document.getElementById('chartFacturacionPorMes');
//* DATOS
let dataPacientesPorMes = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [{
        label: 'Pacientes atendidos por mes',
        data: [85, 90, 100, 150, 220, 200, 240],
        borderColor: '#0dcaf0',
        borderWidth: 3
    }]
};
let dataMedicosPorMes = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [{
        label: 'Médicos con más consultas en el mes',
        data: [85, 90, 100, 150, 220, 200, 240],
        borderColor: '#0d6efd',
        borderWidth: 3
    }]
};
let dataFacturacionPorMes = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [{
        label: 'Total de facturación de citas por mes',
        data: [85, 90, 100, 150, 220, 200, 240],
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
    type: 'line',
    data: dataPacientesPorMes,
    Options
});
new Chart(ctxMedicosPorMes, {
    type: 'line',
    data: dataMedicosPorMes,
    Options
});
new Chart(ctxFacturacionPorMes, {
    type: 'line',
    data: dataFacturacionPorMes,
    Options
});