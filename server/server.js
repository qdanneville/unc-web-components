import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Fake in-memory data
let users = [
    { id: 1, name: "Alice", email: "alice@mail.com" },
    { id: 2, name: "Bob", email: "bob@mail.com" }
];

// API routes
app.get("/api/users", (req, res) => {
    res.json(users);
});

app.post("/api/users", (req, res) => {
    const newUser = {
        id: Date.now(),
        ...req.body
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// Static frontend
app.use(express.static(path.join(__dirname, "../client")));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});