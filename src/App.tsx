import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { UploadOutlined, SearchOutlined } from "@ant-design/icons";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  console.log("get base64, hi");
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [result, setResult] = useState<string>();

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    getBase64(fileList[0], (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const beforeUpload = (file: RcFile) => {
    console.log("before upload, hi");
    //validate stuff here

    setFileList([file]);

    return false;
  };

  return (
    <div className="flex gap-4 w-screen h-screen justify-center items-center relative p-4">
      <div className="flex gap-2 flex-col items-center flex-1">
        <ImgPreview imageUrl={imageUrl} />
        <div className="w-[512px]">
          <Upload
            name="img"
            className="img-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            <Button block size="large" icon={<UploadOutlined />}>
              Select file
            </Button>
          </Upload>
        </div>
      </div>
      <GetTheResultBtn onClick={() => setResult("result")} />
      <div className="flex-1 flex flex-col items-center">
        <Result text={result} />
        <div className="h-10"></div>
      </div>
    </div>
  );
};

const GetTheResultBtn = ({ onClick }: { onClick?: () => void }) => (
  <Button
    type="primary"
    size="large"
    onClick={onClick}
    icon={<SearchOutlined />}
  >
    Get the result
  </Button>
);
const ImgPreview = ({ imageUrl }: { imageUrl: string }) => (
  <div className="bg-slate-100 rounded-xl border-blue-500 border-dashed border-2 w-[512px] h-[512px] overflow-hidden">
    {imageUrl && (
      <img src={imageUrl} className="w-full h-full object-contain" alt="" />
    )}
  </div>
);
const Result = ({ text }: { text: string }) => (
  <div className="bg-white rounded-xl border-green-500 border-solid border-2 w-[512px] h-[512px] overflow-hidden p-8">
    {text}
  </div>
);
export default App;
