import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IconButtonProps {
    icon: IconProp;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    active?: boolean;
    size?: SizeProp
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    disabled = false,
    onClick = () => {},
    className = '',
    active = false,
    size="lg"
}) => {
    return (
        <button
            className={`inline-block shadow-lg focus:outline-none rounded-full px-4 py-3 ${
                active ? 'bg-gold-base' : 'bg-white'
            } ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            <FontAwesomeIcon
                icon={icon}
                className={active ? 'text-brown-dark' : 'text-brown-dark'}
                size={size}
            />
        </button>
    );
};
