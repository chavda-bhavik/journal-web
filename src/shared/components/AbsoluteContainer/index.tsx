import React from 'react';

export const AbsoluteContainer: React.FC<{}> = ({ children }) => {
    return <div className="absolute bottom-2 px-2 w-full">{children}</div>;
};
