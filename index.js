const express = require("express");
const shortid = require("shortid");
const server = express();

server.use(express.json());

let users = [
	{
		id: shortid.generate(),
		name: "Brian",
		bio: "Lambda Student",
	},
	{
		id: shortid.generate(),
		name: "Bryan",
		bio: "Not a clone.",
	},
	{
		id: shortid.generate(),
		name: "Brion",
		bio: "Not a clone.",
	},
];

// GET REQUEST
server.get("/api/users", (req, res) => {
	res.status(200).json(users);
}); // WORKING

// GET REQUEST BY ID
server.get("/api/users/:id", (req, res) => {
	const id = req.params.id;

	let target = users.find((a) => a.id === id);

	if (!target) {
		res.status(404).json({ message: "The user with the specified ID does not exist." });
	} else {
		let user = users.filter((a) => a.id === id);
		res.status(200).json(user);
	}
}); // WORKING

// POST REQUEST
server.post("/api/users", (req, res) => {
	const user = req.body;

	user.id = shortid.generate();

	if (!user.name || !user.bio) {
		res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
	} else {
		users.push(user);
		res.status(201).json(users);
	}
}); // WORKING

// PUT REQUEST
server.put("/api/users/:id", (req, res) => {
	const id = req.params.id;
	const changes = req.body;

	let target = users.find((a) => a.id === id);
	let found = users.find((a) => a.id === id);

	if (!target) {
		res.status(404).json({ message: "The user with the specified ID does not exist." });
	} else if (!changes.name || !changes.bio) {
		res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
	} else if (found) {
		Object.assign(found, changes);

		res.status(200).json(users);
	}
}); // WORKING

// DELETE REQUEST
server.delete("/api/users/:id", (req, res) => {
	try {
		const id = req.params.id;
		let deleteTarget = users.find((a) => a.id === id);

		if (!deleteTarget) {
			res.status(404).json({ message: "The user with the specified ID does not exist." });
		} else {
			users = users.filter((u) => u.id !== id);
			res.status(204).end();
		}
	} catch (err) {
		res.status(500).json({ errorMessage: "The user could not be removed" });
	}
}); // WORKING

const port = 8000;
server.listen(port, () => console.log("server running..."));
