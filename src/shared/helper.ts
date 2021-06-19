import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

// const mappings: Record<number, string> = {
//     1: 'greatfullness',
//     2: 'actions',
//     3: 'affirmation',
//     4: 'highlights',
//     5: 'improvements',
// };

// export const formatJournalObject = (content: Record<number, string>): Omit<JournalType, 'date'> => {
//     const journal = Object.keys(content).reduce((obj: any, key: any) => {
//         if (mappings[key]) obj[mappings[key]] = content[key];
//         return obj;
//     }, {});
//     return journal;
// };
// export const formatToContentObject = (
//     journal: Pick<
//         Journal,
//         'id' | 'actions' | 'greatfullness' | 'date' | 'affirmation' | 'highlights' | 'improvements'
//     >,
// ): Record<number, string> => {
//     const obj: Record<number, string> = {};
//     let index;
//     for (const key in journal) {
//         index = Object.keys(mappings).find((k) => mappings[k] === key);
//         if (index) obj[index] = journal[key];
//     }
//     return obj;
// };

interface journalReturnType {
    title: string;
    text: string;
}

export const formatHTML = (str: string): string =>
    str
        .replace(/<li>/gi, '')
        .replace(/<\/li>/g, '\n')
        .split('\n')[0]
        .replace(/&nbsp;/, '');

export const getPriorityJournal = (
    journal: Journal,
    firstPriority?: 'affirmation' | 'greatfullness' | 'highlights',
): journalReturnType => {
    const obj = {
        title: '',
        text: '',
    };
    const mappings: {
        affirmation: string;
        greatfullness: string;
        highlights: string;
    } = {
        affirmation: 'your daily affirmation',
        greatfullness: 'what i was greateful for',
        highlights: 'Highlights of the day',
    };
    if (firstPriority && journal[firstPriority]) {
        obj.title = mappings[firstPriority];
        obj.text = journal[firstPriority]!;
    } else {
        if (journal.affirmation) {
            obj.title = mappings.affirmation;
            obj.text = journal.affirmation;
        } else if (journal.greatfullness) {
            (obj.title = mappings.greatfullness), (obj.text = journal.greatfullness);
        } else if (journal.highlights) {
            obj.title = mappings.highlights;
            obj.text = journal.highlights;
        }
    }
    obj.text = formatHTML(obj.text);
    return obj;
};

export const formatJournals = (journals: Journal[] | undefined): FormattedJournalType[] => {
    const result: FormattedJournalType[] = [];
    let date;
    journals?.forEach((journal, i) => {
        date = new Date(Number(journal.date));
        date.setHours(0, 0, 0, 0);
        if (i % 3 === 0) {
            result.push({
                id: journal.id,
                date: date.getTime().toString(),
                status: journal.status,
                ...getPriorityJournal(journal, 'affirmation'),
            });
            // take greatfullness
        } else {
            // take affirmation
            result.push({
                id: journal.id,
                status: journal.status,
                date: date.getTime().toString(),
                ...getPriorityJournal(journal, 'greatfullness'),
            });
        }
    });
    return result;
};

export const getTodaysJournal = (journals: Journal[]): FormattedJournalType | undefined => {
    dayjs.extend(isToday);
    if (journals) {
        if (dayjs(Number(journals[0].date)).isToday()) {
            const j = getPriorityJournal(journals[0]);
            const text = formatHTML(j.text);
            const obj: FormattedJournalType = {
                id: journals[0].id,
                date: journals[0].date,
                text: text,
                title: j.title,
                status: journals[0].status,
            };
            return obj;
        }
    }
    return undefined;
};
