const ModalConstructor = () => {
    document.body.innerHTML += `
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-4" id="modelTitle"></h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modalBody"></div>
                <div class="modal-footer" id="modalFooter"></div>
            </div>
        </div>
    </div>
    `;
};
const SetModal = (title, body, footer) => {
    document.getElementById('modelTitle').innerHTML = title;
    document.getElementById('modalBody').innerHTML = body;
    document.getElementById('modalFooter').innerHTML = footer;
};
const ShowModal = () => {
    const myModal = new bootstrap.Modal('#Modal', options)
    myModal.show();
};
export {
    ModalConstructor,
    SetModal,
    ShowModal
};