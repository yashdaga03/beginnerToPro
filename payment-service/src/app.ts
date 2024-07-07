import express from 'express';
import bodyParser from 'body-parser';
import paymentRoutes from './route/paymentRoutes';
import { config } from './config';

const app = express();

app.use(bodyParser.json());

app.use('/api/payments', paymentRoutes);

const PORT = config.port || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;