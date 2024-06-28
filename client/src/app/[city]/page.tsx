'use client';

import { useRouter } from 'next/router';

const CityDetails = ({ params }: { params: { city: string } }) => {
  const title = params.city;
  

  return <h2>This is {title} </h2>;
};

export default CityDetails;
