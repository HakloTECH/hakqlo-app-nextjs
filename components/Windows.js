import React from 'react'

const Window1 = props => {
  return (
    <div className='center-content'>
      <p>Window 1</p>
      <button
        onClick={() => {
          props.controllers.setListView(true)
        }}>
        Open List
      </button>
    </div>
  )
}
const Window2 = props => {
  return (
    <div className='center-content'>
      <p>Window 2</p>
      <button
        onClick={() => {
          props.controllers.setListView(true)
        }}>
        Open List
      </button>
    </div>
  )
}
const Window3 = props => {
  return (
    <div className='center-content'>
      <p>Window 3</p>
      <button
        onClick={() => {
          props.controllers.setListView(true)
        }}>
        Open List
      </button>
    </div>
  )
}
const Window4 = props => {
  return (
    <div className='center-content'>
      <p>Window 4</p>
      <button
        onClick={() => {
          props.controllers.setListView(true)
        }}>
        Open List
      </button>
    </div>
  )
}
const Window5 = props => {
  return (
    <div className='center-content'>
      <p>Window 5</p>
      <button
        onClick={() => {
          props.controllers.setListView(true)
        }}>
        Open List
      </button>
    </div>
  )
}
const Window6 = props => {
  return (
    <div className='center-content'>
      <p>Window 6</p>
      <button
        onClick={() => {
          props.controllers.setListView(true)
        }}>
        Open List
      </button>
    </div>
  )
}

export { Window1, Window2, Window3, Window4, Window5, Window6 }