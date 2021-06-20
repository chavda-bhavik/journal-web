import React, { useEffect } from 'react';
import classes from './Section.module.css';

interface SectionProps {
	listText: string;
	paraText: string;
	className?: string;
	title: string;
	isList: boolean;
	listRef: React.RefObject<HTMLOListElement>;
	paraRef: React.RefObject<HTMLParagraphElement>;
}

export const Section: React.FC<SectionProps> = ({ listText, paraText, className = '', title, isList, listRef, paraRef }) => {
	useEffect(() => {
		isList ? listRef.current?.focus() : paraRef.current?.focus();
	}, []);
	const handleInput = (): void => {
		if (listRef.current && !listRef.current?.innerHTML) {
			listRef.current.innerHTML = '<li>&nbsp;</li>';
		}
	};

	const normalText = <p className="focus:outline-none" contentEditable={true} ref={paraRef} dangerouslySetInnerHTML={{ __html: paraText }} />;
	const list = (
		<ol
			onInput={handleInput}
			ref={listRef}
			className={`pl-3 focus:outline-none ${classes.List}`}
			contentEditable={true}
			dangerouslySetInnerHTML={{ __html: listText }}
		/>
	);

	return (
		<div className={`px-2 py-2 ${className}`}>
			<p className={`text-narvik-medium uppercase`}>{title}</p>
			{isList ? list : normalText}
		</div>
	);
};
