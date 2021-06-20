import React, { useState, createRef, useEffect } from 'react';
import { FixedBottomContainer } from '../FixedBottomContainer/FixedBottomContainer';
import { IconButton } from '../IconButton/IconButton';
import { JournalHeader } from '../JournalHeader/JournalHeader';
import { Section } from '../Section/Section';
import classes from './style.module.css';

const stageHighlights: Record<number, string> = {
    0: '',
    1: "Get Specific, Bhavik! Use details to describe what you're feeling grateful for.",
    2: 'Keep these small and achievable so you actually go out and complete them',
    3: `Write your affirmations and ask, "Do I believe it? Do I feel better?" If so, you're on the right track.`,
    4: `What were the highlights from your day? Even if it's a small joy like a good cup of coffee or tea.`,
    5: `Bhavik, if you could magically go back in time and change something, what would it be?`,
};
const stageTitles: Record<number, string> = {
    0: '',
    1: '3 things i am greateful for...',
    2: 'What i will do to make today great?',
    3: 'Daily affirmations',
    4: 'highlights of the day',
    5: 'How could I have made today even better?',
};

interface NotepadProps {
    stage: number;
    changeStage: (n: number) => void;
    phase: 'complete' | 'morning' | 'evening';
    setContent: (content: Record<number, string>) => void;
    content: Record<number, string>;
    final: (content: Record<number, string>) => void;
    progressPercentage: number[];
    eveningProgressPercentage: number[];
    morningProgressPercentage: number[];
    onCloseClick: () => void;
}

export const Notepad: React.FC<NotepadProps> = ({
    stage,
    changeStage,
    phase,
    setContent,
    content,
    final,
    progressPercentage,
    morningProgressPercentage,
    eveningProgressPercentage,
    onCloseClick,
}) => {
    const [listText, setListText] = useState<string>('<li>Dummy Demo content.</li>');
    const [paraText, setParaText] = useState<string>('');

    const listRef = createRef<HTMLOListElement>();
    const paraRef = createRef<HTMLParagraphElement>();
    const isTextStage = (stg: number): boolean => stg === 3 || stg === 5;

    useEffect(() => {
        if (isTextStage(stage)) {
            setParaText(content[stage] ? content[stage] : '');
        } else {
            setListText(content[stage] ? content[stage] : '<li>&nbsp;</li>');
        }
    }, []);

    const handleStageChange = (isNext = true): void => {
        if (isNext && isLastStage()) {
            const newContent = { ...content };
            newContent[stage] = paraRef.current!.innerText.toString();
            setContent(newContent);
            final(newContent);
        } else {
            const nextStage = isNext ? stage + 1 : stage - 1;
            const newContent = { ...content };
            // updating content
            if (isTextStage(stage)) {
                newContent[stage] = paraRef.current!.innerText.toString();
            } else {
                newContent[stage] = listRef.current!.innerHTML.toString();
            }
            // updating text for section
            if (isTextStage(nextStage)) {
                setParaText(content[nextStage] ? content[nextStage] : '');
            } else {
                const text = content[nextStage] ? content[nextStage] : '<li>&nbsp;</li>';
                if (listRef.current) listRef.current.innerHTML = text;
                setListText(content[nextStage] ? content[nextStage] : '<li>&nbsp;</li>');
            }
            setContent(newContent);
            changeStage(nextStage);
        }
    };
    const isLastStage = (): boolean => {
        if (stage === 5 && phase === 'complete') return true;
        if (stage === 3 && phase === 'morning') return true;
        if (stage === 5 && phase === 'evening') return true;
        return false;
    };
    return (
        <>
            <JournalHeader
                stage={stage}
                changeStage={() => handleStageChange(false)}
                close={onCloseClick}
                progress={
                    phase === 'complete'
                        ? progressPercentage
                        : phase === 'evening'
                        ? eveningProgressPercentage
                        : morningProgressPercentage
                }
            />

            <div className="rounded-lg bg-white shadow-sm px-3 py-4 mx-2 relative border-none caret">
                <p className="leading-normal text-lg">{stageHighlights[stage]}</p>
            </div>

            <div className={`px-3 mt-2 ${classes.container}`}>
                <Section
                    title={stageTitles[stage]}
                    paraText={paraText}
                    listText={listText}
                    isList={stage === 3 || stage === 5 ? false : true}
                    listRef={listRef}
                    paraRef={paraRef}
                />
            </div>

            <FixedBottomContainer>
                <IconButton icon={['fas', 'image']} className="mr-2" />
                <IconButton icon={['fas', 'ellipsis-h']} />
                <IconButton
                    className="float-right"
                    onClick={() => handleStageChange(true)}
                    icon={['fas', isLastStage() ? 'check' : 'arrow-right']}
                />
            </FixedBottomContainer>
        </>
    );
};
