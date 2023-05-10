import express from 'express';
import flowdeskRoutes from './routes/flowdeskRoutes';

const app = express();

app.use(express.json());
app.use('/flowdesk', flowdeskRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
