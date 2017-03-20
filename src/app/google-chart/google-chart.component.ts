import { Component, OnInit, Input,ViewChild,AfterViewInit, ElementRef, OnChanges,SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GoogleChartsService} from '../google-charts.service';

type Table = Array<Array<any>>;

declare var google: any;

@Component({
  selector: 'app-google-chart',
  template: '<div #chartContainer style="width: 600px; height: 300px;">This is chart!</div>',
  styleUrls: ['./google-chart.component.css']
})
export class GoogleChartComponent implements OnInit, AfterViewInit, OnChanges {
    ngAfterViewInit(): void {
    }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.data, this.captions)
    this.reDraw();
  }
  reDraw() {
    if (!this.data || !this.captions || !this.div) return;
    this.googleChartsService.loaded.then(() => {
          var chart = new google.visualization.PieChart(this.div.nativeElement);
          var options = {
            //title: 'Chart result'
          };
          let data = [ ["Варіант","Кількість голосів"], ...this.captions.map((cap, idx) => [cap,this.data[idx]||0])];
          console.log("data", data);
          chart.draw( google.visualization.arrayToDataTable(data), options);
    });    
  }
    

  @Input('data') data: Table;
  @Input('captions') captions: Table;

  @ViewChild("chartContainer") div: ElementRef;

  chart: any;

  constructor(private googleChartsService:GoogleChartsService) {}

  ngOnInit() { 
  }

}
