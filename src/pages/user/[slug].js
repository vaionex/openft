import UserOverviewMain from '@/components/pages-partials/user-overview'
import { firebaseGetNftByUsername } from '@/firebase/utils'

const UserOverviewPage = ({ nftInfo }) => {
  return <UserOverviewMain nftInfo={nftInfo} />
}

export const getServerSideProps = async ({ query }) => {
  const nftInfo = await firebaseGetNftByUsername(query.slug)

  return {
    props: { nftInfo },
  }
}

export default UserOverviewPage
