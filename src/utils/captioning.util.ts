export async function getCaption({ imgUrl }: { imgUrl: string }): Promise<{
  caption: string;
}> {
  const captioningUrl = import.meta.env.VITE_CAPTIONING_SERVER_URL;

  // delay 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!captioningUrl || captioningUrl?.length === 0) {
    return { caption: "Lorem ipsum" };
  }

  const response = await fetch(captioningUrl, {
    method: "POST",
    body: JSON.stringify({
      imageUrl: imgUrl,
    }),
  });

  const data = await response.json();

  return data;
}
