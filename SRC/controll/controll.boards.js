const user = require('../models/user');
const board = require('../models/board');
const task = require('../models/task');
const { ObjectId } = require('bson');
const { boardValidation } = require('../validate/index')

async function existsBoard(email, title) {
    const $board = await board.findOne({ useremail: email, title: title })
    return $board ? true : false;
}

async function getDocs(email) {
    const docs = await board.find({ useremail: email });
    docs.forEach(elem => {
        elem._id = String(elem._id);
    })
    return docs;
}

async function createBoard(req, res, next) {
    console.log(req.body)
    let useremail = req.body.useremail;
    let title = req.body.title.trim().toUpperCase();

    const exists = await existsBoard(useremail, title);
    const dataValidation = boardValidation({title});

    if (exists) {
        //en caso de que ya exista el tablero, creamos el mensaje con express-flash
        req.flash('board_error', 'there already is a board with that title');
    }
    else if (dataValidation) {
        req.flash('board_error', dataValidation);
    }
    else {
        new board({
            title,
            useremail
        })
        .save();
    }
    res.redirect('/dashboard');
}

async function getBoards(req, res, next) {
    const $boards = await getDocs(req.user.email);
    res.render('dashboard',
        {
            viewtitle: 'Task | Boards',
            title: 'BOARDS',
            boards: $boards,
            is_header: 'yes'
        })
}

async function deleteBoard(req, res, next) {
    const id = ObjectId(req.query.board);
    await task.deleteMany({board: req.query.board});
    await board.deleteOne({ _id: id });
    res.redirect('/dashboard');
}


module.exports = {
    createBoard,
    getBoards,
    deleteBoard
}