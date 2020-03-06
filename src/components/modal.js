import React, { Component } from "react";
import { X } from "react-feather";

class Modal extends Component {
  state = { visible: this.props.visible };
  render() {
    return (
      <div
        class={this.state.visible ? "modal fade d-block show" : "modal fade"}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true">
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ maxWidth: this.props.width ? this.props.width : 500 }}
          role="document">
          <div className="modal-content">
            {this.props.dismiss !== false && (
              <X
                className="icon position-absolute modal-close-icon m-2"
                onClick={() => {
                  this.setState({ visible: false });
                  if (this.props.close) {
                    this.props.close();
                  }
                }}
              />
            )}
            <div className="modal-body">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
  componentWillReceiveProps(props) {
    if (typeof props.visible !== "undefined") {
      this.setState({ visible: props.visible });
    }
  }
}

export default Modal;
