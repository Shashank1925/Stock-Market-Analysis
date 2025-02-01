const stockData =
  "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata";
const stockStatsData =
  "https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata";
const stockSummary =
  "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata";

import { createChart } from "./createChart.js";

const statsList = document.querySelector(".stats-list");
let globalStock;
let globalTime = "5y";
let globalSelectedStock = "AAPL";
// let myChart;

const fetchStockData = async () => {
  try {
    const res = await fetch(stockData);
    if (!res.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await res.json();
    globalStock = data.stocksData[0];
    createChart(globalSelectedStock, globalTime, globalStock);
  } catch (error) {
    console.error("Error: ", error);
  }
};

const fetchStockStatsData = async () => {
  try {
    const res = await fetch(stockStatsData);
    if (!res.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await res.json();
    statsData(data.stocksStatsData[0]);
  } catch (error) {
    console.error("Error: ", error);
  }
};

const festStockSummary = async () => {
  try {
    const res = await fetch(stockSummary);
    if (!res.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await res.json();
    return data.stocksProfileData[0];
  } catch (error) {
    console.error("Error: ", error);
  }
};

function statsData(stockData) {
  for (const [stock, data] of Object.entries(stockData)) {
    if (stock != "_id") {
      const listItem = document.createElement("li");
      const stkBtn = document.createElement("button");
      stkBtn.textContent = stock;
      const pBook = document.createElement("p");
      pBook.textContent = `$${data.bookValue}`;
      const pProfit = document.createElement("p");
      pProfit.textContent = `${data.profit.toFixed(2)}%`;

      if (data.profit > 0) {
        pProfit.style.color = "green";
      } else {
        pProfit.style.color = "red";
      }

      stkBtn.addEventListener("click", () => {
        globalSelectedStock = stock;
        // console.log(globalSelectedStock);

        createChart(stock, globalTime, globalStock);
        showSummary(stock, data.bookValue, data.profit);
      });

      listItem.append(stkBtn, pBook, pProfit);
      statsList.append(listItem);
    }
  }
}

async function showSummary(stock, bookValue, profit) {
  const summaryData = await festStockSummary();

  const stockNameElement = document.querySelector(".details h3");
  const profitElement = document.getElementById("profit");
  const bookValueElement = document.querySelector(".details h3:nth-child(3)");
  const summaryParagraph = document.querySelector(".summary p");

  stockNameElement.textContent = stock;
  profitElement.textContent = `${profit.toFixed(2)}%`;
  profitElement.style.color = profit > 0 ? "green" : "red";
  bookValueElement.textContent = `$${bookValue}`;
  summaryParagraph.textContent = summaryData[stock].summary;
}

function listener() {
  document.querySelector("#oneM").addEventListener("click", () => {
    globalTime = "1mo";
    createChart(globalSelectedStock, globalTime, globalStock);
  });
  document.querySelector("#threeM").addEventListener("click", () => {
    globalTime = "3mo";
    createChart(globalSelectedStock, globalTime, globalStock);
  });
  document.querySelector("#oneY").addEventListener("click", () => {
    globalTime = "1y";
    createChart(globalSelectedStock, globalTime, globalStock);
  });
  document.querySelector("#fiveY").addEventListener("click", () => {
    globalTime = "5y";
    createChart(globalSelectedStock, globalTime, globalStock);
  });
}

fetchStockData();
fetchStockStatsData();
listener();
console.log(Object.entries(stockData));
