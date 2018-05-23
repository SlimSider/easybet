import * as Chart from 'chart.js';

export class Charts {
  public static getChart(ctx, type: string, labels: Array<Array<string>>, data: Array<any>, backgroundColors: Array<string>, text: string) {
    let chart;
    return chart = new Chart(ctx, {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors
        }]
      },
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: text
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });
  }
}
