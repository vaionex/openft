import {
  QuestionMarkCircleIcon,
  SortAscendingIcon,
  UsersIcon,
} from '@heroicons/react/outline'
import ReactTooltip from 'react-tooltip'
import { twMerge } from 'tailwind-merge'
import PropTypes from 'prop-types'

const InputMain = ({ className, children }) => {
  return (
    <div
      className={twMerge(
        'sm:grid sm:gap-4 sm:items-start sm:border-b sm:border-gray-200 sm:pb-5',
        className,
      )}
    >
      {children}
    </div>
  )
}

InputMain.Label = function InputMainLabel({
  label,
  className,
  htmlFor,
  sublabel,
  tooltip,
}) {
  if (!label) return null

  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(
        ' block text-sm font-medium text-gray-700 sm:mt-px',
        !sublabel && 'sm:pt-2',
        className,
      )}
    >
      <span className="relative inline-block">
        {label}
        {!!tooltip && (
          <div
            data-tip
            data-for={htmlFor}
            className="absolute inset-y-0 z-10 inline-flex items-center pl-5 cursor-pointer -right-6 group"
          >
            <QuestionMarkCircleIcon
              className="w-4 h-4 text-gray-400"
              aria-hidden="true"
            />
            <ReactTooltip
              className="react-tooltip !text-sm !max-w-xs !rounded !text-white !bg-gray-900"
              id={htmlFor}
            >
              <div>
                {tooltip.title && <h5>{tooltip.title}</h5>}
                {tooltip.text}
              </div>
            </ReactTooltip>
          </div>
        )}
      </span>
      {sublabel && (
        <span className="block font-normal text-gray-500">{sublabel}</span>
      )}
    </label>
  )
}

InputMain.Input = function InputMainInput({
  id,
  addon,
  variant,
  additionalCheckbox,
  inputType,
  className,
  inputClassName,
  tooltip,
  ...props
}) {
  return (
    <div className={className}>
      {variant === 'add-on' && !!addon && (
        <div className="flex mt-1 rounded-md shadow-sm sm:mt-0">
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
        </div>
      )}

      {variant === 'add-on-reverse' && !!addon && (
        <div className="flex mt-1 rounded-md shadow-sm">
          <div className="relative flex items-stretch flex-grow focus-within:z-10">
            <input
              id={id}
              type={inputType}
              className={twMerge(
                'flex-1 block w-full min-w-0 border-gray-200 rounded-none focus:ring-blue-500 focus:border-blue-500 rounded-r-md sm:text-sm',
                inputClassName,
              )}
              {...props}
            />
          </div>
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {addon}
          </button>
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
          {!!tooltip && (
            <div
              data-tip
              data-for={id}
              className="absolute inset-y-0 right-0 z-10 inline-flex items-center pr-3 cursor-pointer group"
            >
              <QuestionMarkCircleIcon
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
              />
              <ReactTooltip
                className="react-tooltip !text-sm !max-w-xs !pt-3 !rounded !text-white !bg-gray-900"
                id={id}
              >
                <div>
                  {tooltip.title && <h5>{tooltip.title}</h5>}
                  {tooltip.text}
                </div>
              </ReactTooltip>
            </div>
          )}
        </div>
      )}

      {additionalCheckbox && additionalCheckbox}
    </div>
  )
}

InputMain.Input.defaultProps = {
  inputType: 'text',
  variant: 'default',
}

InputMain.Input.propTypes = {
  inputType: PropTypes.string,
  variant: PropTypes.string,
  id: PropTypes.string.isRequired,
  addon: PropTypes.string || PropTypes.node,
  additionalCheckbox: PropTypes.node,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  tooltip: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
}

export default InputMain
