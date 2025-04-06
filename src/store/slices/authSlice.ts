import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  id: string,
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean,
  email: string,
  phone: string,
  firstName: string,
  lastName: string,
  birthDate: string,
  gender: string,
  emailOrNumber: string,
  reportSubscription?: boolean
}

const initialState: AuthState = {
  id: "",
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  gender: "",
  emailOrNumber: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<any>) => {
      if (!action.payload?.data) {
        return;
      }

      state.isAuthenticated = false
      state.id = action.payload?.data?.id
    },

    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },

    setEmailOrNumber: (state, action: PayloadAction<string>) => {
      state.emailOrNumber = action.payload;
    },

    resetAuth: (state) => {
      state.id = "";
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.email = "";
      state.phone = "";
      state.firstName = "";
      state.lastName = "";
      state.birthDate = "";
      state.gender = "";
      state.emailOrNumber = "";
    },

    verifyAccount: (state, action: PayloadAction<any>) => {
      if (!action.payload?.data) {
        return;
      }
      state.isAuthenticated = true;
      state.accessToken = action.payload?.data?.accessToken;
      state.refreshToken = action.payload?.data?.refreshToken;
    },

    setMyProfile: (state, action: PayloadAction<any>) => {
      state.id = action.payload?.id;
      state.firstName = action.payload?.firstName;
      state.lastName = action.payload?.lastName;
      state.birthDate = action.payload?.birthDate;
      state.gender = action.payload?.gender;
      state.email = action.payload?.email;
      state.phone = action.payload?.phone;
    },

    login: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    logout: (state) => {
      state.id = "";
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.email = "";
      state.phone = "";
      state.firstName = "";
      state.lastName = "";
      state.birthDate = "";
      state.gender = "";
      state.emailOrNumber = "";
    },

  },
});

export const { signup, setEmail, setPhone, setEmailOrNumber, resetAuth, verifyAccount, setMyProfile, login, logout } = authSlice.actions;
export default authSlice.reducer;
