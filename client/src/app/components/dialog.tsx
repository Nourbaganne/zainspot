import close from "@/app/assets/register/close-outline.svg"
import Image from "next/image";
import { handleEmailVerification } from "../lib/email-verification";


interface DialogProps {
    email:string | undefined,
    isOpenDialog: boolean;
    setIsOpenDialog: (isOpen: boolean) => void;
}

const Dialog = ({email, isOpenDialog, setIsOpenDialog }: DialogProps) => {
    if (!isOpenDialog) return null;

    const handleClose = () => {
        setIsOpenDialog(false);
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-5 md:px-0 "
            onClick={handleClose}
        >
            <div
                className="relative bg-white p-8 rounded-lg shadow-md max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2"
                    onClick={handleClose}
                >
                    <Image src={close} alt="close-dialog" />
                </button>
                <h1 className="text-center text-2xl font-semibold mb-4 text-primary" >
                    Email Verification
                </h1>
                <p className="text-gray-600 mb-4 flex flex-col">
                An email has been sent to verify your account. Please check your inbox. If you didn&apos;t receive it,
                 <span 
                 className='underline text-secondary cursor-pointer'
                 onClick={() => handleEmailVerification(email, setIsOpenDialog)}
                 >click here to resend the email.</span> </p>
            </div>
        </div>
    );
};

export default Dialog;
