import { FormData } from "@/types";
import { Avatar, Box, Typography, TextField } from "@mui/material";

interface Step7Props {
  formData: FormData;
  handleIntroChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

const Step7: React.FC<Step7Props> = ({ formData, handleIntroChange }) => (
  <Box className="text-color flex flex-col items-center h-full w-full px-10">
    <Typography className="font-semibold text-[20px] leading-8 text-center mt-2 mb-1">
      Introduce yourself to the community:
    </Typography>
    <Typography className="text-base text-center mb-6">
      Let members learn more about you.
    </Typography>
    <Box className="flex items-center w-full justify-center gap-2 mb-3">
      <Avatar
        alt="Jane Doe"
        src="https://randomuser.me/api/portraits/women/2.jpg"
        className="w-12 h-12"
      />
      <Typography className="text-base font-medium">Jane Doe</Typography>
    </Box>
    <Box className="w-full flex flex-col gap-3">
    <input
      name="headline"
      type="text"
      placeholder="Headline; e.g ‘Marketing and Sales Tech lover’"
      value={formData.introduction.headline}
      onChange={handleIntroChange}
      className="border border-[#E3E3E7] py-3 px-4 rounded-lg text-sm font-normal"
    />

    <input
      name="jobTitle"
      type="text"
      placeholder="Job title"
      value={formData.introduction.jobTitle}
      onChange={handleIntroChange}
      className="border border-[#E3E3E7] py-3 px-4 rounded-lg text-sm font-normal"
    />

    <input
      name="location"
      type="text"
      placeholder="Location"
      value={formData.introduction.location}
      onChange={handleIntroChange}
      className="border border-[#E3E3E7] py-3 px-4 rounded-lg text-sm font-normal"
    />
    </Box>
  </Box>
);

export default Step7;
