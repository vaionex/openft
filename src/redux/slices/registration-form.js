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
  currentStep: 1,
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
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload
    },
  },
})

export default registrationFormSlice
export const {
  setDetailsValues,
  setChoosePasswordValues,
  setUploadPhotoValues,
  setAddSocialsValues,
  setCurrentStep,
} = registrationFormSlice.actions
