import { Request, Response } from "express";
import fs from 'fs';
import path from 'path';
import { fetchEventData, fetchEventsByDateRange, calculatePalletTotals } from '../utils/eventService';


const express = require('express');
const router = express.Router();
const mockDataPath = path.resolve(__dirname, '..', 'data', 'mockData.json');
const mockData = () => JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'));

console.log("Loaded mock data:", mockData);

router.get('/', (req: Request, res: Response) => {
    res.json(mockData());
});

router.get('/data', (req: Request, res: Response) => {
    const data = fetchEventData();
    const totals = calculatePalletTotals();
    res.json({ data, totals });
});

router.get('/data/dateRange', (req: Request, res: Response) => {
    const start = new Date(req.query.start as string);
    const end = new Date(req.query.end as string);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        res.status(400).json({ error: 'Invalid start or end date.' });
        return;
    }

    const events = fetchEventsByDateRange(start, end);
    res.json({ events });
});


module.exports = router;