/* eslint-disable react/prop-types */

import { Fade, Slide } from "react-awesome-reveal";


const Title = ({ title, subtitle }) => {
    return (
        <div className="flex justify-center text-center py-10 items-center bg-emerald-400">
            <div>
            <Slide>
            
            <h1 className="text-3xl font-bold uppercase">{title}</h1>
            </Slide>
                <Fade delay={1e3} cascade damping={1e-1} >
                    <p className=" mt-2 capitalize">{subtitle}</p>
                </Fade>
            </div>

        </div >
    );
};

export default Title;