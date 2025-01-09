import React from "react";

const LunarDate = ({ lunarDate }) => {
    const { lunarYear, lunarMonth, lunarDay, isLeap } = lunarDate;

    return (
        <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-lg shadow-md text-sm sm:text-base">
            {lunarYear && lunarMonth && lunarDay ? (
                <p>
                    Hôm nay là:{" "}
                    <span className="font-bold">
                        {`Ngày ${lunarDay}, Tháng ${isLeap ? "Nhuận " : ""}${lunarMonth}, Năm ${lunarYear}`}
                    </span>
                </p>
            ) : (
                <p>Đang tải ngày âm lịch...</p>
            )}
        </div>
    );
};

export default LunarDate;
