import SharedLayout from '../shared-layout'
import CollectionHeader from './header'
import CollectionSidebar from './sidebar'

const CollectionLayout = ({ children, collection, setfilteredCollection }) => {
  return (
    <SharedLayout title="User Settings">
      <div className="max-w-screen-xl px-4 pb-6 mx-auto sm:px-6 lg:pb-16">
        <CollectionHeader
          collection={collection}
          setfilteredCollection={setfilteredCollection}
        />
        <div className="overflow-hidden bg-white border-t border-gray-200 rounded-lg">
          <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 ">
            <CollectionSidebar />
            <div className=" lg:col-span-10">
              <div className="px-4 py-6 sm:p-6 lg:pl-12 lg:pr-0 lg:pb-8">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SharedLayout>
  )
}

export default CollectionLayout
