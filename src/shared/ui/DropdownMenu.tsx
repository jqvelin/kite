"use client";

// TODO: адаптировать под триггеры, расположенные внизу вьюпорта,
// чтобы меню распологалось сверху элемента.
import React, {
    ComponentPropsWithRef,
    PropsWithChildren,
    ReactNode,
    RefObject,
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
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
            <div className="relative w-fit">{children}</div>
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

type DropdownMenuContentProps = {
    children: ReactNode;
    unmountOnClick?: boolean;
};

const DropdownMenuContent = ({
    children,
    unmountOnClick = true
}: DropdownMenuContentProps) => {
    const { isOpen, setIsOpen } = useDropdownMenu();
    const dropdownMenuContentRef = useRef<HTMLUListElement>(null);

    useLayoutEffect(() => {
        const dropdownMenuContent = dropdownMenuContentRef.current;
        if (!dropdownMenuContent) return;

        // overflow handling

        const metrics = dropdownMenuContent.getBoundingClientRect();

        // when element is stuck to right

        const overflowRight =
            metrics.right - document.documentElement.offsetWidth;

        if (overflowRight > 0) {
            dropdownMenuContent.style.transform = `translateX(-${overflowRight + 3}px)`;
        }

        // stuck to left
        const overflowLeft = -metrics.left;

        if (overflowLeft > 0) {
            dropdownMenuContent.style.transform = `translateX(${overflowLeft + 3}px)`;
        }

        // overflows at bottom
        const overflowsBottom =
            document.documentElement.offsetHeight < metrics.bottom;

        if (overflowsBottom) {
            dropdownMenuContent.style.transform =
                dropdownMenuContent.style.transform + ` translateY(-200%)`;
        }

        // endof overflow handling

        const controller = new AbortController();
        const buttons =
            dropdownMenuContentRef.current?.querySelectorAll("button");

        // Пока меню не открыто, его содержимое (чаще всего - кнопки)
        // не должно быть фокусируемым.
        if (isOpen) {
            document.addEventListener(
                "click",
                () => {
                    if (unmountOnClick) setIsOpen(false);
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
    }, [isOpen, setIsOpen, unmountOnClick]);

    return (
        <Transition
            nodeRef={dropdownMenuContentRef}
            in={isOpen}
            timeout={400}
            mountOnEnter
            unmountOnExit
        >
            {(state) => (
                <DropdownMenuInnerContent
                    ref={dropdownMenuContentRef}
                    state={state}
                >
                    {children}
                </DropdownMenuInnerContent>
            )}
        </Transition>
    );
};

const DropdownMenuInnerContent = ({
    ref,
    state,
    children
}: {
    ref: RefObject<HTMLUListElement | null>;
    state: TransitionStatus;
    children: ReactNode;
}) => {
    const { isOpen } = useDropdownMenu();
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);
    return (
        <ul
            ref={ref}
            className={[
                "flex flex-col bg-background border-2 p-sm absolute left-1/2 -translate-x-1/2 rounded-sm transition-all z-(--z-dropdown-menu)",
                DROPDOWN_MENU_TRANSITION_STATE_CLASSNAMES[state]
            ].join(" ")}
        >
            {children}
        </ul>
    );
};

const DropdownMenuItem = ({ children }: { children: ReactNode }) => (
    <li className="[&:not(:last-child)]:border-b-2 py-sm [&:first-child]:pt-0 [&:last-child]:pb-0">
        {children}
    </li>
);

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
