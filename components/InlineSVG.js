import React from 'react';

export default class extends React.Component {
  state = {
    src: '',
    color: ''
  }
  componentDidMount(){
    this.setState({
      src: this.props.src,
      color: this.props.color
    })
  }
  render(){
    return (
      <div style={{
        backgroundColor: this.props.color,
        WebkitMask: 'url('+this.state.src+') no-repeat center',
        mask: 'url('+this.state.src+') no-repeat center',
        
        width: '1.5em',
        height: '1.5em',
        display: 'inline-block'
      }} />
    )
  }
}