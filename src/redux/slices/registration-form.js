import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  detailsValues: {
    name: '',
    username: '',
    email: '',
    role: '',
  },
  passwordValues: {
    password: '',
    confirmPassword: '',
  },
  photoValues: {
    coverImage: null,
    profileImage: null,
  },
  socialsValues: {
    facebook: '',
    instagram: '',
    website: '',
  },
  readyToGo: false,
  step: 1,
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
      state.photoValues = { ...state.photoValues, ...action.payload }
    },
    clearPhotoValues: (state, action) => {
      state.photoValues[action.payload] = null
    },
    setSocialsValues: (state, action) => {
      state.socialsValues = action.payload
      // state.readyToGo = true
    },
    setReadyToGo: (state, action) => {
      state.readyToGo = action.payload
    },
    setStep: (state, action) => {
      state.step = action.payload
    },
    clearRegistrationForm: (state) => {
      state.detailsValues.name = ''
      state.detailsValues.username = ''
      state.detailsValues.email = ''
      state.detailsValues.role = ''
      state.passwordValues.password = ''
      state.passwordValues.confirmPassword = ''
      state.photoValues.coverImage = ''
      state.photoValues.profileImage = ''
      state.socialsValues.facebook = ''
      state.socialsValues.instagram = ''
      state.socialsValues.website = ''
      state.step = 1
    },
  },
})

export default registrationFormSlice
export const {
  setDetailsValues,
  setPasswordValues,
  setPhotoValues,
  setReadyToGo,
  setSocialsValues,
  setCurrentStep,
  clearPhotoValues,
  clearRegistrationForm,
  setStep
} = registrationFormSlice.actions
