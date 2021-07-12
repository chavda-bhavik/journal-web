import React from 'react';
import { CSSTransition } from 'react-transition-group';
import classes from './Note.module.css';

interface NoteProps {
    title: string;
    text?: string;
    className?: string;
    isList?: boolean;
    editing?: boolean;
    onClick?: () => void;
}

export const Note: React.FC<NoteProps> = ({
    title,
    text,
    className = '',
    isList = true,
    editing = false,
    onClick = () => {},
}) => {
    const Note: JSX.Element = (
        <ol
            className={`pl-3 ${classes.List}`}
            dangerouslySetInnerHTML={{ __html: text ? text : '' }}
        />
    );

    const normalText = <p dangerouslySetInnerHTML={{ __html: text ? text : '' }} />;

    return (
        <CSSTransition in={true} timeout={{ appear: 200, exit: 200, enter: 100 }} classNames="blur">
            <div
                className={`px-2 md:px-3 py-2 md:py-3 ${
                    editing ? 'rounded-xl bg-white' : ''
                } ${className} break-all`}
                onClick={() => editing && onClick()}
                role="button"
                onKeyDown={() => editing && onClick()}
                tabIndex={-1}
            >
                <p
                    className={`${
                        editing ? 'text-gold-base' : 'text-narvik-medium'
                    } uppercase font-medium mb-1`}
                >
                    {title}
                </p>
                {isList ? Note : normalText}
            </div>
        </CSSTransition>
    );
};
