import React from 'react';

interface TitleProps {
    title: string;
}

export const Title: React.FC<TitleProps> = ({ title }) => {
    return (
        <h3 className="text-brown-dark font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-3">
            {title}
        </h3>
    );
};
