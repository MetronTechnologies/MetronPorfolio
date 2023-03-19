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
    console.log(`${this.burgerstate} is the burger state from navbar`)
  }

  navigate() {
    this.router.navigate([""])
  }



}
