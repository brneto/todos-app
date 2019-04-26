import express from 'express';
import uuidv4 from 'uuid/v4';

const url = '/todos';
const router = express.Router(); // eslint-disable-line babel/new-cap

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get(url, (req, res) => {
  res.json(Object.values(req.models.todos));
});

router.get(`${url}/:id`, (req, res) => {
  res.json(req.models.todos[req.params.id]);
});

router.post(url, (req, res) => {
  const id = uuidv4();

  res.json(req.models.todos[id] = {
    id,
    text: req.body.text,
    completed: req.body.completed,
  });
});

router.put(`${url}/:id`, (req, res) => {
  const id = req.params.id;
  const todo = {
    ...req.models.todos[id],
    id,
    text: req.body.text,
    completed: req.body.completed,
  };

  res.json(req.models.todos[id] = todo);
});

router.delete(`${url}/:id`, (req, res) => {
  const {
    [req.params.id]: todo,
    ...rest
  } = req.models.todos;

  req.models.todos = rest;

  res.json(todo);
});

export default router;
