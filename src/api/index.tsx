import axios from "axios";

export async function getCaptionFromBLIP({ file }: { file: File }): Promise<{
  caption: string;
}> {
  const captioningServerUrl = import.meta.env.VITE_BLIP_CAPTIONING_SERVER_URL;

  const formData = new FormData();
  formData.append("file", file);

  if (!captioningServerUrl || captioningServerUrl?.length === 0) {
    return {
      caption: "Sorry, model is not available now :( Please try later!",
    };
  }

  const response = await axios.post<{ caption: string }>(
    captioningServerUrl,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function getCaptionFromVisionEncoder({
  file,
}: {
  file: File;
}): Promise<{
  caption: string;
}> {
  const captioningServerUrl = import.meta.env
    .VITE_VISION_ENCODER_CAPTIONING_SERVER_URL;

  const formData = new FormData();
  formData.append("file", file);

  if (!captioningServerUrl || captioningServerUrl?.length === 0) {
    return {
      caption: "Sorry, model is not available now :( Please try later!",
    };
  }

  const response = await axios.post<{ caption: string }>(
    captioningServerUrl,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}
