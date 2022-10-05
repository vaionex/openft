import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { ProfileHeaderCard } from '@/components/ui/cards'
import { MyProfileForm } from '@/components/ui/forms'
import { firebaseIsUsernameExist } from '@/firebase/utils'
import userSelector from '@/redux/selectors/user'
import { setSuccess, updateUser } from '@/redux/slices/user'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UserSettingsMain = () => {
  const dispatch = useDispatch()
  const { currentUser, isPending, isSuccess } = useSelector(userSelector)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [formValues, setFormValues] = useState({
    username: '',
    instagram: '',
    bio: '',
    jobTitle: '',
    showJobTitle: false,
  })

  useEffect(() => {
    if (currentUser) {
      setFormValues({
        username: currentUser?.username || '',
        instagram: currentUser?.socialLinks?.instagram || '',
        jobTitle: currentUser?.jobTitle || '',
        bio: currentUser?.bio || '',
        showJobTitle: currentUser?.showJobTitle || false,
      })
    }
  }, [currentUser])

  useEffect(() => {
    let timeout
    if (isSuccess) {
      timeout = setTimeout(() => {
        dispatch(setSuccess(false))
      }, 2000)
    }
    return () => clearTimeout(timeout)
  }, [isSuccess])

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    try {
      const { username } = formValues
      if (currentUser.username !== username) {
        const isExist = await firebaseIsUsernameExist(username)
        if (isExist) {
          setIsError(true)
          setErrorMessage('This username is already in use')
          return false
        }
      }
      let updatedValues = {
        username: formValues?.username || '',
        socialLinks: {
          ...currentUser.socialLinks,
          instagram: formValues?.instagram || '',
        },
        jobTitle: formValues?.jobTitle || '',
        bio: formValues?.bio || '',
        showJobTitle: formValues?.showJobTitle || false,
      }
      dispatch(
        updateUser({
          uid: currentUser.uid,
          values: updatedValues,
        }),
      )
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <UserSettingsLayout>
      <ProfileHeaderCard
        user={currentUser}
        onSubmit={handleOnSubmit}
        isError={isError}
        isPending={isPending}
        isSuccess={isSuccess}
      />
      <MyProfileForm
        user={currentUser}
        formValues={formValues}
        setFormValues={setFormValues}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        isError={isError}
        setIsError={setIsError}
      />
    </UserSettingsLayout>
  )
}

export default UserSettingsMain
