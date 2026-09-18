import express = require('express');
import type { Express } from 'express';
import bodyParser = require('body-parser');
import router from './routes/author';

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());

app.use("/v1/Authors", router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT} `);
})