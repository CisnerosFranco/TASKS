const express = require('express');
const router = express.Router();
const { createBoard, getBoards, deleteBoard} = require('../controll/controll.boards')
const { getTasks, createTask, deleteTask, updateTask} = require('../controll/controll.task');



//para podes avanzar tiene que estar logeado
function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect('/signin');
}


//midlewares
router.use(isAuthenticated)


router.get('/dashboard', getBoards);

router.post('/new-board', createBoard);

router.get('/tasks', getTasks);

router.post('/new-task', createTask);

router.get('/board-delete', deleteBoard);

router.get('/task-delete', deleteTask);

router.post('/update-task', updateTask);

module.exports = router;



