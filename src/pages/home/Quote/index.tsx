import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

interface QuoteProps {
    quote: string;
    author: string;
}

export const Quote: React.FC<QuoteProps> = ({ quote, author }) => {
    const [show, setShow] = useState(true);
    return show ? (
        <div className="rounded-lg bg-narvik-base p-4 mx-3 relative">
            <p className="text-brown-dark text-xl sm:text-2xl lg:text-3xl max-w-9/10">{quote}</p>
            <p className="uppercase text-brown-light text-base sm:text-lg md:text-xl font-medium mt-3">
                {author}
            </p>
            <FontAwesomeIcon
                icon={['fas', 'times']}
                size="2x"
                className="absolute right-4 top-3"
                onClick={() => setShow(false)}
            />
        </div>
    ) : null;
};
