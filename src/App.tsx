import React from 'react'
import './App.css'

interface Props {
  data: any[];
}

export const App: React.FC<Props> = ({data}) => {
  return (
    <div>
      { JSON.stringify(data) }
    </div>
  )
}
