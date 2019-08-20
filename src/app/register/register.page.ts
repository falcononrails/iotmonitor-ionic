import { Component, OnInit } from "@angular/core";

import { AbstractControl, ValidatorFn, FormGroup } from "@angular/forms";

import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { AuthResponse } from "../interface/auth-response";
import { AuthentificationServiceService } from "../services/authentification-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  submitted = false;
  //email validation reg
  emailValidator(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const value = control.value;
      if (value === "") {
        return null;
      }
      return !regexp.test(value) ? { emailInvalid: { regexp } } : null;
    };
  }

  get getControls() {
    return this.registerForm.controls;
  }

  registerForm = this.fb.group({
    userName: ["", [Validators.required, Validators.minLength(2)]],
    userEmail: [
      "",
      [
        Validators.required,
        this.emailValidator(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ]
    ],
    userPassword: ["", [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private fb: FormBuilder,
    public toastController: ToastController,
    private auth: AuthentificationServiceService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      var user = {
        email: this.registerForm.controls.userEmail.value,
        password: this.registerForm.controls.userPassword.value,
        username: this.registerForm.controls.userName.value
      };
      this.auth.register(user).subscribe(async (res: AuthResponse) => {
        if (res.message) {
          this.presentToast(res.message);
        } else {
          this.router.navigateByUrl("/home");
        }
      });
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      animated: true,
      cssClass: "myToast"
    });
    toast.present();
  }
}
