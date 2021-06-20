import React from 'react';

export const FixedBottomContainer: React.FC<{}> = ({ children }) => {
	return <div className="fixed bottom-2 w-full px-3 pb-2">{children}</div>;
};
