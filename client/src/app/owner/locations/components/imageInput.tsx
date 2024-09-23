import uploadLogo from '@/app/assets/owner/locations/image-upload.svg';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

interface ImageInputProps {
    onFileSelect: (file: File | null) => void;
    selectedFile?: string;
    value: File | string | null; 
}

const ImageInput: React.FC<ImageInputProps> = ({ onFileSelect, selectedFile, value }) => {
    const [file, setFile] = useState<string | undefined>();
    const [fileEnter, setFileEnter] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (value && typeof value === 'string') {
            setFile(value);
        } else if (value instanceof File) {
            const blobUrl = URL.createObjectURL(value);
            setFile(blobUrl);
            return () => URL.revokeObjectURL(blobUrl); 
        } else {
            setFile(undefined);
        }
    }, [value]);

    const handleFileChange = (files: FileList | null) => {
        if (files && files[0]) {
            const selectedFile = files[0];
            const blobUrl = URL.createObjectURL(selectedFile);
            setFile(blobUrl);
            onFileSelect(selectedFile);
        }
    };

    return (
        <div className="container px-4">
            {!file ? (
                <div>
                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            setFileEnter(true);
                        }}
                        onDragLeave={() => setFileEnter(false)}
                        onDragEnd={(e) => {
                            e.preventDefault();
                            setFileEnter(false);
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            setFileEnter(false);
                            if (e.dataTransfer.items) {
                                const item = e.dataTransfer.items[0];
                                if (item.kind === "file") {
                                    handleFileChange(e.dataTransfer.files);
                                }
                            }
                        }}
                        className={`${fileEnter ? "border-4" : "border-2"} bg-white flex flex-col h-64 border-dashed rounded-xl items-center justify-center`}
                    >
                        <div className="h-full flex flex-col justify-center items-center gap-3">
                            <Image src={uploadLogo} alt='upload-image' />
                            <h1 className='text-xs font-semibold text-text-base'>
                                Choose a file or drag & drop it here
                            </h1>
                            <span className='font-light text-button-foreground text-sm'>
                                PDF, DOCX, PPTX, PNG and JPEG formats, up to 50MB
                            </span>
                            <label
                                htmlFor="file"
                                className="cursor-pointer mt-4 border-2 rounded-md border-button text-button text-xs font-semibold p-3"
                            >
                                Browse Files
                            </label>
                        </div>
                        <input
                            id="file"
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileChange(e.target.files)}
                            ref={fileInputRef}
                        />
                    </div>
                </div>
            ) : (
                <div className="relative flex flex-col items-center">
                    <img
                        className="rounded-2xl w-full max-h-60"
                        src={file}
                        alt="Selected file preview"
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                        <label htmlFor="file"
                            className="border-2 cursor-pointer rounded-md border-white text-white text-xs font-semibold p-3"
                            style={{
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundBlendMode: 'darken',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            }}>
                            Replace Image
                        </label>
                        <input
                            id="file"
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileChange(e.target.files)}
                            ref={fileInputRef}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageInput;
