import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { GenerateForm, UploadForm } from '@/components/ui/forms'
import { Tab } from '@headlessui/react'
import { isEmpty, pickBy } from 'lodash'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'

const UserSettingsMintSection = () => {
  const router = useRouter()
  const query = router.query?.query
  const [selectedIndex, setSelectedIndex] = useState(0)
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  useEffect(() => {
    if (query == 'upload') {
      setSelectedIndex(0)
    } else if (query == 'generate') {
      setSelectedIndex(1)
    }
  }, [query])
  return (
    <UserSettingsLayout>
      <Tab.Group
        as="div"
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      >
        <div className="border-b border-gray-200 mb-8">
          <Tab.List className="flex -mb-px space-x-px">
            <Tab
              className={({ selected }) =>
                classNames(
                  selected
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300',
                  'outline-none whitespace-nowrap p-3 pb-2 border-b-2 font-medium text-sm',
                )
              }
            >
              Upload
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  selected
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300',
                  'outline-none whitespace-nowrap p-3 pb-2 border-b-2 font-medium text-sm',
                )
              }
            >
              Generate
            </Tab>
          </Tab.List>
        </div>
        <Tab.Panels as={Fragment}>
          <Tab.Panel>
            <div className="items-center sm:border-b sm:border-gray-200 sm:pb-5">
              <span className="block text-lg font-medium text-gray-700">
                Upload Artwork
                <span className="block text-sm font-normal text-gray-500">
                  Upload your artwork and its details here.
                </span>
              </span>
            </div>
            <UploadForm />
          </Tab.Panel>
          <Tab.Panel>
            <div className="flex items-center sm:border-b sm:border-gray-200 sm:pb-5">
              <span className="block text-lg font-medium text-gray-700">
                Generate Artwork
                <span className="block text-sm font-normal text-gray-500">
                  Generate artwork from AI technology powered by Open AI.
                </span>
              </span>
            </div>
            <GenerateForm />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </UserSettingsLayout>
  )
}

export default UserSettingsMintSection
