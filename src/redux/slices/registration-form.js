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
    coverImage: null,
    profileImage: null,
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
      state.photoValues = { ...state.photoValues, ...action.payload }
    },
    clearPhotoValues: (state, action) => {
      state.photoValues[action.payload] = null
    },
    setSocialsValues: (state, action) => {
      state.socialsValues = action.payload
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload
    },
    clearRegistrationForm: (state) => {
      state.detailsValues = {
        name: '',
        username: '',
        email: '',
        role: '',
      }
      state.passwordValues = {
        password: '',
        confirmPassword: '',
      }
      state.photoValues = {
        coverImage: null,
        profileImage: null,
      }
      state.socialsValues = {
        facebook: '',
        instagram: '',
        website: '',
      }
      state.currentStep = 1
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
  clearPhotoValues,
  clearRegistrationForm,
} = registrationFormSlice.actions
