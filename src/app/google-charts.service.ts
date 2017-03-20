import { Injectable } from '@angular/core';

declare var google:any;


@Injectable()
export class GoogleChartsService {
  public loaded:Promise<{}>;
  constructor() {
    this.loaded = new Promise((resolve, reject) => {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(resolve);
    })
   }
  

}
