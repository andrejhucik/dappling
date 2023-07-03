import { Component, OnInit } from '@angular/core';
import { NgxGa4Module } from '@kattoshi/ngx-ga4';

// @ts-ignore
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  imports: [
    NgxGa4Module
  ],
  standalone: true
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
