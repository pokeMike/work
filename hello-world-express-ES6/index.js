import express from 'express';
import helloRouter from './routes/hello.js';

const app = express();
const port = 3000;

app.use('/hello', helloRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
