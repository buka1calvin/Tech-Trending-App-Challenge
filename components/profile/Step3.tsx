import { Box, Chip, Typography } from "@mui/material";
import { FormData } from "@/types";
import { targetAudiences } from "@/constants";

interface Step3Props {
  formData: FormData;
  handleTargetAudienceSelect: (audience: string) => void;
}

const Step3: React.FC<Step3Props> = ({ formData, handleTargetAudienceSelect }) => (
  <Box className="flex flex-col items-center h-full">
    <Typography className="font-semibold text-[20px] leading-8 text-center mt-2 mb-6">
      Who is your target audience?
    </Typography>

    <Box className="grid grid-cols-1 gap-3">
      {targetAudiences.map((audience) => (
        <Chip
          key={audience}
          label={audience}
          clickable
          className={`${formData.targetAudience === audience ? "border-[#D0BAFD]" : "border-gray-300"} border`}
          onClick={() => handleTargetAudienceSelect(audience)}
          variant={formData.targetAudience === audience ? "filled" : "outlined"}
          sx={{
            borderRadius: "8px",
            padding: "12px 16px",
            height: "51px",
            width: "244px",
            backgroundColor: formData.targetAudience === audience ? "#FBFAFF" : "transparent",
          }}
        />
      ))}
    </Box>
  </Box>
);

export default Step3;
