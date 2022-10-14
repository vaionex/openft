import SharedLayout from '@/components/layout/shared-layout'
import Content from './content'
import Header from './header'

const UserOverviewMain = ({ nftInfo, userFavList }) => {
  return (
    <SharedLayout title="Profile-Overview">
      <Header nftInfo={nftInfo} />
      <Content nftInfo={nftInfo} userFavList={userFavList} />
    </SharedLayout>
  )
}

export default UserOverviewMain
