import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

interface QuoteProps {
    quote: string;
    author: string;
}

export const Quote: React.FC<QuoteProps> = ({ quote, author }) => {
    const [show, setShow] = useState(true);
    return show ? (
        <div className="rounded-lg bg-narvik-base p-3 mx-3 relative">
            <p className="font-highlights text-brown-dark text-xl md:text-2xl max-w-9/10 mb-1">
                {quote}
            </p>
            <p className="uppercase text-brown-light text-sm font-medium">{author}</p>
            <FontAwesomeIcon
                icon={['fas', 'times']}
                size="1x"
                className="absolute right-4 top-3"
                onClick={() => setShow(false)}
            />
        </div>
    ) : null;
};
