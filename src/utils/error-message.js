export const errorCode = {
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  DUPLICATE_EMAIL: 'auth/email-already-in-use',
  INVALID_EMAIL: 'auth/invalid-email',
  CREDENTIAL_ALREADY_IN_USE: 'auth/credential-already-in-use',
  EMAIL_NOT_FOUND: 'EMAIL_NOT_FOUND',
  TOO_MANY_REQUESTS: 'auth/too-many-requests',
  POP_UP_CLOSED: 'auth/popup-closed-by-user',
  UNAUTHORIZED_DOMAIN: 'auth/unauthorized-domain',
  CANCELLED_POPUP: 'auth/cancelled-popup-request',
  INVALID_VERIFICATION_CODE: 'auth/invalid-verification-code',
  CODE_EXPIRED: 'auth/code-expired',
  STORAGE_UNAUTHORIZED: 'storage/unauthorized',
  MISSING_CODE: 'auth/missing-code',
  INVALID_VERIFICATION_ID: 'auth/invalid-verification-id',
  RECENT_LOGIN: 'auth/requires-recent-login',
  INVALID_PHONE: 'auth/invalid-phone-number',
  ACCOUNT_EXIST: 'auth/account-exists-with-different-credential',
}

export const errorMessage = {
  [errorCode.USER_NOT_FOUND]: 'Invalid username or password',
  [errorCode.WRONG_PASSWORD]:
    'Invalid Password or user does not have any password',
  [errorCode.DUPLICATE_EMAIL]: 'The email is already in use by another account',
  [errorCode.INVALID_EMAIL]: 'The email address is badly formatted!',
  [errorCode.CREDENTIAL_ALREADY_IN_USE]:
    'This phone number is already associated with a different account',
  [errorCode.EMAIL_NOT_FOUND]: 'This Email is not registered',
  [errorCode.TOO_MANY_REQUESTS]: 'Too many requests. please try again later',
  [errorCode.POP_UP_CLOSED]:
    'The popup has been closed by the user before finalizing the operation.',
  [errorCode.UNAUTHORIZED_DOMAIN]: 'UnAuthorized domain',
  [errorCode.CANCELLED_POPUP]:
    'The popup has been closed by the user before finalizing the operation.',
  [errorCode.INVALID_VERIFICATION_CODE]: 'Invalid Code Entered.',
  [errorCode.CODE_EXPIRED]: 'Code is Expired.',
  [errorCode.STORAGE_UNAUTHORIZED]:
    'User does not have permission to access this firebase project',
  [errorCode.MISSING_CODE]: 'Please Enter OTP',
  [errorCode.INVALID_VERIFICATION_ID]: 'Invalid Verification ID',
  [errorCode.RECENT_LOGIN]: 'Please login again',
  [errorCode.INVALID_PHONE]: 'Invalid phone number',
  [errorCode.ACCOUNT_EXIST]: 'Phone number already associated with a different account',
}
