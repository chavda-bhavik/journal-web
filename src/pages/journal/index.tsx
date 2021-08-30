import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { v4 as uuid } from 'uuid';

import { Notepad } from './Notepad/Notepad';
import { SectionQuote } from './SectionQuote/SectionQuote';
import { formatJournalObject, formatToContentObject, GetQueryParams } from '../../shared/helper';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearJournal, getSingleJournal, makeJournal } from '../../store/journal/Actions';

const progressPercentage: number[] = [20, 36, 52, 68, 84, 100];

const morningProgressPercentage: number[] = [22, 48, 74, 100];

const eveningProgressPercentage: number[] = [0, 0, 0, 0, 50, 100];

type statusState = {
    stage: number;
    phase: 'morning' | 'evening' | 'complete';
};

export const Journal = (): JSX.Element => {
    const [info, setInfo] = useState<statusState>({ stage: 0, phase: 'complete' });
    const [content, setContent] = useState<Record<number, string>>({});
    const [, setLocation] = useLocation();
    const JournalState = useAppSelector((state) => state.journal);
    const dispatch = useAppDispatch();
    const query = GetQueryParams();

    useEffect(() => {
        const newStatus: statusState = {
            phase: 'complete',
            stage: 0,
        };
        if (query.page !== undefined) newStatus.stage = Number(query.page);
        if (query.phase === 'morning' || query.phase === 'evening' || query.phase === 'complete') {
            newStatus.phase = query.phase;
        }
        setInfo(newStatus);
    }, [query.page, query.phase]);

    useEffect(() => {
        if (query.rid) {
            dispatch(getSingleJournal(query.rid, JournalState.journals, JournalState.fetched));
        } else {
            dispatch(clearJournal());
        }
    }, [query.rid]);

    useEffect(() => {
        if (JournalState.journal) {
            const obj = formatToContentObject(JournalState.journal);
            setContent(obj);
        } else {
            setContent({});
        }
    }, [JournalState.journal]);

    const changeStage = (n: number): void => {
        let url =
            n === 0 ? `/journal?phase=${info.phase}` : `/journal?page=${n}&phase=${info.phase}`;
        if (query.rid) url = url + `&rid=${query.rid}`;
        if (query.date) url = url + `&date=${query.date}`;
        setLocation(url);
    };

    const onCloseClick = (): void => {
        setLocation('/');
    };

    const final = async (finalContent: Record<number, string>, image?: File): Promise<void> => {
        let date = new Date().getTime();
        if (JournalState.journal && query.rid) {
            date = Number(JournalState.journal.date);
        } else if (query.date) {
            date = Number(query.date);
        }
        const final: Journal = {
            ...formatJournalObject(finalContent),
            date: dayjs(date).format('MM/DD/YYYY'),
            status: info.phase === 'morning' ? 1 : 2,
        };
        if (!query.rid) final.id = uuid();
        else final.id = query.rid;
        try {
            dispatch(makeJournal(final, JournalState.journals, date, image));
            setLocation('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container sm:w-128 relative">
            {info.stage === 0 && info.phase !== 'evening' ? (
                <SectionQuote
                    quote="Be better, not bitter."
                    changeStage={changeStage}
                    progressPercentage={
                        info.phase === 'complete'
                            ? progressPercentage[info.stage]
                            : info.phase === 'morning'
                            ? morningProgressPercentage[info.stage]
                            : eveningProgressPercentage[info.stage]
                    }
                    onCloseClick={onCloseClick}
                    stage={info.stage}
                />
            ) : (
                <Notepad
                    progressPercentage={
                        info.phase === 'complete'
                            ? progressPercentage[info.stage]
                            : info.phase === 'morning'
                            ? morningProgressPercentage[info.stage]
                            : eveningProgressPercentage[info.stage]
                    }
                    onCloseClick={onCloseClick}
                    phase={info.phase}
                    stage={info.stage}
                    final={final}
                    content={content}
                    setContent={setContent}
                    changeStage={changeStage}
                />
            )}
        </div>
    );
};
