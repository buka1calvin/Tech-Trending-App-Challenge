import { Box, Typography, Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useRef } from "react";

interface Step6Props {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const colors = [
  "#262626",
  "#BABABA",
  "#8D57FA",
  "#3268F4",
  "#DF6B6B",
  "#34B658",
  "#DEA22C",
  "#F2D777",
]; 

const userName = "Jane Doe";
const Step6: React.FC<Step6Props> = ({ handleFileChange }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <Box className="flex flex-col items-center h-full w-full px-10">
      <Typography className="font-semibold text-[20px] leading-8 text-center mt-2 mb-10">
        Choose your profile photo or a color:
      </Typography>

      <Box
        className=" flex items-center justify-center w-[185px] h-[44px] border-2 border-color rounded-md cursor-pointer mt-4"
        onClick={handleUploadClick}
      >
        <AddIcon className="text-color w-6 h-6" />
        <Typography className="text-base text-color">Select Image</Typography>
      </Box>

      <input
        type="file"
        name="profilePhoto"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Typography className="text-[#939393] text-xs mt-2 mb-10">
        Recommended size: 400x400px
      </Typography>

      <Box className="flex items-center w-full mb-6">
        <Box className="flex-grow border-t border-gray-400"></Box>
        <Typography className="mx-4 text-gray-500 text-sm">Or select color</Typography>
        <Box className="flex-grow border-t border-gray-400"></Box>
      </Box>

      <Box className="flex items-center gap-8">
        <Avatar
          sx={{
            width: 120,
            height: 120,
            fontSize: "48px",
            backgroundColor: selectedColor || "#E0E0E0",
          }}
        >
          {userName.charAt(0).toUpperCase()}
        </Avatar>

        <Box className="flex gap-5">
          {colors.map((color) => (
            <Box
              key={color}
              className={`w-6 h-6 rounded-full cursor-pointer ${
                selectedColor === color
                  ? "ring-2 ring-offset-2 ring-indigo-500"
                  : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Step6;
