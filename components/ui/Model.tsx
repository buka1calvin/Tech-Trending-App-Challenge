"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { Avatar, Button } from "@mui/material";
import Step1 from "../profile/Step1";
import Step2 from "../profile/step2";
import Step3 from "../profile/Step3";
import Step4 from "../profile/step4";
import Step5 from "../profile/Step5";
import Step6 from "../profile/Step6";
import Step7 from "../profile/Step7";
import Step8 from "../profile/step8";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { FormDataProps } from "@/types";
import { submitProfileForm } from "@/lib/features/ProfileSlice";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 580,
  height: 555,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "4px",
};

export default function ReusableModal({
  open,
  handleClose,
  username,
}: {
  open: boolean;
  handleClose: () => void;
  username: string;
}) {
  const [isMultiStep, setIsMultiStep] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 8;

  const [formData, setFormData] = useState<FormDataProps>({
    workResponsibility: "",
    companySize: "",
    targetAudience: "",
    productInterests: [],
    products: [],
    profilePhoto: null,
    introduction: {
      headline: "",
      jobTitle: "",
      location: "",
    },
  });

  // Redux state and dispatch setup
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.profile);

  console.log("formData===", formData);

  const handleNext = () =>
    setStep((prev) => (prev < totalSteps ? prev + 1 : prev));

  const handlePrevious = () => {
    if (step === 1) {
      setIsMultiStep(false);
    } else {
      setStep((prev) => (prev > 1 ? prev - 1 : prev));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, profilePhoto: e.target.files[0] });
    }
  };

  const handleResponsibilitySelect = (responsibility: string) => {
    setFormData({ ...formData, workResponsibility: responsibility });
  };

  const handleCompanySizeSelect = (companySize: string) => {
    setFormData({ ...formData, companySize });
  };

  const handleTargetAudienceSelect = (audience: string) => {
    setFormData({ ...formData, targetAudience: audience });
  };

  const handleProductInterestSelect = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      productInterests: prev.productInterests.includes(interest)
        ? prev.productInterests.filter((item) => item !== interest)
        : [...prev.productInterests, interest],
    }));
  };

  const handleProductSelect = (product: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter((item) => item !== product)
        : [...prev.products, product],
    }));
  };

  const handleProductDelete = (product: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((item) => item !== product),
    }));
  };

  const handleIntroChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      introduction: {
        ...prevFormData.introduction,
        [name]: value,
      },
    }));
  };

  const handleSubmit = () => {
    const formDataToSend = new FormData();
  
    formDataToSend.append('workResponsibility', formData.workResponsibility);
    formDataToSend.append('companySize', formData.companySize);
    formDataToSend.append('targetAudience', formData.targetAudience);
    formDataToSend.append('productInterests', JSON.stringify(formData.productInterests));
    formDataToSend.append('products', JSON.stringify(formData.products));

    if (formData.profilePhoto) {
      formDataToSend.append('profilePhoto', formData.profilePhoto);
    }
    formDataToSend.append('headline', formData.introduction.headline);
    formDataToSend.append('jobTitle', formData.introduction.jobTitle);
    formDataToSend.append('location', formData.introduction.location);
  
    dispatch(submitProfileForm(formDataToSend as any)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        alert("Form submitted successfully!");
        handleClose();
      } else {
        alert(`Error submitting form: ${error}`);
      }
    });
  };
  
  
  

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            formData={formData}
            handleResponsibilitySelect={handleResponsibilitySelect}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            handleCompanySizeSelect={handleCompanySizeSelect}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            handleTargetAudienceSelect={handleTargetAudienceSelect}
          />
        );
      case 4:
        return (
          <Step4
            formData={formData}
            handleProductInterestSelect={handleProductInterestSelect}
          />
        );
      case 5:
        return (
          <Step5
            formData={formData}
            handleProductSelect={handleProductSelect}
            handleProductDelete={handleProductDelete}
          />
        );
      case 6:
        return <Step6 handleFileChange={handleFileChange} />;
      case 7:
        return <Step7 formData={formData} handleIntroChange={handleIntroChange} />;
      case 8:
        return <Step8 />;
      default:
        return null;
    }
  };

  const renderProgressBar = () => {
    return (
      <Box className="flex justify-between gap-2 mb-4 w-full">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-[79.43px] h-1 ${
              index < step
                ? "bg-primary"
                : index === step
                ? "bg-[#D0BAFD]"
                : "bg-gray-300"
            }`}
          />
        ))}
      </Box>
    );
  };

  return (
    <Modal
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(39, 39, 39, 0.9)",
          overflowY: "scroll",
        },
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle} className="rounded-xl text-color h-fit">
        <Box className="border-b h-14 px-8 flex items-center">
          <Image src="/icons/trending-up.svg" alt="" width={24} height={24} />
        </Box>
        {!isMultiStep ? (
          <Box className="rounded-b-xl flex flex-col items-center gap-9 text-center md:py-[61px] md:px-[86px]">
            <Avatar
              sx={{
                bgcolor: "#8D57FA",
                width: "140.7px",
                height: "140.7px",
                fontSize: "74.07px",
                fontWeight: 800,
              }}
            >
              {username.slice(0, 1)}
            </Avatar>
            <Box className="flex flex-col gap-3">
              <Typography className="text-xl font-semibold">
                Welcome {username}🙌
              </Typography>
              <Typography className="text-sm font-normal">
                We need a few details to personalize your experience.
              </Typography>
            </Box>
            <Button
              variant="contained"
              className="bg-primary rounded-lg text-white w-full py-[10px] text-base font-medium"
              onClick={() => setIsMultiStep(true)}
            >
              Let’s do it
            </Button>
            <Typography className="text-sm text-[#686868]">
              This will only take a minute.
            </Typography>
          </Box>
        ) : (
          <Box>
            <Box
              className={`${
                step === 8 ? "h-fit" : "min-h-[490px]"
              } flex flex-col items-center rounded-b-xl`}
            >
              {renderProgressBar()}

              {renderStep()}
              <Box
                className={`${
                  step === 8 ? "hidden" : "flex"
                } justify-between items-center w-full px-4 py-3 text-sm text-primary border-t bg-white rounded-b-xl`}
              >
                <Button onClick={handlePrevious} className="py-2 px-3 rounded-md">
                  {step === 1 ? "Back" : "Previous"}
                </Button>
                {step < totalSteps && (
                  <Button
                    onClick={handleNext}
                    className="h-[44px] w-[100px] rounded-md bg-[#F2EBFE]"
                    variant="contained"
                    disableElevation
                  >
                    Next
                  </Button>
                )}
                {step === totalSteps && (
                  <Button
                    variant="contained"
                    className="h-[44px] w-[100px] rounded-md bg-[#F2EBFE]"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
