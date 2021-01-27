import React , { createRef, useEffect, useState, useCallback } from 'react'
import AppWindow from './AppWindow'
import { Window1, Window2, Window3, Window4, Window5, Window6 } from './Windows'
import styles from './WindowList.module.scss'
/*
Niwa-chan, I want this AppWindow to have following functionalities:
- create-window
- delete-window
- undeletable-window(used for such as settings window)
- executing onFocus method for each window-apps, when focused?
can you do this?

By the way, I added window.searchParams object:
https://developer.mozilla.org/ja/docs/Web/API/URLSearchParams
which is browser-implemented object.
you can know if the URL query has a 'parameter',
searchParams.has('parameter')  //true or false
searchParams.get('parameter')  //returns the value
*/
const WindowList = ({}) =>{
  const [appWindows, setAppWindows] = useState(
    [Window1,
    Window2,
    Window3,
    Window4,
    Window5,
    Window6,
  ])
  const [currentWin, setCurrentWin] = useState(0)
  const [scrollLength, setScrollLength] = useState(0)
  const [listView, setListView] = useState(true)
  const [scrolling, setScrolling] = useState(false)
  function scrollTo(moveLength) {
    let scrollLength = moveLength % appWindows.length
    if (scrollLength < 0) scrollLength += appWindows.length
    setScrollLength(scrollLength)
  }
  let bringToCenter =useCallback(()=> setScrollLength(Math.round(scrollLength)),[scrollLength])
  //const getScrollLength =()=> scrollLength;
  /*useEffect(()=>{
    bringToCenter =()=> setScrollLength(Math.round(scrollLength))
    //getScrollLength =()=> scrollLength;
  },[scrollLength])*/
  
  return (
    <div className={
      styles['window-list'] + ' ' +
        (scrolling ? styles.scrolling : '')
      }>
      {appWindows.map((component, index) =>
        <AppWindow 
          controllers={{
            currentWin, appWindows, scrolling, listView, scrollLength,
            setCurrentWin, scrollTo, bringToCenter, setScrolling, setListView
          }} 
          index={index} 
          key={index} 
          Component={component}
        />
      )}
    </div>
  )
}
export default WindowList;
/*
export class WinListCls extends React.Component {
  appWindows = [
    Window1,
    Window2,
    Window3,
    Window4,
    Window5,
    Window6,
  ]
  state = {
    currentWin: 0,
    scrollLength: 0,
    listView: true,
    scrolling: false,
  }

  componentDidMount() {
    window.onsplashend(()=>this.setState({
      listView: false
    }))
  }

  scrollTo(moveLength) {
    let scrollLength = moveLength % this.appWindows.length
    if (scrollLength < 0) scrollLength += this.appWindows.length
    this.setState({scrollLength: scrollLength})
  }

  bringToCenter() {
    this.setState({scrollLength: Math.round(this.state.scrollLength)})
  }

  render() {
    return (
      <div className={
        styles['window-list'] + ' ' +
          (this.state.scrolling ? styles.scrolling : '')
        }>
        {this.appWindows.map((component, index) =>
          <AppWindow winList={this} component={component} index={index} key={index} />
        )}
      </div>
    )
  }
}
*/