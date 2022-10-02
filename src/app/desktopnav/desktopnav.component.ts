import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceModel } from '../models/Models';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-desktopnav',
  templateUrl: './desktopnav.component.html',
  styleUrls: ['./desktopnav.component.css']
})
export class DesktopnavComponent implements OnInit {

  constructor(private pService: PortfolioService, private router: Router) {

  }

  @Input()
  id: any;


  places$!: PlaceModel[];

  ngOnInit(): void {
    this.places$ = this.pService.getPlaces2();
  }

  navigator(x: any) {
    let nav2 = x.toLowerCase();
    this.router.navigate([`/${nav2}`]);
  }

  stylings = {
    ".live1" : this.places$?.forEach((item) => item.id === 3),
    "_one" : this.places$?.forEach((item) => item.id !== 3)
  }

}
