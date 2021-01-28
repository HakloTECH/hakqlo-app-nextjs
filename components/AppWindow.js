import React , { createRef, useEffect, useState, useCallback } from 'react'
import styles from './WindowList.module.scss'
const {abs, sin, cos, PI} = Math

function getDistanceFromCenter(index, center, listLength) {
  const b_distance = index - center
  if (abs(b_distance) > abs(b_distance+listLength)) return b_distance+listLength
  if (abs(b_distance) > abs(b_distance-listLength)) return b_distance-listLength
  return b_distance;
}

const AppWindow = ({Component, index, controllers, deletable,}) =>{
  //const [touchXStart, setTouchXstart] = useState(0);
  const [touchYStart, setTouchYstart] = useState(0);
  const [dirVert, setDirVert] = useState(false);
  const [winYPos, setWinYPos] = useState(0)
  const [scrollXStart, setScrollXStart] = useState(0);
  const [WLScrollXStart, setWLScrollXStart] = useState(0);
  const [focused, setFocused] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [sinA, setSinA] = useState(0);
  const [cosA, setCosA] = useState(0);
  const listCoverRef = createRef();
  const {
    currentWin, 
    appWindows, 
    listView,
    scrollLength,
    setCurrentWin, 
    scrollTo, 
    bringToCenter, 
    setScrolling, 
    setListView, 
  } = controllers;
  //--- event listeners
  const onTouchStart = useCallback(e => {
    setScrollXStart(e.changedTouches[0].screenX*3.3333/window.screen.width)
    //setTouchXstart(e.changedTouches[0].screenX)
    setTouchYstart(e.changedTouches[0].screenY)
    setWLScrollXStart(scrollLength)
    setScrolling(true)
  },[scrollLength]),

  onTouchMove = useCallback(e => {
    e.preventDefault()
    /**
     * drx: length the window is pulled
     * moveLength: absolute position
     * dirVert: true when window is scrolled in vertical direction
     */
    const drx = scrollXStart-e.changedTouches[0].screenX*3.3333/window.screen.width
    const moveLength = drx+WLScrollXStart
    
    const dty = e.changedTouches[0].screenY - touchYStart
    
    const dltLength = 150, xIsSmall = abs(drx)<0.3;
    if(xIsSmall && dty > 40) setDirVert(true)
    
    
    if(dirVert){
      //the limit
      if(dty>dltLength){
        setWinYPos(dltLength)
        if(deletable) setDeleting(true)
      } else {
        if(dty>0)setWinYPos(dty)
        setDeleting(false)
      }
      if(xIsSmall) scrollTo(moveLength)
      if(dty<40) setDirVert(false)
    } else scrollTo(moveLength)
        
  },[scrollXStart, WLScrollXStart, appWindows]),

  onTouchEnd = useCallback(e => {
    setScrolling(false)
    bringToCenter()
    //do deleting functionality
    if(deleting);
    else setWinYPos(0)
  },[bringToCenter]),

  onClick = useCallback(e => {
    setCurrentWin(index);
    setListView(false)
  },[])
  //---------

  useEffect(()=>{
    const listCover = listCoverRef.current
    listCover.addEventListener('touchstart', onTouchStart, {passive: false})
    return ()=>listCover.removeEventListener('touchstart', onTouchStart, {passive: false})
  },[onTouchStart])
  useEffect(()=>{
    const listCover = listCoverRef.current
    listCover.addEventListener('touchmove', onTouchMove, {passive: false})
    return ()=>listCover.removeEventListener('touchmove', onTouchMove, {passive: false})
  },[onTouchMove])
  useEffect(()=>{
    const listCover = listCoverRef.current
    listCover.addEventListener('touchend', onTouchEnd, {passive: false})
    return ()=>listCover.removeEventListener('touchend', onTouchEnd, {passive: false})
  },[onTouchEnd])
  
  useEffect(()=>{
    const listCover = listCoverRef.current
    listCover.addEventListener('click', onClick, {passive: false})
    return ()=>listCover.removeEventListener('click', onClick, {passive: false})
  },[onClick])

  useEffect(()=>{
    setFocused( currentWin === index )
    const distanceFromCenter = getDistanceFromCenter(index, scrollLength, appWindows.length)
    let wAngle = distanceFromCenter*PI/4
    if (abs(wAngle)>PI) wAngle = PI
    setCosA(cos(wAngle));
    setSinA(sin(wAngle));
  },[currentWin, index, scrollLength, appWindows])

  useEffect(()=>{

  },[])
  return (
    <div
      className={
        styles['app-window'] + ' ' + 
        (!listView ? (focused ? styles.focus : styles.away) : '')
      }
      style={
        listView ? {
          transform: `scale(0.6, 0.6) translateZ(${cosA*70}px) translateX(${sinA*50}%) translateY(${winYPos}px)`,
          opacity: cosA**1.5||0
        } : null
      }>
      <div
        className={styles['list-cover']}
        ref={listCoverRef}
        ></div>
      <Component controllers={{setListView}}/>
    </div>
  )
}
export default AppWindow;