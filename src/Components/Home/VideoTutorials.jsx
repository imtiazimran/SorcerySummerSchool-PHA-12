import { Link } from "react-router-dom";

const VideoTutorials = () => {
    return (

        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://static.wixstatic.com/media/79f648_cbb60687cd16474396200eadfe39b578~mv2_d_5433_4000_s_4_2.jpg/v1/fill/w_640,h_294,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/79f648_cbb60687cd16474396200eadfe39b578~mv2_d_5433_4000_s_4_2.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <Link to="login" className="btn btn-primary">Get Started</Link>
                </div>
                <div className="hidden md:block">
                    <iframe width="600" height="415" src="https://www.youtube.com/embed/I0KSaqiv5C0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    );
};

export default VideoTutorials;
