import React from 'react';
import dayjs from 'dayjs';

interface ImageProps {
    journal: FormattedJournalType;
    onClick: (journal: FormattedJournalType) => void;
}

export const Image: React.FC<ImageProps> = ({ journal, onClick }) => {
    return (
        <div className="relative cursor-pointer" onClick={() => onClick(journal)}>
            <img
                src={`data:image/png;base64,${journal.image}`}
                alt="journal image"
                className="rounded-xl object-cover object-center h-32 w-full border-2 border-narvik-medium"
            />
            <span className="absolute bottom-2 left-2 text-white text-lg md:text-2xl lg:text-3xl font-medium p-2">
                {dayjs(Number(journal.date)).format('D MMM')}
            </span>
        </div>
    );
};
