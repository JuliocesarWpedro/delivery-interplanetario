import React from 'react';
import { useCart } from '../context/CartContext';
import { Address } from '../types/Address';
import { useRouter } from 'next/navigation';

const AddressComponent: React.FC<{ address: Address }> = ({ address }) => {
  const { handleDeleteItem } = useCart();
  const { replace } = useRouter();

  const navigationToEdit = (id: number) => {
    replace(`/editAddress/${id}`);
  };

  return (
    <div key={address.id} className="mb-4 bg-gray-100 sm:p-4 rounded-lg">
      <div className="flex items-center mb-2">
        {address.planet && (
          <h3 className="text-lg font-bold rounded-lg py-2 capitalize bg-indigo-100 px-5">
            {address.planet}
          </h3>
        )}
      </div>
      <div>
        {address.fullName && (
          <h4 className="text-2xl font-bold">{address.fullName}</h4>
        )}
        {address.mobilePhone && (
          <p className="text-lg font-bold mt-3">{address.mobilePhone}</p>
        )}
        {address.city && (
          <p className="text-sm text-gray-400">
            {address.addressLine}, {address.country}, {address.city},{' '}
            {address.zipcode}
          </p>
        )}
        {address.batch && (
          <p className="text-sm text-gray-400">{address.batch}</p>
        )}
      </div>
      <div className="mt-2 flex flex-col gap-5 sm:gap-0 sm:flex-row">
        <button
          onClick={() => navigationToEdit(address.id)}
          className="bg-white w-full sm:w-fit  outline-none border border-zinc-900 text-black font-bold py-2 px-8 rounded-lg mr-2"
        >
          Edit address
        </button>

        <button
          onClick={() => handleDeleteItem(address.id)}
          className="bg-white w-full sm:w-fit outline-none border border-zinc-900 text-black font-bold py-2 px-8 rounded-lg"
        >
          Delete address
        </button>
      </div>
    </div>
  );
};

export default AddressComponent;
