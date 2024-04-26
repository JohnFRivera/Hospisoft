import { GetTitle, SetNavBar, SetNumberInput, GetFormData, validInputs, SetFooter } from "../../../assets/js/globals.js";
SetNavBar();

const Origin = window.location.origin;

let prueba = [
    {
        page: "dashboard",
        icon: "bi-graph-up",
        text: "Dashboard",
    },
    {
        page: "usuarios",
        icon: "bi-person",
        text: "Usuarios",
    },
    {
        page: "Usuario/separar_cita",
        icon: "bi-calendar-plus",
        text: "Separar Cita",
    },
    {
        page: "Medico/citas",
        icon: "bi-calendar2-minus",
        text: "Citas",
    },
    {
        page: "historias_clinicas",
        icon: "bi-file-text",
        text: "Historias Clínicas",
    },
    {
        page: "Secretaria/generar_horario_especialista",
        icon: "bi-calendar-week",
        text: "Generar Horario",
    },
    {
        page: "Dispensario/medicinas",
        icon: "bi-prescription2",
        text: "Medicinas",
    },
    {
        page: "crear_campaña",
        icon: "bi-chat-dots",
        text: "Crear Campaña",
    },
];

const SetAsideActive = () => {
    var arrayAsideBtn = Array.prototype.slice.call(
        document.getElementsByClassName("nav-aside")
    );
    arrayAsideBtn.forEach((AsideBtn) => {
        if (AsideBtn.innerText == GetTitle()) {
            AsideBtn.classList.add("active");
        };
    });
};
const SetAsideBtn = () => {
    var asideBtn = document.getElementById("asideBtn");
    asideBtn.innerHTML = `
    <li class="nav-item">
        <a class="nav-aside fs-5 py-1 ps-3 pe-4 d-flex align-items-center h-100 w-100" href="${Origin}/front/admin/perfil/">
            <i class="bi bi-person-circle fs-2 me-2"></i>
            <b>${window.localStorage.getItem("userName")}</b>
        </a>
    </li>
    `;
    var arrayBtn = prueba; //window.localStorage.getItem('asideBtn');
    arrayBtn.forEach((Btn) => {
        asideBtn.innerHTML += `
        <li class="nav-item">
            <a class="nav-aside fs-5 py-2 ps-3 pe-4 d-flex align-items-center h-100 w-100" href="${Origin}/front/admin/${Btn.page.toLowerCase()}/">
                <i class="bi ${Btn.icon} fs-5 me-3"></i>
                ${Btn.text}
            </a>
        </li>
        `;
    });
    SetAsideActive();
};

const GetRowData =(btn)=> {
    let result = new Array();
    while (btn.tagName != 'TR') {
        btn = btn.parentNode;
    }
    var arrayColumns = Array.prototype.slice.call(btn.children);
    arrayColumns.forEach(Col => {
        if (Col.className == 'align-content-center') {
            result.push(Col.innerText)
        }
    });
    return result;
}
const SetEspecialidades =()=> {
    const Especialidades = [
        'Cardiólogo',
        'Cirujano Pediátrica',
        'Cirujano Plástica',
        'Dermatólogo',
        'Cirujano General'
    ];
    Especialidades.forEach(Especialidad => {
        var opt = document.createElement('option');
        opt.value = Especialidad;
        opt.text = Especialidad;
        document.getElementById('especialidad').append(opt);
    });
}

SetFooter();
export { SetAsideBtn, SetNumberInput, GetFormData, GetRowData, validInputs, SetEspecialidades };