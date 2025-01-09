const Countdown = ({ timeLeft, isFinished }) => {
    return (
        <div className="flex flex-wrap gap-4 sm:gap-8 text-center mb-8 z-10 justify-center">
            {timeLeft.days > 0 && (
                <div className="countdown-number">
                    <p className="text-4xl sm:text-6xl md:text-7xl font-extrabold">{timeLeft.days}</p>
                    <p className="text-lg sm:text-xl">Ngày</p>
                </div>
            )}
            {(timeLeft.days > 0 || timeLeft.hours > 0) && (
                <div className="countdown-number">
                    <p className="text-4xl sm:text-6xl md:text-7xl font-extrabold">{timeLeft.hours}</p>
                    <p className="text-lg sm:text-xl">Giờ</p>
                </div>
            )}
            {(timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0) && (
                <div className="countdown-number">
                    <p className="text-4xl sm:text-6xl md:text-7xl font-extrabold">{timeLeft.minutes}</p>
                    <p className="text-lg sm:text-xl">Phút</p>
                </div>
            )}
            <div className="countdown-number">
                <p className="text-4xl sm:text-6xl md:text-7xl font-extrabold">{timeLeft.seconds}</p>
                <p className="text-lg sm:text-xl">Giây</p>
            </div>
        </div>
    );
};

export default Countdown;
