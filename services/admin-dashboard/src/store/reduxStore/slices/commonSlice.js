import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  appInfo: null,
  isInitialized: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setAppInfo: (state, action) => {
      state.appInfo = action.payload;
    },
    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
    clearCommonState: (state) => {
      state.profile = null;
      state.appInfo = null;
      state.isInitialized = false;
    },
  },
});

export const {
  setProfile,
  setAppInfo,
  setInitialized,
  clearCommonState,
} = commonSlice.actions;

export default commonSlice.reducer;