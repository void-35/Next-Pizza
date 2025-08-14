'use client'

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { IStory } from '@/services/stories';
import { Api } from '@/services/api-clients';
import { Container } from './container';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';

interface Props {
    className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
    const [stories, setStories] = useState<IStory[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedStory, setSelectedStory] = useState<IStory>();

    useEffect(() => {
        async function getStories() {
            const data = await Api.stories.getAll();
            setStories(data);
        }
        getStories();
    }, []);

    const onHandleStoryOpen = (state: boolean) => {
        setOpen(state);
        document.body.style.overflow = state ? 'hidden' : 'scroll';
    };

    const onClickStory = (story: IStory) => {
        setSelectedStory(story);
        if (story.items.length > 0) {
            onHandleStoryOpen(true);
        }
    };

    return (
        <Container
            className={cn(
                'flex items-center gap-2 justify-start my-[20px] overflow-x-auto scrollbar-hide',
                className
            )}
        >
            {stories.length === 0 &&
                [...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className='flex-shrink-0 w-[120px] h-[180px] sm:w-[200px] sm:h-[250px] rounded-2xl bg-gray-200 animate-pulse'
                    />
                ))}
            {stories.map((story) => (
                <img
                    className='flex-shrink-0 rounded-md cursor-pointer object-cover w-[120px] h-[180px] sm:w-[200px] sm:h-[250px]'
                    key={story.id}
                    onClick={() => onClickStory(story)}
                    src={story.previewImageUrl}
                    alt='story preview'
                />
            ))}

            {open && (
                <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-40 p-2 sm:p-0'>

                    <div className='relative w-full max-w-[520px] h-[80%] sm:h-auto'>
                        <button
                            className='absolute top-3 max-sm:!-translate-y-20 right-3 sm:-right-10 sm:-top-5 z-50'
                            onClick={() => onHandleStoryOpen(false)}
                        >
                            <X className='w-8 h-8 text-white/80 hover:text-white' />
                        </button>
                        <ReactStories
                            onAllStoriesEnd={() => onHandleStoryOpen(false)}
                            stories={
                                selectedStory?.items.map((item) => ({
                                    url: item.sourceUrl,
                                })) || []
                            }
                            defaultInterval={30000}
                            width={'100%'}
                            height={'100%'}
                        />
                    </div>
                </div>
            )}
        </Container>
    );
};
