import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Title from '../Shared/Title';
import axios from 'axios';
import Swal from 'sweetalert2';

const EmailForm = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)
    // You can handle form submission logic here. 'data' contains the form values.
    try {
      const response = await axios.post('https://summer-camp-server-weld.vercel.app/send-email', data); // Make an API request to your backend
      setIsLoading(false)
      if (response) {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Email sended to authority',
          showConfirmButton: false,
          timer: 1500
        })
      }
      reset()
    } catch (error) {
      setIsLoading(false)
      console.log(error);
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Email sending failed',
        text: `${error.message}`,
        showConfirmButton: false,
        timer: 1500
      })
      console.error('Email sending failed:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <Title title={"Contact Us"} subtitle={"Send Direct Email to us for your urgent query "} />
      <form className='md:w-1/3 mx-auto flex flex-col justify-center py-10 px-5 bg-slate-100 ' onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="name"
                placeholder="Your Name"
                className="input input-bordered input-primary w-full my-3"
              />
            )}
          />
          {errors.name && <p className="text-red-500">Name is required</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                id="email"
                placeholder="Email"
                className="input input-bordered input-primary w-full my-3"
              />
            )}
          />
          {errors.email && <p className="text-red-500">Valid email is required</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id="message"
                placeholder="Your Message"
                className="textarea textarea-primary w-full my-3"
              />
            )}
          />
          {errors.message && <p className="text-red-500">Message is required</p>}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
