import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment.prod';
import { WorkModel, SkillModel, CommentModel, ContactModel } from './models/Models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  private readonly baseURL1 = environment.baseUrl1;
  private readonly baseURL2 = environment.baseURL2;
  private readonly baseURL3 = environment.baseURL3;
  private readonly baseURL4 = environment.baseURL4;



  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(`An error occured. Error code: ${error.status}`);
  }

  work$ = <Observable<WorkModel>>(
    this.http
      .get(`${this.baseURL1}/getwork`)
      .pipe(
        catchError(this.handleError)
      )
  );

  skill$ = <Observable<SkillModel>>(
    this.http
      .get(`${this.baseURL2}/getAllSkills`)
      .pipe(
        catchError(this.handleError)
      )
  );

  skillName$ = (name: string) => <Observable<SkillModel>>(
    this.http
      .get(`${this.baseURL2}/getSkillByName/${name}`)
      .pipe(
        catchError(this.handleError)
      )
  );

  skillCategory$ = (category: string) => <Observable<SkillModel>>(
    this.http
      .get(category==="All" ? `${this.baseURL2}/getAllSkills` : `${this.baseURL2}/getSkillsByCategory/${category}`)
      .pipe(
        catchError(this.handleError)
      )
  );

  comment$ = <Observable<CommentModel[]>>(
    this.http
      .get(`${this.baseURL3}/getComment`)
      .pipe(
        catchError(this.handleError)
      )
  );

  contact$ = (contact) => <Observable<CommentModel>>(
    this.http
      .post(`${this.baseURL4}/saveContact`, contact)
      .pipe(
        catchError(this.handleError)
      )
  );






  places1 = [
    {
      id: 1,
      name: "ABOUT",
      location: "https://ik.imagekit.io/entropy/amazon-image/about1_1Pdkapychu.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664577520492"
    },
    {
      id: 2,
      name: "SKILLS",
      location: "https://ik.imagekit.io/entropy/amazon-image/skills2_lg-oL9E_Vl.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664577520603"
    },
    {
      id: 3,
      name: "WORK",
      location: "https://ik.imagekit.io/entropy/amazon-image/work1_BMXeV9Lfk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664577520518"
    },
    {
      id: 4,
      name: "CONTACT",
      location: "https://ik.imagekit.io/entropy/amazon-image/contact1_K4lxQpw3c.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664577520335"
    }
  ];

  getPlaces1() {
    return this.places1;
  }


  places2 = [
    {
      id: 1,
      name: "HOME",
      location: "https://ik.imagekit.io/entropy/amazon-image/home5_UV7P4jaZc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664577520380"
    },
    {
      id: 2,
      name: "ABOUT",
      location: "https://ik.imagekit.io/entropy/amazon-image/about4_wXv1-uFinP.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664577520638"
    },
    {
      id: 3,
      name: "SKILLS",
      location: "https://ik.imagekit.io/entropy/amazon-image/skills2_lg-oL9E_Vl.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664577520603"
    },
    {
      id: 4,
      name: "WORK",
      location: "https://ik.imagekit.io/entropy/amazon-image/work1_BMXeV9Lfk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664577520518"
    },
    {
      id: 5,
      name: "CONTACT",
      location: "https://ik.imagekit.io/entropy/amazon-image/contact1_K4lxQpw3c.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664577520335"
    }
  ];

  getPlaces2() {
    return this.places2;
  }

  private current_menu = new BehaviorSubject(false);

  newMenu = this.current_menu.asObservable();

  updateMenu(decision: boolean) {
    console.log(`${decision} from pService`);
    this.current_menu.next(decision);
  }

  



  categories = [
    {
      id: 1,
      name: "All",
      linking: ""
    },
    {
      id: 2,
      name: "FrontEnd",
      linking: ""
    },
    {
      id: 3,
      name: "BackEnd",
      linking: ""
    },
    {
      id: 4,
      name: "Database",
      linking: ""
    },
    {
      id: 5,
      name: "Framework",
      linking: ""
    },
    {
      id: 6,
      name: "IDEs",
      linking: ""
    },
    {
      id: 7,
      name: "Architecture",
      linking: ""
    },
    {
      id: 8,
      name: "API Tools",
      linking: ""
    },
    {
      id: 9,
      name: "Cloud",
      linking: ""
    },
    {
      id: 10,
      name: "Version Control",
      linking: ""
    },
    {
      id: 11,
      name: "Design",
      linking: ""
    }
  ];

  getCategories() {
    return this.categories;
  }



}
