import React, { useEffect } from 'react';
import { useKeyPress } from '../../../shared/hooks/useKeyPress';
import { IconButton } from '../../../shared/components/IconButton/IconButton';
import { JournalHeader } from '../JournalHeader/JournalHeader';

interface SectionQuoteProps {
    quote: string;
    changeStage: (n: number) => void;
    stage: number;
    progressPercentage: number;
    onCloseClick: () => void;
}

export const SectionQuote: React.FC<SectionQuoteProps> = ({
    quote,
    changeStage,
    stage,
    onCloseClick,
    progressPercentage,
}) => {
    let rightKeyPressed = useKeyPress({ userKeys: ['Control', 'ArrowRight'] });
    let closePressed = useKeyPress({ userKeys: ['Escape'] });

    useEffect(() => {
        if (rightKeyPressed) changeStage(1);
        if (closePressed) onCloseClick();
    }, [rightKeyPressed, closePressed]);

    return (
        <>
            <JournalHeader
                stage={stage}
                changeStage={changeStage}
                close={onCloseClick}
                progressPercentage={progressPercentage}
            />
            <p className="max-w-sm mx-auto text-center mt-40 font-highlights text-lg md:text-2xl leading-7 tracking-wide">
                {quote}
            </p>
            <div className="absolute bottom-2 w-full px-3 pb-2">
                <IconButton
                    className="float-right"
                    onClick={() => changeStage(1)}
                    icon={['fas', 'arrow-right']}
                />
            </div>
        </>
    );
};
