import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const Navbar: React.FC<{}> = () => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex-initial items-center">
                <FontAwesomeIcon icon={['fas', 'calendar-day']} size="lg" />
                <h3 className="ml-2 inline-block text-xl">Timeline</h3>
            </div>
            <FontAwesomeIcon icon={['fas', 'cloud']} className="text-brown-light" size="lg" />
            <div className="flex-initial gap-2 sm:gap-3 md:gap-4 flex items-center">
                <FontAwesomeIcon icon={['fas', 'user-circle']} size="lg" />
                <FontAwesomeIcon icon={['fas', 'grip-horizontal']} size="lg" />
                <FontAwesomeIcon icon={['fas', 'search']} size="lg" />
            </div>
        </div>
    );
};
