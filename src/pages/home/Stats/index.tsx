import React from 'react';
import { Stat } from './Stat';

interface StatsProps {
    stats: stats;
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
    return (
        <div className="rounded-md bg-white flex flex-row mx-3 my-3 shadow py-3 text-center divide-x divide-brown-light">
            <Stat text="Total Entries" count={stats.total} />
            <Stat text="Months Journaling" count={stats.months} />
            <Stat text="Weeks Journaling" count={stats.weeks} />
        </div>
    );
};
