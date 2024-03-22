import { QueryGet } from './Querys.js';

//* FILTRO ROL
function FiltroRol(URL) {
    let slFiltroRol = document.getElementById("slFiltroRol");
    if (slFiltroRol.value) {
        QueryGet(URL + "/listingRol/" + slFiltroRol.value);
    } else {
        QueryGet(URL + "/listing");
    }
}

//* BOTÓN ATRAS
function BackFiltro(URL) {
    document.getElementById("txtBuscador").value = "";
    QueryGet(URL + "/listing");
}

//* BUSCADOR
function Buscador(URL) {
    let txtBuscador = document.getElementById("txtBuscador");
    if (txtBuscador.value) {
        txtBuscador.classList.remove("border-danger");
        QueryGet(URL + "/listingNombre/" + txtBuscador.value);
    } else {
        txtBuscador.classList.add("border-danger");
    }
}

export { FiltroRol, BackFiltro, Buscador };