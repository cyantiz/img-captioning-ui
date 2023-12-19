import { imgFallback } from "../../utils/img";
import { Avatar, Image } from "antd";
import React, { FC } from "react";

export type ChatMessageProps = {
  text?: string;
  imageUrl?: string;
  self?: boolean;
  onImgLoad?: () => void;
};

const ChatMessage: FC<ChatMessageProps> = ({
  text,
  imageUrl,
  self = false,
  onImgLoad,
}) => {
  const textColor = self ? "white" : "black";
  const bgColor = self ? "#00ADD2" : "#E4E6EB";

  return (
    <div
      className="flex w-full mb-2 gap-2 items-center z-1"
      style={{ justifyContent: self ? "flex-end" : "flex-start" }}
    >
      {!self && (
        <Avatar
          src="https://static.tuoitre.vn/tto/i/s626/2016/07/05/wall-e-cubecolors-1467709252.jpg"
          size={36}
        />
      )}
      {text && (
        <div
          className="my-0.5 max-w-[60%] rounded-lg px-4 py-2 2xl:max-w-[50%] text-black bg-[#E4E6EB] leading-[1] h-fit"
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          {text}
        </div>
      )}

      {!text && imageUrl && (
        <div v-if="image" className="w-96">
          <Image
            src={imageUrl}
            width={"100%"}
            className="w-full rounded-lg"
            fallback={imgFallback}
            onLoad={(e) => onImgLoad()}
            placeholder={
              <Image
                preview={false}
                src={imgFallback}
                width={"100%"}
                height={384}
                style={{ objectFit: "cover", height: "384px" }}
              />
            }
          />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
