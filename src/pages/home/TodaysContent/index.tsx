import React from 'react';
import { useLocation } from 'wouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '../../../shared/components/Button';
import { Journal } from '../Journal';
import { Title } from '../Title';
import { StartContent } from './StartContent';

interface TodaysContentProps {
    todaysJournal?: FormattedJournalType;
}

export const TodaysContent: React.FC<TodaysContentProps> = ({ todaysJournal }) => {
    const [, setLocation] = useLocation();

    const createMorningEntry = () => {
        setLocation('/journal?phase=morning');
    };

    const completeEveningEntry = () => {
        setLocation('/journal?phase=evening&page=4');
    };

    let content = <StartContent onCreateMorningEntry={createMorningEntry} />;

    if (todaysJournal) {
        content = (
            <>
                <div className="flex flex-row justify-between items-center">
                    <Title title="Today" />
                    {todaysJournal.status !== 2 && (
                        <Button active={true} className="max-h-10" onClick={completeEveningEntry}>
                            Complete{' '}
                            <FontAwesomeIcon icon={['fas', 'chevron-right']} className="text-sm" />
                        </Button>
                    )}
                </div>
                <Journal journal={todaysJournal} />
            </>
        );
    }

    return content;
};
