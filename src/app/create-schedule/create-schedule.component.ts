import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { schedule } from '../models/Schedule';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  model:any;
  form!: FormGroup;
  submitted = false;
  showToaster:boolean=false;
  localStoreData:any=localStorage.getItem('dataSource');
  data:any=[this.localStoreData];
  constructor(private formBuilder: FormBuilder,
    private route:Router) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstName: ['', [Validators.required,Validators.maxLength(40)]],
        lastName: [
          '',
          [
            Validators.required,
            Validators.maxLength(40)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        gender:[''],
        age:[],
        date:['',Validators.required],
        time:['',Validators.required],
        color:['000ff']
      
      }
      
    );
    console.log(this.localStoreData);
    
  }

  get f() {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value));
     // this.form.controls['color'].setValue('000ff')
      //this.data.push(this.localStoreData)
      var tempArray=[];
      tempArray =  JSON.parse(localStorage.getItem('dataSource')) || [];
      tempArray.push(this.form.value);
      // this.data.push(JSON.stringify(this.form.value))
       console.log('temp array',tempArray);
      
    localStorage.setItem('dataSource',JSON.stringify(tempArray));
   this.route.navigate(['/home']);
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  
}


