import React from 'react'
import Splash from './Splash'
import WindowList from './WindowList'
import Install from './Install'
import DialogList from './DialogList'
//---multi language support
import '../js/i18n';
class App extends React.Component {
  state = {
    isPWA: window.matchMedia('(display-mode: standalone)').matches
  }
  testAppScreen = true;
  appScreen = (
    <div className='App'>
      <Splash />
      <WindowList />
      <DialogList />
    </div>
  )
  installScreen = (
    <div className='App'>
      <Install />
      <DialogList />
    </div>
  )
  componentDidMount() {
    window.matchMedia('(display-mode: standalone)').addEventListener('change', e => {
      this.setState({
        isPWA: e.matches
      })
    })
  }

  render() {
    //prevents leaving test codes to production build
    if (process.env.NODE_ENV==='development'){
      if(this.testAppScreen){
        return this.appScreen;
      } else {
        return this.installScreen;
      }
    }else if (this.state.isPWA) {
      return this.appScreen;
    } else {
      return this.installScreen;
    }
  }
}

export default App
