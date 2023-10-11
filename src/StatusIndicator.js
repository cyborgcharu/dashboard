import React from 'react';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

function StatusIndicator({ status }) {
    let backgroundColor = '#121117'; // Default color

    switch (status) {
        case 'online':
            backgroundColor = '#A5F54C'; // lime
            break;
        case 'offline':
            backgroundColor = '#5D43EF'; // indigo
            break;
        case 'away':
            backgroundColor = '#303036'; // onyx
            break;
        default:
            backgroundColor = '#121117'; // Default color
            break;
    }

    return <Avatar style={{ backgroundColor: backgroundColor }} />;
}

export default StatusIndicator;
