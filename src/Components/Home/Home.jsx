import { useTitle } from "../Hooks/useTitle";
import Blog from "./Blog";
import Carouslider from "./Carousel";
import CertificationAccreditation from "./CertificationAccreditation";
import EmailForm from "./EmailForm";
import FAQ from "./FAQ";
import PopulerClass from "./PopulerClass";
import PopulerInstructors from "./PopulerInstructors";
import Review from "./Review";
import VideoTutorials from "./VideoTutorials";


const Home = () => {
    useTitle("Home")
    return (
        <div className="w-11/12 md:w-10/12 mx-auto">
            <Carouslider></Carouslider>
            <PopulerClass></PopulerClass>
            <PopulerInstructors></PopulerInstructors>
            <Blog/>
            <Review/>
            <CertificationAccreditation/>
            <EmailForm/>
            <VideoTutorials></VideoTutorials>
            <FAQ/>
        </div>
    );
};

export default Home;