import React from "react";
import Image from "next/image";
import styles from "@/styles/Home/Projects.module.css";
import { HandshakeOutlined, VerifiedOutlined } from "@mui/icons-material";
import { ProgressBar } from "../common";

function ProjectBox({
  title = "Chess.com",
  subtitle = "Chess International",
  description = "3-minute chess tournament. No entry fee. Open tournament. No cheating. Cheaters will be banned from Chess.com.",
  progress = 60,
  participants = "30",
  maxParticipants = "1,000",
  type = "Online Chess Tournament",
  verified = true,
  image = "/chess.jpg",
}) {
  return (
    <div className="rounded-lg bg-muted/50 border shadow-md transition-transform hover:translate-y-[-5px] hover:shadow-lg projectContainer">
      {/* Image Section */}
      <Image
        src={image}
        alt={type}
        height={125}  // Fixed height for the image to match the container's height
        width={350}  
        className={styles.imageBottom} // Ensure image covers the container
      />

      {/* Content Section */}
      <div className="p-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          {/* Verified Badge */}
          <div className="flex items-center space-x-1">
            <VerifiedOutlined className={`text-${verified ? "green-500" : "gray-400"}`} />
            <span className={`text-xs font-semibold text-${verified ? "green-500" : "gray-400"}`}>
              {verified ? "Verified" : "Unverified"}
            </span>
          </div>

          {/* Tournament Type */}
          <div className="flex items-center space-x-1">
            <HandshakeOutlined className="text-red-500" />
            <span className="text-xs font-semibold text-blue-500">{type}</span>
          </div>
        </div>

        {/* Tournament Details */}
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm font-medium text-primary">{subtitle}</p>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
        </div>

        {/* Progress Section */}
        <div className="mt-4">
          <span className="text-xs font-medium">
            {participants} <span className="text-gray-500">/ {maxParticipants}</span>
          </span>
          <ProgressBar variant="determinate" value={progress} />
        </div>

        {/* Participate Button */}
        <div className="flex justify-center mt-4">
          <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md shadow-sm hover:bg-primary-dark focus:outline-none">
            Participate
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectBox;
