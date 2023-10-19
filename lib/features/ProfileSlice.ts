import { FormDataProps } from '@/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ProfileState {
  formData: FormDataProps | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProfileState = {
  formData: null,
  status: 'idle',
  error: null,
};

export const submitProfileForm = createAsyncThunk(
  'profile/submitForm',
  async (formData: FormDataProps, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      console.log("data===+++",data)
      return data;
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitProfileForm.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitProfileForm.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.formData = action.payload;
      })
      .addCase(submitProfileForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
