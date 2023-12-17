import { IMessage } from "../types";

export function getConversationFromLocalStorage(): IMessage[] {
  const conversation = localStorage.getItem("conversation");

  try {
    if (conversation) {
      return JSON.parse(conversation);
    }

    console.log("conversation", conversation);

    return [];
  } catch (error) {
    return [];
  }
}

export function addMessagesToConversation(messages: IMessage[]) {
  const conversation = getConversationFromLocalStorage();

  conversation.push(...messages);

  localStorage.setItem("conversation", JSON.stringify(conversation));
}
