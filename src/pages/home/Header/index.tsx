import React from 'react';
import { useLocation } from 'wouter';
import { Journal } from '../Journal';
import { Navbar } from '../Navbar';
import { Title } from '../Title';

interface HeaderProps {
    todaysJournal?: FormattedJournalType;
}

export const Header: React.FC<HeaderProps> = ({ todaysJournal }) => {
    const [, setLocation] = useLocation();
    const onJournalClick = (journal: FormattedJournalType) => {
        setLocation(`/view/${journal.id}`);
    };
    return (
        <div className="bg-narvik-base py-2 px-3">
            <Navbar />
            {todaysJournal && (
                <>
                    <Title title="Today" />
                    <Journal journal={todaysJournal} onClick={onJournalClick} />
                </>
            )}
        </div>
    );
};
