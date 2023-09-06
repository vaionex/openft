import nftSelector from '@/redux/selectors/nft'
import { removeQuery } from '@/redux/slices/nft'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

const CustomClearRefinements = (props) => {
  const { handleClear, artistName, minPrice, maxPrice } = props
  const dispatch = useDispatch()
  const { query } = useSelector(nftSelector)
  const router = useRouter()
  return (
    <button
      className="py-[10px] px-[18px] text-base font-medium border border-bright-gray rounded-lg text-bluewood"
      onClick={handleClear}
      disabled={!minPrice && !maxPrice && !artistName}
    >
      Clear
    </button>
  )
}


export default CustomClearRefinements
