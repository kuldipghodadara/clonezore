// import {Image} from '@shopify/hydrogen';

// import type {MediaFragment} from 'storefrontapi.generated';

// /**
//  * A client component that defines a media gallery for hosting images, 3D models, and videos of products
//  */
// export function ProductGallery({
//   media,
//   className,
// }: {
//   media: MediaFragment[];
//   className?: string;
// }) {
//   if (!media.length) {
//     return null;
//   }

//   return (
//     <div
//       className={`swimlane  hiddenScroll md:p-0 md:overflow-x-auto  ${className}`}
//     >
//       {media.map((med, i) => {
//         const isFirst = i === 0;
//         const isFourth = i === 3;
//         const isFullWidth = i % 3 === 0;

//         const image =
//           med.__typename === 'MediaImage'
//             ? {...med.image, altText: med.alt || 'Product image'}
//             : null;

//         const style = [
//           isFullWidth ? 'md:col-span-2' : 'md:col-span-1',
//           isFirst || isFourth ? '' : 'md:aspect-[4/5]',
//           'aspect-square snap-center card-image bg-white dark:bg-contrast/10 w-mobileGallery md:w-80',
//         ].join(' ');

//         return (
//           <div className={style} key={med.id || image?.id}>
//             {image && (
//               <Image
//                 loading={i === 0 ? 'eager' : 'lazy'}
//                 data={image}
//                 aspectRatio={!isFirst && !isFourth ? '4/5' : undefined}
//                 sizes={
//                   isFirst || isFourth
//                     ? '(min-width: 48em) 60vw, 90vw'
//                     : '(min-width: 48em) 60ew, 90vw'
//                 }
//                 className="object-cover w-full h-full aspect-square fadeIn"
//               />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

import {Image} from '@shopify/hydrogen';
import {useState} from 'react';
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa';

import type {MediaFragment} from 'storefrontapi.generated';

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export function ProductGallery({
  media,
  className,
}: {
  media: MediaFragment[];
  className?: string;
}) {
  if (!media.length) {
    return null;
  }

  // State to track the current image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle the next image
  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  // Function to handle the previous image
  const handlePrevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + media.length) % media.length,
    );
  };

  const currentMedia = media[currentIndex];

  const image =
    currentMedia.__typename === 'MediaImage'
      ? {...currentMedia.image, altText: currentMedia.alt || 'Product image'}
      : null;

  return (
    <div
      className={`relative swimlane hiddenScroll md:p-0 md:overflow-x-auto ${className}`}
    >
      {media.length > 1 && <></>}

      <div className="">
        <div
          className={`aspect-square snap-center card-image bg-white dark:bg-contrast/10 lg:w-3/4`}
        >
          <button
            onClick={handlePrevImage}
            disabled={currentIndex === 0}
            className={`absolute left-1 transform -translate-y-1/2 z-10 dark:bg-black p-2 ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaAngleLeft />
          </button>
          {image && (
            <Image
              loading={currentIndex === 0 ? 'eager' : 'lazy'}
              data={image}
              aspectRatio="4/5"
              sizes="(min-width: 48em) 60vw, 90vw"
              className="object-cover w-full h-full aspect-square fadeIn"
            />
          )}
          <button
            onClick={handleNextImage}
            disabled={currentIndex === media.length - 1}
            className={`absolute right-1 transform -translate-y-1/2 z-10 dark:bg-black p-2 ${
              currentIndex === media.length - 1
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
}
