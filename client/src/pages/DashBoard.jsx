import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Header from "../components/Header";

const DashBoard = () => {
  const serverURL = import.meta.env.VITE_SERVER_URL;
  const { getAccessTokenSilently, user } = useAuth0();
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [generateLoading, setGenerateLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState(false);

  const getCourses = async () => {
    try {
      setCourseLoading(true);
      const token = await getAccessTokenSilently();

      const response = await fetch(`${serverURL}/`, {
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
      setCourses(responseData);
    } catch (error) {
      console.log(error.message);
    } finally {
      setCourseLoading(false)
    }   
  }

  useEffect(() => {
    getCourses();
  }, [])

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    try {
      setGenerateLoading(true);
      setMessage("");
      const token = await getAccessTokenSilently();

      const response = await fetch(`${serverURL}/generate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setMessage(responseData.error || "Something went wrong");
        return;
      }

      console.log("Generated course:", responseData);
      setMessage(`Course "${responseData.course.title}" generated successfully!`);
      setTopic("");
      getCourses();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setGenerateLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080814] text-white">
      <Header userInfo={user} />
      <div className="flex flex-col items-center pt-5 grow px-4">
        <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-center">
          What do you wanna learn today?
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-2xl">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="Enter a topic e.g. Introduction to React"
            className="bg-white/5 border border-white/10 w-full rounded-xl h-12 text-white px-4 placeholder-white/30 focus:outline-none focus:border-[#e03278] transition-all"
          />
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generateLoading || !topic.trim()}
            className="w-full sm:w-auto bg-[#e03278] text-white font-bold px-6 h-12 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#c02060] transition-all whitespace-nowrap"
          >
            {generateLoading ? "Generating..." : "Generate"}
          </button>
        </div>
        {message && (
          <p className={`mt-4 text-sm ${message.includes("successfully") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}
        {courseLoading ? (<p>Fetching Courses</p>) : (
          <div className="mt-20 border-t border-white/30 w-full max-w-3xl flex flex-col">
            <h2 className="mt-5 text-xl sm:text-3xl">Courses</h2>
            {courses.length === 0 ? (
              <p className="mt-5 text-white/40 text-sm sm:text-lg">No courses created yet</p>
            ) : (<ul>
              {courses.map((course) => {
                <li key={course._id} className="my-3 text-sm sm:text-lg">{course.title}</li>
              })}
            </ul>)}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;