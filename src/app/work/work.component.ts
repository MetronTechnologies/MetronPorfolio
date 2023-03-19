import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { WorkState } from '../models/AppState';
import { DataState } from '../models/DataState';
import { WorkModel } from '../models/Models';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  constructor(private router: Router, private pService: PortfolioService) {
    this.a = this.router.url.split('/')[1].toUpperCase();
  }

  a!: any;

  deviceWidth$: any;

  menu: any;

  slider1 = "slideDown";

  work$!: WorkModel[];


  @ViewChild('target') target!: ElementRef;

  light(x: string) {
    return x;
  }

  working!: WorkModel;


  workState$!: Observable<WorkState<WorkModel[]>>;
  readonly DataState = DataState;
  private dataSubject = new BehaviorSubject<WorkModel>(null);
  private isLoading = new BehaviorSubject<boolean>(false);



  ngOnInit(): void {
    this.deviceWidth$ = window.innerWidth;
    this.pService.newMenu.subscribe(
      data => this.menu = data
    )


    this.workState$ = this.pService.work$.pipe(
      map((response) => {
        this.dataSubject.next(response);
        return {
          workDataState: DataState.LOADED_STATE,
          workState: response
        };
      }),
      startWith({
        workDataState: DataState.LOADING_STATE
      }),
      catchError((error: string) => {
        return of({
          workDataState: DataState.ERROR_STATE,
          error: error
        });
      })
    );

  }

  burger() {
    this.pService.updateMenu(!this.menu);
  }

  work(x: string) {
    let a: any = document.getElementById(x)?.offsetTop! - 100;
    let deviceHeight = window.innerHeight;
    let b = a! - deviceHeight/2;
    window.scrollTo(a!, a!);
  }



  @HostListener('window:resize', ['$event'])
  onResize() {
    this.deviceWidth$ = window.innerWidth;
  }

}


