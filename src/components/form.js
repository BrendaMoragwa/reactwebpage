import React, { Component } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { Camera as Cam, Plus } from "react-feather";
import Modal from "./modal";
import CameraModal from "./cameraModal";

class Form extends Component {
  state = {
    inputs: this.props.inputs,
    cameraVisible: false,
    passportPhoto: this.props.inputs.passport,
    camera: {}
  };
  render() {
    // console.log(this.props.inputs);
    return (
      <div className="pb-3 pt-5 mt-3 ">
        <form className="" onSubmit={e => this.submit(e)}>
          {this.state.inputs.map((d, i) => {
            let input;
            if (d.type === "break") {
              return <hr className="my-4 mx-3" />;
            } else if (d.type == "select") {
              input = (
                <select
                  className="form-control bg-light"
                  value={d.value}
                  readOnly={d.readonly}
                  disabled={d.readonly}
                  required={
                    typeof d.required === "undefined" ? true : d.required
                  }
                  onChange={e => {
                    let { inputs } = this.state;
                    inputs[i].value = e.target.value;
                    this.setState({ inputs });
                  }}
                >
                  <option value="" hidden selected>
                    ...
                  </option>
                  {d.options.map((dt, ind) => (
                    <option key={ind} value={dt.value}>
                      {dt.name}
                    </option>
                  ))}
                </select>
              );
            } else if (d.type === "passport") {
              input = (
                <div className="tab-cover d-block mb-3 d-flex flex-row">
                  <div
                    className="camera-tab d-flex flex-row align-items-center justify-content-center icon position-relative"
                    onClick={() => {
                      this.setState({
                        cameraVisible: true,
                        cameraModalURI: "state.inputs[" + i + "].value",
                        camera: {
                          width: 480,
                          height: 480
                        }
                      });
                    }}
                  >
                    <img
                      src={this.state.inputs[i].value}
                      className="w-100 camera-img"
                      alt=""
                    />
                    <Cam size={50} color="#999" className="passport-icon" />
                  </div>
                </div>
              );
            } else if (d.type === "id") {
              input = (
                <div className=" py-5">
                  <div className="">
                    <div className="d-flex flex-row flex-wrap">
                      <div>
                        <h5 className="ml-1 mb-2 d-block font-weight-bold">
                          ID front
                        </h5>
                        <div
                          className="id-card d-flex flex-row align-items-center justify-content-center bg-light"
                          onClick={() => {
                            this.setState({
                              cameraVisible: true,
                              cameraModalURI: "state.inputs[" + i + "].value"
                            });
                          }}
                        >
                          <div className="d-flex flex-row align-items-center text-dark">
                            <Plus />
                            <h5 className="ml-2 mb-0">Chooose a file</h5>
                          </div>

                          {this.state.inputs[i].value !== "" && (
                            <img
                              src={this.state.inputs[i].value}
                              className="id-img"
                              alt=""
                            />
                          )}
                        </div>
                      </div>

                      <div className="ml-5">
                        <h5 className="ml-1 mb-2 d-block font-weight-bold">
                          ID Back
                        </h5>
                        <div
                          className="id-card d-flex flex-row align-items-center justify-content-center bg-light"
                          onClick={() => {
                            this.setState({
                              cameraVisible: true,
                              cameraModalURI:
                                "state.inputs[" + (i + 1) + "].value"
                            });
                          }}
                        >
                          <div className="d-flex flex-row align-items-center text-dark">
                            <Plus />
                            <h5 className="ml-2 mb-0">Chooose a file</h5>
                          </div>

                          {this.state.inputs[i + 1].value !== "" && (
                            <img
                              src={this.state.inputs[i + 1].value}
                              className="id-img"
                              alt=""
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else if (d.type === "textarea") {
              input = (
                <textarea
                  type={d.type}
                  placeholder="..."
                  className="form-control bg-light form-textarea"
                  readOnly={d.readonly}
                  // cols={20}
                  required={
                    typeof d.required === "undefined" ? true : d.required
                  }
                  onChange={e => {
                    let { inputs } = this.state;
                    inputs[i].value = e.target.value;
                    this.setState({ inputs });
                  }}
                >
                  {d.value}
                </textarea>
              );
            } else {
              input = (
                <input
                  type={d.type}
                  placeholder="..."
                  className="form-control bg-light text-input"
                  readOnly={d.readonly}
                  value={d.value}
                  required={
                    typeof d.required === "undefined" ? true : d.required
                  }
                  onChange={e => {
                    let { inputs } = this.state;
                    inputs[i].value = e.target.value;
                    this.setState({ inputs });
                  }}
                />
              );
            }

            return (
              <div className="mx-3 d-inline-block mb-3">
                <span className="ml-1 mb-2 d-block text-capitalize">
                  {d.label}
                </span>
                {input}
              </div>
            );
          })}

          <div className=" my-3 d-flex flex-row justify-content-between mt-5 justify-content-between">
            {this.props.back && (
              <button className="btn btn-outline-primary px-3 px-md-5 btn-round">
                Back
              </button>
            )}

            <button className="btn btn-primary px-3 px-md-5 ml-3 font-weight-bold btn-round">
              {this.props.submitText ? this.props.submitText : "submit"}
            </button>
          </div>
        </form>

        <CameraModal
          visible={this.state.cameraVisible}
          width={this.state.camera.width ? this.state.camera.width : 840}
          height={this.state.camera.height ? this.state.camera.height : 540}
          capture={uri => {
            let { state } = this;
            // console.log(this.state.cameraModalURI);
            eval(this.state.cameraModalURI + "= `" + uri + "`");
            state.cameraVisible = false;
            state.camera = {};
            this.setState({ ...state });
          }}
        />
      </div>
    );
  }

  componentDidMount() {
    this.prevData = this.state.inputs;
  }

  submit = e => {
    e.preventDefault();
    let { inputs } = this.state;
    let output = {};
    inputs.map(d => {
      if (typeof d.name !== "undefined") output[d.name] = d.value;
    });
    // console.log(output);
    this.props.submit(output);
  };
}

export default Form;
