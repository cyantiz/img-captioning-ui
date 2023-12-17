import React, { FC, useEffect, useRef, useState } from "react";
import ChatMessage from "./Message";
import { Avatar, Divider, Spin } from "antd";
import ChatMessageInput from "./MessageInput";
import { IMessage } from "../../types";
import { message } from "antd";

import { sendFileToStorage } from "../../utils/firebase.util";
import { getCaption } from "../../utils/captioning.util";
import {
  addMessagesToConversation,
  getConversationFromLocalStorage,
} from "../../utils/localStorage.util";
export type ChatBoxProps = {
  // Define your props here if needed
};

const ChatBox: FC<ChatBoxProps> = ({}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [showBlind, setShowBlind] = useState(true);

  const messageListRef = useRef<HTMLDivElement>(null);

  const onSendMessage = async (
    e: React.FormEvent<HTMLFormElement>,
    file: File
  ) => {
    e.preventDefault();

    const imgUrl = await sendFileToStorage({
      file,
      onError: (error) => {
        message.error(`error while uploading file, please try again.`);
        console.log(error);
      },
    });

    const newMessage: IMessage = {
      imgUrl,
      self: true,
      createdAt: Date.now(),
    };

    addMessagesToConversation([newMessage]);
    setMessages((messages) => [...messages, newMessage]);
    messageListRef.current && messageListRef.current.scrollTo(0, 9999999);

    const caption = (await getCaption({ imgUrl })).caption;
    const newResponse: IMessage = {
      text: `Content in your image is: ${caption}`,
      self: false,
      createdAt: Date.now() + 1,
    };

    addMessagesToConversation([newResponse]);
    setMessages((messages) => [...messages, newResponse]);
    messageListRef.current && messageListRef.current.scrollTo(0, 9999999);
  };

  useEffect(() => {
    const conversation = getConversationFromLocalStorage();

    setMessages(conversation);

    setTimeout(() => {
      setShowBlind(false);
    }, 1000);
  }, []);

  return (
    <div className="flex h-full w-full flex-col justify-between relative">
      <div v-if="chatUserInfo" className="flex items-center gap-4">
        <div className="rounded-full border-solid border-blue-400 border-2">
          <Avatar
            src="https://static.tuoitre.vn/tto/i/s626/2016/07/05/wall-e-cubecolors-1467709252.jpg"
            size={72}
          />
        </div>
        <div className="flex-1 pb-1">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold">
            Image Captioning
          </p>
        </div>
      </div>
      <Divider className="my-4" />
      {showBlind && (
        <div className="message-list__blind absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-white z-[999]">
          <Spin size="large" />
        </div>
      )}
      <div
        className="message-list  h-full w-full overflow-y-auto pr-2 md:pr-0"
        ref={messageListRef}
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.createdAt}
            text={message.text}
            imageUrl={message.imgUrl}
            self={message.self}
            onImgLoad={() => {
              messageListRef.current &&
                messageListRef.current.scrollTo(0, 9999999);
            }}
          />
        ))}
        <div className="h-4 w-full"></div>
      </div>
      <ChatMessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatBox;
