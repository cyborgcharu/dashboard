// IMPORT
import express, {Request, Response, NextFunction} from 'express';
import {Server} from 'socket.io';
import http from 'http';

const apiRoutes = require('./routes/api');
const app = express();
const server = http.createServer(app)
const io = new Server(server);
const PORT = process.env.PORT || 4000;

// MIDDLEWARE
app.use(express.static('public'));
app.use('/api', apiRoutes);


// ROUTES
app.get('/', (req: Request, res: Response) => {
    res.send(`
    <p><strong>Ox :: Visibility </strong> is a frontend visibility application tailored for modern businesses and developers. It connects seamlessly to an API, ingests event data in real-time, and visualizes analytics on a dynamic dashboard. With Visibility, users gain valuable insights into event-driven architectures, helping them optimize applications, understand user behavior, and make data-driven decisions.</p>
    
    <p><strong>Key Features:</strong></p>
    <ul>
        <li><strong>Real-time Data Streaming:</strong> The application listens to the configured API constantly and ingests event data in real-time.</li>
        <li><strong>Dynamic Visualization:</strong> Leveraging powerful charting libraries, the dashboard represents event data using pie charts, bar graphs, histograms, and time series plots.</li>
        <li><strong>Event Filtering:</strong> Users can filter events based on type, source, timestamp, or other custom criteria, ensuring only relevant data is visualized.</li>
    </ul>
    `);
});

app.get('/api/data', (req: Request, res: Response) => {
    //add function here to grab data
    res.json({data: "Mock Data"});
});

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running and healthy.'
    });
});

// ERROR HANDLING
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send(`500 Error: Server encountered something unexpected`);
})

// SERVER
io.on('connection', (socket) => {
    console.log('Operator connected with ID:', socket.id);

    io.emit('userStatus', { userId: socket.id, status: 'online', lastActive: new Date() });


    socket.on('message', (data) => {
        console.log(data);

        socket.emit('reply', 'This is a message from the server.');
    });

    socket.on('disconnect', () => {
        console.log('Operator disconnected with ID:', socket.id);
        io.emit('userStatus', { userId: socket.id, status: 'offline', lastActive: new Date() });
    });
});

server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
