const SetModal =(title, body, footer)=> {
    document.querySelector('.modal.fade').innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                ${title}
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body bg-body-secondary">
                ${body}
            </div>
            <div class="modal-footer">
                ${footer}
            </div>
        </div>
    </div>
    `
}
const ShowModal =()=> {
    const myModalAlternative = new bootstrap.Modal('#staticBackdrop', {});
    myModalAlternative.show()
}

export { SetModal, ShowModal };