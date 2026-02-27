import { LoginButton, SignupButton } from "../components/auth";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#080814] to-[#1a0a1e] text-white">
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
        <div className="text-[#e03278] text-xl font-extrabold tracking-tight">
          ✦ Text-to-Learn
        </div>
        <LoginButton />
      </div>
      <div className="flex flex-col items-center justify-center grow px-6 text-center gap-6">
        <div className="text-xs font-mono text-[#e03278] tracking-widest uppercase border border-[#e03278]/30 px-3 py-1 rounded-full">
          AI-Powered Learning
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-2xl leading-tight">
          Learn anything.<br />
          <span className="text-[#e03278]">Generated for you.</span>
        </h1>
        <p className="text-white/40 text-base sm:text-lg max-w-md">
          Type a topic. Get a full course with lessons, quizzes, and videos instantly.
        </p>
        <SignupButton />
      </div>
      <div className="text-center py-4 text-white/20 text-xs">
        Built for learning. Powered by Gemini.
      </div>
    </div>
  );
};

export default LandingPage;