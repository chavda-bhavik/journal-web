import React from 'react';
import dayjs from 'dayjs';
// import classes from './style.module.css';

interface JournalProps {
    hasConnector?: boolean;
    onClick?: (journal: FormattedJournalType) => void;
    journal: FormattedJournalType;
}

const DAYS: Record<number, string> = {
    0: 'SUN',
    1: 'MON',
    2: 'TUE',
    3: 'WED',
    4: 'THU',
    5: 'FRI',
    6: 'SAT',
};

export const Journal: React.FC<JournalProps> = ({
    hasConnector = false,
    onClick = () => {},
    journal,
}) => {
    let image = null;
    if(journal.image) {
        if(typeof journal.image === "string") {
            image = <img
                src={`data:image/png;base64,${journal.image}`}
                alt="journal image"
                className="rounded-xl object-cover object-center max-h-52 w-full border-2"
            />
        } else if(journal.image.name) {
            image = <img
                src={URL.createObjectURL(journal.image)}
                alt="journal image"
                className="rounded-xl object-cover object-center max-h-52 w-full border-2"
            />
        }
    }
    return (
        <div
            className="flex gap-4 justify-between my-1 cursor-pointer"
            onClick={() => onClick(journal)}
        >
            <div className="flex flex-col w-10 md:w-11">
                <div className={`rounded-md text-center px-1 bg-narvik-medium`}>
                    <span className="uppercase text-xs md:text-sm text-brown-light font-medium">
                        {DAYS[dayjs(Number(journal.date)).get('day')]}
                    </span>
                    <h3 className="text-brown-dark text-lg md:text-xl -mt-1.5 font-medium">
                        {dayjs(Number(journal.date)).date()}
                    </h3>
                </div>
                {hasConnector ? (
                    <div className="w-0 h-full mx-auto mt-1 border-l border-brown-light" />
                ) : null}
            </div>
            <div className="flex-auto pb-4">
                <p className="uppercase text-brown-light text-sm font-normal lg:font-medium">
                    {journal.title}
                </p>
                <p className="text-brown-dark break-all text-lg sm:text-xl md:text-2xl font-normal">
                    {journal.text}
                </p>
                {image}
            </div>
        </div>
    );
};
