import React from 'react'

export const ExchangReates = ({currency, rate}) => {
  return (
    <div className="info">
          <h3>
            {currency}: <span>{rate}</span>
          </h3>
    </div>
  )
}
