import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import closeIcon from '@/app/assets/owner/locations/close.svg';
import { useAddCity } from '@/app/lib/addCity';
import { Input } from '@/app/register/components/input';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Translation from '@/app/components/translation';
import ImageInput from './imageInput';
import { useEditCity } from '@/app/lib/editCity';

interface DialogProps {
  onClose: () => void;
  isOpen: boolean;
  isEdit?: boolean;
  id: number;
}

const Dialog: FC<DialogProps> = ({ onClose, isOpen, isEdit, id }) => {

  if (!isOpen) return null;

  
  const [activeDuration, setActiveDuration] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const formik = useEditCity({ id, onClose });
  const formikAddCity = useAddCity({onClose});

  useEffect(() => {
    const formikInstance = isEdit && id !== undefined ? formik : formikAddCity;

    if (formikInstance.values.imageUrl instanceof File) {
      const url = URL.createObjectURL(formikInstance.values.imageUrl);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof formikInstance.values.imageUrl === 'string') {
      setImageUrl(formikInstance.values.imageUrl);
    } else {
      setImageUrl(undefined);
    }
  }, [formik.values.imageUrl, formikAddCity.values.imageUrl, isEdit, id]);

  const durations = [
    { label: 'locationDialog_duration_perYear', value: 12 },
    { label: 'locationDialog_duration_per6months', value: 6 },
    { label: 'locationDialog_duration_per3months', value: 3 },
    { label: 'locationDialog_duration_permonth', value: 1 },
  ];

  

  const formikInstance = isEdit && id !== undefined ? formik : formikAddCity;


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg py-6 px-9 w-full max-w-[120vh] relative shadow-lg">
        <div className="max-h-[80vh] overflow-y-auto">
          <button onClick={onClose} className="absolute top-3 right-3 p-2 border rounded-full">
            <Image src={closeIcon} alt="close" className='h-4 w-4' />
          </button>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center">
              <Translation translationKey='locationDialog_header' />
            </h2>
            <p className="text-span font-light text-center">
              To create a new location, fill in the information below
            </p>
            <form onSubmit={formikInstance.handleSubmit} >
              <div className='flex flex-col gap-4'>
                <div className="grid  grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col md:border-r md:pr-6 gap-4">
                    {/* Location Info */}
                    <div className="flex flex-col gap-7">
                      <h1 className="font-semibold text-sm">
                        <Translation translationKey='locationDialog_info' />
                      </h1>
                      <Input
                        type="text"
                        labelKey="locationDialog_info_city"
                        value={formikInstance.values.city}
                        placeholderValue="Enter country name... "
                        name="city"
                        handleChange={formikInstance.handleChange}
                        touched={formikInstance.touched.city}
                        errors={formikInstance.errors.city}
                        formik={formikInstance}
                      />
                      <Input
                        type="text"
                        labelKey="locationDialog_info_country"
                        placeholderValue="Enter city name... "
                        value={formikInstance.values.country}
                        name="country"
                        handleChange={formikInstance.handleChange}
                        touched={formikInstance.touched.country}
                        errors={formikInstance.errors.country}
                        formik={formikInstance}
                      />
                      <Input
                        type="textarea"
                        placeholderValue="Write down the city description"
                        labelKey="locationDialog_info_description"
                        value={formikInstance.values.description}
                        name="description"
                        handleChange={formikInstance.handleChange}
                        touched={formikInstance.touched.description}
                        errors={formikInstance.errors.description}
                        formik={formikInstance}
                        rows={7}
                      />
                      <Input
                        type="textarea"
                        placeholderValue="Get the global edge from this rich heritage with your ZainSpot Business Address!"
                        labelKey="locationDialog_info_catchphrase"
                        value={formikInstance.values.catchphrase}
                        name="catchphrase"
                        handleChange={formikInstance.handleChange}
                        touched={formikInstance.touched.catchphrase}
                        errors={formikInstance.errors.catchphrase}
                        formik={formikInstance}
                        rows={2}
                      />
                    </div>
                    {/* Location Emplacement */}
                    <h1 className="font-semibold text-sm mb-4">
                      <Translation translationKey="locationDialog_emplacement" />
                    </h1>
                    <div className='flex flex-col gap-6'>
                      <Input
                        type="textarea"
                        labelKey="locationDialog_emplacement_title"
                        value={formikInstance.values.location?.title || ''}
                        placeholderValue="write down the location address..."
                        name="location.title"
                        handleChange={formikInstance.handleChange}
                        touched={formikInstance.touched.location?.title}
                        errors={formikInstance.errors.location?.title}
                        formik={formikInstance}
                        rows={2}
                      />

                      <Input
                        type='text'
                        labelKey='locationDialog_emplacement_link'
                        placeholderValue='Location Link'
                        value={formikInstance.values.location.locationLink}
                        name='location.locationLink'
                        handleChange={formikInstance.handleChange}
                        touched={formikInstance.touched.location?.locationLink}
                        errors={formikInstance.errors.location?.locationLink}
                        formik={formikInstance}
                      />
                    </div>
                  </div>

                  {/* ZS Gold & Classic */}
                  <div className="flex flex-col gap-6">
                    <ImageInput
                      value={formikInstance.values.imageUrl}
                      onFileSelect={(file) => formikInstance.setFieldValue('imageUrl', file)}
                      selectedFile={imageUrl}
                    />

                    {formikInstance.errors.imageUrl && formikInstance.touched.imageUrl && (
                      <div className="text-red-500 text-sm">{formikInstance.errors.imageUrl}</div>
                    )}
                    <div className="flex flex-col gap-2">
                      <h1 className="font-semibold text-sm mb-2">
                        <Translation translationKey="locationDialog_gold" />
                      </h1>
                      <div className="flex flex-col md:flex-row gap-4 font-light">
                        <Input
                          type="number"
                          labelKey="locationDialog_amount"
                          value={formikInstance.values.goldPrice?.value || ''}
                          name="goldPrice.value"
                          handleChange={formikInstance.handleChange}
                          touched={formikInstance.touched.goldPrice?.value}
                          errors={formikInstance.errors.goldPrice?.value}
                          formik={formikInstance}
                        />
                        <Input
                          type="number"
                          labelKey="locationDialog_tax"
                          value={formikInstance.values.goldPrice?.tax || ''}
                          name="goldPrice.tax"
                          handleChange={formikInstance.handleChange}
                          touched={formikInstance.touched.goldPrice?.tax}
                          errors={formikInstance.errors.goldPrice?.tax}
                          formik={formikInstance}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-sm mb-2">
                        <Translation translationKey="locationDialog_classic" />
                      </h3>
                      <div className="flex flex-col gap-4">
                        {durations.map((duration, index) => (
                          <div key={index} className="border border-button rounded-lg overflow-hidden">
                            <button
                              type="button"
                              onClick={() => setActiveDuration(prev => (prev === duration.value ? null : duration.value))}
                              className="flex text-sm justify-between items-center p-4 w-full bg-background-foreground"
                            >
                              <span className="font-semibold text-description">
                                <Translation translationKey={duration.label} />
                              </span>
                              {activeDuration === duration.value ? (
                                <FaChevronUp className="text-description" />
                              ) : (
                                <FaChevronDown className="text-description" />
                              )}
                            </button>
                            {activeDuration === duration.value && (
                              <div className="p-4 border-t">
                                <div className="flex flex-col md:flex-row gap-4 font-light ">
                                  <Input
                                    type="number"
                                    labelKey="locationDialog_amount"
                                    value={formikInstance.values.classicPrice.perMonth[index]?.amount || ''}
                                    name={`classicPrice.perMonth.${index}.amount`}
                                    handleChange={formikInstance.handleChange}
                                    touched={formikInstance.touched.classicPrice?.perMonth?.[index]?.amount}
                                    errors={
                                      typeof formikInstance.errors.classicPrice?.perMonth?.[index] === 'object'
                                        ? formikInstance.errors.classicPrice?.perMonth?.[index]?.amount
                                        : undefined
                                    }
                                    formik={formikInstance}
                                  />
                                  <Input
                                    type="number"
                                    labelKey="locationDialog_tax"
                                    value={formikInstance.values.classicPrice.perMonth[index]?.tax || ''}
                                    name={`classicPrice.perMonth.${index}.tax`}
                                    handleChange={formikInstance.handleChange}
                                    touched={formikInstance.touched.classicPrice?.perMonth?.[index]?.tax}
                                    errors={
                                      typeof formikInstance.errors.classicPrice?.perMonth?.[index] === 'object'
                                        ? formikInstance.errors.classicPrice?.perMonth?.[index]?.tax
                                        : undefined
                                    }
                                    formik={formikInstance}
                                  />
                                  {/* Ensure duration is sent */}
                                  <input
                                    type="hidden"
                                    name={`classicPrice.perMonth.${index}.duration`}
                                    value={duration.value}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>


                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6 text-xs font-bold">
                  <button
                    type="button"
                    onClick={onClose}
                    className="py-3 px-4 border-2 border-button text-button-text  rounded-lg"
                  >
                    DISMISS
                  </button>
                  <button
                    type="submit"
                    className="py-3 px-4 bg-primary text-white rounded-lg"
                  >
                    {isEdit ? 'UPDATE LOCATION' : 'CREATE LOCATION'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
