import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { DesktopnavComponent } from './desktopnav/desktopnav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MobilenavComponent } from './mobilenav/mobilenav.component';
import { NavwindowComponent } from './navwindow/navwindow.component';
import { SkillComponent } from './skill/skill.component';
import { WorkComponent } from './work/work.component';
import { SpinnerCircularSplitModule } from 'spinners-angular/spinner-circular-split';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SkillComponent,
    FooterComponent,
    WorkComponent,
    ContactComponent,
    MobilenavComponent,
    DesktopnavComponent,
    NavwindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SpinnerCircularSplitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
