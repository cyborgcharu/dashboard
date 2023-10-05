"use strict";
// /server/src/utils/eventService.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEventsByDateRange = exports.calculatePalletTotals = exports.fetchEventData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mockDataPath = path_1.default.resolve(__dirname, '..', 'data', 'mockData.json');
const fetchEventData = () => {
    const data = fs_1.default.readFileSync(mockDataPath, 'utf-8');
    return JSON.parse(data).events;
};
exports.fetchEventData = fetchEventData;
const calculatePalletTotals = () => {
    const events = (0, exports.fetchEventData)();
    let palletA = 0;
    let palletB = 0;
    for (const event of events) {
        if (event.name === "Pallet A") {
            palletA++;
        }
        else if (event.name === "Pallet B") {
            palletB++;
        }
    }
    return { palletA, palletB };
};
exports.calculatePalletTotals = calculatePalletTotals;
const fetchEventsByDateRange = (startDate, endDate) => {
    const events = (0, exports.fetchEventData)();
    return events.filter(event => {
        const eventDate = new Date(event.timestamp);
        return eventDate >= startDate && eventDate <= endDate;
    });
};
exports.fetchEventsByDateRange = fetchEventsByDateRange;
