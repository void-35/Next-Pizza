import React from 'react';
import { cn } from '@/lib/utils';
import highlightWords from 'highlight-words';

interface Props {
    className?: string;
    text: string;
    words: string | string[];
    onClick: ()=>void
}

export const HighlightWords: React.FC<Props> = ({className, words, text, onClick }) => {
    const query = typeof words === "string" ? words : words.join(' ')
    const chunks = highlightWords({ text, query })



    return (
        <div onMouseDown={onClick} className={cn(className, 'w-full pt-3 pr-3 pl-3 cursor-pointer hover:bg-secondary hover:text-primary')}>
            <span>
                {
                    chunks.map((chunk) => {
                        if (chunk.match) {
                            return ( <span key={chunk.key} className='text-primary'>{chunk.text}</span> )
                        }
                        return <span key={chunk.key} className='text-sm'>{chunk.text}</span>
                    })
                }
            </span>
        </div>
    );
};