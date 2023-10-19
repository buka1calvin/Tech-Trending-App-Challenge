import { Box, Typography, Button } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';

const Step8: React.FC = () => (
  <Box className="text-color flex flex-col items-center h-full w-full px-10 pb-[46px]">
    <Typography className="font-semibold text-xl text-center mt-2 mb-1">You’re all set!</Typography>
    <Typography className="text-base text-center mb-6">Start stackin’, reviewin’, discussin’ and more... 🙌 </Typography>
    <Button onClick={() => alert("Profile Completed!")}><DoneIcon className="bg-[#8d57fa7a] text-primary rounded-full w-[60px] h-[60px]"/></Button>
  </Box>
);

export default Step8;
