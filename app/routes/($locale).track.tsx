// // import {useState, useEffect} from 'react';

// // export default function Track() {
// //   const [orderId, setOrderId] = useState('');
// //   const [status, setStatus] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     setStatus('');
// //   }, [orderId]);

// //   const handleTrackOrder = async () => {
// //     if (!orderId) return;

// //     setLoading(true);

// //     setTimeout(() => {
// //       setStatus('Your order has been shipped and is in transit!');
// //       setLoading(false);
// //     }, 2000);
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark-track">
// //       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg dark-track-theme">
// //         <h1 className="text-2xl font-semibold text-center text-gray-800">
// //           Track Your Order
// //         </h1>

// //         <div className="mt-6">
// //           <label
// //             htmlFor="orderId"
// //             className="block text-sm font-medium text-gray-700"
// //           >
// //             Order ID
// //           </label>
// //           <input
// //             id="orderId"
// //             type="text"
// //             value={orderId}
// //             onChange={(e) => setOrderId(e.target.value)}
// //             placeholder="Enter your order ID"
// //             className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //         </div>

// //         <div className="mt-4 flex justify-center">
// //           <button
// //             onClick={handleTrackOrder}
// //             disabled={loading}
// //             className={`px-6 py-2 bg-blue-600 text-white rounded-md ${
// //               loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
// //             }`}
// //           >
// //             {loading ? 'Tracking...' : 'Track Order'}
// //           </button>
// //         </div>

// //         {status && (
// //           <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md dark-track">
// //             <p className="text-sm">{status}</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // // import {useState} from 'react';

// // // // Define the type for the API response
// // // interface TrackingResponse {
// // //   status?: string; // 'status' might be optional based on the API response
// // // }

// // // export default function Track() {
// // //   const [orderId, setOrderId] = useState('');
// // //   const [email, setEmail] = useState('');
// // //   const [status, setStatus] = useState('');
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');

// // //   // const handleTrackOrder = async () => {
// // //   //   if (!orderId || !email) return;

// // //   //   setLoading(true);
// // //   //   setError(''); // Clear any previous errors

// // //   //   try {
// // //   //     // Correctly interpolate orderId and email into the API URL
// // //   //     const apiUrl = `https://pp-proxy.parcelpanel.com/api/v2/tracking-info?order=${encodeURIComponent(
// // //   //       orderId,
// // //   //     )}&email=${encodeURIComponent(
// // //   //       email,
// // //   //     )}&shop=clonezore.myshopify.com&lang=en&country=IN`;

// // //   //     // Make the API call
// // //   //     const response = await fetch(apiUrl, {
// // //   //       method: 'GET',
// // //   //       headers: {
// // //   //         'Content-Type': 'application/json',
// // //   //       },
// // //   //     });

// // //   //     if (!response.ok) {
// // //   //       throw new Error('Failed to fetch tracking info');
// // //   //     }

// // //   //     // Parse the response JSON with explicit type assertion
// // //   //     const data = (await response.json()) as TrackingResponse;

// // //   //     // Check if 'status' exists in the response and update accordingly
// // //   //     if (data.status) {
// // //   //       setStatus(data.status);
// // //   //     } else {
// // //   //       setStatus('No tracking information available.');
// // //   //     }
// // //   //   } catch (error) {
// // //   //     // Handle errors
// // //   //     setError(
// // //   //       'Error fetching tracking information: ' + (error as Error).message,
// // //   //     );
// // //   //   } finally {
// // //   //     setLoading(false);
// // //   //   }
// // //   // };

// // //   const handleTrackOrder = async () => {
// // //     if (!orderId || !email) return;

// // //     setLoading(true);
// // //     setError(''); // Clear any previous errors

// // //     try {
// // //       // Correctly interpolate orderId and email into the API URL
// // //       const apiUrl = `https://pp-proxy.parcelpanel.com/api/v2/tracking-info?order=${encodeURIComponent(
// // //         orderId,
// // //       )}&email=${encodeURIComponent(
// // //         email,
// // //       )}&shop=clonezore.myshopify.com&lang=en&country=IN`;

// // //       // Make the API call
// // //       const response = await fetch(apiUrl, {
// // //         method: 'GET',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error('Failed to fetch tracking info');
// // //       }

// // //       // Parse the response JSON
// // //       const data = (await response.json()) as TrackingResponse;

// // //       // Log the data to inspect
// // //       console.log(data);

// // //       // Check if 'status' exists in the response and update accordingly
// // //       if (data.status) {
// // //         setStatus(`tracking information available.`);
// // //       } else {
// // //         setStatus('No tracking information available.');
// // //       }
// // //     } catch (error) {
// // //       // Handle errors
// // //       setError(
// // //         'Error fetching tracking information: ' + (error as Error).message,
// // //       );
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark-track">
// // //       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg dark-track-theme">
// // //         <h1 className="text-2xl font-semibold text-center text-gray-800">
// // //           Track Your Order
// // //         </h1>

// // //         <div className="mt-6">
// // //           <label
// // //             htmlFor="orderId"
// // //             className="block text-sm font-medium text-gray-700"
// // //           >
// // //             Order ID
// // //           </label>
// // //           <input
// // //             id="orderId"
// // //             type="text"
// // //             value={orderId}
// // //             onChange={(e) => setOrderId(e.target.value)}
// // //             placeholder="Enter your order ID"
// // //             className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //           />
// // //         </div>

// // //         {/* Email Input */}
// // //         <div className="mt-6">
// // //           <label
// // //             htmlFor="email"
// // //             className="block text-sm font-medium text-gray-700"
// // //           >
// // //             Email Address
// // //           </label>
// // //           <input
// // //             id="email"
// // //             type="email"
// // //             value={email}
// // //             onChange={(e) => setEmail(e.target.value)}
// // //             placeholder="Enter your email address"
// // //             className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //           />
// // //         </div>

// // //         <div className="mt-4 flex justify-center">
// // //           <button
// // //             onClick={handleTrackOrder}
// // //             disabled={loading}
// // //             className={`px-6 py-2 bg-blue-600 text-white rounded-md ${
// // //               loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
// // //             }`}
// // //           >
// // //             {loading ? 'Tracking...' : 'Track Order'}
// // //           </button>
// // //         </div>

// // //         {/* Display error message if any */}
// // //         {error && (
// // //           <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md">
// // //             <p className="text-sm">{error}</p>
// // //           </div>
// // //         )}

// // //         {/* Display status message if available */}
// // //         {status && (
// // //           <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md dark-track">
// // //             <p className="text-sm">{status}</p>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// import {useState, useEffect} from 'react';

// // Define the expected response structure
// interface OrderStatusResponse {
//   status: string;
// }

// export default function Track() {
//   const [orderId, setOrderId] = useState('');
//   const [status, setStatus] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     setStatus('');
//     setError('');
//   }, [orderId]);

//   const handleTrackOrder = async () => {
//     if (!orderId) return;

//     setLoading(true);
//     setError(''); // Reset error state

//     try {
//       const response = await fetch(
//         `http://localhost:5000/fetch-orders?order_number=${orderId}`,
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch order status');
//       }

//       // Parse the response body and assert the type as OrderStatusResponse
//       const data = (await response.json()) as OrderStatusResponse;

//       // Assuming the API returns an object with a `status` field
//       if (data.status) {
//         setStatus(data.status);
//       } else {
//         setStatus('No status available for this order.');
//       }
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : 'An unknown error occurred',
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark-track">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg dark-track-theme">
//         <h1 className="text-2xl font-semibold text-center text-gray-800">
//           Track Your Order
//         </h1>

//         <div className="mt-6">
//           <label
//             htmlFor="orderId"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Order ID
//           </label>
//           <input
//             id="orderId"
//             type="text"
//             value={orderId}
//             onChange={(e) => setOrderId(e.target.value)}
//             placeholder="Enter your order ID"
//             className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mt-4 flex justify-center">
//           <button
//             onClick={handleTrackOrder}
//             disabled={loading}
//             className={`px-6 py-2 bg-blue-600 text-white rounded-md ${
//               loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
//             }`}
//           >
//             {loading ? 'Tracking...' : 'Track Order'}
//           </button>
//         </div>

//         {status && (
//           <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md dark-track">
//             <p className="text-sm">{status}</p>
//           </div>
//         )}

//         {error && (
//           <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md dark-track">
//             <p className="text-sm">{error}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import {useState, useEffect, SetStateAction} from 'react';

// Define the expected response structure for billing address and order status URL
interface BillingAddress {
  first_name: string;
  last_name: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone?: string;
}
interface Lineitems {
  name: string;
  id: number;
  title: string;
  price: string;
}

interface OrderResponse {
  line_items: Lineitems[];
  email: SetStateAction<string | null>;
  billing_address: BillingAddress;
  order_status_url: string;
}

export default function Track() {
  const [orderId, setOrderId] = useState('');
  const [billingAddress, setBillingAddress] = useState<BillingAddress | null>(
    null,
  );
  const [orderStatusUrl, setOrderStatusUrl] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [lineitems, setLineItems] = useState<Lineitems[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setBillingAddress(null);
    setOrderStatusUrl(null);
    setEmail(null);
    setLineItems([]);
    setError('');
  }, [orderId]);

  const handleTrackOrder = async () => {
    if (!orderId) return;

    setLoading(true);
    setError(''); // Reset error state

    try {
      const response = await fetch(
        `http://localhost:3200/fetch-orders?order_number=${orderId}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch order status');
      }

      // Parse the response body and assert the type as OrderResponse
      const data = (await response.json()) as OrderResponse;

      // Set the billing address and order status URL if available
      setBillingAddress(data.billing_address);
      setOrderStatusUrl(data.order_status_url);
      setEmail(data.email);
      setLineItems(data.line_items); // Set line items
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark-track">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg dark-track-theme">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Track Your Order
        </h1>

        <div className="mt-6">
          <label
            htmlFor="orderId"
            className="block text-sm font-medium text-gray-700"
          >
            Order ID
          </label>
          <input
            id="orderId"
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter your order ID"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark-input "
          />
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleTrackOrder}
            disabled={loading}
            className={`px-6 py-2 bg-blue-600 text-white rounded-md ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {loading ? 'Tracking...' : 'Track Order'}
          </button>
        </div>

        <div className="mt-6 p-4 rounded-md ">
          {email && (
            <div className="mt-6 p-4 bg-blue-100 text-blue-700 dark-track ">
              <p className="text-sm">{email}</p>
            </div>
          )}
          {billingAddress && (
            <div className=" p-4  dark-track bg-blue-100 text-blue-700">
              <p className="text-sm">Billing Address:</p>
              <p>
                {billingAddress.first_name} {billingAddress.last_name}
              </p>
              <p>
                {billingAddress.address1}{' '}
                {billingAddress.address2 ? billingAddress.address2 : ''}
              </p>
              <p>
                {billingAddress.city}, {billingAddress.province},{' '}
                {billingAddress.zip}
              </p>
              <p>{billingAddress.country}</p>
              {billingAddress.phone && <p>Phone: {billingAddress.phone}</p>}
            </div>
          )}
        </div>

        {lineitems.length > 0 && (
          <div className="mt-6 p-4 bg-yellow-100 text-yellow-700 rounded-md dark-track">
            <p className="text-sm">Product:</p>
            <ul>
              {lineitems.map((item) => (
                <li key={item.id}>
                  {item.title} - Price: {item.price}
                </li>
              ))}
            </ul>
          </div>
        )}

        {orderStatusUrl && (
          <div className="mt-6 p-4 flex  justify-center rounded-md ">
            <a
              href={orderStatusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              <button className="px-6 py-2 justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700">
                {' '}
                track me live{' '}
              </button>
            </a>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-100 text-center text-red-700 rounded-md dark-track">
            <p className="text-sm">not available order in database</p>
          </div>
        )}
      </div>
    </div>
  );
}
