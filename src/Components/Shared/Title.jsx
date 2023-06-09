/* eslint-disable react/prop-types */


const Title = ({ title, subtitle }) => {
    return (
        <div className="flex justify-center text-center py-10 items-center bg-emerald-400">
            <div>
                <h1 className="text-3xl font-bold uppercase">{title}</h1>
                <p className=" mt-2 capitalize">{subtitle}</p>
            </div>
        </div>
    );
};

export default Title;