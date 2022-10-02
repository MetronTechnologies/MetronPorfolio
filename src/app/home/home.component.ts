import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { PortfolioService } from '../portfolio.service';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { CommentState } from '../models/AppState';
import { DataState } from '../models/DataState';
import { PlaceModel, CommentModel } from '../models/Models';



let scrollPosition: any;
let device: any = window.innerHeight;
let homeCards: any;


const style1 = style(
  {
    position: "fixed",
    bottom: "0",
    top: "auto",
  }
)

const style2 = style(
  {
    position: "absolute",
    bottom: "auto",
    top: device + "px"
  }
)

const slideUpStyle = style(
  {
    transform: "translateY(0)",
    opacity: 1
  }
)

const slideDownStyle = style(
  {
    transform: "translateY(100%)",
    opacity: 0
  }
)



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger(
      'foobar', [
      state('stay', style1),
      state('move', style2)
    ],
    ),
    trigger(
      'cardSlider', [
      state('slideUp', slideUpStyle),
      state('slideDown', slideDownStyle),
      transition('slideUp=>slideDown', animate('700ms ease-out')),
      transition('slideDown=>slideUp', animate('900ms ease-in'))
    ],
    )
  ],

})


export class HomeComponent implements OnInit {

  state = "stay";

  slider1 = "slideDown";
  slider2 = "slideDown";
  slider3 = "slideDown";

  shower = true;

  places$!: PlaceModel[];

  deviceWidth$: any;

  stage: any;

  commentState$: Observable<CommentState<CommentModel[]>>;
  readonly DataState = DataState;
  private dataSubject = new BehaviorSubject<CommentModel[]>([]);



  constructor(private router: Router, private pService: PortfolioService) {
    let size = window.innerWidth;
    this.deviceWidth$ = size;
    this.trial.next(document.getElementById('trial')?.offsetWidth);
  }

  @ViewChild('try') try: ElementRef;

  trial = new BehaviorSubject(0);
  trial2!: number;

  scrollLeft() {
    if(this.selectedIndex === 0) {
      this.selectedIndex = this.dataSubject.value.length - 1
    }
    this.selectedIndex -= 1
  }

  scrollRight() {
    if(this.selectedIndex === this.dataSubject.value.length - 1) {
      this.selectedIndex = 0
    } else {
      this.selectedIndex += 1
    }

  }

  selectedIndex = 0;

  ngOnInit(): void {
    this.places$ = this.pService.getPlaces1();

    this.commentState$ = this.pService.comment$.pipe(
      map(
        response => {
          this.dataSubject.next(response);
          console.log(response)
          return {
            commentDataState: DataState.LOADED_STATE,
            commentState: response
          }
        }
      ),
      startWith(
        {
          commentDataState: DataState.LOADING_STATE
        }
      ),
      catchError(
        (error) => {
          return of(
            {
              commentDataState: DataState.ERROR_STATE,
              error: error
            }
          )
        }
      )
    )
  }

  scrollDown(){
    let target = document.getElementById('target')?.offsetTop;
    window.scrollTo(target!, target!);
  }

  navigator(x: any) {
    let nav2 = x.toLowerCase();
    this.router.navigate([`/${nav2}`]);
  }

  veiler(){
    this.stage = "close"
  }


  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    scrollPosition = window.pageYOffset;

    if (scrollPosition > device) {
      this.state = 'move'
    } else {
      this.state = 'stay'
    }

    homeCards = document.getElementById('one')?.offsetHeight;
    if (scrollPosition > homeCards + (device / 3.7)) {
      this.slider1 = 'slideUp';
    } else {
      this.slider1 = "slideDown";
    }

    if (scrollPosition > homeCards + (device / 2)) {
      this.slider2 = 'slideUp';
    } else {
      this.slider2 = "slideDown";
    }

    if (scrollPosition > homeCards + (device / 1.3)) {
      this.slider3 = 'slideUp';
    }
    else {
      this.slider3 = "slideDown";
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.deviceWidth$ = window.innerWidth;
  }

  @HostListener('window:load', ['$event'])
  onLoad() {

  }


}
