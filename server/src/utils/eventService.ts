// /server/src/utils/eventService.ts

import fs from 'fs';
import path from 'path';

const mockDataPath = path.resolve(__dirname, '..', 'data', 'mockData.json');

export const fetchEventData = (): Array<any> => {
  const data = fs.readFileSync(mockDataPath, 'utf-8');
  return JSON.parse(data).events;
}

export const calculatePalletTotals = (): { palletA: number, palletB: number } => {
  const events = fetchEventData();
  let palletA = 0;
  let palletB = 0;

  for (const event of events) {
    if (event.name === "Pallet A") {
      palletA++;
    } else if (event.name === "Pallet B") {
      palletB++;
    }
  }

  return { palletA, palletB };
}


export const fetchEventsByDateRange = (startDate: Date, endDate: Date): Array<any> => {
    const events = fetchEventData();

    return events.filter(event => {
        const eventDate = new Date(event.timestamp);
        return eventDate >= startDate && eventDate <= endDate;
    });
}

