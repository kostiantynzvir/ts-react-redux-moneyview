import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
  
})
export class Tab2Page {
  @ViewChild('barChart') barChart;
  bars:any;
  month = new Date().getMonth()
  year = new Date().getFullYear() 
  allMonth = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
  

constructor(private storage:StorageService) {
 }
 ionViewDidEnter() {
  this.createBarChart()
 }

 createBarChart() {
  const data = this.storage.getDataByCategory()
  this.bars= new Chart(this.barChart.nativeElement, {
    type: "pie",
    data: {
      labels: Array.from(data.keys()), 
      datasets: [{
        data: Array.from(data.values()),
        backgroundColor: this.generateColorArray(data.size)
      }]
    }
  })
 }

 generateColorArray(num): any[] {
  const colorArray = [];
  for (let i = 0; i < num; i++) {
    colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
  }
  return colorArray
}

// wählt das vorherige Monat aus und schaltet das Jahr um wenn man von Jan auf Dez schaltet
previous() {
  if(this.month -1 < 0) {
    this.month = 11
    this.year -= 1
  } else {
    this.month -= 1
  }
  this.storage.filter(this.month, this.year)
  this.createBarChart()
}

// wählt das nächste Monat aus und schaltet das Jahr um wenn man von Dez auf Jan schaltet
next() {
  if(this.month +1 > 11) {
    this.month = 0 
    this.year += 1
  } else {
    this.month += 1
  }
  this.storage.filter(this.month, this.year)
  this.createBarChart()
}

}

