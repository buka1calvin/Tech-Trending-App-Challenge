import { Box, Chip, Typography } from "@mui/material";
import { FormData } from "@/types";
import { companySizes } from "@/constants";

interface Step2Props {
  formData: FormData;
  handleCompanySizeSelect: (companySize: string) => void;
}

const Step2: React.FC<Step2Props> = ({ formData, handleCompanySizeSelect }) => (
  <Box className="flex flex-col items-center h-full">
    <Typography className="font-semibold text-[20px] leading-8 text-center mt-2 mb-6">
      What is your company size?
    </Typography>

    <Box className="grid grid-cols-2 gap-3">
      {companySizes.map((size) => (
        <Chip
          key={size}
          label={size}
          clickable
          className={`${formData.companySize === size ? "border-[#D0BAFD]" : "border-gray-300"} border`}
          onClick={() => handleCompanySizeSelect(size)}
          variant={formData.companySize === size ? "filled" : "outlined"}
          sx={{
            borderRadius: "8px",
            padding: "12px 16px",
            height: "51px",
            width: "244px",
            backgroundColor: formData.companySize === size ? "#FBFAFF" : "transparent",
          }}
        />
      ))}
    </Box>
  </Box>
);

export default Step2;
