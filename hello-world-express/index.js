const express = require('express');
const app = express();
const port = 3000;

const helloRouter = require('./routes/hello');

app.use('/hello', helloRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
