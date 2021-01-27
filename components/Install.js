import React, { useState, useEffect } from 'react'
import './Install.module.scss'
import { windows, macos, ios, safari } from 'mini-platform-detect'
import  InlineSVG from './InlineSVG'
import i18n from 'i18next';
import { useTranslation, Trans } from "react-i18next";

export default (props) => {
  const [instPrompt, setInstPrompt] = useState(null)
  const [t, i18n] = useTranslation();
  
  /*state = {
    installPrompt: null
  }*/
  useEffect(()=>{
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      setInstPrompt(e)
    })
  },[])
  //console.log(typeof t('install'));
  return (
    <div className='install center-content'>
      <h1>Hakqlo</h1>
      <button
        onClick={() => {
          if(windows||macos){
            popup(t('PC version unavailable'))
          } else if (instPrompt) {
            instPrompt.prompt()
            instPrompt.userChoice.then(choice => {
              if (choice.outcome === 'accepted') {
                setInstPrompt(null)
              }
            })
          } else if(ios&&safari){
            popup(t('Add to Home Screen'),[
              t('You can install Hakqlo App by adding this website to your home screen'),
              <ol>
                <li><Trans>Tap the <InlineSVG src={require('../../icon/ios-safari-share-icon.svg').default} color={'rgba(56, 172, 255, 0.91)'} /> icon at the bottom of your browser</Trans></li>
                <li><Trans>Choose <InlineSVG src={require('../../icon/ios-safari-add-to-home-icon.svg').default} color={'white'} /> Add to Home Screen</Trans></li>
              </ol>
            ], ['OK',{value:'problem',text: 'getting a problem?'}]).then(v=>{
              //console.log(v);
              if(v==='problem')popup(t('Try the following'), t('If you are not using Safari, try to use safari'))
            })
          } else {
            popup(t('Could not install the app'))
          }
        }}>
        {t('install')}
      </button>
    </div>
  )
  
}