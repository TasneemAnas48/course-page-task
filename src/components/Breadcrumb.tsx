import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-gray-600">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index > 0 && (
                            <ChevronRight className="w-4 h-4 ml-1 mr-2" aria-hidden="true" />
                        )}
                        {item.href ? (
                            <a
                                href={item.href}
                                className="hover:text-gray-900 transition-colors"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <span className="text-gray-900">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}; 