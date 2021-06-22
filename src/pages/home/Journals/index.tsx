import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Journal } from '../Journal';
import { Title } from '../Title';
import dayjs from 'dayjs';
import { useState } from 'react';

interface JournalsProps {
    journals: FormattedJournalType[];
}
type GroupedJournalsType = Record<string, FormattedJournalType[]>;

export const Journals: React.FC<JournalsProps> = ({ journals }) => {
    const [, setLocation] = useLocation();
    const [groupedJournals, setGroupedJournals] = useState<GroupedJournalsType>({});

    useEffect(() => {
        let dateStr = '';
        let groupedJournalsGroupByDates = journals.reduce((obj, journal) => {
            dateStr = dayjs(Number(journal.date)).format('MMMM YYYY');
            obj.set(dateStr, [...(obj.get(dateStr) || []), journal]);
            return obj;
        }, new Map());
        let grpdJouranals = Object.fromEntries(groupedJournalsGroupByDates);
        setGroupedJournals(grpdJouranals);
    }, [journals]);

    const onJournalClick = (journal: FormattedJournalType) => {
        setLocation(`/view/${journal.id}`);
    };

    return (
        <div className="px-3">
            {Object.keys(groupedJournals).reduce((journalData: any[], journalDateTitle) => {
                journalData.push(<Title title={journalDateTitle} key={journalDateTitle} />);

                groupedJournals[journalDateTitle].forEach((journal, i) => {
                    journalData.push(
                        <Journal
                            journal={journal}
                            hasConnector={i !== groupedJournals[journalDateTitle].length - 1}
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
