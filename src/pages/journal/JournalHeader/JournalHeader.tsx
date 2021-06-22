import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface JournalHeaderProps {
    stage: number;
    changeStage: (n: number) => void;
    close: () => void;
    progress: number[];
    backButtonDisabled?: boolean;
}

export const JournalHeader: React.FC<JournalHeaderProps> = ({
    stage,
    changeStage,
    close,
    progress,
    backButtonDisabled = false,
}) => {
    return (
        <div className="flex flex-row py-3 justify-between items-center px-3">
            {stage > 0 && (
                <button
                    className="rounded-full px-3 py-2 focus:outline-none bg-narvik-base"
                    disabled={backButtonDisabled}
                    onClick={() => changeStage(stage - 1)}
                >
                    <FontAwesomeIcon
                        icon={['fas', 'arrow-left']}
                        className="text-brown-light"
                        size="lg"
                    />
                </button>
            )}
            <div className="w-full mx-2 bg-narvik-base">
                <div
                    className="bg-brown-light h-2 rounded-lg"
                    style={{ width: progress[stage] + '%' }}
                />
            </div>
            <button
                className="rounded-full px-3 py-2 focus:outline-none bg-narvik-base"
                onClick={close}
            >
                <FontAwesomeIcon icon={['fas', 'times']} className="text-brown-light" size="lg" />
            </button>
        </div>
    );
};
