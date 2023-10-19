import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface Responsibility {
  id: string;
  name: string;
}

interface ResponsibilityState {
  responsibilities: Array<string>;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ResponsibilityState = {
  responsibilities: [],
  loading: false,
  error: null,
};

// Async thunk to fetch responsibilities from GraphQL API
export const fetchResponsibilities = createAsyncThunk('responsibilities/fetchResponsibilities', async () => {
  const response = await fetch('http://ec2-13-51-194-147.eu-north-1.compute.amazonaws.com/api/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetResponsibilities {
          getResponsibilities {
            data {
              name
            }
          }
        }
      `,
    }),
  });
// 'https://jsonplaceholder.typicode.com/posts'
  const { data } = await response.json();
  return data.getResponsibilities.data.map((responsibility: { name: string }) => responsibility.name);
});

export const responsibilitiesSlice = createSlice({
  name: 'responsibilities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResponsibilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResponsibilities.fulfilled, (state, action: PayloadAction<Array<string>>) => {
        state.loading = false;
        state.responsibilities = action.payload;
      })
      .addCase(fetchResponsibilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch responsibilities';
      });
  },
});

export default responsibilitiesSlice.reducer;
