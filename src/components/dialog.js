import React from 'react';
import { createPortal } from 'react-dom';

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    const doc = window.document;
    this.node = doc.createElement('div');
    // this.node.style.width = '100%';
    // this.node.style.height = '100%';
    // this.node.style.position = 'fixed';
    // this.node.style.top = '0';
    // this.node.style.left = '0';
    doc.body.appendChild(this.node);
  }

  render() {
    return createPortal(
      <div className="dialog" style={{ width: '100%', height: '100%' }}>
        {this.props.children}
      </div>, //塞进传送门的JSX
      this.node //传送门的另一端DOM node
    );
  }

  componentWillUnmount() {
    window.document.body.removeChild(this.node);
  }
}

export default Dialog;