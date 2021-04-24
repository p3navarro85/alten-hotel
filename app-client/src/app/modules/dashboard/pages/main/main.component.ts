import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
declare var Chart: any;
declare let self: any;
declare var jQuery: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {  
  currentYear = new Date().getFullYear();
  selectedMonth: number;
  months = [
    {id: 1, name: "January"},
    {id: 2, name: "February"},
    {id: 3, name: "March"},
    {id: 4, name: "April"},
    {id: 5, name: "May"},
    {id: 6, name: "June"},
    {id: 7, name: "July"},
    {id: 8, name: "August"},
    {id: 9, name: "September"},
    {id: 10, name: "October"},
    {id: 11, name: "November"},
    {id: 12, name: "December"},
  ];
  dealStages = {
    'Prospecting': 0, 
    'Spec planted': 0, 
    'Quote': 0, 
    'Presented': 0, 
    'Budget': 0, 
    'Closed lost': 0, 
    'Closed won': 0
  };
  years = [];
  quotesAmount = { _id: null, count : 0, amount: 0};
  quotesYearly = { _id: null, count : 0, amount: 0};
  quotesForState = [];
  quotePending = 0;
  activeQuotes = 0;
  activeQuotesAmount = 0;
  activeQuotesPerMonth = [];

  colors = [
    "bg-primary",
    "bg-secondary",
    "bg-danger",
    "bg-warning",
    "bg-info",
    "bg-light",
    "bg-success",
    "bg-danger",
  ]

  dealsByStage = [];
  dealsTotal : number = 1;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    self = this;
    if(document.getElementById("chartArea"))
      document.getElementById("chartArea").remove();
    var chartArea = document.createElement("script");
    chartArea.setAttribute("id", "chartArea");
    chartArea.setAttribute("src", "assets/js/sb-admin-2/demo/chart-area-demo.js");
    
    document.body.appendChild(chartArea);

    if(document.getElementById("chartPie"))
      document.getElementById("chartPie").remove();
    var chartPie = document.createElement("script");
    chartPie.setAttribute("id", "chartPie");
    chartPie.setAttribute("src", "assets/js/sb-admin-2/demo/chart-pie-demo.js");
    document.body.appendChild(chartPie);

    let today = new Date();
    this.selectedMonth = today.getMonth() + 1;
    for (let index = this.currentYear -10 ; index < this.currentYear +10; index++) {
      this.years.push({id:index, name: index.toString()});
    }
  }

  countByStageCallback(data: Array<any>){
    self.quotesForState = data;

    var total = self.quotesForState.reduce( 
        (acc, curr) => 
      {
        return acc + curr.count;
      }, 0
    );

    var pendings = self.quotesForState.reduce( 
      (acc, curr) => {
        if(curr._id =="Management Approval" || curr._id =="Customer Approval" ){ 
          return acc + curr.count; } 
        else return acc;
      }, 0);

    self.activeQuotes = self.quotesForState.reduce( 
      (acc, curr) => {
        if(curr._id =="Active"){ 
          return acc + curr.count; } 
        else return acc;
      }, 0);

    self.activeQuotesAmount = self.quotesForState.reduce( 
      (acc, curr) => {
        if(curr._id =="Active"){ 
          return acc + curr.amount; } 
        else return acc;
      }, 0);
      
    if(total > 0){
      self.quotePending = pendings/total*100;
    }
    self.cdRef.detectChanges();
  }

  totalAmountQuotesYearCallback(data: Array<any>){
    if(data.length > 0){
      self.quotesYearly = data[0];
    }
    else{
      self.quotesYearly = { _id: null, count : 0, amount: 0}
    }
    // self.cdRef.detectChanges();
  }

  yearChange(){
  }

  monthChange(){
  }

  amountMontlyChange(){
  }

  dealPerCent(count){
    return this.dealsTotal > 0 ? count/this.dealsTotal*100 : 0;
  }

  createChart(ctx, labels, data){
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "Earnings",
          lineTension: 0.3,
          backgroundColor: "rgba(78, 115, 223, 0.05)",
          borderColor: "rgba(78, 115, 223, 1)",
          pointRadius: 3,
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          pointBorderColor: "rgba(78, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: data,
        }],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 5,
              padding: 10,
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                return '$' + value;
              }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: 'index',
          caretPadding: 10,
          callbacks: {
            label: function(tooltipItem, chart) {
              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + ': $' + tooltipItem.yLabel;
            }
          }
        }
      }
    });
  }

  generateReport(){
    let printContents = document.getElementById("dashboard").innerHTML;
    // let originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    jQuery("#accordionSidebar").hide();
    window.print();
    jQuery("#accordionSidebar").show();
    //document.body.innerHTML = originalContents;
  }

}
