const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require('path')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.sendFile(__dirname, '/dist/index.html')
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(
    `
    <div>
      <p>Phonebook as info for ${persons.length}</p>
      <p>${new Date()}</p>
    </div>
    `
  );
});

app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const person = persons.find((person) => person.id === Number(id));
  console.log(person);
  if (person) {
    res.send(`<div>
<p>name: ${person.name}</p>
<p>number: ${person.number}</p>
</div>`);
  } else {
    res.status(404).send("Not found");
  }
});
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  const personNames = persons.map((person) => person.name);
  if (personNames.includes(name)) {
    res.status(502).json({ error: "name should be unique" });
  }
  if (name && number) {
    console.log(name, number);
    const newPerson = {
      id: uuidv4(),
      name: name,
      number: number,
    }
    persons.push(newPerson);
    res.status(201).send(newPerson);
  } else {
    res.status(404).json({ error: `name and number are required` });
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  persons = persons.filter((person) => person.id !== Number(id));
  res.status(204).send(persons);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
