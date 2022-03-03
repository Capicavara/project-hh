import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/providers/dataservice.service';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: DataserviceService,private router:Router) {
 
    this.angForm = this.fb.group({
      email: [''],
      password: ['', Validators.required],
      name: ['', Validators.required],
    });
   }
 
  ngOnInit() {
  }
  postdata(angForm1)
  {
    this.dataService.userregistration(angForm1.value.name,angForm1.value.email,angForm1.value.password)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate(['login']);
          },
          error => {
            console.log(error)
          });
  }
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
  get name() { return this.angForm.get('name'); }
}
 
