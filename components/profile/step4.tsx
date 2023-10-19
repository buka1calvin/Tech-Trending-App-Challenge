import { Box, Chip, Typography, Button } from "@mui/material";
import { useState } from "react";
import { productInterestsOptions } from "@/constants";

interface Step4Props {
  formData: {
    productInterests: string[];
  };
  handleProductInterestSelect: (interest: string) => void;
}

const Step4: React.FC<Step4Props> = ({ formData, handleProductInterestSelect }) => {
  const [showMore, setShowMore] = useState(false);

  const displayedInterests = showMore
    ? productInterestsOptions
    : productInterestsOptions.slice(0, 17);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      overflowY: 'auto', 
      position: 'relative',
    }}
    >
      <Typography className="font-semibold text-base text-center my-2">
        What are your product interests?
      </Typography>
      <Typography className="text-base text-center mb-6">Choose three or more.</Typography>

      <Box
        className="flex flex-wrap gap-2 justify-between md:px-8"
        sx={{
          maxWidth: '100%',
          height: showMore ? '100%' : '100%',
          overflowY: showMore ? 'auto' : 'visible', 
          position: 'relative', 
          '&:hover::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar': {
            width: '0px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#b0b0b0',
            borderRadius: '8px',
            transition: 'background-color 0.3s ease',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#888888',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
        }}
      >
        {displayedInterests.map((interest) => (
          <Chip
            key={interest}
            label={interest}
            clickable
            className={`${
              formData.productInterests.includes(interest)
                ? "bg-[#F2EBFE] text-primary border border-[#D0BAFD]"
                : "bg-[#F8F8F8] border-[#E3E3E7] text-color"
            } border text-xs`}
            onClick={() => handleProductInterestSelect(interest)}
            sx={{
              borderRadius: "24px",
              padding: "6px 12px",
              height: "auto",
              fontSize: "12px",
              backgroundColor: formData.productInterests.includes(interest)
                ? "#FBFAFF"
                : "transparent",
            }}
          />
        ))}
      </Box>

      <Button
      className="mt-5 text-primary text-sm font-medium"
        onClick={toggleShowMore}
      >
        {showMore ? "Show Less" : "Show More"}
      </Button>
    </Box>
  );
};

export default Step4;
