import { useEffect, useState } from 'react'
import { InputMain } from '@/components/ui/inputs'
import Spinner from '@/components/ui/spinner'
import ModalConfirm from '@/components/ui/modal-confirm'
import { useForm, Controller } from 'react-hook-form'
import { updatePaymailApi } from '@/services/relysia-queries'
import { toast } from 'react-toastify'

const UpdatePaymailDialog = ({ paymail, paymailModal, setpaymailModal }) => {
  const [isSubmitting, setisSubmitting] = useState(false)

  const { control, handleSubmit, formState, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })
  const { isValid, errors } = formState

  const onSubmit = async (data) => {
    try {
      setisSubmitting(true)
      console.log('start', data.paymail)

      let apiRes = await updatePaymailApi(
        data.paymail + '@' + paymail?.split('@')[1],
      )
      console.log('apiRes', apiRes)

      if (apiRes.status === 'success') {
        toast.success('Paymail Updated Successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        setpaymailModal(false)
      } else {
        toast.error(apiRes?.msg ? apiRes?.msg : 'An error occured', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      }

      setisSubmitting(false)
    } catch (err) {
      setisSubmitting(false)
      toast.error('An error occured', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      console.log('err', err)
    }
  }

  return (
    <ModalConfirm
      isOpen={paymailModal}
      onClose={() => {
        setpaymailModal(false)
      }}
      title={'Update Paymail'}
      deleteButton={false}
      content={
        <div className="flex flex-col items-center justify-center space-y-4">
          <form
            className="w-full max-w-xs space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputMain key="paymail" className="relative pb-0 border-none">
              <Controller
                name="paymail"
                control={control}
                rules={{ required: 'Paymail is required' }} // add the required property
                render={({ field }) => {
                  return (
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        id="paymail"
                        type="text"
                        className="block w-full min-w-0 flex-1 px-3 py-2 border-bright-gray rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 rounded-l-md sm:text-sm"
                        placeholder="paymail"
                        defaultValue={paymail?.split('@')[0]}
                        {...field}
                      />
                      <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                        @{paymail?.split('@')[1]}
                      </span>
                    </div>
                  )
                }}
              />
              <span className="absolute text-xs text-red-600 left-2 -bottom-5">
                {errors?.paymail?.message}
              </span>
            </InputMain>
            <button
              type="submit"
              className={`w-full font-semibold relative ${
                isSubmitting ? 'btn-secondary' : 'btn-primary'
              }`}
            >
              Update
              {isSubmitting && (
                <Spinner size="w-5 h-5 absolute top-3 right-4" />
              )}
            </button>
          </form>
        </div>
      }
    />
  )
}

export default UpdatePaymailDialog
