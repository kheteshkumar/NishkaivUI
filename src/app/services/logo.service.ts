import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { ThemeService } from './theme.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class LogoService {
  private defaultLogo = 'assets/images/logo_login.png';
  private $logoSource: Subject<string>;
  private providerName = null;
  $logo: Observable<string>;
  constructor(private utilitiesService: UtilitiesService,
    private themeService: ThemeService) {
    this.$logoSource = new BehaviorSubject(null);
    this.$logo = this.$logoSource.asObservable();
  }

  getLogo() {
    return this.$logo;
  }
  updateTheme(providerName) {
    this.utilitiesService.getProviderSettingsSkin(providerName).subscribe(
      (res: any) => {
        if(res.skin){
          this.themeService.changeTheme(res.skin);
        }else{
          this.themeService.changeTheme(7);
        }
      },
      (error) => {
        this.themeService.changeTheme(7);
        console.error(error);
      },
    );
  }
  updateLogo(providerName) {
    if (providerName && providerName !== this.providerName) {
      this.providerName = providerName;
      this.utilitiesService.getProviderSettingsLogo(providerName).subscribe(
        (res: any) => {
          if(res.logo){
            this.$logoSource.next(res.logo);
          }else{
            this.$logoSource.next(this.defaultLogo);
          }
        },
        (error) => {
          console.error(error);
        },
      );
    }
  }
}
