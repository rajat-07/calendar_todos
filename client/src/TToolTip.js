// import { render } from 'react-dom';
import React from 'react';
import axios from 'axios';
import './index.css';
// import * as React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';

import { extend, isNullOrUndefined, resetBlazorTemplate } from '@syncfusion/ej2-base';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';

import { SampleBase } from './sample-base';
import { PropertyPane } from './property-pane';
import * as dataSource from './datasource.json';

// new 
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

function TToolTip() {

    template(props) {
        return (<div className="tooltip-wrap">
      <div className={"image " + props.EventType}></div>
      <div className="content-area"><div className="event-name">{props.Subject}</div>
        {(props.City !== null && props.City !== undefined) ? <div className="city">{props.City}</div> : ''}
        <div className="time">From&nbsp;:&nbsp;{props.StartTime.toLocaleString()}</div>
        <div className="time">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
        {props.EndTime.toLocaleString()}</div>
      </div></div>);
    }
    onToolTipChange(args) {
        if (args.checked) {
            this.scheduleObj.eventSettings.enableTooltip = true;
        }
        else {
            this.scheduleObj.eventSettings.enableTooltip = false;
        }
        this.scheduleObj.dataBind();
    }
    
    const onToolTipTemplateChange = (args) => {
        if (args.checked) {
            this.scheduleObj.eventSettings.tooltipTemplate = this.template.bind(this);
        }
        else {
            this.scheduleObj.eventSettings.tooltipTemplate = null;
        }
        this.scheduleObj.dataBind();
    }

    const onEventRendered = (args) => {
        applyCategoryColor(args, this.scheduleObj.currentView);
    }

    const getSchedules = () => {
      axios.get('/api')
        .then((res) => {
          // const data = res.data;
          // console.log(data);
          // this.setState({ schedules: data});
          // this.data = data;
          console.log('Data has been received !');
        })
        .catch(() => {
          console.log('Error retrieving data !');
        });
    }

    const handleInsert = (id, subject, startTime, endTime, eventType) => {
      let x_color;
      if(eventType == "In-Progress"){
        x_color = "#008B8B";
      } else if(eventType == "Completed"){
        x_color = "#228B22";
      } else {
        x_color = "#DC143C";
      }
      const payload = {
        "Id": id,
        "Subject": subject,
        "StartTime": startTime,
        "EndTime": endTime,
        "EventType": eventType,
        "CategoryColor": x_color
      }
      console.log(`insert id ${id} with data : ${payload}`);
      // insert POST api 
      axios({
        url: '/api/save',
        method: 'POST',
        data: payload
      })
        .then(() => {
          console.log('Data has been sent to the server');
          this.props.setOk(!this.props.ok);
          let target_element = 'Appointment_' + id;
          console.log("target = ", target_element);
        //   this.setState({done: !this.done});
          // document.querySelector(`[data-id=${target_element}]`).style.backgroundColor = x_color;
        })
        .catch(() => {
          console.log('Internal server error');
        });
    }

    const handleEdit = (id, subject, startTime, endTime, eventType) => {
      let x_color;
      if(eventType == "In-Progress"){
        x_color = "#008B8B";
      } else if(eventType == "Completed"){
        x_color = "#228B22";
      } else {
        x_color = "#DC143C";
      }
      let payload = {
        "Id": id,
        "Subject": subject,
        "StartTime": startTime,
        "EndTime": endTime,
        "EventType": eventType,
        "CategoryColor": x_color
      }
      console.log(`edit id ${id} with data : ${payload}`);
       // edit PUT api 
       axios({
        url: '/api/edit',
        method: 'PUT',
        data: payload
      })
        .then(() => {
          console.log('Data has been sent to the server');
          let x_color;
          if(eventType == "In-Progress"){
            x_color = "#008B8B";
          } else if(eventType == "Completed"){
            x_color = "#228B22";
          } else {
            x_color = "#DC143C";
          }
          let target_element = 'Appointment_' + id;
          console.log("target = ", target_element);
          // document.querySelector(`[data-id=${target_element}]`).style.backgroundColor = x_color;
          // this.props.getSchedules();
          setOk(!ok);
        //   this.setState({done: !this.done});
        })
        .catch(() => {
          console.log('Internal server error');
        });
        // this.setState({schedules: this.props.scheduleData});
    }

    const handleDelete = (id) => {
      let payload = {
        "Id": id
      }
      console.log(`delete id ${id}`);
      // delete DELETE api 
      axios({
        url: '/api/delete',
        method: 'PUT',
        data: payload
      })
        .then(() => {
          console.log('Data has been sent to the server');
          setOk(!ok);
        //   this.setState({done: !this.done});
        })
        .catch(() => {
          console.log('Internal server error');
        });
    }

    const solve = (event, status) => {
      if(event == undefined || event == null) return;
      if(event.length == 0) return;
      console.log("status : ", status);
      let x = event[0];
      console.log(x);
      let x_id = x.Id;
      let x_subject = x.Subject;
      let x_start_time = x.StartTime;
      let x_end_time = x.EndTime;
      let x_event_type = x.EventType;
      if(status == "insert"){
        handleInsert(x_id, x_subject, x_start_time, x_end_time, x_event_type);
      } else if(status == "edit"){
        handleEdit(x_id, x_subject, x_start_time, x_end_time, x_event_type);
      } else if(status == "delete"){
        handleDelete(x_id);
      }
      // console.log("id : ", x_id);
      // console.log("subj : ", x_subject);
      // console.log("start time : ", x_start_time);
      // console.log("end time : ", x_end_time);
    }
    
    const onActionBegin = (args) => {
      console.log("action begin called  ...");
      // insert
      console.log("insert : ", args.addedRecords);
      solve(args.addedRecords, "insert");
      // edit
      console.log("edit : ", args.changedRecords);
      solve(args.changedRecords, "edit");
      // delete 
      console.log("delete : ", args.deletedRecords);
      solve(args.deletedRecords, "delete");
    }

    // new 
    const editorTemplate = (props) => {
        return (props !== undefined ? <table className="custom-event-editor" style={{ width: '100%', cellpadding: '5' }}><tbody>
      <tr><td className="e-textlabel">Subject</td><td colSpan={4}>
        <input id="Summary" className="e-field e-input" type="text" name="Subject" style={{ width: '100%' }}/>
      </td></tr>
      <tr><td className="e-textlabel">Status</td><td className="field-wrap" colSpan={4}>
        <DropDownListComponent id="EventType" placeholder='Choose status' data-name="EventType" className="e-field" style={{ width: '100%' }} dataSource={['To-Do', 'In-Progress', 'Completed']} value={props.EventType || null}></DropDownListComponent>
      </td></tr>
      <tr><td className="e-textlabel">From</td><td colSpan={4}>
        <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="StartTime" data-name="StartTime" value={new Date(props.startTime || props.StartTime)} className="e-field"></DateTimePickerComponent>
      </td></tr>
      <tr><td className="e-textlabel">To</td><td colSpan={4}>
        <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="EndTime" data-name="EndTime" value={new Date(props.endTime || props.EndTime)} className="e-field"></DateTimePickerComponent>
      </td></tr>
      {/* <tr><td className="e-textlabel">Reason</td><td colSpan={4}>
        <textarea id="Description" className="e-field e-input" name="Description" rows={3} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }}></textarea>
      </td></tr> */}
      </tbody></table> : <div></div>);
    }

    return (
        <div>
            
        </div>
    )
}

export default TToolTip
