import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const serverURL = import.meta.env.VITE_SERVER_URL;

const Lesson = () => {
    const [course, setCourse] = useState({});
    const { user, getAccessTokenSilently } = useAuth0();
    const { courseId, moduleId, lessonId } = useParams();
    
    const currentCourse = course?.title
    const currentModule = course?.modules?.find((mod) => mod._id === moduleId)
    const currentLesson = course?.modules
    ?.find((mod) => mod._id === moduleId)
    ?.lessons?.find((lesson) => lesson._id === lessonId)

    const getCourse = async () => {
        try {
          const token = await getAccessTokenSilently();
    
          const response = await fetch(`${serverURL}/courses/${courseId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            },
          });
    
          if (!response.ok) {
            console.log(response.error);
            return;
          }
          
          const responseData = await response.json();
          setCourse(responseData);
        } catch (error) {
          console.log(error.message);
        } 
    }

    useEffect(() => {
        getCourse()
    }, [courseId])

    return (
        <div className="h-screen flex flex-col bg-gradient-to-b from-[#080814] to-[#1a0a1e] overflow-hidden">
            <Header userInfo={user}/>
            <div className="border border-white flex grow overflow-hidden">
                <Sidebar course={course} />
                <Content 
                    lesson={currentLesson}
                    moduleName={currentModule?.title}
                    courseTopic={currentCourse}
                    refetchCourse={getCourse}
                />
            </div>
        </div>
    );
}

export default Lesson;