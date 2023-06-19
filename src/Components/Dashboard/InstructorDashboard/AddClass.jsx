
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Authorization/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTitle } from '../../Hooks/useTitle';

const imgHostingApi = import.meta.env.VITE_img_uploading_api

const AddClass = () => {
  useTitle("SSS |  ADD CLASS")
  const { user } = useContext(AuthContext)
  const { register, handleSubmit } = useForm();

  const imgHostingLink = `https://api.imgbb.com/1/upload?key=${imgHostingApi}`

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append("image", data.classImg[0])
    fetch(imgHostingLink, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(imgRes => {
        if (imgRes.success) {
          const imgURL = imgRes.data.display_url;

          const newClass = {
            name: data.tutorialTitle,
            instructorName: user.displayName,
            instructorEmail: user.email,
            availableSeats: parseFloat(data.availableSeat),
            price: data.price,
            image: imgURL,
            status: "pending",
            enrolled: 0
          }
          axios
            .post('https://summer-camp-server-weld.vercel.app/class', newClass)
            .then(res => {
              if (res.data.insertedId) {
                Swal.fire({
                  position: 'top-center',
                  icon: 'success',
                  title: 'Your Class Is Forworded To Admin',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            })
        }
      })
  };

  return (
    <form className="w-4/5 mx-auto p-5 card glass bg-emerald-700" onSubmit={handleSubmit(onSubmit)}>
      <div className='md:flex gap-4'>
        <div className="mb-4 md:w-1/2">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="className">
            Class Name
          </label>
          <input
            className="w-full px-3 py-2 border  input-bordered input-primary  rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            id="className"
            {...register('tutorialTitle')}
          />
        </div>

        <div className="mb-4 md:w-1/2">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="classImg">
            Class Image
          </label>
          <input
            className="w-full px-3 py-2 border  input-bordered input-primary  rounded-lg focus:outline-none focus:border-blue-500"
            type="file"
            id="classImg"
            {...register('classImg')}
          />
        </div>

      </div>

      <div className="md:flex gap-4">
        <div className="mb-4 md:w-1/2">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="instructorName">
            Instructor Name
          </label>
          <input
            defaultValue={user.displayName}
            readOnly
            className="w-full px-3 py-2 border  input-bordered input-primary  rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            id="instructorName"
            {...register('instructorName')}
          />
        </div>

        <div className="mb-4 md:w-1/2">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="instructorEmail">
            Instructor Email
          </label>
          <input
            defaultValue={user.email}
            readOnly
            className="w-full px-3 py-2 border  input-bordered input-primary  rounded-lg focus:outline-none focus:border-blue-500"
            type="email"
            id="instructorEmail"
            {...register('instructorEmail')}
          />
        </div>

      </div>

      <div className="md:flex gap-4">

        <div className="mb-4 md:w-1/2">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="availableSeat">
            Available Seat
          </label>
          <input
            className="w-full px-3 py-2 border  input-bordered input-primary  rounded-lg focus:outline-none focus:border-blue-500"
            type="number"
            id="availableSeat"
            {...register('availableSeat')}
          />
        </div>

        <div className="mb-4 md:w-1/2">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="price">
            Price
          </label>
          <input
            className="w-full px-3 py-2 border  input-bordered input-primary  rounded-lg focus:outline-none focus:border-blue-500"
            type="number"
            id="price"
            {...register('price')}
          />
        </div>
      </div>
      <textarea className="textarea w-full textarea-primary" placeholder="Details About Course"></textarea>
      <br />
      <input className='btn btn-primary text-white w-full' type="submit" value="Submit Class" />
    </form>
  );
};

export default AddClass;
