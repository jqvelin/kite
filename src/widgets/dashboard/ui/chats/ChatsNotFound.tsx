import { FiMessageSquare } from "react-icons/fi";

export const ChatsNotFound = () => (
    <div className="flex flex-col items-center text-center my-auto">
        <FiMessageSquare className="size-12 md:size-16 xl:size-18 mb-md" />
        <h3 className="text-lg md:text-xl xl:text-2xl font-bold mb-sm">
            Чаты не найдены
        </h3>
        <h4 className="font-medium">
            Вы можете найти собеседников во вкладке &quot;Люди&quot;
        </h4>
    </div>
);
