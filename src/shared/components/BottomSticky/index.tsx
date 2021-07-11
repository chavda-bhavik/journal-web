import React from 'react';

interface BottomStickyProps {}

export const BottomSticky: React.FC<BottomStickyProps> = ({ children }) => {
    return (
        <div className="sticky bottom-0 bg-narvik-base w-full p-2 shadow-2xl border-t-2 border-narvik-medium rounded-t-md">
            {children}
        </div>
    );
};
