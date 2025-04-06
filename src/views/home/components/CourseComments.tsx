import Comment1 from "@/assets/images/comment-01.jpg"
import Comment2 from "@/assets/images/comment-02.jpg"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"

interface Comment {
    id: number;
    name: string;
    date: string;
    content: string;
    avatar: string;
}

export const CourseComments = () => {
    const comments: Comment[] = [
        {
            id: 1,
            name: 'Student Name Goes Here',
            date: 'Oct 10, 2021',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            avatar: Comment1
        },
        {
            id: 2,
            name: 'Student Name Goes Here',
            date: 'Oct 10, 2021',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            avatar: Comment2
        },
    ];

    return (
        <div className="mb-8" id="comments-section">
            <h2 className="text-3xl font-medium mb-6">Comments</h2>

            <div className="space-y-6 mb-8">
                {comments.map((comment) => (
                    <div key={comment.id} className={`flex gap-4 border-b border-gray-200 pb-4 ${comment.id === comments.length ? 'border-b-0' : ''}`}>
                        <img
                            src={comment.avatar}
                            alt={comment.name}
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <div className="font-medium text-[#6C6C6C] text-[15px] ">{comment.name}</div>
                            <div className="text-sm text-gray-400 mb-3">{comment.date}</div>
                            <p className="text-gray-400">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <Textarea
                    placeholder="Write a comment"
                    className="w-full p-4 border-none rounded-md mb-6 min-h-[100px]"
                    style={{ boxShadow: "0px 0px 30.5px 15px #0000000A" }}
                />
                <Button className="bg-[#1ab69d] text-white px-2 lg:px-6 py-4 h-[50px] rounded-md transition-colors">
                    Submit Review
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}; 