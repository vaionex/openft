import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selectRegistrationForm = (state) => state.registrationForm

const registrationFormSelector = createDraftSafeSelector(
  selectRegistrationForm,
  (form) => form,
)

export default registrationFormSelector
