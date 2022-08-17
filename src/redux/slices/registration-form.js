import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  detailsValues: {
    name: 'eeeee',
    username: 'eeee',
    email: 'ee@ee.com',
    role: '',
  },
  passwordValues: {
    password: 'eeeeee',
    confirmPassword: 'eeeeee',
  },
  photoValues: {
    coverImage: '',
    profileImage: '',
  },
  socialsValues: {
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
    setPasswordValues: (state, action) => {
      state.passwordValues = action.payload
    },
    setPhotoValues: (state, action) => {
      state.photoValues = action.payload
    },
    setAddSocialsValues: (state, action) => {
      state.socialsValues = action.payload
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload
    },
  },
})

export default registrationFormSlice
export const {
  setDetailsValues,
  setPasswordValues,
  setPhotoValues,
  setSocialsValues,
  setCurrentStep,
} = registrationFormSlice.actions
