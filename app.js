import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

const app = express();

const swaggerDocument = JSON.parse(fs.readFileSync(path.resolve(__dirname, './swagger/swagger.json'), 'utf-8'));

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/swagger-ui', express.static(path.join(__dirname, 'node_modules/swagger-ui-dist')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Welcome to the Tour and Travel Agency API!');
});

app.use('/auth', require('./routes/auth'));
app.use('/tour', require('./routes/tour'));
app.use('/basket', require('./routes/basket'));
app.use('/user', require('./routes/user'));
app.use('/order', require('./routes/order'));

export default app;
