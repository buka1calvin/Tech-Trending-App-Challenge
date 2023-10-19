import { Box, Typography, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Image from "next/image";
import useSearch from "@/hooks/useSearch";
import { FormDataProps } from "@/types";
import { useAppSelector,useAppDispatch } from "@/hooks/hooks";
import { useEffect } from "react";
import { fetchProducts } from "@/lib/features/ProductsSlice";

interface Step5Props {
  formData: FormDataProps;
  handleProductSelect: (product: string) => void; 
  handleProductDelete: (product: string) => void;
}

const Step5: React.FC<Step5Props> = ({ formData, handleProductSelect, handleProductDelete }) => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);
  
  const { query, handleSearch, filteredData } = useSearch(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
console.log("products===",products)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <Box className="flex flex-col items-center h-full w-full px-10">
      <Typography className="font-semibold text-[20px] leading-8 text-center mt-2 mb-1">
        Select 3+ products that you use:
      </Typography>
      <Typography className="text-base text-center mb-6">
        Build your tech stack from the get-go.
      </Typography>

      <div className="relative flex items-center h-[44px] w-full">
        <SearchIcon className="absolute left-3 text-[#939393]" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}
          className="h-full w-full pl-10 pr-4 py-2 bg-[#FDFDFD] border border-[#E3E3E7] rounded-md focus:ring-indigo-500 focus:border-indigo-500 font-normal sm:text-sm text-[#939393]"
        />
      </div>

      <Box className="mt-5 w-full flex flex-wrap gap-2">
        
        {formData.products.map((product: string) => (
          <Chip
            key={product}
            label={product}
            onDelete={() => handleProductDelete(product)}
            className="bg-[#F2EBFE] text-primary border border-[#D0BAFD]"
          />
        ))}
      </Box>

      <Typography className="self-start text-sm mt-5">Products</Typography>

      <Box
        className="w-full flex-grow max-h-[170px]" 
        sx={{
          overflowY: "auto",
          position: "relative",
          "&:hover::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar": {
            width: "0px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#b0b0b0",
            borderRadius: "8px",
            transition: "background-color 0.3s ease",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#888888",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent", 
          },
        }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((product: any, index: number) => (
            <Box
              key={index}
              className="flex items-center justify-between py-2 border-b hover:bg-slate-100 cursor-pointer"
              onClick={() => handleProductSelect(product.name)}
            >
              <div className="flex items-center gap-3 ">
                <img
                  src={product?.image}
                  alt={product.name}
                  width={40}
                  height={40}
                />
                <Typography className="text-base text-color font-medium">
                  {product.name}
                </Typography>
              </div>
              <AddCircleOutlineIcon className="text-[#DDDEDF]" />
            </Box>
          ))
        ) : (
          <Typography className="text-center mt-3">
            No products found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Step5;
