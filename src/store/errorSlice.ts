import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ErrorState = {
  errorMessage: string;
}

const initialState: ErrorState = {
  errorMessage: ""
};

export const empSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    updateErrorMsg: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    }
  }
})

export const {updateErrorMsg} = empSlice.actions;

export default empSlice.reducer;