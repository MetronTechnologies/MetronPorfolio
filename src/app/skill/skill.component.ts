import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { SkillState } from '../models/AppState';
import { DataState } from '../models/DataState';
import { CategoryModel, SkillModel } from '../models/Models';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  constructor(private router: Router, private pService: PortfolioService) {
    this.a = this.router.url.split('/')[1].toUpperCase();
    this.pService.updateMenu(this.menu);
  }

  a!: any;

  deviceWidth$: any;

  menu: any;

  slider1 = "slideDown";

  categories$!: CategoryModel[];

  finding!: string;

  desc!: string[];


  @ViewChild('widgetContent') widgetContent!: ElementRef;

  @ViewChild('target') target!: ElementRef;

  scrollLeft() {
    this.widgetContent.nativeElement.scrollLeft -= 100;
  }

  scrollRight() {
    this.widgetContent.nativeElement.scrollLeft += 100;
  }


  skillState$: Observable<SkillState<SkillModel[]>>;
  skillCategoryState$: Observable<SkillState<SkillModel[]>>;
  skillNameState$: Observable<SkillState<SkillModel>>;
  readonly DataState = DataState;
  private skillSubject = new BehaviorSubject<SkillModel>(null);





  ngOnInit(): void {
    this.deviceWidth$ = window.innerWidth;
    this.menu = false;
    this.pService.newMenu.subscribe(
      data => this.menu = data
    );
    this.categories$ = this.pService.getCategories();
    this.skillState$ = this.pService.skill$.pipe(
      map(
        (response) => {
          return {
            skillDataState1: DataState.LOADED_STATE,
            skillDataState2: null,
            skillDataState3: null,
            skillState: response,
          }
        }
      ),
      startWith(
        {
          skillDataState1: DataState.LOADING_STATE,
          skillDataState2: null,
          skillDataState3: null,
        }
      ),
      catchError(
        (error) => {
          return of(
            {
              skillDataState1: DataState.ERROR_STATE,
              skillDataState2: null,
              skillDataState3: null,
              error: error
            }
          )
        }
      )
    )
  }



  findByName(name: string): void {
    this.skillNameState$ = this.pService.skillName$(name).pipe(
      map(
        response => {
          this.skillSubject.next(response);
          this.desc = this.skillSubject.value.description.slice(1,);
          return {
            skillDataState1: null,
            skillDataState2: null,
            skillDataState3: DataState.LOADED_STATE,
            skillState: response,
          }
        },
        this.target?.nativeElement?.scrollIntoView({ behavior: "smooth", block: "start" })
      ),
      startWith(
        {
          skillDataState1: null,
          skillDataState2: null,
          skillDataState3: DataState.LOADING_STATE,
        }
      ),
      catchError(
        (error) => {
          return of(
            {
              skillDataState1: null,
              skillDataState2: null,
              skillDataState3: DataState.ERROR_STATE,
              error: error
            }
          )
        }
      )
    )
  }

  findByCategory(category: string): void {
    this.skillCategoryState$ = this.pService.skillCategory$(category).pipe(
      map(
        response => {
          return {
            skillDataState1: null,
            skillDataState2: DataState.LOADED_STATE,
            skillDataState3: null,
            skillState: response
          }
        }
      ),
      startWith(
        {
          skillDataState1: null,
          skillDataState2: DataState.LOADING_STATE,
          skillDataState3: null,
        }
      ),
      catchError(
        (error) => {
          return of(
            {
              skillDataState1: null,
              skillDataState2: DataState.ERROR_STATE,
              skillDataState3: null,
              error: error
            }
          )
        }
      )
    )
  }



  burger() {
    this.pService.updateMenu(!this.menu);
  }




  @HostListener('window:resize', ['$event'])
  onResize() {
    this.deviceWidth$ = window.innerWidth;
  }

}
