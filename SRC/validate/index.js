const yup = require('yup');

const regName = /^[a-zA-Z ]+$/
const regEmail = /^[a-zA-Z@._0-9 ]+$/
const regPass = /^\w+$/
const regDescription = /^[A-Za-z0-9,. ]+$/
const validStates = ['slopes', 'in-proccess', 'completed']


//SCHEMAS
const validUser = yup.object().shape({
    name: yup.string().min(5).max(20).matches(regName, 'the name must contain only letters').required(),
    email: yup.string().matches(regEmail, 'the emails valid is type @__.__').required(),
    password: yup.string().min(6).max(20).matches(regPass, 'that isn´t a password valid').required()
})

const validTask = yup.object().shape({
    description: yup.string().min(2).max(500).matches(regDescription, 'description contains invalid characters').required('the title board is required'),
    //state: yup.string().notOneOf(stateValid, 'the state is required').required('the state is required'),
    state: yup.string().oneOf(validStates, 'no ingreso un estado valido')
})

const validBoard = yup.object().shape({
    title: yup.string().min(2).max(50).matches(regDescription, 'the title contains characters not allowed').required()
})


//HELPERS

function createUsersValidation(data) {
    //creamos el esquema de yup

    try {
        validUser.validateSync(data);
    }
    catch (e) {
        return e.errors[0];
    }
}

function taskValidation(data) {
    try {
        validTask.validateSync(data);
    }
    catch(e) {
        return e.errors[0];
    }
}

function boardValidation(data) {
    try {
        validBoard.validateSync(data);
    }
    catch(e) {
        return e.errors[0];
    }
}

/*
var userValidate = createUsersValidation(
    {
        name: 'asdfasdf',
        email: 'Franco147@gmail.com ',
        password: 'asdfasdf'
    }
)

console.log(userValidate)
*/
/*
var task = taskValidation(
    {
    description: 'nombreeluegooo23 .,',
    state: 'in-proccess'
    }
)
console.log(task)
*/



module.exports = {
    taskValidation,
    createUsersValidation,
    boardValidation
}