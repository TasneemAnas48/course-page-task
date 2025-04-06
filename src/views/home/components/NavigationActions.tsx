import { MessageSquare, BookOpen, HelpCircle, Trophy } from 'lucide-react';
import { useState } from 'react';
import RControlledDialog from '@/components/RComponents/RControlledDialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import RTooltip from '@/components/RComponents/RTooltip';

export const NavigationActions = () => {
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
    const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);
    const [questionText, setQuestionText] = useState('');

    const actions = [
        {
            name: 'Materials',
            icon: BookOpen,
            onClick: () => {
                document.getElementById('materials-section')?.scrollIntoView({ behavior: 'smooth' });
            }
        },
        {
            name: 'Comments',
            icon: MessageSquare,
            onClick: () => {
                document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' });
            }
        },
        {
            name: 'Ask Question',
            icon: HelpCircle,
            onClick: () => setIsQuestionModalOpen(true)
        },
        {
            name: 'Leaderboard',
            icon: Trophy,
            onClick: () => setIsLeaderboardModalOpen(true)
        },
    ];

    const leaderboardContent = (
        <div className="flex flex-col space-y-4">
            <div className="text-center space-y-1 text-[#080264]">
                <h2 className="text-lg">Course Name Shown Here</h2>
                <h3 className="font-medium">Leaderboard</h3>
            </div>

            <div className="bg-[#F5F9FA] p-4 rounded-lg space-y-2 text-[#182578]">
                <p>
                    Great, my friend. Your performance in this course is better than 60% of the other applicants. Continue, I want to see your name on the leaderboard here.
                </p>
            </div>
            <div className='bg-[#F5F9FA] rounded-[27px] p-6 flex flex-col gap-4'>
                {[1, 2, 3, 4].map((index) => (
                    <div
                        key={index}
                        className="h-14 bg-white rounded-[5px] border border-gray-100"
                    />
                ))}
            </div>
        </div>
    );

    return (
        <>
            <div className="flex gap-4 mb-8 px-2 lg:px-6">
                {actions.map((action) => (
                    <RTooltip
                        key={action.name}
                        tooltipText={action.name}
                        triggerComponent={
                            <button
                                onClick={action.onClick}
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <span className="sr-only">{action.name}</span>
                                <action.icon className="w-5 h-5 text-gray-600" />
                            </button>
                        }
                    />
                ))}
            </div>

            {/* Question Modal */}
            <RControlledDialog
                isOpen={isQuestionModalOpen}
                contentClassName="lg:max-w-md max-w-[90%] rounded-[14px]"
                closeDialog={() => setIsQuestionModalOpen(false)}
                dialogHeader={{
                    title: "Ask a Question"
                }}
                dialogBody={
                    <Textarea
                        value={questionText}
                        placeholder="Type your question here..."
                        onChange={(e) => setQuestionText(e.target.value)}
                        className="w-full p-4 border-none rounded-md mb-6 min-h-[100px]"
                        style={{ boxShadow: "0px 0px 10px 5px #0000000A" }}
                    />
                }
                dialogFooter={
                    <div className='flex gap-4 justify-end'>
                        <Button
                            onClick={() => setIsQuestionModalOpen(false)}
                            className="border border-[#1ab69d] text-[#1ab69d] bg-white px-2 lg:px-6 py-4 rounded-md transition-colors"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setIsQuestionModalOpen(false);
                            }}
                            className="bg-[#1ab69d] text-white px-2 lg:px-6 py-4 rounded-md transition-colors"
                        >
                            Submit
                        </Button>
                    </div>
                }
            />

            {/* Leaderboard Modal */}
            <RControlledDialog
                isOpen={isLeaderboardModalOpen}
                closeDialog={() => setIsLeaderboardModalOpen(false)}
                contentClassName="lg:max-w-md max-w-[90%] rounded-[14px] overflow-auto h-auto lg:h-[95vh]"
                dialogBody={leaderboardContent}
            />
        </>
    );
}; 