import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { ProfileHeaderCard } from '@/components/ui/cards'
import { MyProfileForm } from '@/components/ui/forms'
import userSelector from '@/redux/selectors/user'
import { updateUser } from '@/redux/slices/user'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UserSettingsMain = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(userSelector)
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
        instagram: currentUser?.instagram || '',
        bio: currentUser?.bio || '',
        jobTitle: currentUser?.jobTitle || '',
        showJobTitle: currentUser?.showJobTitle || false,
      })
    }
  }, [currentUser])

  const validateUsername = (username) => {
    const usernameRegex = /^[a-z0-9]+$/i

    if (username.length === 0) {
      setIsError(true)
      return 'Username is required'
    } else if (!usernameRegex.test(username)) {
      setIsError(true)
      return 'Username can only contain lowercase letters and numbers'
    } else {
      setIsError(false)
      return null
    }
  }

  const handleInputChange = (e) => {
    if (e.target.name === 'username') {
      setErrorMessage(validateUsername(e.target.value))
    }

    if (e.target.name === 'showJobTitle') {
      setFormValues((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.checked,
        }
      })
    } else {
      setFormValues((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        }
      })
    }
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    dispatch(
      updateUser({
        uid: currentUser.uid,
        values: formValues,
      }),
    )
  }

  return (
    <UserSettingsLayout>
      <ProfileHeaderCard
        user={currentUser}
        onSubmit={handleOnSubmit}
        isError={isError}
      />
      <MyProfileForm
        formValues={formValues}
        handleInputChange={handleInputChange}
        errorMessage={errorMessage}
      />
    </UserSettingsLayout>
  )
}

export default UserSettingsMain
