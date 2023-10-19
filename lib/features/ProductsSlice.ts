import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the product object
interface Product {
  id: string;
  name: string;
  image: string;
  createdAt: string;
}

// Define a type for the slice state
interface ProductState {
  products: Array<Product>;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk to fetch products from GraphQL API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('http://ec2-13-51-194-147.eu-north-1.compute.amazonaws.com/api/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetProducts {
          getProducts {
            data {
              id
              name
              image
              createdAt
            }
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  // Return the products data
  console.log("data===",data)
  return data.getProducts.data;
});

// Create the slice
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Array<Product>>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

// Export the reducer to add it to the store
export default productsSlice.reducer;
