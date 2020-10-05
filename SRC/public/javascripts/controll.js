(function () {
    'use strict'
    const show_bar = document.getElementById('show-bar-user');
    const close_bar = document.getElementById('close-bar-user');
    const bar_user = document.getElementById('bar-user');
    const btnCloseMessage = document.getElementById('btn-close-message');
    
    show_bar.addEventListener('click', (event) => {
        bar_user.classList.toggle('d-none');
    }, true)

    close_bar.addEventListener('click', event => {
        event.stopPropagation();
        bar_user.classList.add('d-none')
    }, true)

    document.addEventListener('click', event => {
        let id = bar_user.id;
        let clase = 'bar-user-item';
        let element = event.target;
        if(!bar_user.classList.contains('d-none')) {
            if(element.id !== id && !element.classList.contains(clase) && !element.parentNode.classList.contains(clase)
                && !element.parentNode.parentNode.classList.contains(clase) ){
                bar_user.classList.add('d-none');
            }
        }
    }, true)

    window.hidden_msg = () => {
        document.getElementById('message-dashboard').classList.add('d-none');
        console.log('click')
    }
}

)();