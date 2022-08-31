import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selectUser = (state) => state.user

const userSelector = createDraftSafeSelector(selectUser, (user) => user)

export default userSelector
