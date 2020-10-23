import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { HttpBaseService } from '../models/classes/http-base';


import { FormlyFieldConfig } from '@ngx-formly/core';
import { EntityItemLite, FormlyDefinitionUI, ServiceConfiguration } from '../../public-api';

@Injectable({
  providedIn: 'root'
})
export class BotEditorDetailService extends HttpBaseService {
  private configUrl = `${this.baseConfigUrl}Boteditordetail/`;

  constructor(injector: Injector) {
    super(injector);
  }

  getNewLayout(serviceConfiguration: ServiceConfiguration): Observable<FormlyFieldConfig[]> {
    return this.httpClient.get<FormlyFieldConfig[]>(this.configUrl + `new/${serviceConfiguration.moduleName}/${serviceConfiguration.serviceName}/${serviceConfiguration.classifiableType}`, { headers: this.headers })
      .pipe(retry(3), catchError(err => this.handleError(err)));
  }

  getDetailsLayout(serviceConfiguration: ServiceConfiguration, id: string): Observable<FormlyDefinitionUI> {
    return this.httpClient.get<FormlyDefinitionUI>(this.configUrl + `detail/${serviceConfiguration.moduleName}/${serviceConfiguration.serviceName}/${serviceConfiguration.classifiableType}/${id}`, { headers: this.headers })
      .pipe(retry(3), catchError(err => this.handleError(err)));
  }

  createEntity(serviceConfiguration: ServiceConfiguration, parentId: string, model: any): Observable<EntityItemLite> {
    const url = this.configUrl + `new/${serviceConfiguration.moduleName}/${serviceConfiguration.serviceName}/${serviceConfiguration.classifiableType}/${parentId}`;

    return this.httpClient.put<EntityItemLite>(url, model, { headers: this.headers })
      .pipe(retry(3), catchError(err => this.handleError(err)));
  }

  updateEntity(serviceConfiguration: ServiceConfiguration, id: string, model: any): Observable<any> {
    const url = this.configUrl + `detail/${serviceConfiguration.moduleName}/${serviceConfiguration.serviceName}/${serviceConfiguration.classifiableType}/${id}`;

    return this.httpClient.put(url, model, { headers: this.headers })
      .pipe(retry(3), catchError(err => this.handleError(err)));
  }
}