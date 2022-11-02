import React, { useState, useEffect } from "react";
import {
  ArcElement,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, CategoryScale, LinearScale);

const PieChart = () => {
  const [chart, setChart] = useState({});
  var baseUrl = "https://api.coinranking.com/v2/coins/?limit=10";
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var apiKey = "coinranking0b4644bf9d3964ee8ea4ae2c586bc6bd062ae31b00b1ec43";

  useEffect(() => {
    const fetchCoins = async () => {
      await fetch(`${proxyUrl}${baseUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${apiKey}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              console.log(json.data);
              setChart(json.data);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCoins();
  }, [baseUrl, proxyUrl, apiKey]);

  console.log("chart", chart);
  var data = {
    labels: chart?.coins?.map((x) => x.name),
    datasets: [
      {
        label: `${chart?.coins?.length} Coins Available`,
        data: chart?.coins?.map((x) => x.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],

        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container my-3">
      <h3 className="my-5">Line Chart using Rest Api of Crypto</h3>
      <div className="col-md-8 m-auto">
        <Pie
          data={data}
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {},
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;
