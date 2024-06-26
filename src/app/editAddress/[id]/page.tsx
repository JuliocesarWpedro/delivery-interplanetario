'use client';
import { useCart } from '@/app/context/CartContext';
import React from 'react';
import { PiKeyReturnFill } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
const Address = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const id = Number(params.id);
  const { cartItems, updateCartItem } = useCart();
  const addressToEdit = cartItems.find((item) => item.id === id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    if (addressToEdit) {
      reset(addressToEdit);
    }
  }, [addressToEdit, reset]);

  const onSubmit = (data: any) => {
    updateCartItem(data);
    router.replace('/');
  };

  return (
    <div className="flex px-5 sm:px-8 md:px-15 lg:px-40 flex-col pt-20 bg-zinc-400 min-h-screen h-full pb-20 gap-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white text-black rounded-lg shadow-md p-6 max-w-[1000px] items-center mx-auto"
      >
        <div className="flex items-center mb-4 gap-3">
          <PiKeyReturnFill
            onClick={() => router.replace('/')}
            className="w-7 h-7 cursor-pointer"
          />
          <h1 className="text-2xl font-bold">Edit Address</h1>
        </div>
        <div className="mb-4">
          {addressToEdit && addressToEdit.planet && (
            <h3 className="text-4xl pt-10 font-bold capitalize">
              {addressToEdit.planet}
            </h3>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-5 w-full">
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full name *
            </label>
            <input
              type="text"
              id="fullName"
              {...register('fullName', { required: 'Full name is required' })}
              className="bg-white outline-none border border-zinc-900 text-zinc-600 py-2 px-8 rounded-lg mt-2 w-full"
              placeholder="Your name"
            />
            {errors.fullName && (
              <p className="text-red-700">
                {errors.fullName.message?.toString()}
              </p>
            )}
          </div>
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="mobilePhone"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile phone*
            </label>
            <input
              type="number"
              id="mobilePhone"
              {...register('mobilePhone', {
                required: 'Mobile phone is required',
              })}
              className="bg-white outline-none border border-zinc-900 text-zinc-600 py-2 px-8 rounded-lg mt-2 w-full"
              placeholder="999999999"
            />
            {errors.mobilePhone && (
              <p className="text-red-700">
                {errors.mobilePhone.message?.toString()}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          {addressToEdit && addressToEdit.planet === 'terra' ? (
            <>
              <label
                htmlFor="addressLine"
                className="block text-sm font-medium text-gray-700"
              >
                Address line *
              </label>
              <input
                type="text"
                id="addressLine"
                {...register('addressLine', {
                  required: 'Address line is required',
                })}
                placeholder="Add your description"
                className="bg-white outline-none border border-zinc-900 text-zinc-600 py-2 px-8 rounded-lg mt-2 w-full"
              />
              {errors.addressLine && (
                <p className="text-red-700">
                  {errors.addressLine.message?.toString()}
                </p>
              )}
            </>
          ) : (
            <>
              <label
                htmlFor="batch"
                className="block text-sm font-medium text-gray-700"
              >
                Batch (4 digits) *
              </label>
              <input
                type="text"
                id="batch"
                {...register('batch', {
                  required: 'Lote is required',
                  pattern: {
                    value: /^[0-9]{4}$/,
                    message: 'Address line must contain exactly 4 digits',
                  },
                })}
                placeholder="Batch (4 digits)"
                className="bg-white outline-none border border-zinc-900 text-zinc-600 py-2 px-8 rounded-lg mt-2 w-full"
              />
              {errors.batch && (
                <p className="text-red-700">
                  {errors.batch.message?.toString()}
                </p>
              )}
            </>
          )}
        </div>
        {addressToEdit && addressToEdit.planet === 'terra' && (
          <>
            <div className="flex gap-5 w-full mt-4">
              <div className="w-1/2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country *
                </label>
                <input
                  type="text"
                  id="country"
                  {...register('country', { required: 'Country is required' })}
                  className="bg-white outline-none border border-zinc-900 text-zinc-600 py-2 px-8 rounded-lg mt-2 w-full"
                  placeholder="Your country"
                />
                {errors.country && (
                  <p className="text-red-700">
                    {errors.country.message?.toString()}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State *
                </label>
                <input
                  type="text"
                  id="state"
                  {...register('state', { required: 'State is required' })}
                  className="bg-white outline-none border border-zinc-900 text-zinc-600 py-2 px-8 rounded-lg mt-2 w-full"
                  placeholder="Your State"
                />
                {errors.state && (
                  <p className="text-red-700">
                    {errors.state.message?.toString()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-5 w-full mt-4">
              <div className="w-1/2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  {...register('city', { required: 'City is required' })}
                  className="bg-white outline-none border border-zinc-900 text-zinc-600 py-2 px-8 rounded-lg mt-2 w-full"
                  placeholder="Your City"
                />
                {errors.city && (
                  <p className="text-red-700">
                    {errors.city.message?.toString()}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="zipcode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip code *
                </label>
                <input
                  type="number"
                  id="zipcode"
                  {...register('zipcode', { required: 'Zip code is required' })}
                  className="bg-white outline-none border border-zinc-900 text-zinc-600 py-2 px-8 rounded-lg mt-2 w-full"
                  placeholder="99999999"
                />
                {errors.zipcode && (
                  <p className="text-red-700">
                    {errors.zipcode.message?.toString()}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
        <div className=" justify-end mt-4 flex flex-col gap-5 sm:gap-0 sm:flex-row">
          <button
            onClick={() => router.replace('/')}
            className="bg-white outline-none shadow-lg text-black font-bold py-2 px-8 rounded-lg mr-2 w-full sm:w-fit"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-3 px-4 rounded-lg bg-indigo-600 border-indigo-600 text-white font-bold w-full sm:w-fit"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Address;
