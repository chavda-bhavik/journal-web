import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useEffect } from 'react';
import { IconButton } from '../../../pages/journal/IconButton/IconButton';

interface BackdropProps {
    show: boolean;
    onClose: () => void;
    bottomCenter?: boolean;
}

export const Backdrop: React.FC<BackdropProps> = ({
    show,
    onClose,
    children,
    bottomCenter = true,
}) => {
    useEffect(() => {
        toggleBodyOverflowHidden(show);
    }, [show]);

    const toggleBodyOverflowHidden = (add: boolean) => {
        let body = document.getElementsByTagName('body')[0];
        if (add) {
            body.classList.add('overflow-hidden');
        } else {
            body.classList.remove('overflow-hidden');
        }
    };

    return (
        <div
            className={`fixed pin h-full z-10 inset-0 overflow-hidden ${!show ? 'hidden' : ''}`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div
                className={`flex ${
                    bottomCenter ? 'items-end xs:items-center' : 'items-center'
                } justify-center min-h-screen h-full`}
            >
                <IconButton
                    icon={['fas', 'times']}
                    className="z-30 absolute top-4 right-4"
                    size="1x"
                    onClick={onClose}
                />
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                />
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div className="transform transition-all z-20 w-auto">{children}</div>
            </div>
        </div>
    );
};
