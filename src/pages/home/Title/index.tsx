import React from 'react';

interface TitleProps {
    title: string;
    className?: string;
}

export const Title: React.FC<TitleProps> = ({ title, className }) => {
    return (
        <h3
            className={`text-brown-dark font-medium text-2xl sm:text-3xl my-2 md:my-3 ${className}`}
        >
            {title}
        </h3>
    );
};
