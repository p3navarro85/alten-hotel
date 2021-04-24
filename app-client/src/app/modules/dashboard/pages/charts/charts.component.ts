import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    

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

    if(document.getElementById("chartBar"))
    document.getElementById("chartBar").remove();
    var chartBar = document.createElement("script");
    chartBar.setAttribute("id", "chartBar");
    chartBar.setAttribute("src", "assets/js/sb-admin-2/demo/chart-bar-demo.js");
    document.body.appendChild(chartBar);
  }

}
