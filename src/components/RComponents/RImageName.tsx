import React from "react";
import RFlex from "@/components/RComponents/RFlex";
import { UserCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { RImageNameProps } from "@/types/index.type";

const RImageName: React.FC<RImageNameProps> = ({
  name,
  type = "user",
  image,
  imageClassName,
  className = "",
  onClick,
  textClassName,
}) => {
  const DefaultImage =
    type === "user" ? UserCircle : type === "group" ? Users : UserCircle;

  return (
    <RFlex
      className={`items-center w-max ${className}`}
      onClick={() => onClick && onClick()}
    >
      {image ? (
        <img
          src={image}
          className="rounded-full w-[30px] h-[30px] object-cover"
        />
      ) : (
        <DefaultImage className={cn("w-[30px] h-[30px]", imageClassName)} />
      )}
      <RFlex className="flex-col gap-[5px]">
        <span className={textClassName}>{name}</span>
      </RFlex>
    </RFlex>
  );
};

export default RImageName;
