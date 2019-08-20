import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserLogin } from "../interface/user-login";
import { Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { Storage } from "@ionic/storage";
import { AuthResponse } from "../interface/auth-response";
import { UserRegistration } from "../interface/user-registration";

const backend_url = "https://iotmonitor-backend.herokuapp.com/";

@Injectable({
  providedIn: "root"
})
export class AuthentificationServiceService {
  constructor(private http: HttpClient, private storage: Storage) {}

  logIn(user: UserLogin): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(backend_url + "authenticate", user)
      .pipe(
        tap(async (res: AuthResponse) => {
          if (!res.message) {
            await this.storage.set("TOKEN", res.token);
            await this.storage.set("EMAIL", res.email);
            await this.storage.set("ID", res._id);
            await this.storage.set("USERNAME", res.username);
          } else {
            console.log(res.message);
          }
        })
      );
  }

  register(user: UserRegistration): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(backend_url + "register", user).pipe(
      tap(async (res: AuthResponse) => {
        if (!res.message) {
          await this.storage.set("TOKEN", res.token);
          await this.storage.set("EMAIL", res.email);
          await this.storage.set("ID", res._id);
          await this.storage.set("USERNAME", res.username);
        } else {
          console.log(res.message);
        }
      })
    );
  }

  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
