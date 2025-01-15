import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import LunarCalendar from "lunar-calendar";
import Countdown from "../components/Countdown";
import LunarDate from "../components/LunarDate";
import AudioControl from "../components/AudioControl";
import Link from "next/link";

const Home = () => {
    const targetDate = new Date("2025-01-29T00:00:00");
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isFinished, setIsFinished] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [lunarDate, setLunarDate] = useState({});
    const { width, height } = useWindowSize();
    const audioRef = useRef(null);

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({
                    days: String(days).padStart(2, "0"),
                    hours: String(hours).padStart(2, "0"),
                    minutes: String(minutes).padStart(2, "0"),
                    seconds: String(seconds).padStart(2, "0"),
                });
            } else {
                setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
                setIsFinished(true);
            }
        };

        const interval = setInterval(() => {
            updateCountdown();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const updateLunarDate = () => {
            const now = new Date();
            const lunar = LunarCalendar.solarToLunar(
                now.getFullYear(),
                now.getMonth() + 1,
                now.getDate()
            );
            setLunarDate(lunar);
        };

        updateLunarDate();
        const lunarInterval = setInterval(() => {
            updateLunarDate();
        }, 1000);

        return () => clearInterval(lunarInterval);
    }, []);

    const handleUserInteraction = () => {
        if (audioRef.current && isMuted) {
            audioRef.current
                .play()
                .then(() => {
                    setIsMuted(false);
                })
                .catch((error) => {
                    console.error("Không thể phát nhạc tự động:", error);
                });
        }
    };

    const toggleMute = () => {
        setIsMuted((prevState) => {
            const newMutedState = !prevState;
            if (audioRef.current) {
                audioRef.current.muted = newMutedState;
            }
            return newMutedState;
        });
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen text-white text-center bg-cover bg-center"
            style={{ backgroundImage: "url('/lny2025.jpeg')" }}
            onClick={handleUserInteraction}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg"></div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-shadow z-10">
                {isFinished ? "Chúc Mừng Năm Mới" : "Đếm Ngược Đến Tết Âm Lịch 2025"}
            </h1>
            {!isFinished && <Countdown timeLeft={timeLeft} isFinished={isFinished} />}
            {isFinished && <Confetti width={width} height={height} />}
            <audio ref={audioRef} autoPlay loop muted={isMuted}>
                <source src="/mbg.mp3" type="audio/mp3" />
            </audio>
            <LunarDate lunarDate={lunarDate} />
            <div className="flex items-center space-x-4 mt-4 z-20">
                <AudioControl isMuted={isMuted} toggleMute={toggleMute} />
            </div>
            <Link
                href="/lich"
                className="absolute top-4 right-4 font-bold text-xl px-6 py-3 bg-orange-400 rounded-lg shadow-md hover:bg-orange-500 transition duration-200 z-30"
            >
                Lịch
            </Link>
        </div>
    );
};

export default Home;
