import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component'; // a plugin!
import { ReactiveFormsModule } from '@angular/forms';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'month/:id', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'create-schedule', component: CreateScheduleComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FullCalendarModule,
    ReactiveFormsModule

  ],
  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
