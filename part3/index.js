const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./mongo");
const Person = require("./models/Person");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "dist")));

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

dbConnect().then(() => console.log("Connected to db"));

app.get("/", (req, res) => {
  res.sendFile(__dirname, "/dist/index.html");
});

app.get("/api/persons", async (req, res) => {
  try {
    const people = await Person.find({});
    res.status(201).json(people);
  } catch (e) {
    console.log("Error: ", e);
  }
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

app.post("/api/persons", async (req, res) => {
  const { name, number } = req.body;

  if (name && number) {
    const newPerson = new Person({
      id: uuidv4(),
      name: name,
      number: number,
    });
    try {
      await newPerson.save();
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: `Error!! ${e}` });
    }
    res.status(201).send(newPerson);
  } else {
    res.status(404).json({ error: `name and number are required` });
  }
});

app.delete("/api/persons/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Person.findByIdAndDelete(id);
    res.status(204).end();
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

app.put('/api/persons/:id', async (req, res) => {
  const { id } = req.params;
  const { number } = req.body;
  await Person.findByIdAndUpdate(id, { number });
  res.send(201).end();
});

const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: 'malformatted id' });
  }
  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
