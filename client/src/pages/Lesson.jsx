import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
const serverURL = import.meta.env.VITE_SERVER_URL;

const Lesson = () => {
    const [course, setCourse] = useState({});
    const { user, getAccessTokenSilently } = useAuth0();
    const { courseId, moduleId, lessonId } = useParams();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    
    const currentCourse = course?.title
    const currentModule = course?.modules?.find((mod) => mod._id === moduleId)
    const currentLesson = course?.modules
    ?.find((mod) => mod._id === moduleId)
    ?.lessons?.find((lesson) => lesson._id === lessonId)

    const getCourse = async () => {
        setLoading(true);
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
            setErrorMessage("Failed to retrieve course content")
            return;
          }
          
          const responseData = await response.json();
          setCourse(responseData);
        } catch (error) {
          console.log(error.message);
          setErrorMessage("Failed to retrieve course content")
        } finally {
          setLoading(false)
        }
    }

    useEffect(() => {
        getCourse()
    }, [courseId])

    return (
        <div className="h-dvh flex flex-col bg-gradient-to-b from-[#080814] to-[#1a0a1e]">
            <Header userInfo={user}/>
            <div className="flex flex-1 min-h-0">
                <Sidebar course={course} />
                {loading
                  ? <div className="flex flex-1 items-center justify-center">
                      <Loader />
                    </div> 
                  : errorMessage
                    ? <p className="text-white/40 text-center text-3xl flex-1 mt-20">{errorMessage}</p>
                    : <Content 
                    lesson={currentLesson}
                    moduleName={currentModule?.title}
                    courseTopic={currentCourse}
                    refetchCourse={getCourse}
                />}
            </div>
        </div>
    );
}

export default Lesson;