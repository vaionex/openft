import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  username: '',
  email: '',
  role: '',
  password: '',
  confirmPassword: '',
  coverImage: '',
  profileImage: '',
  facebook: '',
  instagram: '',
  website: '',
  isPending: false,
  errorMessage: null,
  isAuthenticated: false,
}

const registrationFormSlice = createSlice({
  name: 'registrationForm',
  initialState,
})

export default registrationFormSlice
