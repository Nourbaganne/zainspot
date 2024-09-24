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
  { value: 'business1', label: 'Business 1' },
  { value: 'business2', label: 'Business 2' },
  { value: 'business3', label: 'Business 3' },
];

export const interestRegionOptions = [
  { value: 'region1', label: 'Region 1' },
  { value: 'region2', label: 'Region 2' },
  { value: 'region3', label: 'Region 3' },
];
