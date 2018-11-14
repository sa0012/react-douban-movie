import React, { Component } from 'react';
import Dialog from './dialog';

class Toast extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    
  }

  render () {
    const { showToast } = this.props;
    return (
      <Dialog>
        <div className="toast" style={ styles.toast }>
          this is a toast
        </div>
      </Dialog>
    )
  }
}

const styles = {
  toast: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    minWidth: '150px',
    padding: '15px 30px',
    textAlign: 'center',
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.7)',
    transform: 'translate(-50%, -50%)',
    // display: 'none'
  }
}

export default Toast;