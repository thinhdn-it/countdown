import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const Home = () => {
    const targetDate = new Date("2024-12-31T23:59:59"); // Thời gian đích thực tế
    // const targetDate = new Date(new Date().getTime() + 1 * 60 * 1000); // Đếm ngược 1 phút
    // const targetDate = new Date(new Date().getTime() + 5 * 60 * 1000); // Đếm ngược từ 5 phút
    // const targetDate = new Date(new Date().getTime() + 1 * 60 * 60 * 1000); // Đếm ngược từ 1 giờ
    // const targetDate = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); // Đếm ngược từ 2 giờ

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isFinished, setIsFinished] = useState(false);
    const { width, height } = useWindowSize();

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setIsFinished(true);
            }
        };

        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval); 
    }, []);

    const getCountdownStyle = () => {
        const visibleCount =
            (timeLeft.days > 0 ? 1 : 0) +
            (timeLeft.hours > 0 ? 1 : 0) +
            (timeLeft.minutes > 0 ? 1 : 0) +
            (timeLeft.seconds > 0 ? 1 : 0);

        switch (visibleCount) {
            case 1:
                return "text-8xl font-extrabold";
            case 2:
                return "text-7xl font-bold";
            case 3:
                return "text-6xl font-semibold";
            default:
                return "text-5xl font-medium";
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white relative">
            <h1 className="text-4xl font-bold mb-8 text-shadow">
                {isFinished ? "Happy New Year 2025!" : "Countdown to New Year 2025!"}
            </h1>

            {!isFinished && (
                <div className="flex gap-4 text-center mb-8">
                    {/* Hiển thị ngày nếu lớn hơn 0 */}
                    {timeLeft.days > 0 && (
                        <div className="countdown-number">
                            <p className={getCountdownStyle()}>{timeLeft.days}</p>
                            <p className="text-xl">Days</p>
                        </div>
                    )}
                    {/* Hiển thị giờ nếu giờ > 0 */}
                    {(timeLeft.days > 0 || timeLeft.hours > 0) && (
                        <div className="countdown-number">
                            <p className={getCountdownStyle()}>{timeLeft.hours}</p>
                            <p className="text-xl">Hours</p>
                        </div>
                    )}
                    {/* Hiển thị phút nếu phút > 0 */}
                    {(timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0) && (
                        <div className="countdown-number">
                            <p className={getCountdownStyle()}>{timeLeft.minutes}</p>
                            <p className="text-xl">Minutes</p>
                        </div>
                    )}
                    {/* Luôn hiển thị giây */}
                    <div className="countdown-number">
                        <p className={getCountdownStyle()}>{timeLeft.seconds}</p>
                        <p className="text-xl">Seconds</p>
                    </div>
                </div>
            )}

            {isFinished && <Confetti width={width} height={height} />}
        </div>
    );
};

export default Home;
