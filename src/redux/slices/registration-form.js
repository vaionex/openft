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
