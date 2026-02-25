const Content = ({ lesson }) => {
    return (
        <div className="text-white grow">
            <h1 className="font-bold text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl my-3">{`isEnriched:${lesson?.isEnriched}`}</h1>            
        </div>
    )
}

export default Content