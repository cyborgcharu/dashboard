"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const eventService_1 = require("../utils/eventService");
const express = require('express');
const router = express.Router();
const mockDataPath = path_1.default.resolve(__dirname, '..', 'data', 'mockData.json');
const mockData = () => JSON.parse(fs_1.default.readFileSync(mockDataPath, 'utf-8'));
console.log("Loaded mock data:", mockData);
router.get('/', (req, res) => {
    res.json(mockData());
});
router.get('/data', (req, res) => {
    const data = (0, eventService_1.fetchEventData)();
    const totals = (0, eventService_1.calculatePalletTotals)();
    res.json({ data, totals });
});
router.get('/data/dateRange', (req, res) => {
    const start = new Date(req.query.start);
    const end = new Date(req.query.end);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        res.status(400).json({ error: 'Invalid start or end date.' });
        return;
    }
    const events = (0, eventService_1.fetchEventsByDateRange)(start, end);
    res.json({ events });
});
module.exports = router;
