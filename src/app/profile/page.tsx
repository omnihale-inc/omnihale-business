'use client';

import { useState, useRef, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';

import healthCareLogoPlaceholder from '@/assets/healthcare-logo-placeholder.jpg';
import backIcon from '@/assets/icons/back.png';
import saveIcon from '@/assets/icons/save.png';

type ProfileDetails = {
  profileImg: string | StaticImageData;
  name: string;
  address: string;
};

export default function ProfilePage() {
  const currentProfileDetails: ProfileDetails = {
    profileImg: healthCareLogoPlaceholder,
    name: 'Federal Staff Hospital',
    address: 'Plot 2 Off Samuel L. A. Blvd, Abuja',
  };
  const [profileDetails, setProfileDetails] = useState(currentProfileDetails);
  const imageFileRef = useRef<HTMLInputElement>(null);

  return (
    <main>
      <header className='flex items-center justify-between w-3/6 mb-40 mt-12 m-auto'>
        {/* go back home */}
        <a href='/'>
          <Image
            src={backIcon}
            alt='back home'
            width={25}
            height={25}
            className='mr-2'
          />
        </a>
        <h1 className='text-2xl font-semibold'>Profile</h1>
      </header>
      <section className='grid place-items-center'>
        <div className='w-96'>
          <div className='flex justify-between mb-6'>
            <div className='flex flex-col items-center'>
              <div className='relative h-20 w-20 mb-2'>
                <Image
                  src={profileDetails.profileImg}
                  alt='healthcare logo'
                  fill
                  className='rounded-full border border-gray-400 object-cover'
                />
              </div>
              <input
                type='file'
                name='imageFile'
                id='imageUpload'
                accept='image/*'
                className='hidden'
                ref={imageFileRef}
                onChange={(file) => {
                  const reader = new FileReader();
                  // handle file read
                  reader.onload = (image) => {
                    // handle image change
                    setProfileDetails((state) => ({
                      ...state,
                      profileImg: image.target?.result as string,
                    }));
                  };
                  // read the file
                  reader.readAsDataURL(
                    file.target.files ? file.target.files[0] : new Blob()
                  );
                }}
              />
              <button
                className='px-4 py-1 rounded-full border text-xs border-gray-400'
                onClick={
                  // open file dialog
                  () => imageFileRef?.current?.click()
                }
              >
                Upload Image
              </button>
            </div>
            <div className='ml-4 p-2 w-60'>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  className='block border w-full border-gray-400 text-xs py-3 px-2 rounded-md mb-3'
                  value={profileDetails.name}
                  onChange={(e) =>
                    // handle name change
                    setProfileDetails((state) => ({
                      ...state,
                      name: e.target.value,
                    }))
                  }
                  placeholder='hospital name'
                />
                <input
                  className='block border w-full border-gray-400 text-xs py-3 px-2 rounded-md'
                  value={profileDetails.address}
                  onChange={(e) =>
                    // handle address change
                    setProfileDetails((state) => ({
                      ...state,
                      address: e.target.value,
                    }))
                  }
                  placeholder='hospital address'
                />
              </form>
            </div>
          </div>
          <div className='flex justify-end'>
            <button className='border rounded-2xl border-black px-4 py-1 text-sm flex items-center'>
              <Image src={saveIcon} alt='save fields' width={15} height={15} />
              <span className='text-sm ml-1'>Save</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
