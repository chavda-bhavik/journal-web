import React from 'react';
import { useLocation } from 'wouter';
import { Journal } from '../Journal';
import { Title } from '../Title';

interface JournalsProps {
    journals: FormattedJournalType[];
}

export const Journals: React.FC<JournalsProps> = ({ journals }) => {
    const [, setLocation] = useLocation();
    const onJournalClick = (journal: FormattedJournalType) => {
        setLocation(`/view/${journal.id}`);
    };
    return (
        <div className="px-3">
            <Title title="May 2021" />

            {journals.map((journal, i) => (
                <Journal
                    journal={journal}
                    hasConnector={i !== journals.length - 1}
                    key={journal.id}
                    onClick={onJournalClick}
                />
            ))}
        </div>
    );
};
