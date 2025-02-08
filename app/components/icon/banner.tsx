import {Link} from '@remix-run/react';

export default function Banner() {
  return (
    <>
      <div className="flex flex-col sm:relative">
        {/* Centered content */}
        <div className="sm:absolute sm:top-1/2 sm:left-1/2 transform sm:-translate-x-1/2 sm:-translate-y-1/2 text-center p-4 bg-white bg-opacity-70 rounded-md z-10 relative order-2 ">
          <h1 className="text-4xl font-bold">Special deal</h1>
          <p className="mb-4">Tell your brand's story through images</p>
          <Link
            className="px-4 py-2 bg-blue-500 text-white rounded"
            to={'products'}
          >
            Shop Now
          </Link>
        </div>

        {/* Image */}
        <div className="">
          <img
            src="https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera-with-shopping-bag-blue-pastel-background-copy-space_1258-128517.jpg?t=st=1738989333~exp=1738992933~hmac=2587956c8eb62cd6a7186422776f66a523d3b6d8f18220511dce498394c5263d&w=1380"
            className="w-full h-auto"
            alt="banner"
          />
        </div>
      </div>
    </>
  );
}
