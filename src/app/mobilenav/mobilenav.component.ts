import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-mobilenav',
  templateUrl: './mobilenav.component.html',
  styleUrls: ['./mobilenav.component.css']
})
export class MobilenavComponent implements OnInit {

  burgerstate: any;

  constructor(private router: Router, private pService: PortfolioService) { }

  ngOnInit(): void {
    this.pService.newMenu.subscribe(
      data => this.burgerstate = data
    )
  }

  navigate() {
    this.router.navigate([""])
  }



}
