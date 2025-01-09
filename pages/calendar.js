import { useState, useEffect } from "react";
import LunarCalendar from "lunar-calendar";
import Link from "next/link";
import specialDays from "../data/specialDays";

const Calendar = () => {
    const [lunarDates, setLunarDates] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const getLunarMonth = (month, year) => {
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const lunarDates = [];
            for (let day = 1; day <= daysInMonth; day++) {
                const lunar = LunarCalendar.solarToLunar(year, month + 1, day);
                lunarDates.push(lunar ? lunar : { lunarDay: "N/A", lunarMonth: "N/A" });
            }
            return lunarDates;
        };

        setLunarDates(getLunarMonth(currentMonth, currentYear));
    }, [currentMonth, currentYear]);

    const changeMonth = (direction) => {
        if (direction === "prev") {
            setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
        } else if (direction === "next") {
            setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
        }
    };

    const goToCurrentDate = () => {
        setCurrentMonth(new Date().getMonth());
        setCurrentYear(new Date().getFullYear());
    };

    const renderCalendar = () => {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const weeks = [];
        let currentWeek = [];
    
        const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
        for (let i = 0; i < adjustedFirstDay; i++) {
            currentWeek.push(null);
        }
    
        for (let day = 1; day <= daysInMonth; day++) {
            const lunar = lunarDates[day - 1];
    
            const isSpecial = lunar
                ? specialDays.some(
                    (special) =>
                        special.day === lunar.lunarDay &&
                        special.month === lunar.lunarMonth
                )
                : false;
    
            const specialDescription = isSpecial
                ? specialDays.find(
                    (special) =>
                        special.day === lunar.lunarDay &&
                        special.month === lunar.lunarMonth
                )?.description
                : null;
    
            currentWeek.push({
                day,
                lunarDay: lunar?.lunarDay || "N/A",
                lunarMonth: lunar?.lunarMonth || "N/A",
                isSpecial,
                specialDescription,
            });
    
            if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        }
    
        while (currentWeek.length < 7) {
            currentWeek.push(null);
        }
        if (currentWeek.length > 0) {
            weeks.push(currentWeek);
        }
    
        return weeks;
    };

    const getDayNames = () => {
        return ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"];
    };

    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    return (
        <div
            className="relative flex flex-col items-center justify-center min-h-screen text-white text-center bg-cover bg-center px-2 sm:px-4 lg:px-8"
            style={{ backgroundImage: "url('/lny2025.jpeg')" }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg"></div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-shadow z-10">
                Lịch Âm Lịch - Tháng {currentMonth + 1}/{currentYear}
            </h1>
            <div className="calendar-nav text-center mb-4 z-10 flex flex-wrap justify-center gap-2">
                <button onClick={() => changeMonth("prev")} className="px-3 py-2 bg-gray-400 rounded hover:bg-gray-400">
                    Tháng Trước
                </button>
                <button onClick={goToCurrentDate} className="px-3 py-2 bg-gray-400 rounded hover:bg-gray-400">
                    Hiện Tại
                </button>
                <button onClick={() => changeMonth("next")} className="px-3 py-2 bg-gray-400 rounded hover:bg-gray-400">
                    Tháng Sau
                </button>
            </div>
            <div className="calendar-container w-full max-w-4xl grid gap-1 z-10 rounded-lg p-4 backdrop-blur-sm bg-white bg-opacity-10 shadow-lg">
                <div className="grid grid-cols-7 gap-1">
                    {getDayNames().map((dayName, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-center text-center font-bold p-2 text-lg bg-orange-400 rounded"
                        >
                            {dayName}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {renderCalendar().flat().map((date, idx) => (
                        <div
                            key={idx}
                            className={`day flex flex-col items-center justify-center text-center p-4 rounded ${date
                                ? "bg-white hover:bg-orange-300"
                                : "bg-transparent"
                            } ${
                                date &&
                                date.day === todayDay &&
                                currentMonth === todayMonth &&
                                currentYear === todayYear
                                    ? "!bg-orange-400 text-black z-10"
                                    : "text-black"
                            } ${
                                date?.isSpecial
                                    ? "!bg-orange-300 text-white z-10 font-bold"
                                    : "text-black"
                            }`}
                            style={{ minWidth: "50px", minHeight: "60px" }}
                            title={date?.specialDescription || ""}
                        >
                            {date ? (
                                <>
                                    <div className="text-lg">{date.day}</div> {/* Tăng cỡ chữ */}
                                    <div className="lunar-date text-sm text-gray-600">
                                        {date.lunarDay}/{date.lunarMonth}
                                    </div>
                                    {date.isSpecial && (
                                        <div className="text-sm text-yellow-80">{date.specialDescription}</div>
                                    )}
                                </>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
            <Link
                href="/"
                className="absolute top-4 right-4 font-bold text-xl px-6 py-3 bg-orange-400 rounded-lg shadow-md hover:bg-orange-500 transition duration-200 z-30"
            >
                Countdown
            </Link>
        </div>
    );
};

export default Calendar;
