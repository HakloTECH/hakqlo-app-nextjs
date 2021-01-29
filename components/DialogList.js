import React from 'react';
//import ReactDOM from 'react-dom'
import styles from './Dialog.module.scss';

import { Modal } from './Modal'
//import Dialog from './Dialog';
//import {sleep} from '../js/base_func'
export default class extends React.Component {
  //dialogs = [];
  state = {
    dialogs: []
  }
  deleteQueue = []
  removeFrontDialog(removingDialog,index){
    setTimeout(() =>{
      //if the closing dialog is latest in the list
      if(index+1 ===this.state.dialogs.length){
        this.deleteQueue.forEach(v=>v())
        this.setState({
          dialogs: this.state.dialogs.filter(c=>c!==removingDialog)
        })
      }else{
        this.deleteQueue.push(()=>this.setState({
          dialogs: this.state.dialogs.filter(c=>c!==removingDialog)
        }))
      }
    
  }, 500);
  }
  componentDidMount() {
    
    const self=this;
    console.log(styles);
    window.popup = async function(title, contents=[],buttons=['ok']){
      let resolveV;
      const returnValue = new Promise(resolve=>resolveV=resolve)
      const dialogContent = {
        title:title,
        content:[],
        buttons:[],
        resolve: resolveV,
        returnValue: returnValue
      }
      if(typeof contents === 'string')dialogContent.content = [contents];
      else dialogContent.content = contents;
      if(typeof buttons === 'string')dialogContent.buttons = [buttons];
      else dialogContent.buttons = buttons;
      self.setState({
        dialogs: self.state.dialogs.concat([dialogContent])
      })
      return dialogContent.returnValue
    }
  }
  render(){
    return (
      <div>
        {
          this.state.dialogs.map((content, index) =>
            //<Dialog dcontent={content} key={btoa(index)} dList={this} index={index}/>
            <Modal key={index+'d'} open onClose={
              (e, dialog) => {
                this.removeFrontDialog(content, index);
                content.resolve(dialog.returnValue)
              }
            } className={
              styles['mobile-dialog'] + ' '+ ((this.state.dialogs.length-1>index) ? styles['sent-back'] : '')
            }>
              <form method='dialog'>
                <p className={styles['title']}>
                  {content.title}
                  <button value='cancel'>cancel</button>
                </p>
                {content.content.map?.((v,i)=>{
                  if (typeof v === "string") {
                    return(<p key={i+'-text'}><label>{v}</label></p>)
                  } else if (typeof v === "object" ||v instanceof HTMLElement ) {
                    return <div key={i+'-element'}>{v}</div>
                  }
                })}
                <menu>
                  {content.buttons.map((v,i)=>{
                  
                    if (typeof v === "string") {
                      return(<button key={i+'-button'} type='submit' value={v}>{v}</button>)
                    } else if (v instanceof Object) {
                      return(<button type='submit' key={i+'-button'} value={v.value}>{v.text}</button>)
                    }
                  })}
                </menu>
              </form>
            </Modal>
            )
        }
      </div>
    )
  }
}