import Image from "next/image";

export default function Page() {
    return (
        <div className="flex items-center justify-center gap-sm">
            <Image
                src="/kite.gif"
                width={200}
                height={200}
                alt="Flying Kite"
                className="hidden md:inline"
            />
            <div className="w-80 h-80 rounded-lg shadow-md grid bg-background place-items-center p-md">
                <div className="flex items-center">
                    <h1 className="font-semibold">Добро пожаловать в Kite!</h1>
                    <Image
                        src="/kite.gif"
                        width={32}
                        height={32}
                        alt="Flying Kite"
                        className="md:hidden"
                    />
                </div>
            </div>
        </div>
    );
}
