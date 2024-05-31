'use client';
import React, { Suspense } from 'react';
import AddAddressForm from '../components/AddressForm';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddAddressForm />
    </Suspense>
  );
};

export default Page;
