import express = require('express');
import type { Express } from 'express';
import bodyParser = require('body-parser');

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT} `);
})