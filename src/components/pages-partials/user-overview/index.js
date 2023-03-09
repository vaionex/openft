import SharedLayout from '@/components/layout/shared-layout'
import Content from './content'
import Header from './header'

const UserOverviewMain = ({ nftInfo, userFavList, userInfo }) => {
  return (
    <SharedLayout title="Profile-Overview">
      <Header userInfo={userInfo} />
      <Content userInfo={userInfo} isUserDetails nftInfo={nftInfo} userFavList={userFavList} />
    </SharedLayout>
  )
}

export default UserOverviewMain
