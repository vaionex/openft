import { connectCurrentRefinements } from 'react-instantsearch-dom'

const ClearRefinements = ({ items, refine }) => (
  <button
    className="py-2 text-sm btn-secondary"
    onClick={() => refine(items)}
    disabled={!items.length}
  >
    Clear
  </button>
)

const CustomClearRefinements = connectCurrentRefinements(ClearRefinements)

export default CustomClearRefinements
