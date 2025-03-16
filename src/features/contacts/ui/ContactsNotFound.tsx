import { FiUsers } from "react-icons/fi";

export const ContactsNotFound = () => (
    <div className="flex flex-col items-center text-center my-auto">
        <FiUsers className="size-12 md:size-16 xl:size-18 mb-md" />
        <h3 className="text-lg md:text-xl xl:text-2xl font-bold mb-sm">
            Нет контактов
        </h3>
        <h4 className="font-medium">
            Найдите собеседников с помощью поиска сверху
        </h4>
    </div>
);
