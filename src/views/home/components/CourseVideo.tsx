import { useState, useEffect, useCallback, useRef } from 'react';
import { Maximize2, Minimize2, Maximize, Minimize } from 'lucide-react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
    url: string;
    onError?: (error: Error) => void;
    onWideChange?: (isWide: boolean) => void;
}

export const CourseVideo: React.FC<VideoPlayerProps> = ({ url, onError, onWideChange }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isWide, setIsWide] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onWideChange?.(isWide);
    }, [isWide, onWideChange]);

    const handleScroll = useCallback(() => {
        if (window.innerWidth <= 768) {
            const videoElement = videoContainerRef.current;
            if (videoElement) {
                const videoRect = videoElement.getBoundingClientRect();
                setIsSticky(videoRect.top <= 0);
            }
        } else {
            setIsSticky(false);
        }
    }, []);

    useEffect(() => {
        const debouncedScroll = () => {
            requestAnimationFrame(handleScroll);
        };

        window.addEventListener('scroll', debouncedScroll);
        window.addEventListener('resize', debouncedScroll);

        handleScroll();

        return () => {
            window.removeEventListener('scroll', debouncedScroll);
            window.removeEventListener('resize', debouncedScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                const element = videoContainerRef.current;
                if (!element) return;

                if (element.requestFullscreen) {
                    await element.requestFullscreen();
                } else if ((element as any).webkitRequestFullscreen) {
                    await (element as any).webkitRequestFullscreen();
                } else if ((element as any).msRequestFullscreen) {
                    await (element as any).msRequestFullscreen();
                }
                setIsFullscreen(true);
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if ((document as any).webkitExitFullscreen) {
                    await (document as any).webkitExitFullscreen();
                } else if ((document as any).msExitFullscreen) {
                    await (document as any).msExitFullscreen();
                }
                setIsFullscreen(false);
            }
        } catch (error) {
            console.error('Fullscreen error:', error);
        }
    };

    return (
        <div
            ref={videoContainerRef}
            className={`${isSticky ? 'sticky top-0 z-50 bg-white' : ''} 
                        ${isFullscreen ? 'w-full h-full bg-black' :
                    isWide ? 'w-[98%] bg-black mb-8 mx-6' : 'relative mb-8 max-w-4xl mx-auto'} 
                        px-2 lg:px-6`}
            role="region"
            aria-label="Video player"
        >
            <div className={`relative rounded-lg w-full ${isWide && !isFullscreen ? 'aspect-video' : ''}`}>
                <ReactPlayer
                    url={url}
                    className="w-full aspect-video object-cover rounded-lg"
                    width="100%"
                    height="100%"
                    controls
                    playing={isPlaying}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onError={(error) => onError?.(error)}
                    config={{
                        youtube: {
                            playerVars: {
                                modestbranding: 1,
                                rel: 0,
                                fs: 0
                            }
                        }
                    }}
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                        onClick={() => setIsWide(!isWide)}
                        className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 hidden md:block"
                        aria-label={isWide ? "Minimize video" : "Maximize video"}
                    >
                        {isWide ? <Minimize size={20} /> : <Maximize size={20} />}
                    </button>
                    <button
                        onClick={toggleFullscreen}
                        className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    >
                        {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
}; 