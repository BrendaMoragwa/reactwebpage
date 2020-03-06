import React, { Component } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from 'moment';
import { Check, X } from 'react-feather';
import Access from './accessManager';

class Filter extends Component {
  state = {
    ranges: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    },
    zone: 0,
    branch: 0,
    dateVisible: false,
    filter: []
  };

  render() {
    return (
      <>
        <div className='d-flex flex-row justify-content-between mb-3 position-relative'>
          <div className='d-flex flex-row'>
            {this.props.filter && (
              <div className='mx-2 flex-column'>
                <small className='mb-2 font-weight-bold'>Filter </small>
                <select
                  name=''
                  id=''
                  className='form-control py-1 filter-option'
                  onChange={e => {
                    let val = parseInt(e.target.value);

                    if (this.props.filter[val].value !== 0) {
                      let item = {};
                      item[this.props.filter[val].name] = this.props.filter[
                        val
                      ].value;

                      this.setState({ filter: item });
                    } else {
                      this.setState({ filter: [] });
                    }
                  }}>
                  {this.props.filter.map((d, i) => (
                    <option value={i} key={i}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {this.props.dateRange && (
            <div className='mx-2 flex-column'>
              <small className='mb-2 font-weight-bold'>Date range </small>
              <div
                className='form-control filter-option py-0 d-flex flex-row align-items-center noselect'
                onClick={() => {
                  this.setState({ dateVisible: true });
                }}>
                <span>
                  <b>From</b>
                  {moment(this.state.ranges.startDate).format(' MMMM Do YYYY ')}
                  <b>&nbsp;&nbsp; To</b>
                  {moment(this.state.ranges.endDate).format(' MMMM Do YYYY ')}
                </span>
              </div>
            </div>
          )}

          <div
            className={
              'card date-card ' + (this.state.dateVisible ? '' : 'd-none')
            }>
            <DateRangePicker
              ranges={[this.state.ranges]}
              onChange={ranges => this.updateDateRange(ranges)}
            />

            <div className='p-3 text-center d-flex flex-row justify-content-between'>
              <button
                onClick={() => {
                  this.setState({ dateVisible: false });
                }}
                className='btn btn-outline-danger btn-sm d-flex flex-row
                align-items-center align-self-center pr-4'>
                <X size={18} /> <span className='ml-2'>Cancel</span>
              </button>

              <button
                onClick={() => {
                  this.setState({ dateVisible: false });
                }}
                className='btn btn-primary btn-sm d-flex flex-row align-items-center align-self-center pr-4'>
                <Check size={18} /> <span className='ml-2'>Done</span>
              </button>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            this.setState({ dateVisible: false });
          }}
          className={
            'date-bg-cover cursor-pointer ' +
            (this.state.dateVisible ? '' : 'd-none')
          }
        />
      </>
    );
  }

  updateDateRange(ranges) {
    // console.log(ranges);
    if (ranges) this.setState({ ranges: ranges.selection });
  }

  componentDidMount() {
    // this.updateFilter();
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
      this.updateFilter();
    }
  }

  updateFilter = () => {
    let filterData = {};

    if (this.props.dateRange) {
      filterData[this.props.dateRange[0]] = moment(
        this.state.ranges.startDate
      ).format('YYYY-MM-DD');
      filterData[this.props.dateRange[1]] = moment(
        this.state.ranges.endDate
      ).format('YYYY-MM-DD');
      // filterData[this.props.dateRange[0]] = this.state.ranges.startDate;
      // filterData[this.props.dateRange[1]] = this.state.ranges.endDate;
    }

    filterData = { ...filterData, ...this.state.filter };
    console.log(filterData);
    this.props.getFilter(filterData);
  };
}

export default Filter;
