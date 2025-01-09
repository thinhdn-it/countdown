import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const AudioControl = ({ isMuted, toggleMute }) => {
    return (
        <div
            className="absolute top-4 left-4 text-white text-3xl cursor-pointer"
            onClick={toggleMute}
        >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </div>
    );
};

export default AudioControl;