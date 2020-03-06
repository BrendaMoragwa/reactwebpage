import React, { Component } from "react";
import Table from "./components/Table";
import Filter from "./components/filter";
import { Plus, Target, Circle, Smartphone } from "react-feather";
import { Link } from "react-router-dom";
import Modal from "./components/modal";
import { Verify } from "crypto";
import Fuse from "fuse.js";
import moment from "moment";
import Form from "./components/form";
import config from './config.js';
import {
  Edit,
  Check,
  AlertTriangle,
  ThumbsUp,
  RefreshCcw,
  Edit2,
  UserX,
  LogOut,
  LogIn,
  UserPlus,
  CheckCircle,
  Briefcase,
  DollarSign,
  FilePlus,
  RefreshCw,
  XCircle,
  Bell,
  BellOff
} from "react-feather";

window.server = config.server_url;

class App extends Component {
  state = {
    tableData: { data: [] },
    response: { data: [] },
    tableError: false,
    query: {},
    editModal: false,
    filter: {},
    table_loading: false,

      details: {
      country_name: null,
      office_name: "",
      readiness_type: "",
      category: "",
      project_ref: "",
      grant_amount: "",
      duration: "",
      date_from_gcf: "",
      start_date: "",
      end_date: "",
      first_disbursement_amount: "",
      status: ""
    }
  };

  onSubmit=e=>{
    e.preventDefault();

    alert(this.state.project_ref);
  }

  timeout = null;
  render() {
    return (
      <>
      <div className="">
        <div className="mt-3 table-card  border-0 card shado mx-3 shadow">
          <div className="p-4">
          <button
                  onClick={() => {
                    this.setState({ editModal: true });
                    //console.log(this.state.response.data[0]);
                  }}
                  className="option-card no-wrap pr-3 d-md-flex d-inline-block my-2 flex-row btn align-items-center btn-primary btn-round mr-3"
                >
                  <Plus size={16} />
                  <span className="pl-1 font-weight-bold">Add Project</span>
                </button>
            <Table
              search={["project_ref", "start_date", "end_date"]}
              sort="id"
              sortDirection={-1}
              data={this.state.tableData}
              fetch={params => {
                this.setState({ query: params });
              }}
              loading={this.state.table_loading}
              fetchError={this.state.tableError}
            />
          </div>
        </div>
      </div>
      <Modal
          visible={this.state.editModal}
          close={() => this.setState({ editModal: false })}
        >
          <h5 className="font-weight-bold">Add Project details</h5>

          <Form onSubmit={this.createProject}
            submitText={"Submit"}
            back={false}
            inputs={[
              {
                label: "Country Name",
                name: "country_name",
                value: this.state.details.country_name
              },
              {
                label: "Office Name",
                name: "office_name",
                value: this.state.details.office_name
              },
              {
                label: "Readiness Type",
                name: "readiness_type",
                value: this.state.details.readiness_type
              },
              {
                label: "Category",
                name: "category",
                value: this.state.details.category,
              },
              {
                label: "Project Ref",
                name: "project_ref",
                value: this.state.details.project_ref,
              },
              {
                label: "Grant Amount",
                name: "grant_amount",
                value: this.state.details.grant_amount,
              },
              {
                label: "Duration",
                name: "duration",
                value: this.state.details.duration,
              },

              {
                label: "Date From GCF",
                name: "date_from_gcf",
                value: this.state.details.date_from_gcf
              },
              {
                label: "Start Date",
                name: "start_date",
                value: this.state.details.start_date
              },
              {
                label: "End Date",
                name: "end_date",
                value: this.state.details.end_date,
              },
              { type: "break" },
              {
                label: "First Disbursement Amount",
                name: "first_disbursement_amount",
                value: this.state.details.first_disbursement_amount
              },
              {
                label: "Status",
                name: "status",
                value: this.state.details.status
              }
            ]}
            submit={data => {
              this.setState({ details: data });
              console.log(data);
            }}
          />
        </Modal>
      </>
    );
  }

  fetchProjects = () => {
    this.setState({ table_loading: true });

    let q = {
      // ...this.state.filter,
      ...this.state.query
    };

    let urlParams = Object.entries(q)
      .map(e => e.join("="))
      .join("&");

    fetch(`${window.server}projects`)
      .then(response => response.json())
      .then(response => {
       // alert(JSON.stringify(response));


        let data = [];
        response.map((d, i) => {
          data.push({
            project_ref: d.project_ref,
            grant_amount: d.grant_amount,
            duration: d.duration,
            project_ref: d.project_ref,
            grant_amount: d.grant_amount,
            end_date: d.end_date,
            disbursement: d.first_disbursement_amount,
            status: d.status,

            action: (
              <div className="d-flex flex-row">
                <button
                  onClick={() => {
                    this.setState({ editModal: true });
                    //console.log(this.state.response.data[0]);
                  }}
                  className="option-card no-wrap pr-3 d-md-flex d-inline-block my-2 flex-row btn align-items-center btn-primary btn-round mr-3"
                >
                  <span className="pl-1 font-weight-bold">Edit</span>
                </button>
                <button
                  onClick={() => {
                    this.setState({ editModal: true });
                    //console.log(this.state.response.data[0]);
                  }}
                  className="option-card no-wrap pr-3 d-md-flex d-inline-block my-2 flex-row btn align-items-center btn-primary btn-round mr-3"
                >
                  <span className="pl-1 font-weight-bold">Delete</span>
                </button>
              </div>
            )
          
          });
        });

        let dts = {};
        dts.data = data;

        this.setState({
          tableData: { ...response, ...dts },
          response,
          table_loading: false
        });
      })
      .catch(d => {
        this.setState({ table_loading: false });
        console.error(d);
      });
  };

  createProject = data => {
    if (
      !window.confirm("Are you sure that you want to Create this member?")
      )
      return false;
    let postData = data;

    this.setState({ modalVisible: true });
    fetch(`${window.server}/project/CreateRequest/${this.props.match.params.id}`, {
      method: "PATCH",
      body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      if (response.code) {
        alert(
          response.message +
          " \n " +
          (response.errors[0] ? response.errors[0].message : "")
          );
        this.setState({ modalVisible: false });
      } else {
        console.log(response);

        this.setState({ uploadSuccessful: true });
      }
    })
    .catch(d => {
      console.log("Error saving the data");
      console.log(d);
      this.setState({ modalVisible: false });
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify({ ...this.state.query, ...this.state.filter }) !==
      JSON.stringify({ ...prevState.query, ...prevState.filter })
    ) {
      let $t = this;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function() {
        $t.fetchProjects();
      }, 100);
    }
  }
}

export default App;
