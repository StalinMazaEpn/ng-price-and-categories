import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToWeb(): void {
    const url = "https://www.stalinmaza.com";
    window.open(url, "_blank", 'noopener,no-referrer')
  }

}
