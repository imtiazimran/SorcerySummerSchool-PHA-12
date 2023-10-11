import { useTitle } from "../Hooks/useTitle";
import Blog from "./Blog";
import Carouslider from "./Carousel";
import PopulerClass from "./PopulerClass";
import PopulerInstructors from "./PopulerInstructors";
import VideoTutorials from "./VideoTutorials";


const Home = () => {
    useTitle("Home")
    return (
        <div className="w-11/12 md:w-10/12 mx-auto">
            <Carouslider></Carouslider>
            <PopulerClass></PopulerClass>
            <PopulerInstructors></PopulerInstructors>
            <Blog/>
            <VideoTutorials></VideoTutorials>
        </div>
    );
};

export default Home;