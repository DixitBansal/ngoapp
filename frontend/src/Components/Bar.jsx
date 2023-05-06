import React, { useState } from "react";
import Chart from "react-apexcharts";
import "../App.css";

const Bar = () => {
  const [state, setState] = useState({
    options: {
      colors: ["#E91E63", "#FF9800"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "series-2",
        data: [60, 50, 35, 90, 39, 80, 30, 65],
      },
    ],
  });

  return (
    <>
      {/* boxes block */}

      <div class="app-wrapper">
        <div class="app-content pt-3 p-md-3 p-lg-4">
          <div class="row g-4 mb-4">
            <div class="col-6 col-lg-3">
              <div class="app-card app-card-stat shadow-sm h-100">
                <div class="app-card-body p-3 p-lg-4">
                  <h4 class="stats-type mb-1">Total user</h4>
                  <div class="stats-figure">₹ 12,628</div>
                </div>
                <a class="app-card-link-mask" Link="#"></a>
              </div>
            </div>

            <div class="col-6 col-lg-3">
              <div class="app-card app-card-stat shadow-sm h-100">
                <div class="app-card-body p-3 p-lg-4">
                  <h4 class="stats-type mb-1">Total Donation</h4>
                  <div class="stats-figure">₹ 2,250</div>
                </div>
                <a class="app-card-link-mask" Link="#"></a>
              </div>
            </div>
            <div class="col-6 col-lg-3">
              <div class="app-card app-card-stat shadow-sm h-100">
                <div class="app-card-body p-3 p-lg-4">
                  <h4 class="stats-type mb-1">Total BLOOD UNIT</h4>
                  <div class="stats-figure">540</div>
                  <div class="stats-meta"></div>
                </div>
                <a class="app-card-link-mask" Link="#"></a>
              </div>
            </div>
            <div class="col-6 col-lg-3">
              <div class="app-card app-card-stat shadow-sm h-100">
                <div class="app-card-body p-3 p-lg-4">
                  <h4 class="stats-type mb-1">TOTAL EMPLOYEE</h4>
                  <div class="stats-figure">115</div>
                  <div class="stats-meta"></div>
                </div>
                <a class="app-card-link-mask" Link="#"></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* chart component */}

      <div className="app-wrapper">
        <div className="yadav-col m-3" style={{display:"flex"}}>
          <div className="col">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="600"
              height= "400"
            />
          </div>
		       <div className="yadav-col">
            <Chart
              options={state.options}
              series={state.series}
              type="area"
              width="600"
              height= "400"
            
            />
          </div>
        </div>
      </div>

      {/* bar
 line
 area
 histogram
 pie
 scatter
 heatmap */}
    </>
  );
};

export default Bar;
