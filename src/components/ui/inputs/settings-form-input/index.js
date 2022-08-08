import { twMerge } from 'tailwind-merge'
import PropTypes from 'prop-types'
import { QuestionMarkCircleIcon } from '@heroicons/react/outline'
import ReactTooltip from 'react-tooltip'

const SettingsFormInput = ({
  label,
  subLabel,
  inputType,
  className,
  inputClassName,
  labelClassName,
  addon,
  variant,
  id,
  additionalCheckbox,
  tooltipText,
  ...props
}) => {
  console.log(!!tooltipText)
  return (
    <div
      className={twMerge(
        'sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-b sm:border-gray-200 sm:pb-5',
        className,
      )}
    >
      {label && (
        <label
          htmlFor={id}
          className={twMerge(
            'block text-sm font-medium text-gray-700 sm:mt-px',
            !subLabel && 'sm:pt-2',
            labelClassName,
          )}
        >
          {label}
          {subLabel && (
            <span className="block font-normal text-gray-500">{subLabel}</span>
          )}
        </label>
      )}
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        {variant === 'add-on' && addon && (
          <div className="flex rounded-md shadow-sm">
            <>
              <span className="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-200 rounded-l-md bg-gray-50 sm:text-sm">
                {addon}
              </span>
              <input
                id={id}
                type={inputType}
                className={twMerge(
                  'flex-1 block w-full min-w-0 border-gray-200 rounded-none focus:ring-blue-500 focus:border-blue-500 rounded-r-md sm:text-sm',
                  inputClassName,
                )}
                {...props}
              />
            </>
          </div>
        )}

        {variant === 'default' && (
          <div className="relative flex rounded-md shadow-sm">
            <input
              id={id}
              type={inputType}
              className={twMerge(
                'focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-200  rounded-md',
                inputClassName,
              )}
              {...props}
            />
            {tooltipText && (
              <div
                data-tip={tooltipText ? tooltipText : ''}
                className="absolute inset-y-0 right-0 z-50 inline-flex items-center pr-3 cursor-pointer group"
              >
                <QuestionMarkCircleIcon
                  className="w-4 h-4 text-gray-400"
                  aria-hidden="true"
                />
                <ReactTooltip />
              </div>
            )}
          </div>
        )}

        {additionalCheckbox && additionalCheckbox}
      </div>
    </div>
  )
}

SettingsFormInput.defaultProps = {
  inputType: 'text',
  variant: 'default',
}

SettingsFormInput.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  addon: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'add-on', 'withIcon']),
}

export default SettingsFormInput
