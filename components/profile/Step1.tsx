import { Box, Chip, Typography } from "@mui/material";
import { FormDataProps } from "@/types";
import { useAppDispatch,useAppSelector  } from "@/hooks/hooks";
import { useEffect } from "react";
import { fetchResponsibilities } from "@/lib/features/ResponsibilitiesSlice";

interface Step1Props {
  formData: FormDataProps;
  handleResponsibilitySelect: (responsibility: string) => void;
}

const Step1: React.FC<Step1Props> = ({ formData, handleResponsibilitySelect }) => {
  const dispatch = useAppDispatch();
  const { responsibilities, loading, error } = useAppSelector(state => state.responsibilities);

  useEffect(() => {
    dispatch(fetchResponsibilities());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (

  <Box className="flex flex-col items-center h-full">
    <Typography className="font-semibold text-[20px] leading-8 text-center mt-8 mb-6">
      What is your main work responsibility?
    </Typography>

    <Box className="grid grid-cols-2 gap-3">
      {responsibilities.map((responsibility) => (
        <Chip
          key={responsibility}
          label={responsibility}
          clickable
          className={`${formData.workResponsibility === responsibility ? "border-[#D0BAFD]" : "border-gray-300"} border`}
          onClick={() => handleResponsibilitySelect(responsibility)}
          variant={formData.workResponsibility === responsibility ? "filled" : "outlined"}
          sx={{
            borderRadius: "8px",
            padding: "12px 16px",
            height: "51px",
            width: "244px",
            backgroundColor: formData.workResponsibility === responsibility ? "#FBFAFF" : "transparent",
          }}
        />
      ))}
    </Box>
  </Box>
)};

export default Step1;
