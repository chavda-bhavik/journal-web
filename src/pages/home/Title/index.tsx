import React from 'react';

interface TitleProps {
    title: string;
}

export const Title: React.FC<TitleProps> = ({ title }) => {
    return (
        <h3 className="text-brown-dark font-medium text-2xl sm:text-3xl my-2 md:my-3">{title}</h3>
    );
};
