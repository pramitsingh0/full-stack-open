import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    newNotification(state, action) {
      const message = action.payload;
      return message;
    },
    resetNotification(state, action) {
      return "";
    },
  },
});

export const notification = (message, time) => {
  return async (dispatch) => {
    setTimeout(() => dispatch(resetNotification()), time * 1000);
    dispatch(newNotification(message));
  };
};

export const { newNotification, resetNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
