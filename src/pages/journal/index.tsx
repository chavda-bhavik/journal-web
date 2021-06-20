import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Notepad } from './Notepad/Notepad';
import { SectionQuote } from './SectionQuote/SectionQuote';
import { formatJournalObject, formatToContentObject, GetQueryParams } from '../../shared/helper';
import { useLocation } from 'wouter';
import { useAppDispatch, useAppSelector } from '../../store';
import { getSingleJournal, makeJournal } from '../../store/journal/Actions';

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
            dispatch(getSingleJournal(Number(query.rid)));
        }
    }, [query.rid]);

    useEffect(() => {
        if (JournalState.journal) {
            const obj = formatToContentObject(JournalState.journal);
            setContent(obj);
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

    const final = async (finalContent: Record<number, string>): Promise<void> => {
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
        try {
            dispatch(makeJournal(final));
            if (JournalState.journal?.id) {
                setLocation('/');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="bg-narvik-light min-h-screen h-full">
            {info.stage === 0 && info.phase !== 'evening' ? (
                <SectionQuote
                    quote="Here you're come to cont the blessings not regretting anything or feeling sad for."
                    changeStage={changeStage}
                    eveningProgressPercentage={eveningProgressPercentage}
                    morningProgressPercentage={morningProgressPercentage}
                    progressPercentage={progressPercentage}
                    onCloseClick={onCloseClick}
                    phase={info.phase}
                    stage={info.stage}
                />
            ) : (
                <Notepad
                    eveningProgressPercentage={eveningProgressPercentage}
                    morningProgressPercentage={morningProgressPercentage}
                    progressPercentage={progressPercentage}
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
