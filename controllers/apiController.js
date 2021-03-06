var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = app => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/api/todos/:uname', (req, res) => {

    Todos.find({ username: req.params.uname }, (err, todos) => {
      if (err) throw err;

      res.send(todos);
    });

  });

  app.get('/api/todo/:id', (req, res) => {

    Todos.findById( { _id: req.params.id }, (err, todos) => {
      if (err) throw err;

      res.send(todos);
    });

  });

  app.post('/api/todo', (req, res) => {

    if (req.body.id) {

      let updatedTodo = {
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment
      };

      Todos.findByIdAndUpdate(req.body.id, updatedTodo, (err, todo) => {
        if (err) throw err;

        res.send('Success');
      });

    } else {

      let newTodo = new Todos({
        username: 'test',
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment
      });

      newTodo.save(err => {
        if (err) throw err;

        res.send('Success');
      });

    }

  });

  app.delete('/api/todo', (req, res) => {
    Todos.findByIdAndRemove(req.body.id, err => {
      if (err) throw err;

      res.send('Success');
    });
  });

};