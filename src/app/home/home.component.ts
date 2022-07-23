import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Calendar, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { scheduled } from 'rxjs';
import { schedule } from '../models/Schedule';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild("fullcalendar")calendarComponent!:FullCalendarComponent;

title!:string;
calendarApi!:Calendar;
schedules:schedule[] | any=JSON.parse(localStorage.getItem('dataSource'))
testy:any;
i:number=0;
schedulDetails:any;
form!: FormGroup;
routerId!:any;

months:any=[
  {id:1,month:"January"},
  {id:2,month:"Feburary"},
  {id:3,month:"March"},
  {id:4,month:"April"},
  {id:5,month:"May"},
  {id:6,month:"Jun"},
  {id:7,month:"July"},
  {id:8,month:"August"},
  {id:9,month:"September"},
  {id:10,month:"Octobar"},
  {id:11,month:"November"},
  {id:12,month:"December"},
]

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this.schedules,
    eventClick: this.handleDateClick.bind(this),
    //initialDate: '2022-01-01',
  };
  config: any = {
    animated: true,
  }

  constructor(private formBuilder: FormBuilder,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      month:['']
    })
   this.routerId=this.route.snapshot.paramMap.get('id');
    if(this.routerId){
      this.form.get('month')?.setValue(this.routerId)
    setTimeout(()=>{                         
      this.onChangeMonth(this.routerId)
 }, 1000);
     
    }
    
 
   let increment=0;
    for(let i=0;i<this.schedules?.length;i++){
      this.schedules[i].id=increment++;
      this.schedules[i].title=this.schedules[i]['firstName'];
      this.schedules[i].date=this.schedules[i]['date'];
     }
  }

  ngAfterViewChecked(){
    this.calendarApi=this.calendarComponent.getApi();
  }

  findScheduleById(Id:number){
   return this.schedules.find((o:any) => o.id == Id);
  }

  handleDateClick(arg:any) {
    console.log(arg.event.id);
    console.log();
    this.schedulDetails=this.findScheduleById(arg.event.id);
    //this.myModal.nativeElement.className = 'modal fade show';
    let ref:any=document.getElementById('modal_button');
    ref.click();
    this.title=arg.event.title;
  }

  onCreateSchedule(){
    //go to create schedule page

  }

  test():void{
    console.log('click');
    
    this.calendarApi.gotoDate('2022-03-01');
  }

  onChangeMonth(value:string){
    console.log('value',value.trim());
    
    let target;
    if(BigInt(value.trim())>9){
     target=`2022-${value}-01`
    }else{
      target=`2022-0${value}-01`
    }
    console.log('value',target);
    this.calendarApi.gotoDate(target);
}



}
