import React, { FC, useState } from 'react';
import Image from 'next/image';
import closeIcon from '@/app/assets/owner/locations/close.svg';
import { PerMonth, useAddCity } from '@/app/lib/addCity';
import { Input } from '@/app/register/components/input';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Translation from '@/app/components/translation';

interface DialogProps {
  onClose: () => void;
  isOpen: boolean;
}

const Dialog: FC<DialogProps> = ({ onClose, isOpen }) => {
  if (!isOpen) return null;

  const [activeDuration, setActiveDuration] = useState<number | null>(null);
  const formik = useAddCity();

  const durations = [
    { label: 'locationDialog_duration_perYear', value: 12 },
    { label: 'locationDialog_duration_per6months', value: 6 },
    { label: 'locationDialog_duration_per3months', value: 3 },
    { label: 'locationDialog_duration_permonth', value: 1 },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-5xl relative shadow-lg">
        <button onClick={onClose} className="absolute top-3 right-3">
          <Image src={closeIcon} alt="close" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">
          <Translation translationKey='locationDialog_header' />
        </h2>
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="flex flex-col border-r pr-6 gap-4">
            {/* Location Info */}
            <div className='flex flex-col gap-7'>
              <h1 className="font-semibold">
                <Translation translationKey='locationDialog_info' />
              </h1>
              <Input
                type="text"
                labelKey="locationDialog_info_city"
                value={formik.values.city}
                name="city"
                handleChange={formik.handleChange}
                touched={formik.touched.city}
                errors={formik.errors.city}
                formik={formik}
              />
              <Input
                type="text"
                labelKey="locationDialog_info_country"
                value={formik.values.country}
                name="country"
                handleChange={formik.handleChange}
                touched={formik.touched.country}
                errors={formik.errors.country}
                formik={formik}
              />
              <Input
                type="textarea"
                labelKey="locationDialog_info_description"
                value={formik.values.description}
                name="description"
                handleChange={formik.handleChange}
                touched={formik.touched.description}
                errors={formik.errors.description}
                formik={formik}
              />
            </div>
            {/* Location Emplacement */}
            <h1 className="font-semibold mb-2">
              <Translation translationKey='locationDialog_emplacement' />
            </h1>
            <Input
              type="text"
              labelKey="locationDialog_emplacement_title"
              value={formik.values.location?.title || ''}
              name="location.title"
              handleChange={formik.handleChange}
              touched={formik.touched.location?.title}
              errors={formik.errors.location?.title}
              formik={formik}
            />
            <div className="flex gap-4">
              <Input
                type="number"
                labelKey="locationDialog_emplacement_posx"
                value={formik.values.location?.posx || ''}
                name="location.posx"
                handleChange={formik.handleChange}
                touched={formik.touched.location?.posx}
                errors={formik.errors.location?.posx}
                formik={formik}
              />
              <Input
                type="number"
                labelKey="locationDialog_emplacement_posy"
                value={formik.values.location?.posy || ''}
                name="location.posy"
                handleChange={formik.handleChange}
                touched={formik.touched.location?.posy}
                errors={formik.errors.location?.posy}
                formik={formik}
              />
            </div>
          </div>

          {/* ZS Gold & Classic */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold mb-2">
                <Translation translationKey='locationDialog_gold' />
              </h1>
              <div className="flex gap-4">
                <Input
                  type="number"
                  labelKey="locationDialog_amount"
                  value={formik.values.goldPrice?.value || ''}
                  name="goldPrice.value"
                  handleChange={formik.handleChange}
                  touched={formik.touched.goldPrice?.value}
                  errors={formik.errors.goldPrice?.value}
                  formik={formik}
                />
                <Input
                  type="number"
                  labelKey="locationDialog_tax"
                  value={formik.values.goldPrice?.tax || ''}
                  name="goldPrice.tax"
                  handleChange={formik.handleChange}
                  touched={formik.touched.goldPrice?.tax}
                  errors={formik.errors.goldPrice?.tax}
                  formik={formik}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold mb-2">
                <Translation translationKey='locationDialog_classic' />
              </h3>
              <div className="flex flex-col gap-4">
                {durations.map((duration, index) => (
                  <div key={index} className="border rounded-lg">
                    <button
                      type="button"
                      onClick={() => setActiveDuration(prev => (prev === duration.value ? null : duration.value))}
                      className="flex justify-between items-center p-4 w-full bg-gray-100 rounded-lg"
                    >
                      <span className="font-semibold text-primary">
                        <Translation translationKey={duration.label} /></span>
                      {activeDuration === duration.value ? (
                        <FaChevronUp className="text-primary" />
                      ) : (
                        <FaChevronDown className="text-primary" />
                      )}
                    </button>
                    {activeDuration === duration.value && (
                      <div className="p-4 border-t">
                        <div className="flex gap-4">
                          <Input
                            type="number"
                            labelKey="locationDialog_amount"
                            value={formik.values.classicPrice.perMonth[index]?.amount || ''}
                            name={`classicPrice.perMonth.${index}.amount`}
                            handleChange={formik.handleChange}
                            touched={formik.touched.classicPrice?.perMonth?.[index]?.amount}
                            errors={
                              typeof formik.errors.classicPrice?.perMonth?.[index] === 'object'
                                ? formik.errors.classicPrice?.perMonth?.[index]?.amount
                                : undefined
                            }
                            formik={formik}
                          />
                          <Input
                            type="number"
                            labelKey="locationDialog_tax"
                            value={formik.values.classicPrice.perMonth[index]?.tax || ''}
                            name={`classicPrice.perMonth.${index}.tax`}
                            handleChange={formik.handleChange}
                            touched={formik.touched.classicPrice?.perMonth?.[index]?.tax}
                            errors={
                              typeof formik.errors.classicPrice?.perMonth?.[index] === 'object'
                                ? formik.errors.classicPrice?.perMonth?.[index]?.tax
                                : undefined
                            }
                            formik={formik}
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
            {/* Image Upload */}
            <div>
              <label htmlFor="city-image" className="block font-semibold mb-2">
                <Translation translationKey='locationDialog_img' />
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  name="city-image"
                  className="hidden"
                  id="city-image"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    if (file) {
                      formik.setFieldValue('imageUrl', file); // Set the File object
                    }
                  }}
                />
                <label
                  htmlFor="city-image"
                  className="cursor-pointer inline-block py-2 px-4 bg-primary text-white rounded-lg"
                >
                  <Translation translationKey='locationDialog_img_btn' />
                </label>
                {formik.values.imageUrl && formik.values.imageUrl instanceof File && (
                  <span className="ml-4 text-primary">
                    {formik.values.imageUrl.name}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="py-2 px-8 bg-primary text-white rounded-lg">
                <Translation translationKey='locationDialog_submit' />
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Dialog;
