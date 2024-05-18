
const Origin = window.location.origin;

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
var asideBtn = document.getElementById("asideBtn");
var userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
if (userInfo) {
    asideBtn.innerHTML = `
    <li class="nav-item border-bottom">
        <a class="nav-aside fs-4 py-2 px-3 d-flex align-items-center h-100 w-100" href="${Origin}/front/admin/perfil/">
            <i class="bi bi-person-circle fs-2 me-3"></i>
            <b>${userInfo[1]}</b>
        </a>
    </li>
    `;
    var arrayBtn = JSON.parse(window.localStorage.getItem('btnAside'));
    arrayBtn.forEach((Btn) => {
    asideBtn.innerHTML += `
    <li class="nav-item">
        <a class="nav-aside text-secondary-emphasis fs-4 py-2 px-4 d-flex align-items-center h-100 w-100" href="${Origin}/pages/access/${Btn.page.toLowerCase()}/">
            <i class="bi ${Btn.icon} fs-4 me-3"></i>
            ${Btn.text}
        </a>
    </li>
    `;
});
} else {
    //window.location.href = `${Origin}/pages/inicio/`;
}

const GetRowData = (btn) => {
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
const SetEspecialidades = () => {
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
export { GetRowData, SetEspecialidades };