import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'

const FormInput = ({
  label,
  className,
  visibility = true,
  labelClassName,
  ...props
}) => {
  const { id } = props
  return (
    <div>
      <label
        htmlFor={id}
        className={twMerge(
          'block text-sm font-medium text-gray-700',
          visibility ? 'block' : 'sr-only',
          labelClassName,
        )}
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          {...props}
          className={twMerge(
            'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
            className,
          )}
        />
      </div>
    </div>
  )
}

FormInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  visibility: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
}

export default FormInput
