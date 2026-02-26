import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react"
import Loader from "../Loader"

const Video = ({ query }) => {
    const { getAccessTokenSilently } = useAuth0()
    const serverURL = import.meta.env.VITE_SERVER_URL
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [videoId, setVideoId] = useState(null);

    const findVideo = async () => {
        setLoading(true)
        try {
            const token = await getAccessTokenSilently()
            const response = await fetch(`${serverURL}/youtube?query=${encodeURIComponent(query)}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await response.json()
            return data.videoId
        } catch (error) {
            setErrorMessage("Couldn't load video.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchVideo = async () => {
            const id = await findVideo()
            setVideoId(id)
        }
        fetchVideo();
    }, [query])

    return (
        <div className="flex justify-center">
            {loading 
            ? <Loader /> 
            : errorMessage 
                ? <p className="text-white-500">{errorMessage}</p>
                : videoId 
                    ? <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        className="max-w-4xl mx-auto aspect-video"
                        allowFullScreen
                      />
                    : null
            }
        </div>        
    );
};

export default Video;