import { SetAsideBtn, GetFormData,validInputs } from '../../../assets/js/admin.globals.js';
SetAsideBtn();

let selectHorario = document.getElementById('selectHorario');
document.querySelectorAll('input[type="radio"]').forEach(Radio => {
    Radio.addEventListener('change', (ev)=>{
        switch (ev.target.id) {
            case 'option1':
                selectHorario.innerHTML = `
                <div class="col">
                    <label class="fw-semibold fs-5 ms-1" for="">Mes:</label>
                    <select class="mb-2 form-control form-select bg-body-tertiary form-required" id="idmedico">
                        <option value="">Seleccionar...</option>
                        <option value="01">Enero</option>
                        <option value="02">Febrero</option>
                        <option value="03">Marzo</option>
                        <option value="04">Abril</option>
                        <option value="05">Mayo</option>
                        <option value="06">Junio</option>
                        <option value="07">Julio</option>
                        <option value="08">Agosto</option>
                        <option value="09">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                    </select>
                </div>
                `;
                break;
            case 'option2':
                selectHorario.innerHTML = `
                <div class="col">
                    <label class="fw-semibold fs-5 ms-1" for="">Mes:</label>
                    <select class="mb-2 form-control form-select bg-body-tertiary form-required" id="idmedico">
                        <option value="">Seleccionar...</option>
                        <option value="01">Enero</option>
                        <option value="02">Febrero</option>
                        <option value="03">Marzo</option>
                        <option value="04">Abril</option>
                        <option value="05">Mayo</option>
                        <option value="06">Junio</option>
                        <option value="07">Julio</option>
                        <option value="08">Agosto</option>
                        <option value="09">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                    </select>
                </div>
                <div class="col">
                    <label class="fw-semibold fs-5 ms-1" for="">Semana:</label>
                    <select class="mb-2 form-control form-select bg-body-tertiary form-required" id="idmedico">
                        <option value="">Seleccionar...</option>
                        <option value="01">Lunes</option>
                        <option value="02">Martes</option>
                        <option value="03">Miércoles</option>
                        <option value="04">Jueves</option>
                        <option value="05">Viernes</option>
                        <option value="06">Sábado</option>
                        <option value="07">Domingo</option>
                    </select>
                </div>
                `;
                break;
        };
    });
})