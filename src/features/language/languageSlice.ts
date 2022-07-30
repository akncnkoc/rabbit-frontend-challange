import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  language: "tr" | "en";
} = {
  language: "en",
};

export const LanguageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
      localStorage.setItem("lang", action.payload);
    },
  },
});

export const { setLanguage } = LanguageSlice.actions;

export default LanguageSlice.reducer;
