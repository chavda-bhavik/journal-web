import React from 'react';
import { useLocation } from 'wouter';
import { Journal } from '../Journal';
import { Title } from '../Title';

interface JournalsProps {
    journals: GroupedJournalsType;
}

export const Journals: React.FC<JournalsProps> = ({ journals }) => {
    const [, setLocation] = useLocation();

    const onJournalClick = (journal: FormattedJournalType) => {
        setLocation(`/view/${journal.id}`);
    };

    return (
        <div className="px-3">
            {Object.keys(journals).reduce((journalData: any[], journalDateTitle) => {
                journalData.push(<Title title={journalDateTitle} key={journalDateTitle} />);

                journals[journalDateTitle].forEach((journal, i) => {
                    journalData.push(
                        <Journal
                            journal={journal}
                            hasConnector={i !== journals[journalDateTitle].length - 1}
                            key={journal.id}
                            onClick={onJournalClick}
                        />,
                    );
                });
                return journalData;
            }, [])}
        </div>
    );
};
