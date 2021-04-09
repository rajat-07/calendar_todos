// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import Tooltip from './Tooltip';
import axios from 'axios';
import './App.css';

function App() {

  // const data = [{
  //     "Id": 1,
  //     "Subject": "Server Maintenance",
  //     "StartTime": "2018-02-11T04:30:00.000Z",
  //     "EndTime": "2018-02-11T06:00:00.000Z",
  //     // "EventType": "maintenance",
  //     // "City": "Seattle",
  //     // "CategoryColor": "#1aaa55"
  // }, {
  //     "Id": 2,
  //     "Subject": "Art & Painting Gallery",
  //     "StartTime": "2018-02-12T06:30:00.000Z",
  //     "EndTime": "2018-02-12T08:30:00.000Z",
  //     "EventType": "public-event",
  //     "City": "Costa Rica",
  //     "CategoryColor": "#357cd2"
  // }, {
  //     "Id": 3,
  //     "Subject": "Dany Birthday Celebration",
  //     "StartTime": "2018-02-13T04:30:00.000Z",
  //     "EndTime": "2018-02-13T06:00:00.000Z",
  //     "EventType": "family-event",
  //     "City": "Kirkland",
  //     "CategoryColor": "#7fa900"
  // }];

  const [scheduleData, setScheduleData] = useState(null);
  const [ok, setOk] = useState(true);

  const getSchedules = async() => {

    const res = await axios.get('/api');
    console.log("res : ", res.data);
    let data = res.data;
    let result = []
    for(var i = 0; i < data.length; i++) {
        var obj = data[i];
        console.log(obj.Id);
        // let x_color;
        // if(obj.EventType == "In-Progress"){
        //   x_color = "#008B8B";
        // } else if(obj.EventType == "Completed"){
        //   x_color = "#228B22";
        // } else {
        //   x_color = "#DC143C";
        // }
        let t_data = {
          "Id": obj.Id,
          "Subject": obj.Subject,
          "StartTime": obj.StartTime,
          "EndTime": obj.EndTime,
          "EventType": obj.EventType,
          // "CategoryColor": "#357cd2",
          // "CategoryColor": "#357cd2",
          // "CategoryColor": "#357cd2",
          "CategoryColor": obj.CategoryColor
        }
        result.push(t_data);
        // console.log(obj.id);
    }
    console.log("result : ", result);
    setScheduleData(result);

    // axios.get('/api')
    //     .then((res) => {
    //       const data = res.data;
    //       console.log(data);
    //       // setScheduleData(data);
    //       // this.setState({ schedules: data});
    //       // this.data = data;
    //       let result = []
    //       for(var i = 0; i < data.length; i++) {
    //           var obj = data[i];
    //           console.log(obj.Id);
    //           let t_data = {
    //             "Id": obj.Id,
    //             "Subject": obj.Subject,
    //             "StartTime": obj.StartTime,
    //             "EndTime": obj.EndTime,
    //             "EventType": "family-event",
    //             "City": "Kirkland",
    //             "CategoryColor": "#357cd2"
    //           }
    //           result.push(t_data);
    //           // console.log(obj.id);
    //       }
    //       setScheduleData(result);
    //       console.log(result);
    //       console.log('Data has been received !');
    //     })
    //     .catch(() => {
    //       console.log('Error retrieving data !');
    //     });
  }

  useEffect(() => {
    getSchedules();
    console.log("imp app : ", scheduleData);
  }, [ok]);

  return (
    <div>
    {
      scheduleData && 
       <Tooltip scheduleData={scheduleData} ok={ok} setOk={setOk} getSchedules={getSchedules} /> 
    }
    </div>
  );
}

export default App;

