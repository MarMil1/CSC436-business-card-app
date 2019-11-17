import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;                   
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,         
    private authService: AuthService 
  ) {}

  ngOnInit() {
    this.form = this.fb.group({    
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { 
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  signIn() {
    console.log(this.form.value.email);
    console.log(this.form.value.password);
    if (this.form.valid) {
      this.authService.login(this.form.value.email, this.form.value.password); 
    }
    this.formSubmitAttempt = true;             
  }

}
