import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthRequest {
  firstname: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  firstname: string = '';
  password: string = '';
  myTokenObject: any = '';
  tokenStringValue: string = '';
  isAuthenticated: string = '';

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  public doLogin(): void {
    let tokenResponse = this.getAuthTokenFromBackend();

    tokenResponse.subscribe((data) => {
      this.myTokenObject = data;
      this.router.navigate(['/home']);

      const responseObject = JSON.parse(this.myTokenObject);
      this.tokenStringValue = responseObject.token;
      localStorage.setItem('myToken', this.tokenStringValue); //lokali narsykles atmintis
      // localStorage.setItem('isAuthenticated', 'true');
      // this.router.navigate(['/dashboard']);
    });

    let securedEndpointResponse = this.getDataFromBackend(
      this.tokenStringValue
    ); //data cia yra mano tokenas jeigu ka
    securedEndpointResponse.subscribe((data) => {
      console.log('Response from secured endpoint: ' + data);
    });
  }

  public getAuthTokenFromBackend(): Observable<Object> {
    const encryptedLoginAndPass = btoa(this.firstname + ':' + this.password); //uzkoduoja duota stringa
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + encryptedLoginAndPass
    );
    const requestBody: AuthRequest = {
      firstname: this.firstname,
      password: this.password,
    };
    return this.httpClient.post(
      'http://localhost:8090/auth/authenticate',
      requestBody,
      { headers, responseType: 'text' as 'json' }
    );
  }

  //kitas BE metodas, kuris pasiekiamas tik su validziu tokenu
  public getDataFromBackend(tokenValue: string) {
    console.log('Calling another endpoint with this token: ' + tokenValue);
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + tokenValue
    );
    return this.httpClient.get('http://localhost:8090/auth/test', {
      headers,
      responseType: 'text' as 'json',
    });
  }
}
