import { TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BotEditorDetailService } from './bot-editor-detail.service';
import { BusinessObjectEntityEditorConfig, ServiceConfiguration } from '../../public-api';

import { NotificationDisplayService } from './notification-display.service';
import { mock, instance, verify, anyString, when } from 'ts-mockito'

describe('BotEditorDetailService', () => {
  let service: BotEditorDetailService;
  let httpMock: HttpTestingController;
  let mockedNotificationService:NotificationDisplayService;
  let message:string = '';

  let serviceConfig = new ServiceConfiguration('TestModule', 'TestService', 'TestType');

  beforeEach(() => {
   // Creating mock
   mockedNotificationService = mock(NotificationDisplayService);
   when(mockedNotificationService.showError(anyString())).thenCall((s, n)=> {message = s;console.log(s);});
   
   // Getting instance
   let notificationService:NotificationDisplayService = instance(mockedNotificationService);

   const dummyConfig = {  
    restApiServer: 'https://server:port/boeditormodule/boeditorservice',
   };

   TestBed.overrideProvider(BusinessObjectEntityEditorConfig, {useValue: dummyConfig});
   TestBed.overrideProvider(NotificationDisplayService, {useValue: notificationService});

   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule],
      providers: [BotEditorDetailService]
    });

    service = TestBed.inject(BotEditorDetailService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: BotEditorDetailService = TestBed.inject(BotEditorDetailService);
    expect(service).toBeTruthy();
  });
    
  describe('#getNewLayout', () => {

    it('should return an Observable<FormlyFieldConfig[]>', () => {

      let newLayoutUrl = `${service['configUrl']}new/${serviceConfig.moduleName}/${serviceConfig.serviceName}/${serviceConfig.classifiableType}`; 

      const fieldConfigs = [
      { 
        key: 'Key1',
        type: 'int'
      },
      { 
        key: 'Key1',
        type: 'bool'
      }];

      service.getNewLayout(serviceConfig).subscribe(nodes => {
        expect(nodes.length).toBe(2);
        expect(nodes).toEqual(fieldConfigs);
      });
  
      const req = httpMock.expectOne(newLayoutUrl);
      expect(req.request.method).toBe("GET");
      req.flush(fieldConfigs);

      verify(mockedNotificationService.showError(anyString())).never();
    });
  
    it('should handel status code Responses', () => {
      spyOn(console, 'log');

      let newLayoutUrl = `${service['configUrl']}new/${serviceConfig.moduleName}/${serviceConfig.serviceName}/${serviceConfig.classifiableType}`; 

      service.getNewLayout(serviceConfig).subscribe(data => 
        fail('should have failed with the 404 error'),
        (error: string) => { 
          expect(error).toEqual('Something bad happened; please try again later.');
        });

      const retryCount = 3;
      for (var i = 0, c = retryCount + 1; i < c; i++) {
        httpMock.expectOne(newLayoutUrl).flush('deliberate 404 error', { status: 404, statusText: 'Not Found' });
      }
      
      verify(mockedNotificationService.showError(anyString())).once();

      expect(message).toMatch(/^Backend returned code/);
    });

    it('should handel error Responses', () => {
      
      spyOn(console, 'log');

      let newLayoutUrl = `${service['configUrl']}new/${serviceConfig.moduleName}/${serviceConfig.serviceName}/${serviceConfig.classifiableType}`; 

      service.getNewLayout(serviceConfig).subscribe(data => 
        fail('should have failed with an error'),
        (error: string) => { 
          expect(error).toEqual('Something bad happened; please try again later.');
        });

      const retryCount = 3;
      for (var i = 0, c = retryCount + 1; i < c; i++) {
        httpMock.expectOne(newLayoutUrl).error(new ErrorEvent('Unkown Error'), { status: 500, statusText: 'Error' });
      }
      
      verify(mockedNotificationService.showError(anyString())).once();

      expect(message).toMatch(/^An error occurred/);
    });

  });

  describe('#getDetailsLayout', () => {

    it('should return an Observable<FormlyDefinitionUI>', () => {

      let editLayoutUrl = `${service['configUrl']}detail/${serviceConfig.moduleName}/${serviceConfig.serviceName}/${serviceConfig.classifiableType}`; 
      let id = '10000000-0000-0000-0000-000000000001';

      const uiDefinition = 
      { 
        entityId: '10000000-0000-0000-0000-000000000001',
        tabs: [],
        model: {
                  key1: 'huhu'
                }
      };

      service.getDetailsLayout(serviceConfig, id).subscribe(nodes => {
        expect(nodes).toEqual(uiDefinition);
      });
  
      const req = httpMock.expectOne(`${editLayoutUrl}/${id}`);
      expect(req.request.method).toBe("GET");
      req.flush(uiDefinition);

      verify(mockedNotificationService.showError(anyString())).never();
    });
  
    it('should handel status code Responses', () => {
      spyOn(console, 'log');

      let editLayoutUrl = `${service['configUrl']}detail/${serviceConfig.moduleName}/${serviceConfig.serviceName}/${serviceConfig.classifiableType}`; 
      let id = '10000000-0000-0000-0000-000000000001';

      service.getDetailsLayout(serviceConfig, id).subscribe(data => 
        fail('should have failed with the 404 error'),
        (error: string) => { 
          expect(error).toEqual('Something bad happened; please try again later.');
        });

      const retryCount = 3;
      for (var i = 0, c = retryCount + 1; i < c; i++) {
        httpMock.expectOne(`${editLayoutUrl}/${id}`).flush('deliberate 404 error', { status: 404, statusText: 'Not Found' });
      }
      
      verify(mockedNotificationService.showError(anyString())).once();

      expect(message).toMatch(/^Backend returned code/);
    });

    it('should handel error Responses', () => {
      
      spyOn(console, 'log');

      let editLayoutUrl = `${service['configUrl']}detail/${serviceConfig.moduleName}/${serviceConfig.serviceName}/${serviceConfig.classifiableType}`; 
      let id = '10000000-0000-0000-0000-000000000001';

      service.getDetailsLayout(serviceConfig, id).subscribe(data => 
        fail('should have failed with an error'),
        (error: string) => { 
          expect(error).toEqual('Something bad happened; please try again later.');
        });

      const retryCount = 3;
      for (var i = 0, c = retryCount + 1; i < c; i++) {
        httpMock.expectOne(`${editLayoutUrl}/${id}`).error(new ErrorEvent('Unkown Error'), { status: 500, statusText: 'Error' });
      }
      
      verify(mockedNotificationService.showError(anyString())).once();

      expect(message).toMatch(/^An error occurred/);
    });

  });

  describe('#createEntity', () => {

    it('should return an Observable<EntityItemLite>', () => {

      let newLayoutUrl = `${service['configUrl']}new/${serviceConfig.moduleName}/${serviceConfig.serviceName}/${serviceConfig.classifiableType}`; 
      let id = '1000000-0000-0000-0000-000000000001';

      const node = 
      { 
        id: '00000000-0000-0000-0000-000000000001',
        parentId: '00000000-0000-0000-0000-000000000000',
        name: 'TestName',
        hasChilds: false,
        iconKey: '',
        childs: null
      };

      const model = 
      {
        key: 'name'
      };

      service.createEntity(serviceConfig, id, model ).subscribe(data => {
        expect(data).toEqual(node);
      });
  
      const req = httpMock.expectOne(`${newLayoutUrl}/${id}`);
      expect(req.request.method).toBe("PUT");
      expect(req.request.body).toBe(model);
      req.flush(node);

      verify(mockedNotificationService.showError(anyString())).never();
    });
  
    it('should handel status code Responses', () => {
      spyOn(console, 'log');

      let newLayoutUrl = `${service['configUrl']}new/${serviceConfig.moduleName}/${serviceConfig.serviceName}/${serviceConfig.classifiableType}`; 

      service.getNewLayout(serviceConfig).subscribe(data => 
        fail('should have failed with the 404 error'),
        (error: string) => { 
          expect(error).toEqual('Something bad happened; please try again later.');
        });

      const retryCount = 3;
      for (var i = 0, c = retryCount + 1; i < c; i++) {
        httpMock.expectOne(newLayoutUrl).flush('deliberate 404 error', { status: 404, statusText: 'Not Found' });
      }
      
      verify(mockedNotificationService.showError(anyString())).once();

      expect(message).toMatch(/^Backend returned code/);
    });

    it('should handel error Responses', () => {
      
      spyOn(console, 'log');

      let newLayoutUrl = `${service['configUrl']}new/${serviceConfig.moduleName}/${serviceConfig.serviceName}/${serviceConfig.classifiableType}`; 

      service.getNewLayout(serviceConfig).subscribe(data => 
        fail('should have failed with an error'),
        (error: string) => { 
          expect(error).toEqual('Something bad happened; please try again later.');
        });

      const retryCount = 3;
      for (var i = 0, c = retryCount + 1; i < c; i++) {
        httpMock.expectOne(newLayoutUrl).error(new ErrorEvent('Unkown Error'), { status: 500, statusText: 'Error' });
      }
      
      verify(mockedNotificationService.showError(anyString())).once();

      expect(message).toMatch(/^An error occurred/);
    });

  });

  describe('#updateEntity', () => {

    it('should not fail', () => {

      let updateLayoutUrl = `${service['configUrl']}detail/${serviceConfig.moduleName}/${serviceConfig.serviceName}/${serviceConfig.classifiableType}`; 
      let id = '1000000-0000-0000-0000-000000000001';

      const node = 
      { 
        id: '00000000-0000-0000-0000-000000000001',
        parentId: '00000000-0000-0000-0000-000000000000',
        name: 'TestName',
        hasChilds: false,
        iconKey: '',
        childs: null
      };

      const model = 
      {
        key: 'name'
      };

      service.updateEntity(serviceConfig, id, model).subscribe(data => {
        expect(data).toEqual(node);
      });
  
      const req = httpMock.expectOne(`${updateLayoutUrl}/${id}`);
      expect(req.request.method).toBe("PUT");
      expect(req.request.body).toBe(model);
      req.flush(node);

      verify(mockedNotificationService.showError(anyString())).never();
    });
   
    it('should handel status code Responses', () => {
      spyOn(console, 'log');

      let editLayoutUrl = `${service['configUrl']}detail/${serviceConfig.moduleName}/${serviceConfig.serviceName}/${serviceConfig.classifiableType}`; 
      let id = '10000000-0000-0000-0000-000000000001';

      const model = 
      {
        key: 'name'
      };

      service.updateEntity(serviceConfig, id, model).subscribe(data => 
        fail('should have failed with the 404 error'),
        (error: string) => { 
          expect(error).toEqual('Something bad happened; please try again later.');
        });

      const retryCount = 3;
      for (var i = 0, c = retryCount + 1; i < c; i++) {
        httpMock.expectOne(`${editLayoutUrl}/${id}`).flush('deliberate 404 error', { status: 404, statusText: 'Not Found' });
      }
      
      verify(mockedNotificationService.showError(anyString())).once();

      expect(message).toMatch(/^Backend returned code/);
    });

    it('should handel error Responses', () => {
      
      spyOn(console, 'log');

      let editLayoutUrl = `${service['configUrl']}detail/${serviceConfig.moduleName}/${serviceConfig.serviceName}/${serviceConfig.classifiableType}`; 
      let id = '10000000-0000-0000-0000-000000000001';

      const model = 
      {
        key: 'name'
      };

      service.updateEntity(serviceConfig, id, model).subscribe(data => 
        fail('should have failed with an error'),
        (error: string) => { 
          expect(error).toEqual('Something bad happened; please try again later.');
        });

      const retryCount = 3;
      for (var i = 0, c = retryCount + 1; i < c; i++) {
        httpMock.expectOne(`${editLayoutUrl}/${id}`).error(new ErrorEvent('Unkown Error'), { status: 500, statusText: 'Error' });
      }
      
      verify(mockedNotificationService.showError(anyString())).once();

      expect(message).toMatch(/^An error occurred/);
    });

  });

});
