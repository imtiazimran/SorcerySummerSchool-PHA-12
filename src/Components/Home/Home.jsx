import Carouslider from "./Carousel";
import PopulerClass from "./PopulerClass";
import PopulerInstructors from "./PopulerInstructors";
import VideoTutorials from "./VideoTutorials";


const Home = () => {
    return (
        <div className="w-11/12 md:w-10/12 mx-auto">
            <Carouslider></Carouslider>
            <PopulerClass></PopulerClass>
            <PopulerInstructors></PopulerInstructors>
            <VideoTutorials></VideoTutorials>
        </div>
    );
};

export default Home;