import React from 'react'
import { twMerge } from 'tailwind-merge'
import PropTypes from 'prop-types'

const ButtonWLoading = ({
  isError,
  isPending,
  text,
  onClick,
  fullWidth,
  type,
  className,
  ...props
}) => {
  if (fullWidth) {
    return (
      <button
        disabled={isPending}
        type={type}
        onClick={onClick}
        className={twMerge(
          'w-full btn-primary cursor-pointer',
          isPending && 'cursor-not-allowed',
        )}
        {...props}
      >
        <span className="relative flex items-center">
          {text}
          {isPending && (
            <span className="absolute -right-10 spinner-small"></span>
          )}
        </span>
      </button>
    )
  }

  return (
    <button
      type={type}
      disabled={isPending}
      className={twMerge(
        'btn-primary py-2',
        isPending
          ? 'opacity-50 cursor-not-allowed pointer-events-none'
          : 'cursor-pointer',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {text}
      {isPending && (
        <span className="relative flex items-center">
          <span className="spinner-small"></span>
        </span>
      )}
    </button>
  )
}

ButtonWLoading.defaultProps = {
  isError: false,
  isPending: false,
  fullWidth: false,
  type: 'button',
  text: 'Submit',
}

ButtonWLoading.propTypes = {
  isError: PropTypes.bool,
  isPending: PropTypes.bool,
  fullWidth: PropTypes.bool,
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
}

export default ButtonWLoading
