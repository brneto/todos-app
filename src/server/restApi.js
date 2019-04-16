import uuidv4 from 'uuid/v4';
import express from 'express';
import config from '../config.json';

const app = express();
let todos = {
  1: {
    id: 1,
    text: 'hey',
    completed: true,
  },
  2: {
    id: 2,
    text: 'ho',
    completed: true,
  },
  3: {
    id: 3,
    text: 'let\'s go',
    completed: false,
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/todos', (req, res) => void res.json(todos));

app.get('/todos/:id', (req, res) => void res.json(todos[req.params.id]));

app.post('/todos', (req, res) => {
  const id = uuidv4();

  res.json(todos[id] = {
    id,
    ...req.body
  });
});

app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const todo = {
    ...todos[id],
    ...req.body
  };

  res.json(todos[id] = todo);
});

app.delete('/todos/:id', (req, res) => {
  const {
    [req.params.id]: todo,
    ...rest
  } = todos;

  todos = rest;
  res.json(todo);
});

app.listen(config.port, error =>
  error
    ? console.log(`Server failed to start: [${error}].`)
    : console.log(`Server running and listening on port: ${config.port}.`)
);
