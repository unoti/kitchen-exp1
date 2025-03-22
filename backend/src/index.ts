import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Chef Backend is running!');
});

app.listen(port, () => {
    console.log(`Chef Backend listening at http://localhost:${port}`);
});
