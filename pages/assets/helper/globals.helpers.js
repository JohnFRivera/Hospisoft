import { GetHost } from '../js/globals.functions.js';
//links
const cssStyles = `${GetHost()}/pages/assets/css/styles.css`;
const scriptBS = `${GetHost()}/pages/assets/js/bootstrap.bundle.min.js`;
//components
const NavBarUnregister = `
<nav class="navbar navbar-expand-md py-3 px-0 px-md-5 bg-body w-100">
    <div class="container-fluid">
        <div class="row flex-row-reverse flex-md-row">
            <div class="col-auto align-content-center">
                <a class="display-6 fw-bold text-decoration-none me-0 me-md-4" href="${GetHost()}/pages/inicio/">HOSPISOFT</a>
            </div>
            <div class="col-auto d-inline d-md-none">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </div>
        <div class="collapse navbar-collapse py-3 py-md-0" id="navbarTogglerDemo01">
            <ul class="nav nav-pills w-100">
                <li class="nav-item">
                    <a class="nav-link fw-semibold text-center fs-4" href="${GetHost()}/pages/inicio/">Inicio</a>
                </li>
            </ul>
            <div class="row mt-3 mt-md-0">
                <div class="col">
                    <div class="btn-group w-100">
                        <a class="btn btn-outline-primary text-center fs-4 px-3 text-nowrap" href="${GetHost()}/pages/ingresar/">
                            <i class="bi bi-box-arrow-in-right"></i>
                            Ingresar
                        </a>
                        <a class="btn btn-primary text-center fs-4 px-3" href="${GetHost()}/pages/registrarme/">Registrarme</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>
`;
const FooterDefault = `
<div class="col">
    <div class="row bg-primary text-white p-5 cursor-default">
        <!--? DESARROLLADORES -->
        <div class="col col-lg-5">
            <div class="row mb-3 mb-md-0">
                <div class="col col-xxl-5 align-content-center">
                    <h4 class="fw-bold fs-2 mb-4">Desarrolladores</h4>
                </div>
                <div class="col">
                    <h5 class="fw-semibold fs-5 mb-0">Front</h5>
                    <p class="text-white-50 fw-light fs-5 mb-1">John Freddy Rivera Ayala</p>
                    <!--? REDES -->
                    <ul class="nav mb-4">
                        <li class="nav-item">
                            <a href="https://github.com/JohnFRivera" target="_blank" class="link-light link-opacity-50 link-opacity-100-hover me-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                </svg>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="https://co.linkedin.com/in/john-freddy-rivera-ayala" target="_blank" class="link-light link-opacity-50 link-opacity-100-hover me-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                    <h5 class="fw-semibold fs-5 mb-0">Back</h5>
                    <p class="text-white-50 fw-light fs-5 mb-1">Kevinn Andrés Álzate Pino</p>
                    <!--? REDES -->
                    <ul class="nav mb-4">
                        <li class="nav-item">
                            <a href="" class="link-light link-opacity-50 link-opacity-100-hover me-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                </svg>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="link-light link-opacity-50 link-opacity-100-hover me-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--? INSTRUCTOR -->
        <div class="col-12 col-lg-3 mt-5">
            <h4 class="fw-bold fs-2">Instructor</h4>
            <p class="text-white-50 fw-light fs-5">Walter Arias Aguirre</p>
        </div>
        <!--? CENTRO FORMATIVO -->
        <div class="col mt-5">
            <h4 class="fw-bold fs-2">Centro Formativo</h4>
            <p class="text-white-50 fw-light fs-5">Centro de Tecnologías Agroindustriales SENA</p>
        </div>
    </div>
</div>
`;
const spinCargando = `
<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
<span role="status">Cargando...</span>
`;
//lists
const arrayEPS = [
    { value: 'Nueva Eps', text: 'Nueva Eps' },
    { value: 'Coosalud', text: 'Coosalud' },
    { value: 'Barrios Unidos', text: 'Barrios Unidos' }
];
const GetSpanishLanguage = (entrada) => {
    return {
        "decimal":        "",
        "emptyTable":     "No hay datos disponibles en la tabla",
        "info":           "Mostrando _START_ a _END_ de _TOTAL_ "+entrada,
        "infoEmpty":      "Mostrando 0 a 0 de 0 "+entrada,
        "infoFiltered":   `(filtrado de _MAX_ ${entrada} totales)`,
        "infoPostFix":    "",
        "thousands":      ",",
        "lengthMenu":     "Mostrar _MENU_ "+entrada,
        "loadingRecords": "Cargando...",
        "processing":     "",
        "search":         "Buscar:",
        "zeroRecords":    "No se encontraron registros coincidentes",
        "paginate": {
            "first":      "«",
            "last":       "»",
            "next":       "›",
            "previous":   "‹"
        },
        "aria": {
            "orderable":  "Ordenar por esta columna",
            "orderableReverse": "Ordenar esta columna en orden inverso"
        }
    }
};

export {
    cssStyles,
    scriptBS,
    NavBarUnregister,
    FooterDefault,
    spinCargando,
    GetSpanishLanguage,
    arrayEPS
};