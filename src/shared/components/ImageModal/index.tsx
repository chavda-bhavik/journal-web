import React from 'react'
import { Backdrop } from '../Backdrop';

interface ImageModalProps {
    show: boolean
    imageSrc: string
    onClose: () => void
}

export const ImageModal: React.FC<ImageModalProps> = ({ show, imageSrc, onClose, children }) => {
    return (
        <Backdrop show={show} onClose={onClose} bottomCenter={false}>
            <div className="flex flex-col max-w-3xl max-h-screen overflow-auto">
                <div className="px-2 py-4">
                    <img
                        src={imageSrc}
                        alt="journal image"
                        className="rounded-xl border-2 border-narvik-medium object-contain h-1/2-screen"
                    />
                </div>
                {children}
            </div>
        </Backdrop>
    );
}