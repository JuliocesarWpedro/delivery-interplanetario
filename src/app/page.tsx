'use client';
import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import AddressComponent from './components/address';
import { useCart } from './context/CartContext';
import { Address, AddressType } from './types/Address';

export default function Home() {
  const { replace } = useRouter();
  const [searchAddress, setSearchAddress] = React.useState('');
  const [activeAddress, setActiveAddress] =
    React.useState<AddressType>('shipping');
  const { cartItems } = useCart();
  const [filteredAddresses, setFilteredAddresses] = React.useState<
    Address[] | null
  >(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(e.target.value);
  };

  React.useEffect(() => {});

  React.useEffect(() => {
    const filteredAddresses: Address[] = cartItems.filter((address) =>
      address.fullName.toLowerCase().includes(searchAddress.toLowerCase()),
    );
    if (searchAddress.length !== 0) {
      setFilteredAddresses(filteredAddresses);
    }
  }, [cartItems, searchAddress]);

  return (
    <div className="flex px-5 sm:px-8 md:px-15 lg:px-40 flex-col pt-20 bg-zinc-400 min-h-screen h-full pb-20 gap-5">
      <div className="w-full bg-white text-black rounded-lg shadow-md p-6 h-full max-w-[1000px] items-center mx-auto">
        <h1 className="text-2xl font-bold mb-4">Adress</h1>
        <div className="w-full bg-slate-100 rounded-lg ">
          <button
            onClick={() => setActiveAddress('shipping')}
            className={`${
              activeAddress === 'shipping'
                ? 'seja shadow-md bg-white text-xs sm:text-base text-black font-bold p-2 rounded-lg w-1/2'
                : 'bg-slate-100 text-black text-xs sm:text-base p-2 rounded-lg w-1/2 h-full'
            } `}
          >
            Shipping adress
          </button>
          <button
            onClick={() => setActiveAddress('billing')}
            className={`${
              activeAddress === 'billing'
                ? 'seja shadow-md bg-white text-xs sm:text-base text-black font-bold p-2 rounded-lg w-1/2'
                : 'bg-slate-100 text-black text-xs sm:text-base p-2 rounded-lg w-1/2 h-full'
            } `}
          >
            Billing adress
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 lg:gap-5 pt-5 justify-center items-center">
          <div className="w-full sm:w-3/5 relative flex items-center text-gray-400 focus-within:text-gray-600">
            <CiSearch className="absolute ml-3 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              id="searchAddress"
              placeholder="Search for the name"
              className="w-full block rounded-md ring-2 outline-none ring-gray-300 border-none placeholder-slate-300 p-8 pr-3 py-3 shadow-sm focus:ring-gray-500 focus:ring-2"
              value={searchAddress}
              onChange={handleSearchChange}
            />
          </div>
          <button
            onClick={() =>
              replace(
                activeAddress === 'shipping'
                  ? '/addAddress?type=shipping'
                  : '/addAddress?type=billing',
              )
            }
            className="w-full mt-5 sm:mt-0 sm:w-2/5 py-3 border-2 rounded-lg border-indigo-600 bg-white font-bold text-indigo-600"
          >
            Add address
          </button>
        </div>
        <h2 className="text-lg font-bold mb-2 mt-6">Address list</h2>
        {filteredAddresses &&
          (activeAddress === 'shipping'
            ? filteredAddresses
                .filter((item) => item.type === 'shipping')
                .map((address) => (
                  <AddressComponent key={address.id} address={address} />
                ))
            : filteredAddresses
                .filter((item) => item.type === 'billing')
                .map((address) => (
                  <AddressComponent key={address.id} address={address} />
                )))}

        {!filteredAddresses && !searchAddress && (
          <div className="mb-4 bg-gray-100 p-4 rounded-lg">
            {activeAddress === 'shipping' &&
              cartItems
                .filter((item) => item.type === 'shipping')
                .map((address) => (
                  <AddressComponent key={address.id} address={address} />
                ))}
            {activeAddress === 'billing' &&
              cartItems
                .filter((item) => item.type === 'billing')
                .map((address) => (
                  <AddressComponent key={address.id} address={address} />
                ))}
          </div>
        )}
      </div>
    </div>
  );
}
