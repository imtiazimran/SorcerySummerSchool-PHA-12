import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const BlogDetails = () => {
   const { id } = useParams();
   const loaderData = useLoaderData();
   const targetedBlog = loaderData.filter((blog) => blog._id === id)[0];

   // Define a function to format text with '**' as bold using HTML tags
   const formatText = (text) => {
     return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
   };

   return (
       <div className='w-10/12 md:w-10/12 mx-auto'>
           <h1 className='text-xl font-bold py-5'>{targetedBlog.title}</h1>
           <p className='text-md' dangerouslySetInnerHTML={{ __html: formatText(targetedBlog.post) }}></p>
       </div>
   );
};

export default BlogDetails;
