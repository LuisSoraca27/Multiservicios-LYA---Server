import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Server as SocketIO } from 'socket.io'
import http from 'http';
import helmet from 'helmet';
import bodyParser from 'body-parser';

// Routes
import userRoutes from './Routes/user.routes.js';
import categoriesCPRouter from './Routes/categoriesCP.routes.js';
import profileRoutes from './Routes/profile.routes.js';
import accountRoutes from './Routes/account.routes.js';
import comboRouter from './Routes/combo.routes.js';
import courseRouter from './Routes/course.routes.js';
import licenseRouter from './Routes/license.routes.js';
import giftRoutes from './Routes/gift.routes.js';
import orderRouter from './Routes/order.routes.js';
import notificationRouter from './Routes/notification.routes.js';


//controllers
import { globalErrorHandler } from './Controllers/error.controller.js';


//funcion guardar notificación desde el socket
import { CreateNotificationLocal } from '../src/Controllers/notification.controller.js';

const app = express();


// Enable Express app to receive JSON data
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());



// Define Endpoints
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/categoriescp', categoriesCPRouter);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/account', accountRoutes);
app.use('/api/v1/combo', comboRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/license', licenseRouter);
app.use('/api/v1/gift', giftRoutes);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/notification', notificationRouter);

// Global Error Handler
app.use(globalErrorHandler);


// Catch non-existing endpoints
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.method} ${req.url} does not exists in our server`,
  });
});

// configurar socket.io
const server = http.createServer(app);

const io = new SocketIO(server, {
  cors: {
    origin: "*",
  }
});

io.on("connection", (socket) => {
  console.log("New user connected");

  // Escuchar eventos de notificación enviados desde el cliente
  socket.on('sendNotification', (notification) => {
    // Emitir el evento a todos los clientes conectados, excluyendo el cliente que lo envió
    socket.broadcast.emit('receiveNotification', notification);

    // Guardar la notificacion en la base de datos
    CreateNotificationLocal(notification);
  });
})


export default server;

