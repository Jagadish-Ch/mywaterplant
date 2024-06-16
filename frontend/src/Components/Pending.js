import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationButtons from './NavigationButtons';
import { baseURL } from './baseURL';
import SMTables from './SMTables';
import ScrollToTop from './ScrollToTop';
import SearchBar from './SearchBar';


const Pending = () => {

  // ========================= Variable for API to Store locally =================
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [Option, setOption] = useState("CanNo")
  // ====================================================================

  // ================= Getting/Retriving Data from API =================
  useEffect(() => {
      axios.get(`${baseURL}/report`)
      .then(response => {
        setUsers(response.data);
        setRecords((response.data).reverse());
      }
      )
      .catch(err => 
        console.log(err));
  }, []);

  
  const Filter = (event) =>{
    
    const input = event.target.value
    if(input===""){
      window.location.reload();
    }
    if(Option==="CanNo"){
      setRecords(users.filter(f => f.CanNo.includes(event.target.value)));
    }
    else if(Option==="Date"){
      setRecords(users.filter(f => f.DateTime[0].includes(event.target.value)))
    }
    else{
      setRecords(users.filter(f => f.Name.toLowerCase().includes(event.target.value)||f.WaterType.toLowerCase().includes(event.target.value)||f.MobileNo.includes(event.target.value)));
    }
  }
  // ==================================================================

  const headers=['Mobile Number', 'Water Type', 'Pending క్యాన్లు']
  const apiHeaders=['MobileNo', 'WaterType', 'RemainingCans']

  
    
    let totalPendingCans = 0;
    
    for (let key in users) {
      totalPendingCans += (users[key].TotalCans-users[key].ReturnedCans);
    }

  return (
    <div>
      <center>
        <NavigationButtons/>
        <h1 className='pending-pg-title order-title'>Pending Customers</h1>
        
        <SearchBar Filter={Filter} Option={Option} setOption={setOption} />
        <div className='report-table-data'>
          <table className='report-table'>
            <thead>
            <tr key="">
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Water Type</th>
              <th>Pending క్యాన్ నంబర్</th>
              <th>Pending క్యాన్లు</th>
              <th>కారణం</th>
            </tr>
            </thead>

            <tbody>
            
            {records.map((user) => {

              const PendingCanNo =
                  (user.CanNo).filter((element) => !(user.ReturnedCanNo).includes(element));


              const PendingAmount = (user.TotalCans*user.EachCanAmount)-(user.Amount)
              const OneCanAmount = `( ఒక్క క్యాన్ Amount : ${user.EachCanAmount}/- )`

                if(user.TotalCans!=user.ReturnedCans && user.PaidOrNot==="Amount Not Paid"){
                  
                  const Reason = `ఇప్పటికి క్యాన్లు మరియి ${PendingAmount}/- డబ్బులు ఇవ్వలేదు`;
                  return (
                    
                    <tr key={user.id}>
                      <td>{user.Name}</td>
                      <td>{user.MobileNo}</td>
                      <td>{user.WaterType}</td>
                      <td style={{backgroundColor:"rgb(248, 173, 173)"}}>{PendingCanNo.join(", ")}</td>
                      <td style={{backgroundColor:"rgb(248, 173, 173)"}}>{user.TotalCans-user.ReturnedCans}</td>
                      <td>{Reason}<br/>{OneCanAmount}</td>
                    </tr>
                    
                  );
                }
                else if(user.TotalCans!=user.ReturnedCans){
                  const Reason = PendingAmount==0?`ఇప్పటికి క్యాన్లు ఇవ్వలేదు`:`ఇప్పటికి క్యాన్లు మరియి ${PendingAmount}/- డబ్బులు ఇవ్వలేదు`;
                  
                  return (
                  <tr key={user.id}>
                    <td>{user.Name}</td>
                    <td>{user.MobileNo}</td>
                    <td>{user.WaterType}</td>
                    <td style={{backgroundColor:"rgb(248, 173, 173)"}}>{PendingCanNo.join(", ")}</td>
                    <td style={{backgroundColor:"rgb(248, 173, 173)"}}>{user.TotalCans-user.ReturnedCans}</td>
                    <td>{Reason}<br/>{OneCanAmount}</td>
                  </tr>
                  );
                }
                else if((user.Amount < user.TotalCans*user.EachCanAmount) || user.PaidOrNot==="Amount Not Paid"){
                  
                  const Reason = `ఇంకా ${PendingAmount}/- రూపాయలు ఇవ్వలేదు`;
                  return (
                    <tr key={user.id}>
                      <td>{user.Name}</td>
                      <td>{user.MobileNo}</td>
                      <td>{user.WaterType}</td>
                      <td style={{backgroundColor:"rgb(248, 173, 173)"}}>{PendingCanNo.join(", ")}</td>
                      <td style={{backgroundColor:"rgb(248, 173, 173)"}}>{user.TotalCans-user.ReturnedCans}</td>
                      <td>{Reason}<br/>{OneCanAmount}</td>
                    </tr>
                  );
                }
              }
            )}
            </tbody>
          </table>
        </div>

      </center>
      <ScrollToTop/>
      <SMTables headers={headers} apiHeaders={apiHeaders} records={records}/>
      
    </div>
  )
}

export default Pending