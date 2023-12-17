import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";

export function getFileUrlFromFileName(fileName: string) {
  const firebaseBucket = import.meta.env.VITE_FIREBASE_BUCKET;

  const url = `https://firebasestorage.googleapis.com/v0/b/${firebaseBucket}.appspot.com/o/${fileName}?alt=media`;

  return url;
}

export const sendFileToStorage = async ({
  file,
  onSuccess,
  onError,
}: {
  file: File;
  onSuccess?: (fileUrl: string) => void;
  onError?: (error: Error) => void;
}) => {
  try {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}_${
      currentDate.getMonth() + 1
    }_${currentDate.getFullYear()}_${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}-${currentDate.getMilliseconds()}`;

    const fileName = `IMG-${formattedDate}`;
    const _file = new File([file], fileName, { type: "image/jpeg" });
    const storageRef = ref(storage);
    const fileRef = ref(storageRef, fileName);

    await uploadBytes(fileRef, _file);
    const fileUrl = getFileUrlFromFileName(fileName);

    return fileUrl;
  } catch (error) {
    onError && onError(error as Error);
  }
};
