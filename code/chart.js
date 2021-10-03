//DOM-selector for the canvas 👇
const ctx = document.getElementById("chart").getContext("2d");

//"Draw" the chart here 👇

const drawChart = (amount) => {
  const config = {
    type: "doughnut",
    data: {
      labels: ["done", "left"],
      datasets: [
        {
          label: "My First Dataset",
          data: [amount, 19 - amount],
          backgroundColor: [
            "rgba(204, 223, 218, 0.947)",
            "rgba(49, 63, 59, 0.947)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  };

  const myChart = new Chart(ctx, config);
};
