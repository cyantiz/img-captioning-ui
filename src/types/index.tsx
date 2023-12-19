import { ThunderboltOutlined, StarOutlined } from "@ant-design/icons";

export interface IMessage {
  text?: string;
  imgUrl?: string;
  self: boolean;
  createdAt: number;
}

export type Model = "blip" | "vision-encoder";

export const MODEL_NAME: Record<Model, string> = {
  blip: "BLIP",
  "vision-encoder": "VisionEncoder",
};

export const MODEL_ICON: Record<Model, React.ReactElement> = {
  blip: <ThunderboltOutlined />,
  "vision-encoder": <StarOutlined />,
};
