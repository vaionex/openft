import { InputMain } from '@/components/ui/inputs'

export default function Form() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="order-1 lg:order-2 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="lg:pr-8">
                <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
                  <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Contribute
                  </h2>
                  <p className="mt-4 text-lg text-gray-500 sm:mt-3">
                    Submit your request details in the form below.
                  </p>
                  <form
                    action="#"
                    method="POST"
                    className="mt-9 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-8"
                  >
                    <div>
                      <InputMain className="border-none sm:pb-2">
                        <InputMain.Label
                          label="First name"
                          htmlFor="first-name"
                        />
                        <InputMain.Input
                          id="first-name"
                          className="sm:col-span-2"
                          placeholder="First name"
                          onChange={() => {}}
                        />
                      </InputMain>
                    </div>
                    <div>
                      <InputMain className="border-none sm:pb-2">
                        <InputMain.Label
                          label="Last name"
                          htmlFor="last-name"
                        />
                        <InputMain.Input
                          id="last-name"
                          className="sm:col-span-2"
                          placeholder="Last name"
                          onChange={() => {}}
                        />
                      </InputMain>
                    </div>
                    <div className="sm:col-span-2">
                      <InputMain className="border-none justify-items-start sm:pb-2">
                        <InputMain.Label label="Email" htmlFor="email" />
                        <InputMain.Input
                          id="email"
                          className="sm:col-span-2 w-full"
                          placeholder="you@company.com"
                          onChange={() => {}}
                        />
                      </InputMain>
                    </div>
                    <div className="sm:col-span-2">
                      <InputMain className="border-none justify-items-start sm:pb-2">
                        <InputMain.Label label="Company" htmlFor="company" />
                        <InputMain.Input
                          id="company"
                          className="sm:col-span-2 w-full"
                          placeholder="Your company"
                          onChange={() => {}}
                        />
                      </InputMain>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex justify-start">
                        <label
                          htmlFor="how-can-we-help"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Your request
                        </label>
                      </div>
                      <div className="sm:mt-4">
                        <textarea
                          id="how-can-we-help"
                          name="how-can-we-help"
                          aria-describedby="how-can-we-help-description"
                          rows={4}
                          className="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                          defaultValue={''}
                          placeholder="Type your request ..."
                        />
                      </div>
                    </div>
                    <div className="relative flex items-start sm:col-span-2">
                      <div className="flex items-center h-5">
                        <input
                          id="privacy"
                          aria-describedby="privacy-policy"
                          name="privacy"
                          type="checkbox"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="privacy"
                          className="font-medium text-gray-700"
                        >
                          You agree to our friendly{' '}
                        </label>
                        <a
                          id="privacy-policy"
                          href="#"
                          className="font-medium underline"
                        >
                          privacy policy.
                        </a>
                      </div>
                    </div>

                    <div className="text-right sm:col-span-2">
                      <button className="btn-primary py-2.5 flex w-full border-none justify-center items-center font-normal">
                        Send message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="order-2 lg:order-1 mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full h-full rounded-3xl shadow-lg lg:max-w-md">
                <img
                  className="relative block w-full h-full bg-white rounded-3xl overflow-hidden"
                  src="/images/contribute.webp"
                  alt=""
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
