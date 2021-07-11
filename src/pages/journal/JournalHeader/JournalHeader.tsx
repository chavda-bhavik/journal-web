import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IconButton } from '../../../shared/components/IconButton/IconButton';

interface JournalHeaderProps {
    stage: number;
    changeStage: (n: number) => void;
    close: () => void;
    progressPercentage: number;
    backButtonDisabled?: boolean;
}

export const JournalHeader: React.FC<JournalHeaderProps> = ({
    stage,
    changeStage,
    close,
    progressPercentage,
    backButtonDisabled = false,
}) => {
    return (
        <div className="flex flex-row py-3 justify-between items-center px-3">
            {stage > 0 && (
                <IconButton
                    icon={['fas', 'arrow-left']}
                    variant="narvik"
                    shadow="none"
                    onClick={() => changeStage(stage - 1)}
                    disabled={backButtonDisabled}
                />
            )}
            <div className="w-full mx-2 bg-narvik-base">
                <div
                    className="bg-brown-light h-2 rounded-lg"
                    style={{ width: progressPercentage + '%' }}
                />
            </div>
            <IconButton icon={['fas', 'times']} variant="narvik" onClick={close} shadow="none" />
        </div>
    );
};
