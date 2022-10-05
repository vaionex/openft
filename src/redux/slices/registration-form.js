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
      state.readyToGo = true
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
