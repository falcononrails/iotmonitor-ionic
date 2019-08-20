import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { AuthentificationServiceService } from "../services/authentification-service.service";
import { Router } from "@angular/router";
import { AuthResponse } from "../interface/auth-response";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  users: Object;
  submitted = false;

  get getControls() {
    return this.logInForm.controls;
  }

  logInForm = this.fb.group({
    userEmail: ["", [Validators.required]],
    userPassword: ["", [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthentificationServiceService,
    private router: Router,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
    if (this.logInForm.valid) {
      var user = {
        email: this.logInForm.controls.userEmail.value,
        password: this.logInForm.controls.userPassword.value
      };
      this.auth.logIn(user).subscribe(async (res: AuthResponse) => {
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
