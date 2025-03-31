import { FiUsers } from "react-icons/fi";

export const UsersNotFound = () => (
    <div className="flex flex-col items-center text-center my-auto">
        <FiUsers className="size-12 md:size-16 xl:size-18 mb-md" />
        <h3 className="text-lg md:text-xl xl:text-2xl font-bold mb-sm">
            Никого не найдено
        </h3>
        <h4 className="font-medium">Попробуйте изменить запрос</h4>
    </div>
);
