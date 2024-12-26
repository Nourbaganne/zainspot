// config/formFieldsConfig.ts
export const personalInfoFields = [
  { labelKey: 'register_first_name_label', name: 'name', type: 'text' },
  { labelKey: 'register_middle_name_label', name: 'middleName', type: 'text' },
  { labelKey: 'register_last_name_label', name: 'lastName', type: 'text' },
];

export const businessInfoFields = [
  { labelKey: 'register_email_label', name: 'email', type: 'email', placeholder: 'example@mail.com' },
];

export const genderOptions = [
  { value: 'male', labelKey: 'register_gender_male_label' },
  { value: 'female', labelKey: 'register_gender_female_label' },
];

export const businessTypeOptions = [
  { value: 'agriculture', label: 'business_agriculture' },
  { value: 'automotive', label: 'business_automotive' },
  { value: 'construction', label: 'business_construction' },
  { value: 'education', label: 'business_education' },
  { value: 'finance', label: 'business_finance' },
  { value: 'healthcare', label: 'business_healthcare' },
  { value: 'hospitality', label: 'business_hospitality' },
  { value: 'information_technology', label: 'business_information_technology' },
  { value: 'manufacturing', label: 'business_manufacturing' },
  { value: 'media_entertainment', label: 'business_media_entertainment' },
  { value: 'real_estate', label: 'business_real_estate' },
  { value: 'retail', label: 'business_retail' },
  { value: 'telecommunications', label: 'business_telecommunications' },
  { value: 'transportation_logistics', label: 'business_transportation_logistics' },
  { value: 'utilities_energy', label: 'business_utilities_energy' },
  { value: 'wholesale_trade', label: 'business_wholesale_trade' },
];