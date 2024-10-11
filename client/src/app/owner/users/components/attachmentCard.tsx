// components/AttachmentCard.tsx

import Translation from '@/app/components/translation';
import React from 'react';

interface Attachment {
  filename: string;
  content: string; // Base64 encoded string
}

interface AttachmentCardProps {
  attachments: Attachment[];
  setAttachments: React.Dispatch<React.SetStateAction<Attachment[]>>;
}

const AttachmentCard: React.FC<AttachmentCardProps> = ({ attachments, setAttachments }) => {
  const handleFileSelect = (file: File | null) => {
    if (file) {
      // Validate file size (e.g., max 5MB)
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      if (file.size > MAX_FILE_SIZE) {
        alert('File size exceeds the 5MB limit.');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1]; // Remove data prefix
        setAttachments([...attachments, { filename: file.name, content: base64 }]);
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        alert('Failed to read file.');
      };
    }
  };

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  return (
    <div className='col-span-2 flex flex-col p-8 gap-2 border bg-background h-full'>
      <div className='flex justify-between text-span px-6'>
        <h1 className='text-semibold-18 font-semibold'>
          <Translation translationKey='emailAttachment_header' />
          ({attachments.length})
        </h1>
        <label
          htmlFor='file-upload'
          className='cursor-pointer bg-primary text-white px-2 py-1 rounded'
        >
          +
        </label>
        <input
          id='file-upload'
          type='file'
          accept='*/*'
          className='hidden'
          multiple
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              Array.from(files).forEach(file => handleFileSelect(file));
            }
          }}
        />
      </div>
      <div className='px-6'>
        {attachments.map((file, index) => (
          <div key={index} className='flex justify-between items-center mb-2'>
            <span>{file.filename}</span>
            <button
              type='button'
              onClick={() => removeAttachment(index)}
              className='text-red-500'
            >
              <Translation translationKey='emailAttachment_remove' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttachmentCard;
