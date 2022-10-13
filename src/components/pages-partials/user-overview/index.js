import SharedLayout from '@/components/layout/shared-layout'
import Content from './content'
import Header from './header'

const UserOverviewMain = ({ nftInfo }) => {
  return (
    <SharedLayout title="Profile-Overview">
      <Header nftInfo={nftInfo} />
      <Content nftInfo={nftInfo} />
    </SharedLayout>
  )
}

export default UserOverviewMain
