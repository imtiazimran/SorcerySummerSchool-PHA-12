import React, { useEffect, useState } from 'react';
import Title from '../Shared/Title';
import BlogDetails from './BlogDetails';
import { Link } from 'react-router-dom';
import useBlogs from '../Hooks/useBlogs';
import axios from 'axios';

// Import the BlogDetails component

const Blog = () => {
    // Your array of blogs (you can keep it as is)
const [blogs, setBlogs] = useState([])

useEffect(()=>{
  axios.get("https://summer-camp-server-weld.vercel.app/blogs")
  .then(res=>{
    setBlogs(res.data)
  })
},[])

  //   const {blogs, isLoading, isError} = useBlogs()
  // console.log(blogs);
    
    // State to track the selected blog

    // Function to handle "Read More" button click
    
    return (
        <div>
            <Title title={"Blogs"} subtitle={"Read our blogs post by our instructors those might vary helpful for your understanding "} />
            <div className="bg-gray-100 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center md:py-11 gap-3">
                {blogs.map(blog => (
                    <div className="card w-96 my-11 shadow-xl" key={blog.title}>
                        <div className="card-body">
                            <h2 className="card-title">{blog.title}</h2>
                            <p>{blog.post.split(' ').slice(0, 30).join(' ')}...</p>
                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleReadMoreClick(blog)}
                                >
                                    <Link to={`blogDetails/${blog._id}`}>Read More</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default Blog;
