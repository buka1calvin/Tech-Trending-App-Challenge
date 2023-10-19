export interface Introduction {
  headline: string; // New field
  jobTitle: string; // New field
  location: string; // New field
}
export type FormDataProps = {
    workResponsibility: string;
    companySize: string;
    targetAudience: string;
    productInterests: string[];
    products: string[];
    profilePhoto: File | null;
    introduction: Introduction;
  };