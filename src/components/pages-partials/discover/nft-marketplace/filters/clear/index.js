import { connectCurrentRefinements } from 'react-instantsearch-dom'

const ClearRefinements = ({ items, refine }) => (
  <button
    className="py-[10px] px-[18px] text-base font-medium border border-[#EAECF0] rounded-lg text-[#344054]"
    onClick={() => refine(items)}
    disabled={!items.length}
  >
    Clear
  </button>
)

const CustomClearRefinements = connectCurrentRefinements(ClearRefinements)

export default CustomClearRefinements
