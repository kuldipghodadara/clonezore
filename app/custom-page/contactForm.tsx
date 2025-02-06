// const ContactForm = () => {
// const ContactForm = () => {
//   const onSubmitForm = async (e: any) => {
//     e.preventDefault(); // Prevent the default form submission

//     // Get the form values
//     const formData = new FormData(e.target);
//     const data = {
//       name: formData.get('name'),
//       email: formData.get('email'),
//       subject: formData.get('subject'),
//       message: formData.get('message'),
//     };

//     try {
//       const response = await fetch('http://localhost:5000/send-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         alert('Your message has been sent!');
//       }
//       // else {
//       //   alert('There was an issue sending your message.');
//       // }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('There was an issue sending your message.');
//     }
//   };

//   return (
//     <>
//       <section className="bg-white rounded-md dark:bg-gray-900 dark-form">
//         <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
//           {/* <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
//             Contact Us
//           </h2> */}
//           <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
//             Got a technical issue? Want to send feedback about a beta feature?
//             Need details about our Business plan? Let us know.
//           </p>
//           <form className="space-y-8" onSubmit={onSubmitForm}>
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//               >
//                 Your name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="neme" // Ensure "name" attribute is set for each form field
//                 className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light mb-4"
//                 placeholder="enter your name"
//                 required
//               />
//               <label
//                 htmlFor="email"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//               >
//                 Your email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email" // Ensure "name" attribute is set for each form field
//                 className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
//                 placeholder="name@flowbite.com"
//                 required
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="subject"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//               >
//                 Subject
//               </label>
//               <input
//                 type="text"
//                 id="subject"
//                 name="subject" // Ensure "name" attribute is set for each form field
//                 className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
//                 placeholder="Let us know how we can help you"
//                 required
//               />
//             </div>
//             <div className="sm:col-span-2">
//               <label
//                 htmlFor="message"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
//               >
//                 Your message
//               </label>
//               <textarea
//                 id="message"
//                 name="message" // Ensure "name" attribute is set for each form field
//                 rows={6}
//                 className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                 placeholder="Leave a comment..."
//                 defaultValue={''}
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="py-3 px-5 text-sm font-medium text-center bg-black text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//             >
//               Send message
//             </button>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// };
// export default ContactForm;

import React, {useState} from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
  subject: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    subject: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate async behavior

      setStatus('Thank you for your message!');
      setFormData({name: '', email: '', subject: '', message: ''});
    } catch (error) {
      setStatus('Oops! Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white rounded-md dark:bg-gray-900 dark-form">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your name
            </label>
            <input
              value={formData.name}
              onChange={handleChange}
              type="text"
              id="name"
              name="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light mb-4"
              placeholder="enter your name"
              required
            />
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="enter your email
"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Subject
            </label>
            <input
              value={formData.subject}
              onChange={handleChange}
              type="text"
              id="subject"
              name="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              value={formData.message}
              onChange={handleChange}
              id="message"
              name="message"
              rows={6}
              className="block p-2.5 w-full max-h-24 min-h-24 text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500  "
              placeholder="Leave a comment..."
              defaultValue={''}
              required
            />
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center bg-black text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Send message
          </button>
        </form>
        <div className="text-center font-medium text-lg">
          {' '}
          {status && <p>{status}</p>}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
