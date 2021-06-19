import React from 'react';

interface ButtonProps {
    text?: string;
    onClick?: () => void;
    active?: boolean;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    text,
    onClick = () => {},
    active = false,
    className = '',
    children,
}) => {
    let classes = 'focus:outline-none rounded-md px-3 py-1 outline-none ' + className;
    if (active) classes = classes + ' bg-gold-base';
    else classes = classes + ' bg-narvik-base';
    return (
        <button className={classes} onClick={onClick}>
            {text ? text : children}
        </button>
    );
};
