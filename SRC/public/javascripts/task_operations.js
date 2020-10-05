const hiddenMenu = document.getElementById('hidden-task-menu');
const taskMenu = document.getElementById('task-menu');
const menuShow = document.getElementById('menu-task-show');
const showOperations = document.querySelectorAll('.board-container .container-task .card-task .show-operations');
const operationsCard = document.querySelectorAll('.board-container .container-task .card-task .operations-card');
const optEdit = document.querySelectorAll('.board-container .container-task .card-task .operations-card .edit-task');


hiddenMenu.onclick = function () {
    taskMenu.classList.add('hidden-menu')
}

menuShow.onclick = function () {
    taskMenu.classList.remove('hidden-menu')
}

showOperations.forEach(elem => {
    elem.addEventListener('click', event => {
        event.stopPropagation();
        elem.parentNode.children[1].classList.remove('d-none');
        elem.classList.add('selected-state')
    }, true)
})

operationsCard.forEach(elem => {
    elem.addEventListener('click', _ => {
        elem.classList.add('d-none');
    }, false)
})


optEdit.forEach(elem => {
    elem.addEventListener('click', event => {
        const parent = event.target.parentNode.parentNode;
        parent.classList.add('container-form-edit')

        parent.children[2].classList.remove('d-none');
        parent.children[3].classList.add('d-none');
        parent.children[4].classList.add('d-none');
        parent.children[2].children[0].innerText = parent.children[3].innerText.trim();
        let cont = 0;
        while(cont <= 2){
            let elem = parent.children[2].children[1].children[cont]
            if(elem.value === parent.dataset.state) {
                elem.selected = true;
            }
            cont ++;
        }
    })
})