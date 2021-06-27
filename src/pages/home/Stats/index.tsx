import React from 'react';

interface StatsProps {
    stats: stats;
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
    return (
        <div className="rounded-md bg-white flex flex-row mx-3 my-3 shadow py-3 text-center divide-x divide-brown-light">
            <div className="flex-1 px-2">
                <h3 className="text-brown-dark text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
                    {stats.total}
                </h3>
                <p className="text-brown-light text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-4">
                    Total Entries
                </p>
            </div>
            <div className="flex-1 px-2">
                <h3 className="text-brown-dark text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
                    {stats.months}
                </h3>
                <p className="text-brown-light text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-4">
                    Months Journaling
                </p>
            </div>
            <div className="flex-1 px-2">
                <h3 className="text-brown-dark text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
                    {stats.weeks}
                </h3>
                <p className="text-brown-light text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-4">
                    Weeks Journaling
                </p>
            </div>
        </div>
    );
};
