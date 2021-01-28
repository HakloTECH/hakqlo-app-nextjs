import React , { createRef, useEffect, useState, useCallback } from 'react'
const NonPassiveTouchListenerDiv = ({onClick, onTouchStart, onTouchMove, onTouchEnd, children, ...rest})=>{
  const elemRef = createRef()
  useEffect(()=>{
    const elem = elemRef.current
    
  },[])
  return (<div ref={elemRef}>{children}</div>)
}
export default NonPassiveTouchListenerDiv;