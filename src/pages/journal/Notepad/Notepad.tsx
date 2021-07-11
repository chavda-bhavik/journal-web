import React, { useState, createRef, useEffect } from 'react';
import { isLastStage } from '../../../shared/helper';
import { useKeyPress } from '../../../shared/hooks/useKeyPress';
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
    final: (content: Record<number, string>, image?: File) => void;
    progressPercentage: number;
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
    onCloseClick,
}) => {
    const [listText, setListText] = useState<string>('<li>Dummy Demo content.</li>');
    const [paraText, setParaText] = useState<string>('');
    const [file, setFile] = useState<File>();

    const listRef = createRef<HTMLOListElement>();
    const paraRef = createRef<HTMLParagraphElement>();
    const imageRef = createRef<HTMLInputElement>();
    const isTextStage = (stg: number): boolean => stg === 3 || stg === 5;

    let leftKeyPressed = useKeyPress({ userKeys: ['Control', 'ArrowLeft'] });
    let rightKeyPressed = useKeyPress({ userKeys: ['Control', 'ArrowRight'] });
    let closePressed = useKeyPress({ userKeys: ['Escape'] });

    useEffect(() => {
        if (leftKeyPressed) handleStageChange(false);
        if (rightKeyPressed) handleStageChange(true);
        if (closePressed) onCloseClick();
    }, [leftKeyPressed, rightKeyPressed, closePressed]);

    useEffect(() => {
        if (isTextStage(stage)) {
            setParaText(content[stage] ? content[stage] : '');
        } else {
            setListText(content[stage] ? content[stage] : '<li>&nbsp;</li>');
        }
    }, [content, stage]);

    const handleStageChange = (isNext = true): void => {
        if (isNext && isLastStage(stage, phase)) {
            const newContent = { ...content };
            newContent[stage] = paraRef.current!.innerText.toString();
            setContent(newContent);
            final(newContent, file);
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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <>
            <JournalHeader
                stage={stage}
                changeStage={() => handleStageChange(false)}
                close={onCloseClick}
                backButtonDisabled={phase === 'evening' && stage === 4}
                progressPercentage={progressPercentage}
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

            <div className="absolute bottom-2 w-full px-3 pb-2">
                <div className="inline-block">
                    <label htmlFor="imgInput" onClick={() => imageRef.current?.click()}>
                        <IconButton icon={['fas', 'image']} className="mr-2" active={!!file} />
                    </label>
                    <input
                        ref={imageRef}
                        type="file"
                        id="imgInput"
                        name="imgInput"
                        accept="image/*"
                        capture="camera"
                        onChange={onChange}
                        className="hidden"
                    />
                </div>
                {/* <IconButton icon={['fas', 'ellipsis-h']} /> */}
                <IconButton
                    className="float-right"
                    onClick={() => handleStageChange(true)}
                    icon={['fas', isLastStage(stage, phase) ? 'check' : 'arrow-right']}
                />
            </div>
        </>
    );
};
