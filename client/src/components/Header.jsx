import { useState, useEffect, useRef } from "react"
import { LogoutButton } from "./auth"

const Profile = ({ email, name, image }) => {
    return (
        <div className="absolute top-16 right-3 z-50 bg-[#12122a] border border-[rgba(220,50,120,0.25)] rounded-2xl p-5 flex flex-col items-center gap-3 shadow-2xl min-w-[220px]">
            <img src={image} className="rounded-full h-16 w-16 object-cover" />
            <div className="text-center">
                <p className="font-semibold text-white">{name}</p>
                <p className="text-sm text-white/50">{email}</p>
            </div>
            <div className="w-full border-t border-white/10 pt-3">
                <LogoutButton />
            </div>
        </div>
    )
}

const Header = ({ userInfo }) => {
    const [showProfile, setShowProfile] = useState(false)
    const profileRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setShowProfile(false)
            }
        }
        if (showProfile) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [showProfile])

    return (
        <div className="relative flex justify-between items-center px-6 py-4 border-b border-white/5 bg-[rgba(8,8,20,0.9)] backdrop-blur-xl sticky top-0 z-40">
            <div className="text-[#e03278] text-xl font-extrabold tracking-tight">
                ✦ Text-to-Learn
            </div>
            <div ref={profileRef}>
                <img
                    src={userInfo?.picture}
                    className="rounded-full h-9 w-9 object-cover cursor-pointer ring-2 ring-transparent hover:ring-[#e03278] transition-all"
                    onClick={() => setShowProfile((prev) => !prev)}
                />
                {showProfile && (
                    <Profile
                        email={userInfo?.email}
                        name={userInfo?.name}
                        image={userInfo?.picture}
                    />
                )}
            </div>
        </div>
    )
}

export default Header