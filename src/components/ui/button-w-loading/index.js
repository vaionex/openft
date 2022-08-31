import React from 'react'
import { twMerge } from 'tailwind-merge'

const ButtonWLoading = ({ isError, isPending, text, onClick, fullWidth }) => {
  if (fullWidth) {
    return (
      <button
        disabled={isPending}
        type="button"
        onClick={onClick}
        className={twMerge(
          'w-full btn-primary transition-all duration-300 ease-in-out',
          isPending && 'cursor-not-allowed',
        )}
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
      type="button"
      disabled={isError}
      className={twMerge(
        'btn-primary py-2.5',
        isError
          ? 'opacity-50 cursor-not-allowed pointer-events-none'
          : 'cursor-pointer',
        isPending && 'pointer-events-none',
      )}
      onClick={onClick}
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

export default ButtonWLoading
