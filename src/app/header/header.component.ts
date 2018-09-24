import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login.service';
import {AuthService, GoogleLoginProvider} from 'angular-6-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  googleData: any;
  authenticated = false;

  constructor(private auth: LoginService, private socialAuthService: AuthService) {}

  ngOnInit() {}

  socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then((userData) => {
      if (userData) {
        this.googleData = userData;
        this.authenticated = this.auth.signIn();
      }
    });
  }

  socialSignOut() {
    this.authenticated = this.auth.signOut();
  }
}
