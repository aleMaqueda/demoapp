import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartData } from '../shared/services/chartdata';
import { Chart } from 'chart.js';
import { AuthService } from '../shared/services/auth.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  title = 'app';
  data: ChartData[];
  url = 'https://my.api.mockaroo.com/sales.json?key=050f6c00';
  make = [];
  average = [];
  chart = [];
  constructor(private http: HttpClient, public authService: AuthService) {
  }
  ngOnInit() {
    this.callData();
  }
  clear() {
    this.make = [];
    this.average = [];
    this.chart = [];
    this.data = [];
  }
  refresh() {
    console.log('loading data');
    this.clear();
    this.callData();
  }
  createChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.make,
        datasets: [
          {
            data: this.average,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
  generateNumberRandom() {
    return (Math.floor(Math.random() * 300) + 100);
  }
  private callData() {
    this.http.get(this.url).subscribe((res: ChartData[]) => {
      res.forEach(y => {
        this.make.push(y.make + ' ' + y.model );
        this.average.push(y.average);
      });
      this.createChart();
    },  err => {
      console.error('Observer got an error: ' + err);
      this.make = ['Navigator Lincoln', 'Frontier Nissan', 'Range Rover Sport Land Rover', 'Celica Toyota', 'Fit Honda', 'Intrepid Dodge',
    'Cutlass Suprem Oldsmobile', 'Sentra Nissan', 'Tracer Mercury'];
      for (let index = 0; index < this.make.length; index++) {
        this.average.push(this.generateNumberRandom());
      }
      this.createChart();
    });
  }
}
