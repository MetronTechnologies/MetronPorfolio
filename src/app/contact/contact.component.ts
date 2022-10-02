import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { ContactState } from '../models/AppState';
import { DataState } from '../models/DataState';
import { ContactModel } from '../models/Models';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private router: Router, private pService: PortfolioService, private fb: FormBuilder) {
    this.a = this.router.url.split('/')[1].toUpperCase();
    this.pService.updateMenu(this.menu);
  }

  contactForm = this.fb.group(
    {
      name: ["", Validators.required],
      email: ["", Validators.required],
      number: ["", Validators.required],
      message: ["", Validators.required]
    }
  )

  a!: any;

  deviceWidth$: any;

  menu: any;

  slider1 = "slideDown";

  contactState$: Observable<ContactState<ContactModel>>;
  readonly DataState = DataState;

  submit() {
    this.contactState$ = this.pService.contact$(this.contactForm.value).pipe(
      map(
        response => {
          return {
            contactDataState: DataState.LOADED_STATE,
            contactState: response
          }
        }
      ),
      startWith(
        {
          contactDataState: DataState.LOADING_STATE
        }
      ),
      catchError(
        (error) => {
          return of(
            {
              contactDataState: DataState.ERROR_STATE,
              error: error
            }
          )
        }
      )
    )
  }



  ngOnInit(): void {
    this.deviceWidth$ = window.innerWidth;
    this.menu = false;
    this.pService.newMenu.subscribe(
      data => this.menu = data
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
