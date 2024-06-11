import { NavBarUnregister, cssStyles, spinCargando, FooterDefault, GetSpanishLanguage } from '../../assets/helper/globals.helpers.js';
import { CreateCss, SetNavbar, SetFooter, SetTitle, validForm, formToJson, FillSelect } from '../../assets/js/globals.functions.js';
import { SetAsideBar } from '../assets/js/access.globals.js';
import { SetModal, ShowModal } from '../assets/js/modal.js';

CreateCss(cssStyles);
SetTitle('Agenda Especialista');
SetNavbar(NavBarUnregister);
SetAsideBar();
SetFooter(FooterDefault);

const btnBuscar = document.getElementById('btnBuscar');
btnBuscar.addEventListener('click', ()=> {
    if (validForm('formBuscar')) {
      btnBuscar.innerHTML = spinCargando;
      let tableContainer = document.getElementById('tableContainer');
      tableContainer.innerHTML = `
      <div class="d-flex justify-content-center fs-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>
      `;
      var json = formToJson('formBuscar');
      fetch('', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      }).then(response => response.json())
      .then(data => {
          tableContainer.innerHTML = `
          <div class="table-responsive">
              <table class="table table-light table-hover" id="dataTable">
                  <thead>
                      <tr>
                          <th>Fecha</th>
                          <th>Hora</th>
                          <th>Estado</th>
                      </tr>
                  </thead>
                  <tbody></tbody>
              </table>
          </div>
          `;
          data.forEach(item => {
              document.getElementById('dataTable').lastElementChild.innerHTML += `
              <tr id="row-${item.id}">
                  <td class="align-content-center">${item.nombre}</td>
                  <td class="align-content-center ${item.existencias <= 10 ? 'text-warning fw-bold': '' }">${item.existencias}</td>
                  <td class="align-content-center">${item.valor}</td>
                  <td>
                      <div class="d-flex justify-content-center">
                          <div class="btn-group">
                              <button class="btn btn-sm btn-outline-info" id="edit-${item.id}">
                                  <i class="bi bi-pencil-square"></i>
                              </button>
                              <button class="btn btn-sm btn-danger" id="delet-${item.id}">
                                  <i class="bi bi-trash-fill"></i>
                              </button>
                          </div>
                      </div>
                  </td>
              </tr>
              `;
          });
          new DataTable('#dataTable', {
            language: GetSpanishLanguage('horarios')
        });
      })
      .catch(err => {
        tableContainer.innerHTML = '';
        SetModal(
          `
          <h1 class="fs-3 text-danger">
            <i class="bi bi-emoji-frown-fill"></i>
            Lo sentimos
          </h1>
          `,
          `
          <b class="fs-5">Ha ocurrido un error al hacer la consulta</b><br><span class="text-danger">${err}</span>
          `,
          `
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
          `
        );
        ShowModal();
      }).finally(()=>{
        btnBuscar.innerHTML = `
        <i class="bi bi-search"></i>
        Buscar
        `;
      });
    };
});