import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa"; // Import FontAwesome icons

const Home = () => {
    const targetDate = new Date("2024-12-31T23:59:59");
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isFinished, setIsFinished] = useState(false);
    const [isMuted, setIsMuted] = useState(true); // Bắt đầu với âm thanh bị tắt
    const { width, height } = useWindowSize();
    const audioRef = useRef(null); // Định nghĩa audioRef

    useEffect(() => {
        // Cập nhật thời gian đếm ngược
        const updateCountdown = () => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({ 
                    days: String(days).padStart(2, '0'), 
                    hours: String(hours).padStart(2, '0'), 
                    minutes: String(minutes).padStart(2, '0'), 
                    seconds: String(seconds).padStart(2, '0') 
                });
            } else {
                setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
                setIsFinished(true);
            }
        };

        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleUserInteraction = () => {
        if (audioRef.current && isMuted) {
            audioRef.current.play().then(() => {
                setIsMuted(false); // Bỏ mute khi người dùng tương tác
            }).catch((error) => {
                console.error("Không thể phát nhạc tự động:", error);
            });
        }
    };

    const toggleMute = () => {
        setIsMuted((prevState) => {
            const newMutedState = !prevState;
            // Cập nhật trạng thái của thẻ audio
            if (audioRef.current) {
                audioRef.current.muted = newMutedState;
            }
            return newMutedState;
        });
    };

    return (
        <div
            className="relative flex flex-col items-center justify-center min-h-screen text-white text-center bg-cover bg-center"
            style={{ backgroundImage: "url('/bg.jpg')" }}
            onClick={handleUserInteraction} // Bắt sự kiện nhấp chuột để phát nhạc
        >
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg"></div> {/* Blur overlay */}

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-shadow z-10">
                {isFinished ? "Happy New Year 2025!" : "Countdown to New Year 2025!"}
            </h1>

            {!isFinished && (
                <div className="flex flex-wrap gap-4 sm:gap-8 text-center mb-8 z-10 justify-center"> {/* Tăng khoảng cách giữa các phần tử */}
                    {timeLeft.days > 0 && (
                        <div className="countdown-number">
                            <p className="text-4xl sm:text-6xl md:text-7xl font-extrabold">{timeLeft.days}</p>
                            <p className="text-lg sm:text-xl">Days</p>
                        </div>
                    )}
                    {(timeLeft.days > 0 || timeLeft.hours > 0) && (
                        <div className="countdown-number">
                            <p className="text-4xl sm:text-6xl md:text-7xl font-extrabold">{timeLeft.hours}</p>
                            <p className="text-lg sm:text-xl">Hours</p>
                        </div>
                    )}
                    {(timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0) && (
                        <div className="countdown-number">
                            <p className="text-4xl sm:text-6xl md:text-7xl font-extrabold">{timeLeft.minutes}</p>
                            <p className="text-lg sm:text-xl">Minutes</p>
                        </div>
                    )}
                    <div className="countdown-number">
                        <p className="text-4xl sm:text-6xl md:text-7xl font-extrabold">{timeLeft.seconds}</p>
                        <p className="text-lg sm:text-xl">Seconds</p>
                    </div>
                </div>
            )}

            {isFinished && <Confetti width={width} height={height} />}

            {/* Nhạc nền với chế độ autoPlay và muted ban đầu */}
            <audio ref={audioRef} autoPlay loop muted={isMuted}>
                <source src="/mbg.mp3" type="audio/mp3" />
            </audio>

            {/* Icon điều khiển âm thanh */}
            <div
                className="absolute top-4 left-4 text-white text-3xl cursor-pointer"
                onClick={toggleMute} // Bắt sự kiện nhấp vào icon
            >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </div>
        </div>
    );
};

export default Home;
