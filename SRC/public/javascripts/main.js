(function () {

    const showForm = document.querySelectorAll('.show-form-task');
    const containerFormTask = document.getElementById('container-form-task');
    const $description = document.getElementById('description');
    const $state = document.getElementById('state');

    const slopesShow = document.getElementById('slopes-show');
    const inproccessShow = document.getElementById('inproccess-show');
    const completedShow = document.getElementById('completed-show');



    showForm.forEach(elem => {
        elem.addEventListener('click', () => {
            containerFormTask.classList.toggle('show-container-form')
            setTimeout(() => {
                containerFormTask.classList.toggle('background-black')
            }, 400);
        })
    })


    containerFormTask.addEventListener('click', event => {
        event.stopPropagation();
        if (containerFormTask.classList.contains('show-container-form') && (event.target.classList.contains('show-container-form') || event.target.classList.contains('row'))) {
            event.stopPropagation();
            $description.value = '';
            $state.value = $state.firstElementChild.innerHTML;
            containerFormTask.classList.toggle('background-black')
            setTimeout(() => {
                containerFormTask.classList.toggle('show-container-form')
            }, 200)
        }
    }, false)


    showTask(slopesShow, 'slopes');
    showTask(inproccessShow, 'in-proccess');
    showTask(completedShow, 'completed');

    function showTask(selector, state) {
        selector.addEventListener('click', () => {
            const selected = 'selected-state';
            if (!selector.classList.contains(selected)) {
                document.querySelectorAll('.card-task').forEach(elem => {
                    if (!elem.classList.contains('d-none')) {
                        elem.classList.add('d-none')
                    }
                    if (elem.classList.contains(state)) {
                        elem.classList.remove('d-none');
                    }
                })
                document.querySelectorAll('.options-task .options-item').forEach(option => {
                    option.classList.remove(selected);
                })
                selector.classList.add(selected);
            }
        })

    }


    document.querySelectorAll('.card-task').forEach(elem => {
        if (!elem.classList.contains('d-none')) {
            elem.classList.add('d-none')
        }
        if (elem.classList.contains('slopes')) {
            elem.classList.remove('d-none');
        }
        slopesShow.classList.add('selected-state');
    })

})()