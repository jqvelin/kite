"use client";

import { FocusTrap } from "focus-trap-react";
import {
    ComponentPropsWithRef,
    PropsWithChildren,
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";
import { Transition, TransitionStatus } from "react-transition-group";

import { useEvent } from "../hooks";

const KEYDOWN_EVENT_CONSTRAINTS = { key: "Escape" };

type DialogContextType = {
    isOpen: boolean;
    setIsOpen: (nextIsOpen: boolean) => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

const useDialog = () => {
    const context = useContext(DialogContext);

    if (!context) {
        throw new Error(
            "Dialog context was not found. Make sure all the menu elements are wrapped in <Dialog>"
        );
    }

    return context;
};

const Dialog = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    const closeDialog = useCallback(() => setIsOpen(false), []);

    useEvent<KeyboardEvent>("keydown", closeDialog, KEYDOWN_EVENT_CONSTRAINTS);

    return (
        <DialogContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </DialogContext.Provider>
    );
};

const DIALOG_OVERLAY_TRANSITION_STATE_CLASSNAMES: {
    [key in TransitionStatus]: string;
} = {
    entering: "opacity-100",
    entered: "opacity-100",

    exiting: "opacity-0",
    exited: "opacity-0",
    unmounted: ""
};

const DIALOG_CONTENT_TRANSITION_STATE_CLASSNAMES: {
    [key in TransitionStatus]: string;
} = {
    entering: "scale-100 opacity-100",
    entered: "scale-100 opacity-100",
    exiting: "scale-95 opacity-0",
    exited: "scale-95 opacity-0",
    unmounted: ""
};

const DialogContent = ({ children }: { children: ReactNode }) => {
    const { isOpen } = useDialog();

    const dialogOverlayRef = useRef<HTMLDivElement>(null);
    const dialogContentRef = useRef<HTMLDialogElement>(null);

    return (
        <Transition
            nodeRef={dialogOverlayRef}
            in={isOpen}
            timeout={400}
            mountOnEnter
            unmountOnExit
        >
            {(state) => (
                <DialogOverlay
                    ref={dialogOverlayRef}
                    className={
                        DIALOG_OVERLAY_TRANSITION_STATE_CLASSNAMES[state]
                    }
                >
                    <Transition
                        timeout={400}
                        nodeRef={dialogContentRef}
                        in={isOpen}
                    >
                        <dialog
                            ref={dialogContentRef}
                            role="dialog"
                            className={[
                                "min-w-11/12 md:min-w-5/12 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-h-7/12 bg-background rounded-md flex flex-col transition-all p-md",
                                DIALOG_CONTENT_TRANSITION_STATE_CLASSNAMES[
                                    state
                                ]
                            ].join(" ")}
                        >
                            {children}
                        </dialog>
                    </Transition>
                </DialogOverlay>
            )}
        </Transition>
    );
};

// DialogHeader должен присутствовать в DialogContent
// до остального контента.
// TODO: переход на React.Children для рендера вложенных компонентов
// в свои слоты всегда, при отсутствии или наличии других.
type DialogHeaderProps = PropsWithChildren<ComponentPropsWithRef<"div">>;

const DialogHeader = ({ children, ...props }: DialogHeaderProps) => {
    const { setIsOpen } = useDialog();

    return (
        <div className="flex items-center justify-between mb-md">
            <DialogTitle {...props}>{children}</DialogTitle>
            <button
                onClick={() => setIsOpen(false)}
                aria-label="Закрыть"
            >
                <CgClose size="1.125rem" />
            </button>
        </div>
    );
};

type DialogTitleProps = PropsWithChildren<ComponentPropsWithRef<"p">>;

const DialogTitle = ({ children, className, ...props }: DialogTitleProps) => (
    <p
        className={["font-semibold md:text-md lg:text-lg", className].join(" ")}
        {...props}
    >
        {children}
    </p>
);

type DialogOverlayProps = PropsWithChildren<ComponentPropsWithRef<"div">>;

const DialogOverlay = ({
    children,
    ref,
    className,
    ...props
}: DialogOverlayProps) => {
    const { setIsOpen } = useDialog();

    useEffect(() => {
        if (!ref || typeof ref === "function" || !ref.current) return;

        const controller = new AbortController();

        ref.current.addEventListener(
            "click",
            (e) => {
                if (e.target === ref.current) {
                    setIsOpen(false);
                }
            },
            controller
        );

        return () => controller.abort();
    }, [ref, setIsOpen]);

    return createPortal(
        <FocusTrap>
            <div
                className={[
                    "fixed w-full h-full top-0 left-0 bg-black/60 flex items-center justify-center transition-opacity z-(--z-dialog)",
                    className
                ].join(" ")}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        </FocusTrap>,
        document.body
    );
};

type DialogTriggerProps = PropsWithChildren<ComponentPropsWithRef<"button">>;

const DialogTrigger = (props: DialogTriggerProps) => {
    const { isOpen, setIsOpen } = useDialog();

    return (
        <button
            onClick={() => setIsOpen(!isOpen)}
            {...props}
        >
            {props.children}
        </button>
    );
};

export { Dialog, DialogTrigger, DialogContent, DialogHeader };
