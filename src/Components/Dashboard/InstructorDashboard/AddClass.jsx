
import { useForm } from 'react-hook-form';

const AddClass = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-4'>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="className">
            Class Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            id="className"
            {...register('className')}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="classImg">
            Class Image
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            type="file"
            id="classImg"
            {...register('classImg')}
          />
        </div>

      </div>

      <div className="flex gap-4">
      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700" htmlFor="instructorImg">
          Instructor Image
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          type="text"
          id="instructorImg"
          {...register('instructorImg')}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700" htmlFor="instructorEmail">
          Instructor Email
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          type="email"
          id="instructorEmail"
          {...register('instructorEmail')}
        />
      </div>
      
      </div>

      <div className="flex gap-4">
      
      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700" htmlFor="availableSeat">
          Available Seat
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          type="number"
          id="availableSeat"
          {...register('availableSeat')}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700" htmlFor="price">
          Price
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          type="number"
          id="price"
          {...register('price')}
        />
      </div>
      </div>

      <input className='btn btn-primary text-white w-full' type="submit" value="Submit Class" />
    </form>
  );
};

export default AddClass;
