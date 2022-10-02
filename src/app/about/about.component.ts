import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PortfolioService } from '../portfolio.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})



export class AboutComponent implements OnInit {

  constructor(private router: Router, private pService: PortfolioService) {
    this.a = this.router.url.split('/')[1].toUpperCase();
    this.pService.updateMenu(this.menu);
  }

  theSizes = new BehaviorSubject([710, 1286, 1862]);
  size2 = this.theSizes.asObservable();
  newSizes;


  a!: any;

  deviceWidth$: any;

  menu: any = false;

  slider1 = "slideDown";

  first$: any;
  second$: any;
  third$: any;

  unveiling1: any = true;
  unveiling2: any = true;
  unveiling3: any = true;


  ngOnInit(): void {
    this.deviceWidth$ = window.innerWidth;
    this.pService.newMenu.subscribe(
      data => this.menu = data
    )

    this.theSizes.next([document.getElementById('container1')?.offsetTop, document.getElementById('container3')?.offsetTop, document.getElementById('container4')?.offsetTop]);

    this.size2.subscribe(
      data => this.newSizes = data
    )

    console.log(this.newSizes);




    this.first$ = this.newSizes[0];
    this.second$ = this.newSizes[1];
    this.third$ = this.newSizes[2];
  }

  burger() {
    this.pService.updateMenu(!this.menu);
  }

  unveiler1() {
    this.unveiling1 = !this.unveiling1;
  }

  unveiler2() {
    this.unveiling2 = !this.unveiling2;
  }

  unveiler3() {
    this.unveiling3 = !this.unveiling3;
  }



  @HostListener('window:resize', ['$event'])
  onResize() {
    this.deviceWidth$ = window.innerWidth;

    this.theSizes.next([document.getElementById('container1')?.offsetTop, document.getElementById('container3')?.offsetTop, document.getElementById('container4')?.offsetTop]);

    this.first$ = this.newSizes[0];
    this.second$ = this.newSizes[1];
    this.third$ = this.newSizes[2];
  }

  @HostListener('window:load', ['$event'])
  onLoad() {
    this.deviceWidth$ = window.innerWidth;

    this.theSizes.next([document.getElementById('container1')?.offsetTop, document.getElementById('container3')?.offsetTop, document.getElementById('container4')?.offsetTop]);

    this.first$ = this.newSizes[0];
    this.second$ = this.newSizes[1];
    this.third$ = this.newSizes[2];

    let z = [];
    z.push(this.first$);
    z.push(this.second$);
    z.push(this.third$);
  }




}
