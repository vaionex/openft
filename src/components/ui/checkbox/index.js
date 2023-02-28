import { twMerge } from 'tailwind-merge'
import PropTypes from 'prop-types'

const Checkbox = ({
  id,
  text,
  subtext,
  className,
  checkboxClassName,
  labelClassName,
  checked,
  ...props
}) => {
  return (
    <div className={twMerge('relative flex items-start', className)}>
      <div className="flex items-center h-5 ">
        <input
          id={id}
          type="checkbox"
          className={twMerge(
            'w-4 h-4 text-white bg-tropical-blue rounded cursor-pointer checked:bg-center checked:border-blue-500 checked:bg-checkbox-icon checked:bg-auto focus:ring-blue-300 focus:ring-1',
            checkboxClassName,
          )}
          checked={checked}
          {...props}
        />
      </div>

      {text && (
        <label
          htmlFor={id}
          className={twMerge(
            'ml-3 text-sm text-gray-700 cursor-pointer font-medium',
            labelClassName,
          )}
        >
          {text}
          {subtext && <p className="font-normal text-gray-500">{subtext}</p>}
        </label>
      )}
    </div>
  )
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  subtext: PropTypes.string,
  className: PropTypes.string,
  checkboxClassName: PropTypes.string,
  labelClassName: PropTypes.string,
}

export default Checkbox
