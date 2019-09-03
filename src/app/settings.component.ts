import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { reject } from 'q';
import { CreateActivation } from './create-activation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { link } from  '@chase/apps-client-sdk'
import { AuthorizationRequest } from '@chase/apps-client-sdk/authorization-request';
import { CreateLinkRequest } from '@chase/apps-client-sdk/create-link-request';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  user:any;

  constructor(private ngZone:NgZone,private http:HttpClient)
  {

  }

  async getUserProfile(accessToken) : Promise<any>
  {
    let headers = new HttpHeaders();
    headers=headers.set("Authorization","Bearer " + accessToken);
    let options = {headers:headers};

    return await (this.http.post("https://api.dropboxapi.com/2/users/get_current_account",null,options).toPromise());

  }

  async ngOnInit()
  {
    let response = await link.get();

    if ( response == undefined)
    {
      let authRequest : AuthorizationRequest = {
          clientId: "axlp2b9cw7wwwon",
          endpoint: "https://www.dropbox.com/oauth2/authorize",
          redirectUri: "https://chaseapp.io/auth/callback",
          scopes: [ ],
      }

        let auth = await link.authorizationFlow(authRequest);

        let profile = await this.getUserProfile(auth.accessToken);

        this.user = { name:profile.name.display_name, email:profile.email }
        let secrets = { accessToken:auth.accessToken };
        let settings = { user:this.user };

        let name = this.user.email;
        let key = this.user.email;

        let linkRequest : CreateLinkRequest = {
          key : key,
          name : name,
          secrets : secrets,
          settings : settings
        }
        await link.create(linkRequest);
    }
    else
    {
      this.user = response.settings.user;
    }
  }

}
