const { ObjectId, ObjectID } = require('bson');
const board = require('../models/board');
const task = require('../models/task');
const { taskValidation } = require('../validate/index')


async function getdocs(idBoard) {
    const docs = await task.find({ board: idBoard })
    docs.forEach(elem => {
        elem._id = String(elem._id);
    })
    return docs;
}


async function createTask(req, res, next) {
    const id = req.query.board;
    const description = req.body.description;
    const state = req.body.state;
    const $board = await board.findById(ObjectId(id))

    const dataValidation = taskValidation({
        description,
        state
    })

    if (!$board) {
        req.flash('tasks_error', 'there exists not a board with that title');
    }
    else if (dataValidation) {
        req.flash('tasks_error', dataValidation);
    }
    else {
        new task({
            description,
            board: id,
            state,
            board: String($board._id)
        })
            .save();
    }
    res.redirect(`/tasks?board=${id}`);
}

async function getTasks(req, res, next) {
    const board = req.query.board;
    const docs = await getdocs(board)
    res.render('tasks', {
        tasks: docs,
        viewtitle: 'Task',
        title: 'TASKS',
        is_task: 'yes',
        is_menu: 'yes',
        is_header: 'yes',
        board
    });
}

async function deleteTask(req, res, next) {
    await task.deleteOne({ _id: ObjectId(req.query.id) })
    res.redirect(`/tasks?board=${req.query.board}`);
}

async function updateTask(req, res, next) {
    const dataValidation =  taskValidation({
        description : req.body.description,
        state : req.body.state
    })
    
    if (dataValidation) {
        req.flash('tasks_error', dataValidation);
    }
    else {
        await task.updateOne({ _id: req.body.id },
            {
                description: req.body.description,
                state: req.body.state,
                edited: 'edited',
                date: new Date().toLocaleDateString()
            })
    }
    res.redirect(`/tasks?board=${req.body.board}`)
}

module.exports = {
    createTask,
    getTasks,
    deleteTask,
    updateTask
}