// components/InfoCard.tsx

import Translation from '@/app/components/translation';
import React from 'react';

interface InfoCardProps {
  formData: {
    from: string;
    to: string;
    cc: string;
    bcc: string;
    subject: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    from: string;
    to: string;
    cc: string;
    bcc: string;
    subject: string;
  }>>;
  email: string;
}

const INFOCARD_FORM = [
  { label: 'From', placeholder: 'ZainSpot Support' },
  { label: 'To', placeholder: 'John Doe' },
  { label: 'CC', placeholder: '---' },
  { label: 'BCC', placeholder: '---' },
  { label: 'Subject', placeholder: '---' },
];

const InfoCard: React.FC<InfoCardProps> = ({ formData, setFormData, email }) => {
  return (
    <div className='col-span-3 flex flex-col p-8 gap-4 bg-background border'>
      {INFOCARD_FORM.map((item, key) => (
        <div key={key} className='grid grid-cols-7 items-center'>
          <label htmlFor={item.label} className='text-sm text-span col-span-2 capitalize'>
            <Translation translationKey={item.label} />
          </label>
          <input
            type="text"
            name={item.label.toLowerCase()}
            id={item.label}
            placeholder={item.label === 'To' ? email : item.placeholder}
            value={formData[item.label.toLowerCase() as keyof typeof formData]}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className='border p-2 text-sm rounded-md w-full col-span-5'
          />
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
