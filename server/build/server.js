"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORT
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const apiRoutes = require('./routes/api');
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const PORT = process.env.PORT || 4000;
// MIDDLEWARE
app.use(express_1.default.static('public'));
app.use('/api', apiRoutes);
// ROUTES
app.get('/', (req, res) => {
    res.send("Hello World!");
});
app.get('/api/data', (req, res) => {
    //add function here to grab data
    res.json({ data: "Mock Data" });
});
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running and healthy.'
    });
});
app.get('/about', (req, res) => {
    res.send(`
    <p><strong>Overview:</strong> Evently Dashboard is a frontend visibility application tailored for modern businesses and developers. It connects seamlessly to an API, ingests event data in real-time, and visualizes analytics on a dynamic dashboard. With Evently Dashboard, users gain valuable insights into event-driven architectures, helping them optimize applications, understand user behavior, and make data-driven decisions.</p>
    
    <p><strong>Key Features:</strong></p>
    <ul>
        <li><strong>Real-time Data Streaming:</strong> The application listens to the configured API constantly and ingests event data in real-time.</li>
        <li><strong>Dynamic Visualization:</strong> Leveraging powerful charting libraries, the dashboard represents event data using pie charts, bar graphs, histograms, and time series plots.</li>
        <li><strong>Event Filtering:</strong> Users can filter events based on type, source, timestamp, or other custom criteria, ensuring only relevant data is visualized.</li>
    </ul>
    `);
});
// ERROR HANDLING
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`500 Error: Server encountered something unexpected`);
});
// SERVER
io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('message', (data) => {
        console.log(data);
        socket.emit('reply', 'This is a message from the server.');
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
