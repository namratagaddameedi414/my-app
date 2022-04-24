import './App.css';
import React, {useEffect, useState} from 'react';
import fetchData from './services/rewardsService'
import moment from 'moment';
import _ from 'lodash';

function App() {
    const [data, setData] = useState([]);
    const [currentSelected, setCurrentSelected] = useState(null);
    const [filterPeriod] = useState(3);
    const [permonthTransactions, setPerMonthTransactions] = useState([]);
    
    function getAbsoluteMonths(momentDate) {
      var months = Number(momentDate.format("MM"));
      var years = Number(momentDate.format("YYYY"));
      console.log(months, years, months + (years * 12))
      return months + (years * 12);
    }
    
    function getListByFilterPeriod(res) {
      const formattedArr = [];
      const filteredArr = res.filter(record=> {
        const startDate = moment(record.transactionDate);
        const endDate = moment(new Date());
       
        var startMonths = getAbsoluteMonths(startDate);
        var endMonths = getAbsoluteMonths(endDate);
        var monthDifference = endMonths - startMonths + 1;

        if(monthDifference <= filterPeriod ){
          let rewards = getRewards(record.amount);
          let transactionDate = moment(record.transactionDate).format("MM/DD/YYYY");
          let month = moment(record.transactionDate).format("MMMM");
          const obj = { ...record,rewards, transactionDate, month };
          formattedArr.push(obj);
          return true
        }
        return false
      });
      return formattedArr;
    }

    const fetchDataRes=()=>{
      return  fetchData.getCustomersList()
              .then((res) => {
                // get past 3months result , format the list with rewards, month
                const collection = getListByFilterPeriod(res);

                // groupby name
                var grouped = _.groupBy(collection, function(item) {
                    return item.name;
                });

                // final formatted list with groupBy name and bymonth transactionList and total Amount/rewards by name
                const filteredOt = _.map(grouped, function(value, key){
                  const transList= [];
                  const userTransactions ={
                    totalAmount: 0,
                    totalRewards: 0,
                  }
                  const transactionMonthList= _.groupBy(value, function(item) {
                    return moment(item.transactionDate).format("MMMM");
                  });
                  for (const key in transactionMonthList) {
                    const val = transactionMonthList[key];
                    const monthlyTransactions ={
                      transListByMonth: val,
                      totalAmount: 0,
                      totalRewards: 0,
                      month: key
                    };
                    val.map(x=> {
                    monthlyTransactions.totalAmount += x.amount;
                    monthlyTransactions.totalRewards += x.rewards;
                    });
                    transList.push(monthlyTransactions); 
                    userTransactions.totalAmount +=  monthlyTransactions.totalAmount;
                    userTransactions.totalRewards +=  monthlyTransactions.totalRewards;
                  };
                  return {transList, name: key, ...userTransactions };
                });

               return filteredOt;
              })
              .then(result=> setData(result))
              .catch((err)=> console.log(err))
              
    }

    function getRewards(val){
      let rewardPoint = 0;
      let plus100 = val - 100;
      let plus50 = val - 50;
      if(plus100 > 0) {
        rewardPoint += plus100*2;
      }
      if(plus50 > 0) {
        rewardPoint += 50*1
      }
      return parseInt(rewardPoint)
    }

    const onRowClick = (row, name, index) => {
      const val = name+index;
      setCurrentSelected(val);
      setPerMonthTransactions(row);
    }

    useEffect(()=>{
      fetchDataRes();
    }, []);

    return (
      <div className="App">
            <div className="contentcontainer">
                <h1>Reward Point List</h1>
                {
                  !data && (
                    <h5>...Loading</h5>
                  )
                }
                {data && 
                  <table style={{minWidth: "600px"}} data-testid="reward-list">
                    <tr>
                      <th></th>
                      <th>Customer</th>
                      <th>Month</th>
                      <th>Amount</th>
                      <th>Reward Points</th>
                    </tr>
                    { data && data.length>0 && data.map((record, idx) =>
                        record && record.transList.map((row,index)=> 
                        <>
                            <tr key={`row-${record.name}${index}`} data-testid={`row-${record.name}${index}`}>
                              <td style={{fontWeight:'bolder', fontSize:'18px', padding:'10px'}} onClick={() => onRowClick(row.transListByMonth,record.name,index )}>+</td>
                              <td> {record.name}</td>
                              <td>{row.month}</td>
                              <td> ${row.totalAmount}</td>
                              <td style={{color:'red', fontWeight: 'bold'}}>{row.totalRewards}</td>
                            </tr>
                            { currentSelected && currentSelected === `${record.name}${index}` && 
                                <tr>
                                  <td colSpan={5}>
                                  <table style={{width:'100%'}}>
                                    <tr style={{backgroundColor: 'wheat'}}>
                                      <th>TransactionDate</th>
                                      <th>Rewards</th>
                                      <th>Amount</th>
                                    </tr>
                                  {  permonthTransactions.map(monthTransaction => 
                                    <tr key={monthTransaction.tId} style={{backgroundColor:'white'}}>
                                      <td>{monthTransaction.transactionDate}</td>
                                      <td> ${monthTransaction.amount}</td>
                                      <td>{monthTransaction.rewards}</td>
                                    </tr>
                                  )}
                                  </table>
                                  </td>
                                </tr> 
                            }
                        </>
                        )
                      )}
                      {
                        data.length === 0 && 
                        <tr>
                          <td colSpan="5" style={{textAlign:"center"}}>No records found</td></tr>
                      }
                  </table>
                }
            </div>
      </div>
    );
}

export default App;
