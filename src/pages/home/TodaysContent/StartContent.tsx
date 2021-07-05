import React from 'react';
import { Button } from '../../../shared/components/Button';
import dayjs from 'dayjs';

interface StartContentProps {
    onCreateMorningEntry: () => void;
}

export const StartContent: React.FC<StartContentProps> = ({ onCreateMorningEntry }) => {
    return (
        <div className="w-100 bg-narvik-base text-center pt-3 pb-4 my-2 rounded-lg">
            <p className="text-narvik-medium mt-3">{dayjs().format('dddd, MMMM D')}</p>
            <h3 className="text-narvik-dark mt-4 leading-7 text-xl">
                Smile. Let's make
                <br />
                today a great day,
                <br />
                Bhavik!
            </h3>
            <Button
                text="Start Today's Journal"
                className="mt-5"
                active={true}
                onClick={onCreateMorningEntry}
            />
        </div>
    );
};
