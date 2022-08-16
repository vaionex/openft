import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  detailsValues: {
    name: '',
    username: '',
    email: '',
    role: '',
  },
  choosePasswordValues: {
    password: '',
    confirmPassword: '',
  },
  uploadPhotoValues: {
    coverImage: '',
    profileImage: '',
  },
  addSocialsValues: {
    facebook: '',
    instagram: '',
    website: '',
  },
  isPending: false,
  errorMessage: null,
  isAuthenticated: false,
}

const registrationFormSlice = createSlice({
  name: 'registrationForm',
  initialState,
  reducers: {
    setDetailsValues: (state, action) => {
      state.detailsValues = action.payload
    },
    setChoosePasswordValues: (state, action) => {
      state.choosePasswordValues = action.payload
    },
    setUploadPhotoValues: (state, action) => {
      state.uploadPhotoValues = action.payload
    },
    setAddSocialsValues: (state, action) => {
      state.addSocialsValues = action.payload
    },
  },
})

export default registrationFormSlice
export const {
  setDetailsValues,
  setChoosePasswordValues,
  setUploadPhotoValues,
  setAddSocialsValues,
} = registrationFormSlice.actions
