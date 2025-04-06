import { useEffect, useState, memo } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import RLoader from "./RLoader";

const RLazyImage = memo(({
  src,
  alt,
  className,
  offset,
  once = true,
}: {
  src: string;
  alt: string;
  className?: string;
  offset?: string;
  once?: boolean;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: once ?? false,
    rootMargin: offset ?? "75px",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (src) {
      setIsLoading(true);
    }
  }, [src]);


  return (
    <div className="relative h-full">
      {/* Loader on top of the image */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90">
          <RLoader />
        </div>
      )}

      <img
        ref={ref}
        src={inView ? src : ""}
        alt={alt}
        className={cn(
          `${inView ? "opacity-100" : "opacity-0"} transition-opacity`,
          className
        )}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
});

export default RLazyImage;