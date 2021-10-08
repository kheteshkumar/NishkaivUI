import { Injectable } from '@angular/core';
import { AppSetting } from '../common/constants/appsetting.constant';
import { CommonApiFuncService } from './common-api-func.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(private commonAPIFuncService: CommonApiFuncService) {}
  getProviderSettingsSkin(providerName) {
    const url = AppSetting.common.getProviderSettingsSkin.replace('{providerId}', providerName);
    return this.commonAPIFuncService.get(url)
      .pipe(
        catchError(this.commonAPIFuncService.handleError('', []))
      );
  }
  getProviderSettingsLogo(providerName) {
    const url = AppSetting.common.getProviderSettingsLogo.replace('{providerId}', providerName);
    return this.commonAPIFuncService.get(url).pipe(
      // tap((a) => console.log('fetched', a)),
      catchError(this.commonAPIFuncService.handleError('', [])),
    );
  }
}
