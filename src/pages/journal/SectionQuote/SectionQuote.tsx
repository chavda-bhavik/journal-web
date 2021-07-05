import React from 'react';
import { FixedBottomContainer } from '../FixedBottomContainer/FixedBottomContainer';
import { IconButton } from '../IconButton/IconButton';
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
    return (
        <>
            <JournalHeader
                stage={stage}
                changeStage={changeStage}
                close={onCloseClick}
                progressPercentage={progressPercentage}
            />
            <p className="max-w-sm mx-auto text-center mt-40">{quote}</p>
            <FixedBottomContainer>
                <IconButton
                    className="float-right"
                    onClick={() => changeStage(1)}
                    icon={['fas', 'arrow-right']}
                />
            </FixedBottomContainer>
        </>
    );
};
