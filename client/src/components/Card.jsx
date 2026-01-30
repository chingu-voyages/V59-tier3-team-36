import React from 'react'

function Card({ title, description, icon, buttonText, onButtonClick, buttonVariant = 'primary' }) {

    const buttonStyles = {
        primary:
            'bg-green-600 text-white hover:bg-green-700'
    }

  return (
    <div className={'bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition'} >
        {icon && (
            <div className='mb-4'>
                {icon}
            </div>
        )}
        {title && (
            <h3 className='text-lg text-black font-semibold mb-2' >
                {title}
            </h3>
        )}
        {description && (
            <p className='text-gray-600 mb-4'>
                {description}
            </p>
        )}
        {buttonText && (
            <button
                onClick={onButtonClick}
                className={`mt-4 inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition ${buttonStyles[buttonVariant]}`}
            >
                {buttonText}
            </button>
        )}
    </div>
  )
}

export default Card