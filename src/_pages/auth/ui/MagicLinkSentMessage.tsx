import Image from "next/image";

export const MagicLinkSentMessage = () => (
    <div className="flex items-center gap-sm flex-wrap">
        <Image
            width={300}
            height={150}
            src="/girl-flying-a-kite.avif"
            alt="Girl flying a kite"
        />
        <div>
            <h3 className="font-bold">Проверьте свою почту!</h3>
            <h4>Отправили ссылку для входа в аккаунт</h4>
        </div>
    </div>
);
