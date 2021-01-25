import React from 'react'
const {abs, sin, cos, PI} = Math
export default class extends React.Component {
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
          'app-window ' +
          (!isListView ? (isFocused ? 'focus' : 'away') : '')
        }
        style={
          isListView ? {
            transform: `scale(0.6, 0.6) translateZ(${cosA*70}px) translateX(${sin(wAngle)*50}%)`,
            opacity: cosA**1.5||0
          } : null
        }>
        <div
          className='list-cover'
          ref={this.listCover}></div>
        <this.props.component winList={winList} />
      </div>
    )
  }
}