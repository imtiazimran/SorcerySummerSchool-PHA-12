const VideoTutorials = () => {
    return (
        <div className="hero h-[500px]" style={{ backgroundImage: "url(https://static.wixstatic.com/media/79f648_cbb60687cd16474396200eadfe39b578~mv2_d_5433_4000_s_4_2.jpg/v1/fill/w_640,h_294,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/79f648_cbb60687cd16474396200eadfe39b578~mv2_d_5433_4000_s_4_2.jpg)" }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="md:hidden">
                <img src="https://i.gifer.com/7jk2.gif" alt="" />
                </div>
                <div className="hidden md:block">
                    <iframe width="600" height="415" src="https://www.youtube.com/embed/I0KSaqiv5C0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    );
};

export default VideoTutorials;
