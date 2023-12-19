import { FC, useState } from "react";
import {
  SendOutlined,
  LoadingOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { Button, Image, message, Upload } from "antd";
import { BeforeUploadFileType } from "rc-upload/lib/interface";
import { RcFile } from "antd/es/upload";

import { CloseOutlined } from "@ant-design/icons";

export type ChatMessageInputProps = {
  onSendMessage: (
    e: React.FormEvent<HTMLFormElement>,
    file: File
  ) => Promise<void>;
};

const ChatMessageInput: FC<ChatMessageInputProps> = ({ onSendMessage }) => {
  const [sending, setSending] = useState(false);
  const [file, setFile] = useState<File>();

  const customRequest = async ({
    file,
  }: {
    file: Exclude<BeforeUploadFileType, File | boolean> | RcFile;
  }) => {
    setFile(file as File);
  };

  return (
    <form
      className="flex gap-2 pb-4 text-xs transition-all md:pb-0 md:text-sm"
      autoComplete="off"
      onSubmit={async (e) => {
        setSending(true);
        await onSendMessage(e, file);
        setSending(false);
        setFile(undefined);
      }}
    >
      <div className="w-full h-32">
        {file ? (
          <FilePreview
            file={file}
            onDeleteBtnClick={() => {
              setFile(undefined);
            }}
          />
        ) : (
          <div className="h-32">
            <Upload.Dragger
              name="file"
              multiple={true}
              accept="image/*"
              onDrop={(e) => {
                console.log("Dropped files", e.dataTransfer.files);
              }}
              customRequest={({ file }) => customRequest({ file })}
            >
              <p className="ant-upload-drag-icon">
                <FileImageOutlined className="!text-[32px]" />
              </p>
              <p className="ant-upload-text !text-sm">
                Click or drag image to this area
              </p>
            </Upload.Dragger>
          </div>
        )}
      </div>
      <Button
        htmlType="submit"
        className="text-theme hover: flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent hover:bg-black hover:bg-opacity-5"
        disabled={sending || !file}
      >
        {sending ? <LoadingOutlined size={24} /> : <SendOutlined size={24} />}
      </Button>
    </form>
  );
};

const FilePreview = ({
  file,
  onDeleteBtnClick,
}: {
  file: File;
  onDeleteBtnClick: () => void;
}) => {
  const url = URL.createObjectURL(file);

  return (
    <div className="h-full w-fit relative group">
      <Image src={url} height={"100%"} />
      <Button
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 leading-[1] rounded-full p-2"
        danger
        type="primary"
        onClick={onDeleteBtnClick}
      >
        <CloseOutlined width={24} height={24} />
      </Button>
    </div>
  );
};

export default ChatMessageInput;
