import { type User } from "@/entities/user";
import { type Chat } from "@/features/chats";
import { api } from "@/shared/api";

export const getChats = (userId: User["id"]) =>
    api.get<Chat[]>("chats", { searchParams: { memberId: userId } }).json();
