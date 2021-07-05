import React from 'react';
import { useEffect } from 'react';

interface BackdropProps {
    show: boolean;
    onClose: () => void;
}

export const Backdrop: React.FC<BackdropProps> = ({ show, onClose, children }) => {
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
            className={`fixed pin h-screen z-10 inset-0 overflow-hidden ${!show ? 'hidden' : ''}`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-end xs:items-center justify-center min-h-screen h-full pt-4">
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
                <div className="bg-white rounded-t-md xs:rounded-md text-left overflow-hidden transform transition-all w-full xs:w-auto z-20">
                    {children}
                </div>
            </div>
        </div>
    );
};
