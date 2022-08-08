import { InputMain } from '@/components/ui/inputs'

const SecurityForm = () => {
  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="mt-6 sm:mt-5">
        <InputMain className="border-none sm:grid-cols-1 sm:gap-2">
          <InputMain.Label label="Your password" htmlFor="password" />
          <InputMain.Input
            id="password"
            className="sm:col-span-2"
            placeholder="Enter your current password"
            onChange={() => {}}
          />
        </InputMain>

        <InputMain className="border-none sm:grid-cols-1 sm:gap-2">
          <InputMain.Label label="New password" htmlFor="newPassword" />
          <InputMain.Input
            id="newPassword"
            className="sm:col-span-2"
            placeholder="Enter new password"
            onChange={() => {}}
          />
          <span className="text-sm text-gray-500">
            Your new password must be more than 8 characters.
          </span>
        </InputMain>

        <InputMain className="border-none sm:grid-cols-1 sm:gap-2">
          <InputMain.Label
            label="Confirm new password"
            htmlFor="confirmPassword"
          />
          <InputMain.Input
            id="confirmPassword"
            className="sm:col-span-2"
            placeholder="Confirm new password"
            onChange={() => {}}
          />
        </InputMain>

        <InputMain className="border-none sm:grid-cols-1 sm:gap-2">
          <InputMain.Label label="Mnemonic" htmlFor="mnemonic" />
          <textarea
            className="w-full text-gray-500 border border-gray-300 rounded-md shadow-sm resize-none disabled:bg-gray-50 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows={3}
            id="mnemonic"
            defaultValue={
              'gravity stable govern write bacon labor slide gauge meat broom swarm tomato'
            }
            disabled
            placeholder=""
          />
          <span className="text-sm text-gray-500">
            The mnemonic can help restore the wallet and reset the wallet&apos;s
            authorization password. Please write it down on paper and store it
            in a safe place.
          </span>
        </InputMain>

        <div className="flex justify-end gap-3 border-none">
          <button type="button" className="btn-secondary py-2.5">
            Cancel
          </button>
          <button type="button" className="btn-primary py-2.5">
            Update password
          </button>
        </div>
      </div>
    </form>
  )
}

export default SecurityForm
