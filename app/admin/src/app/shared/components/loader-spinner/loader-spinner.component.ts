import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.scss']
})
export class LoaderSpinnerComponent {
  
  @Input() diameter:number = 80;
  
  public bgColor: string = "#7A7D82";
  public color: string = "#1178eb";
  
}
