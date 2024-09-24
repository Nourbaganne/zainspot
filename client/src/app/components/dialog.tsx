import close from "@/app/assets/register/close-outline.svg";
import Image from "next/image";
import { handleEmailVerification } from "../lib/email-verification";
import { useRouter } from "next/navigation";

interface DialogProps {
    email: string | undefined;
    isOpenDialog: boolean;
    setIsOpenDialog: (isOpen: boolean) => void;
}

const Dialog = ({ email, isOpenDialog, setIsOpenDialog }: DialogProps) => {
    const router = useRouter()
    
    if (!isOpenDialog) return null;


    const handleClose = () => {
        setIsOpenDialog(false);
    };
    const handleRouting = () => {
        router.push('/login')
    }

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 px-5 md:px-0 transition-opacity duration-300 ease-in-out"
            onClick={handleClose}
        >
            <div
                className="relative bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full transform transition-transform duration-300 ease-in-out scale-100 hover:scale-105"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 focus:outline-none"
                    onClick={handleClose}
                >
                    <Image src={close} alt="close-dialog" width={24} height={24} />
                </button>
                <h1 className="text-center text-3xl font-bold mb-6 text-primary">
                    Verify Your Email
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 text-center">
                    We've sent a verification email to <span className="text-secondary font-semibold">{email}</span>. 
                    Please check your inbox to complete the verification process.
                    <br />
                    <span className="block mt-4">
                        Didn’t receive an email?
                        <span
                            className="underline text-secondary cursor-pointer font-medium hover:text-secondary-dark transition-colors"
                            onClick={() => handleEmailVerification(email, setIsOpenDialog)}
                        >
                            Click here to resend.
                        </span>
                    </span>
                </p>
                <div className="flex justify-center">
                    <button
                        className="bg-primary text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-primary-dark transition-transform duration-200 transform hover:scale-105 focus:outline-none"
                        onClick={handleRouting}
                    >
                        Go to Login Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
