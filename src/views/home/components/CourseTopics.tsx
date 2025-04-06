import Polygon from '@/assets/icons/Polygon.svg';
import { FileText, LockKeyhole } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Topic {
    title: string;
    duration?: string;
    questions?: number;
    locked?: boolean;
}

interface Week {
    title: string;
    description: string;
    topics: Topic[];
}

export const CourseTopics = () => {
    const progress = 63;
    const [isVisible, setIsVisible] = useState(false);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (progressRef.current) {
            observer.observe(progressRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const weeks: Week[] = [
        {
            title: 'Week 1-4',
            description: 'Advanced story telling techniques for writers: Personas, Characters & Plots',
            topics: [
                { title: 'Introduction' },
                { title: 'Course Overview' },
                { title: 'Course Overview', duration: '10 MINUTES', questions: 0 },
                { title: 'Course Exercise / Reference Files', locked: true },
                { title: 'Code Editor Installation (Optional if you have one)', locked: true },
                { title: 'Embedding PHP in HTML', locked: true },
            ]
        },
        {
            title: 'Week 2-4',
            description: 'Advanced story telling techniques for writers: Personas, Characters & Plots',
            topics: [
                { title: 'Introduction' },
                { title: 'Course Overview' },
                { title: 'Course Overview', duration: '10 MINUTES', questions: 0 },
                { title: 'Course Exercise / Reference Files', locked: true },
                { title: 'Code Editor Installation (Optional if you have one)', locked: true },
                { title: 'Embedding PHP in HTML', locked: true },
            ]
        },
    ];

    return (
        <div className="bg-white rounded-lg">
            <div className="mb-6">
                <h2 className="text-2xl font-medium">Topics for This Course</h2>
                <div className="relative my-14" ref={progressRef}>
                    <div className="absolute -top-12 flex flex-col items-center" style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}>
                        <div className="bg-white w-8 h-8 rounded-full border-2 border-[#C8C8C8] text-[12px] text-gray-600 flex items-center justify-center text-[#485293] font-medium">
                            You
                        </div>
                        <img src={Polygon} alt="Polygon" className="my-0.5" />
                    </div>

                    <div className="h-1 bg-gray-100 rounded-full">
                        <div
                            className={`h-1 bg-[#6ABD8A] rounded-full transition-all duration-1000 ease-out ${isVisible ? 'w-full' : 'w-0'
                                }`}
                            style={{ width: isVisible ? `${progress}%` : '0%' }}
                        />
                    </div>

                    <div
                        className={`text-sm text-[#485293] font-medium mt-1 absolute top-2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
                    >
                        {progress}%
                    </div>
                </div>
            </div>

            {weeks.map((week, index) => (
                <div key={index} className="mb-8 border border-gray-200 py-8 px-2 lg:px-6">
                    <h3 className="text-lg mb-2">{week.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{week.description}</p>

                    <div className="space-y-3">
                        {week.topics.map((topic, topicIndex) => (
                            <div key={topicIndex} className="flex items-center justify-between py-3 !m-0 hover:bg-gray-50 border-t border-gray-200">
                                <div className="flex items-baseline gap-2">
                                    <FileText className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">{topic.title}</span>
                                </div>
                                <div className="flex items-center gap-3 text-[12px]">
                                    {topic.questions !== undefined && (
                                        <span className="text-emerald-400 bg-emerald-100 px-1.5 py-0.5 rounded-[4px]">{topic.questions} QUESTION</span>
                                    )}
                                    {topic.duration && (
                                        <span className="text-red-400 bg-red-100 px-1.5 py-0.5 rounded-[4px]">{topic.duration}</span>
                                    )}
                                    {topic.locked && (
                                        <LockKeyhole className="w-4 h-4 text-gray-600" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}; 