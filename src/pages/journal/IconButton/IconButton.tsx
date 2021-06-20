import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IconButtonProps {
	icon: IconProp;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, disabled = false, onClick = () => {}, className = '' }) => {
	return (
		<button
			className={`inline-block shadow-lg focus:outline-none rounded-full px-4 py-3 bg-white ${className}`}
			disabled={disabled}
			onClick={onClick}
		>
			<FontAwesomeIcon icon={icon} className="text-brown-dark" size="lg" />
		</button>
	);
};
