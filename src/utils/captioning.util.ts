export async function getCaption({ imgUrl }: { imgUrl: string }): Promise<{
  caption: string;
}> {
  const captioningUrl = import.meta.env.VITE_CAPTIONING_SERVER_URL;

  if (!captioningUrl || captioningUrl?.length === 0) {
    return { caption: "Lorem ipsum" };
  }

  const response = await fetch(captioningUrl, {
    method: "POST",
    body: JSON.stringify({
      imageUrl: imgUrl,
    }),
  });

  const caption = await response.json();

  return { caption };
}
