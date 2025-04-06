import { Breadcrumb } from "@/components/Breadcrumb";

interface CourseHeaderProps {
    title: string;
}

export const CourseHeader = ({ title }: CourseHeaderProps) => {
    const breadcrumbItems = [
        { label: "Home", href: "#" },
        { label: "Courses", href: "#" },
        { label: "Course Details" }
    ];

    return (
        <div className="flex flex-col gap-4">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
        </div>
    );
}; 