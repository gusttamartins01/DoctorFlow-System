import express from 'express';

const app = express();

app.use(express.json());

app.use('/user', (_request, response) => {
	response.status(200).json({
		name: 'Gustavo',
		email: 'gustavoms@email.com',
		age: 20,
	});
});

app.use((_request, response) => {
	response.status(400).json({
		message: 'Not found.',
	});
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
	console.log(`Server running on port: http://localhost:${PORT}`);
});
