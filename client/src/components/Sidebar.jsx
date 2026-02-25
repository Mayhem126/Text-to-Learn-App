import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ course }) => {
    const { courseId, moduleId, lessonId } = useParams();
    const [showLessons, setShowLessons] = useState(moduleId);
    const [showSideBar, setShowSideBar] = useState(true);
    const navigate = useNavigate();

    return (
        <>
            <div className={`text-white bg-[#ffffff1a] flex flex-col p-2 items-center transition-all ${showSideBar ? "w-40 md:w-55 lg:w-65 xl:w-80 items-end" : "w-10"}`}>
                {/* <h1 className="font-bold text-center text-xl xl:text-2xl mb-5 pb-5 border-b border-white/50">{course.title}</h1> */}
                <div onClick={() => setShowSideBar((prev) => !prev)} className={`hover:bg-black/40 hover:rounded-sm py-1 px-2 cursor-pointer ${showSideBar && "relative left-1.5"}`}>
                    {showSideBar ? <TbLayoutSidebarLeftCollapseFilled /> : <TbLayoutSidebarLeftExpandFilled />}
                </div>
                {showSideBar &&
                <section>
                    <ul>
                        {course?.modules?.map((mod) => (
                            <li key={mod._id} className="w-full py-2 border-b border-white/50">
                                <div className="flex justify-between gap-1 items-center cursor-pointer" onClick={() => setShowLessons(showLessons === mod._id ? null : mod._id)}>
                                    <h2 className="flex-1 font-medium text-sm md:text-base">{mod.title}</h2>
                                    {showLessons === mod._id ? <FaAngleUp /> : <FaAngleDown />}
                                </div>                            
                                {showLessons === mod._id && <ul className="">
                                    {mod.lessons?.map((lesson) => (
                                    <li key={lesson._id} onClick={() => navigate(`/course/${courseId}/module/${mod._id}/lesson/${lesson._id}`)} className={`text-sm py-1 cursor-pointer hover:text-white pl-4 rounded-lg ${lesson._id === lessonId ? "text-white bg-black/40" : "text-white/50"} duration-200`}>
                                        <h3 className="text-xs md:text-sm">{lesson.title}</h3>
                                    </li>
                                    ))}
                                </ul>}
                            </li>
                        ))}
                    </ul>
                </section>}
            </div>
        </>
        
    )
}

export default Sidebar