import { useState } from "react";
import { CourseComments } from "@/views/home/components/CourseComments";
import { CourseHeader } from "@/views/home/components/CourseHeader";
import { CourseMaterials } from "@/views/home/components/CourseMaterials";
import { CourseTopics } from "@/views/home/components/CourseTopics";
import { CourseVideo } from "@/views/home/components/CourseVideo";
import { NavigationActions } from "@/views/home/components/NavigationActions";

const HomePage = () => {
    const [isWide, setIsWide] = useState(true);
    const courseUrl = "https://www.youtube.com/watch?v=4jqXkkj6D3k";

    return (
        <div>
            <div className="w-full bg-[#F5F9FA] px-2 lg:px-6">
                <div className="max-w-7xl mx-auto p-2">
                    <CourseHeader title="Starting SEO as your Home" />
                </div>
            </div>

            <div className="mx-auto lg:p-4 p-2">
                <div className="flex flex-col gap-8">
                    <div className={`flex flex-col ${!isWide ? 'lg:flex-row' : ''} gap-8`}>
                        <div className={`${isWide ? 'w-full' : 'lg:w-2/3'}`}>
                            <CourseVideo
                                url={courseUrl}
                                onWideChange={setIsWide}
                            />
                            <NavigationActions />
                            <div className="space-y-4">
                                <div className="bg-white rounded-lg p-4">
                                    <CourseMaterials />
                                </div>
                                <div className="bg-white lg:hidden  rounded-lg p-4">
                                    <CourseTopics />
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <CourseComments />
                                </div>
                            </div>
                        </div>

                        {!isWide && (
                            <div className="hidden lg:block lg:w-1/3">
                                <CourseTopics />
                            </div>
                        )}
                    </div>

                    {isWide && (
                        <div className="lg:w-1/3 hidden lg:block">
                            <CourseTopics />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;