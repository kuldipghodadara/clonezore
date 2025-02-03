import {Image} from '@shopify/hydrogen';

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

  return (
    <div
      className={`swimlane  hiddenScroll md:p-0 md:overflow-x-auto  ${className}`}
    >
      {media.map((med, i) => {
        const isFirst = i === 0;
        const isFourth = i === 3;
        const isFullWidth = i % 3 === 0;

        const image =
          med.__typename === 'MediaImage'
            ? {...med.image, altText: med.alt || 'Product image'}
            : null;

        const style = [
          isFullWidth ? 'md:col-span-2' : 'md:col-span-1',
          isFirst || isFourth ? '' : 'md:aspect-[4/5]',
          'aspect-square snap-center card-image bg-white dark:bg-contrast/10 w-mobileGallery md:w-80',
        ].join(' ');

        return (
          <div className={style} key={med.id || image?.id}>
            {image && (
              <Image
                loading={i === 0 ? 'eager' : 'lazy'}
                data={image}
                aspectRatio={!isFirst && !isFourth ? '4/5' : undefined}
                sizes={
                  isFirst || isFourth
                    ? '(min-width: 48em) 60vw, 90vw'
                    : '(min-width: 48em) 60ew, 90vw'
                }
                className="object-cover w-full h-full aspect-square fadeIn"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// import {ReactImageMagnify} from 'react-image-magnifiers';
// import { MediaFragment } from 'storefrontapi.generated';

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
//       className={`swimlane hiddenScroll md:p-0 md:overflow-x-auto ${className}`}
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
//               <ReactImageMagnify
//                 {...{
//                   smallImage: {
//                     alt: image.altText,
//                     isFluidWidth: true,
//                     src: image.src,
//                   },
//                   largeImage: {
//                     src: image.src,
//                     width: 1200,
//                     height: 1800,
//                   },
//                   imageClassName:
//                     'object-cover w-full h-full aspect-square fadeIn',
//                 }}
//               />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

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
//       className={`flex flex-col  gap-2 lg:flex-row   hiddenScroll md:p-0 md:overflow-x-auto  ${className}`}
//     >
//       {media.map((med, i) => {
//         const isFirst = i === 0;
//         const isFourth = i === 3;
//         const isFullWidth = i % 3 === 0;

//         const image =
//           med.__typename === 'MediaImage'
//             ? {...med.image, altText: med.alt || 'Product image'}
//             : null;

//         /*  const style = [
//           isFullWidth ? 'md:col-span-2' : 'md:col-span-1',
//           isFirst || isFourth ? '' : 'md:aspect-[4/5]',
//           'aspect-square snap-center card-image bg-white dark:bg-contrast/10 w-mobileGallery md:w-80',
//         ].join(' ');
//  */
//         return (
//           <div /* className={style}  */ key={med.id || image?.id}>
//             {image && (
//               <Image
//                 loading={i === 0 ? 'eager' : 'lazy'}
//                 data={image}
//                 /*     aspectRatio={!isFirst && !isFourth ? '4/5' : undefined} */
//                 /*   sizes={
//                   isFirst || isFourth
//                     ? '(min-width: 48em) 60vw, 90vw'
//                     : '(min-width: 48em) 60ew, 90vw'
//                 } */
//                 className="object-cover w-3/5 h-3/5 aspect-square fadeIn"
//               />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }
