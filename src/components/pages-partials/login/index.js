import LoginForm from '@/components/ui/forms/login-form'
import SharedLayout from '@/components/layout/shared-layout'
import LoginRegisterLayout from '@/components/layout/login-register-layout'

const Login = () => {
  return (
    <LoginRegisterLayout title="Login">
      <LoginForm />
    </LoginRegisterLayout>
  )
}

export default Login
