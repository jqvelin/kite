"use client";

// TODO: адаптировать под триггеры, расположенные внизу вьюпорта,
// чтобы меню распологалось сверху элемента.
import {
    ComponentPropsWithRef,
    PropsWithChildren,
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import { Transition, TransitionStatus } from "react-transition-group";

type DropdownMenuContextType = {
    isOpen: boolean;
    setIsOpen: (nextIsOpen: boolean) => void;
};

const DropdownMenuContext = createContext<DropdownMenuContextType | null>(null);

const useDropdownMenu = () => {
    const dropdownMenuContext = useContext(DropdownMenuContext);

    if (!dropdownMenuContext) {
        throw new Error(
            "Dropdown Menu context was not found. Make sure all the menu elements are wrapped in <DropdownMenu />"
        );
    }

    return dropdownMenuContext;
};

const DropdownMenu = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
            <div className="relative">{children}</div>
        </DropdownMenuContext.Provider>
    );
};

const DROPDOWN_MENU_TRANSITION_STATE_CLASSNAMES: {
    [key in TransitionStatus]: string;
} = {
    entering: "opacity-100 scale-100",
    entered: "opacity-100 scale-100",
    exiting: "opacity-0 scale-95",
    exited: "opacity-0 scale-95",
    unmounted: "opacity-0 scale-95"
};

const DropdownMenuContent = ({ children }: { children: ReactNode }) => {
    const dropdownMenuContentRef = useRef<HTMLUListElement>(null);
    const { isOpen, setIsOpen } = useDropdownMenu();

    useEffect(() => {
        const controller = new AbortController();
        const buttons =
            dropdownMenuContentRef.current?.querySelectorAll("button");

        // Пока меню не открыто, его содержимое (чаще всего - кнопки)
        // не должно быть фокусируемым.
        if (isOpen) {
            document.addEventListener(
                "click",
                () => {
                    setIsOpen(false);
                    buttons?.forEach((button) =>
                        button.removeAttribute("disabled")
                    );
                },
                controller
            );
        } else {
            buttons?.forEach((button) => button.setAttribute("disabled", ""));
            controller.abort();
        }

        return () => {
            buttons?.forEach((button) => button.removeAttribute("disabled"));
            controller.abort();
        };
    }, [isOpen]);

    return (
        <Transition
            nodeRef={dropdownMenuContentRef}
            in={isOpen}
            timeout={400}
            mountOnEnter
            unmountOnExit
        >
            {(state) => (
                <ul
                    ref={dropdownMenuContentRef}
                    className={[
                        "flex flex-col bg-background border-2 p-sm absolute left-1/2 rounded-sm -translate-x-1/2 transition-all z-1",
                        DROPDOWN_MENU_TRANSITION_STATE_CLASSNAMES[state]
                    ].join(" ")}
                >
                    {children}
                </ul>
            )}
        </Transition>
    );
};

const DropdownMenuItem = ({ children }: { children: ReactNode }) => {
    return (
        <li className="[&:not(:last-child)]:border-b-2 py-sm [&:first-child]:pt-0 [&:last-child]:pb-0">
            {children}
        </li>
    );
};

type DropdownMenuTriggerProps = PropsWithChildren<
    ComponentPropsWithRef<"button">
>;

const DropdownMenuTrigger = (props: DropdownMenuTriggerProps) => {
    const { isOpen, setIsOpen } = useDropdownMenu();
    const dropdownTriggerRef = useRef<HTMLButtonElement>(null);

    return (
        <button
            ref={dropdownTriggerRef}
            onClick={() => setIsOpen(!isOpen)}
            {...props}
        >
            {props.children}
        </button>
    );
};

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
};
