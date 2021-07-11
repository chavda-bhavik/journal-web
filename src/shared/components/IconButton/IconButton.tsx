import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IconButtonProps {
    icon: IconProp;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    active?: boolean;
    size?: SizeProp;
    variant?: 'white' | 'narvik' | 'brown';
    shadow?: 'md' | 'lg' | 'none';
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    disabled = false,
    onClick = () => {},
    className = '',
    active = false,
    size = 'lg',
    variant = 'white',
    shadow = 'lg',
}) => {
    let classes = 'inline-block focus:outline-none rounded-full px-3 py-2 border-2';
    if (active) classes = classes + ' bg-gold-base';
    else if (variant === 'narvik') classes += ' bg-narvik-base';
    else if (variant === 'brown') classes += ' bg-brown-light text-black';
    else classes += ' bg-white';

    if (shadow === 'md') classes += ' shadow-mg';
    else if (shadow === 'lg') classes += ' shadow-lg';

    if (disabled) classes += ' text-narvik-medium';

    classes += ' ' + className;
    return (
        <button className={classes} disabled={disabled} onClick={onClick}>
            <FontAwesomeIcon icon={icon} size={size} />
        </button>
    );
};
