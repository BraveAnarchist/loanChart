import { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import "./App.css";

function App() {
  const [homevalue, setHomeValue] = useState(1000);
  const [downPayment, setDownPayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(2);
  const [tenure, setTenure] = useState(10);

  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    // Update the downPaymentValue : 20% of current homevalue
    const newDownPayment = Math.floor(homevalue * 0.2);
    setDownPayment(newDownPayment);
    setLoanAmount(homevalue - newDownPayment);
  }, [homevalue]);

  useEffect(() => {
    const interestPerMonth = interestRate / 100 / 12;
    const totalLoanMonths = tenure * 12;
    const EMI =
      (loanAmount *
        interestPerMonth *
        (1 + interestPerMonth) ** totalLoanMonths) /
      ((1 + interestPerMonth) ** totalLoanMonths - 1);

    setMonthlyPayment(EMI);
  }, [loanAmount, interestRate, tenure]);

  return (
    <main>
    <nav style={{background:"#1976d2",color:"white",fontSize:"xx-large",padding:"1vh"}}>Bank of React</nav>
    <div style={{ display: "flex", justifyContent: "space-between",width:"100%",padding:"1vw", paddingTop:"10vh",fontSize:"large" }}>
      <div style={{width:"50%"}}>
        <div>
          <p>Home Value</p>
          <p style={{fontWeight:"bold"}}>$ {homevalue} </p>
          <input style={{width:"70%"}}
            onChange={(e) => setHomeValue(parseInt(e.currentTarget.value))}
            type="range"
            min="1000"
            max="10000"
            value={homevalue}
          />
        </div>
        <div>
          <p>Down Payment</p>
          <p style={{fontWeight:"bold"}}>$ {homevalue - loanAmount} </p>
          <input style={{width:"70%"}}
            onChange={(e) => {
              setDownPayment(parseInt(e.currentTarget.value));
              setLoanAmount(homevalue - parseInt(e.currentTarget.value));
            }}
            type="range"
            min="0"
            max={homevalue}
            value={downPayment}
          />
        </div>
        <div>
          <p>Loan Amount</p>
          <p style={{fontWeight:"bold"}}>$ {homevalue - downPayment} </p>
          <input style={{width:"70%"}}
            onChange={(e) => {
              setLoanAmount(parseInt(e.currentTarget.value));
              setDownPayment(homevalue - parseInt(e.currentTarget.value));
            }}
            type="range"
            min="0"
            max={homevalue}
            value={loanAmount}
          />
        </div>
        <div>
          <p>Interest Rate</p>
          <p style={{fontWeight:"bold"}}>% {interestRate}</p>
          <input style={{width:"70%"}}
            onChange={(e) => setInterestRate(parseInt(e.currentTarget.value))}
            type="range"
            min="2"
            max="18"
          />
        </div>
        <div>
          <p>Tenure</p>
          <select id="Tenure" style={{width:"70%"}} value={tenure} onChange={(e) => setTenure(parseInt(e.currentTarget.value))}>
            <option value="5">5 years</option>
            <option value="10">10 years</option>
            <option value="15">15 years</option>
            <option value="20">20 years</option>
            <option value="25">25 years</option>
        </select>
        </div>
      </div>
      <div style={{ width: "50%" }}>
        <h3>Monthly Payment: $ {monthlyPayment}</h3>
        <CChart style={{height:"40vh"}}
          type="pie"
          data={{
            labels: ["Principle", "Interest"],
            datasets: [
              {
                backgroundColor: ["#ffe0e6", "#d6ecfb"],
                data: [homevalue, monthlyPayment * tenure * 12 - loanAmount],
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "green",
                },
              },
            },
          }}
        />
      </div>
    </div>
    </main>
  );
}

export default App;