import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { throwError } from 'rxjs';
import { BusinessObjectEntityEditorConfig } from '../../../public-api';
import { NotificationDisplayService } from '../../services/notification-display.service';

export abstract class HttpBaseService {
  protected headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  protected httpClient: HttpClient;
  protected notificationDisplayService: NotificationDisplayService;
  protected configuration: BusinessObjectEntityEditorConfig;

  protected baseConfigUrl;

  constructor(injector: Injector) { 
        this.httpClient = injector.get(HttpClient);
        this.notificationDisplayService = injector.get(NotificationDisplayService);
        this.configuration = injector.get(BusinessObjectEntityEditorConfig);
        this.baseConfigUrl = `${this.configuration.restApiServer}/api/`;
    }

    protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.notificationDisplayService.showError($localize`:@@httpbase.clientError:An error occurred: ${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.notificationDisplayService.showError($localize`:@@httpbase.backendError:Backend returned code ${error.status}, body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    return throwError($localize`:@@httpbase.unknownError:Something bad happened; please try again later.`);
  }
}