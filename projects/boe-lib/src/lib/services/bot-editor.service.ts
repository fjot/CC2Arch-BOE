import { Injectable, Injector } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpBaseService } from '../models/classes/http-base';

import { IFilter } from '@proleit/sdk-components-filterbar';
import { EntityItemLite, ServiceConfiguration } from '../../public-api';


@Injectable({
  providedIn: 'root'
})
export class BotEditorService extends HttpBaseService {
  private configUrl = `${this.baseConfigUrl}boteditor/`;

  constructor(injector: Injector) {
    super(injector);
  }

  getListEntities(serviceConfiguration: ServiceConfiguration
    , searchTerm: string
    , sortOrderAsc: boolean
    , filterbarFilter: IFilter[]): Observable<EntityItemLite[]> {

    const body = {
      "ServiceConfiguration": serviceConfiguration,
      "ParentId": "00000000-0000-0000-0000-000000000000",
      "EntityId": "00000000-0000-0000-0000-000000000000",
      "SearchTerm": searchTerm,
      "SortOrderAsc": sortOrderAsc,
      "Filter": filterbarFilter
    };

    return this.httpClient.put<EntityItemLite[]>(this.configUrl, body, { headers: this.headers })
      .pipe(retry(3), catchError(err => this.handleError(err)));
  }

  getTreeEntities(serviceConfiguration: ServiceConfiguration
    , node: EntityItemLite
    , searchTerm: string
    , sortOrderAsc: boolean
    , filterbarFilter: IFilter[]): Observable<EntityItemLite[]> {

    let url: string = this.configUrl;

    const body = {
      "ServiceConfiguration": serviceConfiguration,
      "ParentId": "00000000-0000-0000-0000-000000000000",
      "EntityId": "00000000-0000-0000-0000-000000000000",
      "SearchTerm": searchTerm,
      "SortOrderAsc": sortOrderAsc,
      "Filter": filterbarFilter
    };

    if (node) {
      body.ParentId = node.id;
      url += 'children';
    }
    else {
      url += 'root';
    }

    return this.httpClient.put<EntityItemLite[]>(url, body, { headers: this.headers })
      .pipe(retry(3), catchError(err => this.handleError(err)));
  }

  deleteEntity(serviceConfiguration: ServiceConfiguration, id: string) {

    return this.httpClient.delete(`${this.configUrl}${serviceConfiguration.moduleName}/${serviceConfiguration.serviceName}/${serviceConfiguration.classifiableType}/${id}`, { headers: this.headers })
      .pipe(retry(3), catchError(err => this.handleError(err)));
  }
}

