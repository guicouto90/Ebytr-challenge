const app = require('express')();
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const tasksRouter = require('./router/tasksRouter');
const cors = require('cors');
const PORT = 3001;

app.use(bodyParser.json());

app.use(cors());

app.use('/tasks', tasksRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`${PORT} working properly`));

module.exports = app;