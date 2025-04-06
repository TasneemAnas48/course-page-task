import { Clock, BookOpen, Users, Globe } from 'lucide-react';

export const CourseMaterials = () => {
    const stats = [
        { label: 'Duration:', value: '3 weeks', icon: Clock },
        { label: 'Duration:', value: '3 weeks', icon: Clock },

        { label: 'Lessons:', value: '8', icon: BookOpen },
        { label: 'Lessons:', value: '8', icon: BookOpen },

        { label: 'Enrolled:', value: '65 students', icon: Users },
        { label: 'Enrolled:', value: '65 students', icon: Users },

        { label: 'Language:', value: 'English', icon: Globe },
        { label: 'Language:', value: 'English', icon: Globe },
    ];

    return (
        <div className=" mb-8" id="materials-section">
            <h2 className="text-2xl sm:text-3xl font-medium mb-4 sm:mb-6">Course Materials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 lg:gap-x-36 p-4 sm:p-8 rounded-sm"
                style={{ boxShadow: "0px 0px 30.5px 15px #0000000A" }}>
                {stats.map((stat, index) => (
                    <div key={stat.label}
                        className={`flex items-center gap-3 pb-4 ${index < stats.length - 2 ? 'border-b ' : ''
                            }`}>
                        <div className="text-gray-500">
                            <stat.icon size={20} />
                        </div>
                        <div className="flex justify-between items-center flex-1">
                            <span className="text-gray-600">{stat.label}</span>
                            <span className="text-gray-900">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}; 