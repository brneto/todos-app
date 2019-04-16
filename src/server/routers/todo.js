import express from 'express';
import uuidv4 from 'uuid/v4';

const router = express.Router(); // eslint-disable-line babel/new-cap

router.get('/', (req, res) => {
  res.json(req.models.todos);
});

router.get('/:id', (req, res) => {
  res.json(req.models.todos[req.params.id]);
});

router.post('/', (req, res) => {
  const id = uuidv4();

  res.json(req.models.todos[id] = {
    id,
    text: req.body.text,
    completed: req.body.completed,
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const todo = {
    ...req.models.todos[id],
    id,
    text: req.body.text,
    completed: req.body.completed,
  };

  res.json(req.models.todos[id] = todo);
});

router.delete('/:id', (req, res) => {
  const {
    [req.params.id]: todo,
    ...rest
  } = req.models.todos;

  req.models.todos = rest;

  res.json(todo);
});

export default router;
