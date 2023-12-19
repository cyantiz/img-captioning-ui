import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Divider, Dropdown, Input, Radio, Space } from "antd";
import { MODEL_ICON, MODEL_NAME, Model } from "../types";

type ModelSelectProps = {
  value: Model;
  onChange: (value: Model) => void;
};

const ModelSelect: React.FC<ModelSelectProps> = ({ value, onChange }) => (
  <Dropdown
    trigger={["click"]}
    dropdownRender={(menu) => (
      <Space className="bg-white border-solid rounded-lg border-gray-300 p-4 border flex flex-col">
        <span className="font-bold text-lg">Model</span>
        <Radio.Group
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={value}
        >
          <Space direction="vertical">
            <Radio value="blip">
              <div className="gap-2 flex">
                {MODEL_ICON["blip"]}
                <span>{MODEL_NAME["blip"]}</span>
              </div>
            </Radio>
            <Radio value="vision-encoder">
              <div className="gap-2 flex">
                {MODEL_ICON["vision-encoder"]}
                <span>{MODEL_NAME["vision-encoder"]}</span>
              </div>
            </Radio>
          </Space>
        </Radio.Group>
      </Space>
    )}
  >
    <a
      onClick={(e) => e.preventDefault()}
      className="bg-gray-100 px-4 py-3 rounded-lg cursor-pointer w-48 flex items-center font-bold"
    >
      <Space className="w-full text-center justify-center text-sm">
        {MODEL_ICON[value]}
        {MODEL_NAME[value]}
      </Space>
      <Space>
        <DownOutlined className="text-xs" />
      </Space>
    </a>
  </Dropdown>
);

export default ModelSelect;
