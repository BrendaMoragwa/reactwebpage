import React, { Component } from "react";
import Modal from "../components/modal";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

class CameraModal extends Component {
  state = { visible: this.props.visible };
  render() {
    return (
      <Modal
        visible={this.state.visible}
        close={() => this.setState({ visible: false })}>
        <div className="d-flex flex-column align-items-center">
          <div className="position-relative rb-22">
            {this.state.visible && (
              <Camera
                onTakePhoto={dataUri => {
                  let $t = this;
                  setTimeout(() => {
                    $t.props.capture(dataUri);
                  }, 500);
                }}
                idealResolution={{
                  width: this.props.width ? this.props.width : 480,
                  height: this.props.height ? this.props.height : 480
                }}
                isImageMirror={false}
                idealFacingMode={FACING_MODES.USER}
              />
            )}
          </div>
          <div className="my-3 font-weight-bold">OR</div>
          <div>
            <input
              type="file"
              onChange={e => {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                  this.props.capture(reader.result);
                };
                reader.onerror = error => console.log(error);
              }}
            />
          </div>
        </div>
      </Modal>
    );
  }

  componentWillReceiveProps(props) {
    if (typeof props.visible !== "undefined") {
      this.setState({ visible: props.visible });
    }
  }
}

export default CameraModal;
