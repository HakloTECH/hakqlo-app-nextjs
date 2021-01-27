import React , { createRef, useEffect, useState, useCallback } from 'react'
import styles from './WindowList.module.scss'
const {abs, sin, cos, PI} = Math

function getDistanceFromCenter(index, center, listLength) {
  const b_distance = index - center
  if (abs(b_distance) > abs(b_distance+listLength)) return b_distance+listLength
  if (abs(b_distance) > abs(b_distance-listLength)) return b_distance-listLength
  return b_distance;
}

const AppWindow = ({winList, Component, index, controllers}) =>{
  const [scrollXStart, setScrollXStart] = useState(0);
  const [WLScrollXStart, setWLScrollXStart] = useState(0);
  const [focused, setFocused] = useState(false)
  const [sinA, setSinA] = useState(0);
  const [cosA, setCosA] = useState(0);
  
  const listCoverRef = createRef();
  const {
    currentWin, 
    appWindows, 
    scrolling, 
    listView,
    getScrollLength,
    scrollLength,
    setCurrentWin, 
    scrollTo, 
    bringToCenter, 
    setScrolling, 
    setListView, 
  } = controllers;
  //const initWLScrollXStart =()=>setWLScrollXStart(scrollLength)
  const onTouchStart = useCallback(e => {
    setScrollXStart(e.changedTouches[0].screenX*3.3333/window.screen.width)
    setWLScrollXStart(scrollLength)
    setScrolling(true)
  },[scrollLength]),
  onTouchMove = useCallback(e => {
    e.preventDefault()
    const moveLength = scrollXStart-e.changedTouches[0].screenX*3.3333/window.screen.width+WLScrollXStart
    if (appWindows.length === 1 && (moveLength > 0.4 || moveLength < -0.4)) return 0
    scrollTo(moveLength)
  },[scrollXStart, WLScrollXStart, appWindows]),
  onTouchEnd = useCallback(e => {
    setScrolling(false)
    bringToCenter()
  },[]),
  onClick = useCallback(e => {
    setCurrentWin(index);
    setListView(false)
  },[])
  useEffect(()=>{
    const listCover = listCoverRef.current
    
    listCover.addEventListener('touchstart', onTouchStart, {passive: false})
    listCover.addEventListener('touchmove', onTouchMove, {passive: false})
    listCover.addEventListener('touchend', onTouchEnd, {passive: false})
    listCover.addEventListener('click', onClick, {passive: false})
    /*return ()=>{
      listCover.removeEventListener('touchstart', onTouchStart, {passive: false})
      listCover.removeEventListener('touchmove', onTouchMove, {passive: false})
      listCover.removeEventListener('touchend', onTouchEnd, {passive: false})
      listCover.removeEventListener('click', onClick, {passive: false})
    }*/
  },[])

  useEffect(()=>{
    setFocused( currentWin === index )
    const distanceFromCenter = getDistanceFromCenter(index, scrollLength, appWindows.length)
    let wAngle = distanceFromCenter*PI/4
    if (abs(wAngle)>PI) wAngle = PI
    setCosA(cos(wAngle));
    setSinA(sin(wAngle));
  },[currentWin, index, scrollLength, appWindows])
  return (
    <div
      className={
        styles['app-window'] + ' ' + 
        (!listView ? (focused ? styles.focus : styles.away) : '')
      }
      style={
        listView ? {
          transform: `scale(0.6, 0.6) translateZ(${cosA*70}px) translateX(${sinA*50}%)`,
          opacity: cosA**1.5||0
        } : null
      }>
      <div
        className={styles['list-cover']}
        ref={listCoverRef}></div>
      <Component controllers={{setListView}}/>
    </div>
  )
}
export default AppWindow;
/*
export class AppWindowC extends React.Component {
  listCover = React.createRef()
  state = {
    scrollXStart: 0,
    WLScrollXStart: 0,
  }

  componentDidMount() {
    const winList = this.props.winList
    const listCover = this.listCover.current

    listCover.addEventListener('touchstart', e => {
      this.setState({
        scrollXStart: e.changedTouches[0].screenX*3.3333/window.screen.width,
        WLScrollXStart: winList.state.scrollLength
      })
      winList.setState({scrolling: true})
    }, {passive: false})
    listCover.addEventListener('touchmove', e => {
      e.preventDefault()
      const moveLength = this.state.scrollXStart-e.changedTouches[0].screenX*3.3333/window.screen.width+this.state.WLScrollXStart
      if (winList.appWindows.length === 1 && (moveLength > 0.4 || moveLength < -0.4)) return 0
      winList.scrollTo(moveLength)
    }, {passive: false})
    listCover.addEventListener('touchend', e => {
      winList.setState({scrolling: false})
      winList.bringToCenter()
    }, {passive: false})
    listCover.addEventListener('click', e => {
      winList.setState({
        currentWin: this.props.index,
        listView: false
      })
    }, {passive: false})
  }

  getDistanceFromCenter(index, center, listLength) {
    const b_distance = index - center
    if (abs(b_distance) > abs(b_distance+listLength)) return b_distance+listLength
    if (abs(b_distance) > abs(b_distance-listLength)) return b_distance-listLength
    return b_distance;
  }

  render() {
    const winList = this.props.winList
    const isListView = winList.state.listView
    const isFocused = winList.state.currentWin === this.props.index
    const distanceFromCenter = this.getDistanceFromCenter(this.props.index, winList.state.scrollLength, winList.appWindows.length)
    let wAngle = distanceFromCenter*PI/4
    if (abs(wAngle)>PI) wAngle = PI
    const cosA = cos(wAngle);
    return (
      <div
        className={
          styles['app-window'] + ' ' + 
          (!isListView ? (isFocused ? styles.focus : styles.away) : '')
        }
        style={
          isListView ? {
            transform: `scale(0.6, 0.6) translateZ(${cosA*70}px) translateX(${sin(wAngle)*50}%)`,
            opacity: cosA**1.5||0
          } : null
        }>
        <div
          className={styles['list-cover']}
          ref={this.listCover}></div>
        <this.props.component winList={winList} />
      </div>
    )
  }
}
*/