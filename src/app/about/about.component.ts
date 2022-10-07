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
    this.size2.subscribe(
      data => this.newSizes = data
    )
  }

  theSizes = new BehaviorSubject([]);
  size2 = this.theSizes.asObservable();
  newSizes = [];


  a!: any;

  deviceWidth$: any;

  menu: any = false;

  slider1 = "slideDown";

  unveiling1: any = true;
  unveiling2: any = true;
  unveiling3: any = true;

  myInterval(){
    let theInterval = setTimeout(
      () => {
        this.theSizes.next([document.getElementById('container1')?.offsetTop, document.getElementById('container3')?.offsetTop, document.getElementById('container4')?.offsetTop]);
      }, 1000
    )
    return ()=>clearTimeout(theInterval)
  }


  ngOnInit(): void {
    this.deviceWidth$ = window.innerWidth;
    this.pService.newMenu.subscribe(
      data => this.menu = data
    )

    this.myInterval();


    this.size2.subscribe(
      data => this.newSizes = data
    )
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
  }

  @HostListener('window:load', ['$event'])
  onLoad() {
    this.deviceWidth$ = window.innerWidth;

    this.theSizes.next([document.getElementById('container1')?.offsetTop, document.getElementById('container3')?.offsetTop, document.getElementById('container4')?.offsetTop]);
  }




}
