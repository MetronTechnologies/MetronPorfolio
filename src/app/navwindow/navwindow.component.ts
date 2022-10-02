import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceModel } from '../models/Models';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-navwindow',
  templateUrl: './navwindow.component.html',
  styleUrls: ['./navwindow.component.css']
})
export class NavwindowComponent implements OnInit {

  deviceWidth$: any;

  menu: any;

  a!: any;

  places!: PlaceModel[];

  constructor(private router: Router, private pService: PortfolioService) {
    this.a = this.router.url.split('/')[1].toUpperCase();
  }

  newPlaces$: any;

  ngOnInit(): void {
    this.deviceWidth$ = window.innerWidth;
    this.menu = false;
    this.pService.newMenu.subscribe(
      data => this.menu = data
    )

    this.places = this.pService.getPlaces2();
    this.newPlaces$ = this.places.filter((el: { name: any }) => el.name !== this.a)
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.deviceWidth$ = window.innerWidth;
  }

  navigate(x: any) {
    let nav2 = x.toLowerCase();
    this.router.navigate([`/${nav2}`]);
  }



}
