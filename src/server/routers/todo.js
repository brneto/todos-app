import express from 'express';
import uuidv4 from 'uuid/v4';

const router = express.Router(); // eslint-disable-line babel/new-cap

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/todos', (req, res) => void res.json(req.models.todos));

router.get('/todos/:id', (req, res) => void res.json(req.models.todos[req.params.id]));

router.post('/todos', (req, res) => {
  const id = uuidv4();

  res.json(req.models.todos[id] = {
    id,
    ...req.body
  });
});

router.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const todo = {
    ...req.models.todos[id],
    ...req.body
  };

  res.json(req.models.todos[id] = todo);
});

router.delete('/todos/:id', (req, res) => {
  const {
    [req.params.id]: todo,
    ...rest
  } = req.models.todos;

  req.models.todos = rest;

  res.json(todo);
});

export default router;
