export const ChatWindow = () => {
    return <ChatUnselectedMessage />;
};

export const ChatUnselectedMessage = () => (
    <div className="flex-1 bg-background h-full rounded-lg shadow-lg md:flex flex-col items-center justify-center text-center hidden">
        <h1 className="text-accent md:text-xl font-bold mb-sm">
            Добро пожаловать в Kite!
        </h1>
        <h2 className="font-semibold">
            Выберите чат или начните новую переписку
        </h2>
    </div>
);
