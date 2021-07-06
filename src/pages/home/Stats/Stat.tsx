import React from 'react';

interface StatProps {
    text: string;
    count: number;
}

export const Stat: React.FC<StatProps> = ({ count, text }) => {
    return (
        <div className="flex-1 px-2">
            <h3 className="text-brown-dark text-2xl md:text-3xl font-medium">{count}</h3>
            <p className="text-brown-light text-base md:text-xl font-medium leading-4">{text}</p>
        </div>
    );
};
