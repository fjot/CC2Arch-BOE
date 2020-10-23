import { TestBed, getTestBed  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BotEditorService } from './bot-editor.service';
import { BusinessObjectEntityEditorConfig, ServiceConfiguration } from '../../public-api';

import { NotificationDisplayService } from './notification-display.service';
import { mock, instance, verify, anyString, when } from 'ts-mockito'

describe('BotEditorService', () => {
  let service: BotEditorService;
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
      providers: [BotEditorService] 
    });

    service = TestBed.inject(BotEditorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: BotEditorService = TestBed.inject(BotEditorService);
    expect(service).toBeTruthy();
  });
  
  describe('#getListEntities', () => {

    it('should return an Observable<EntityItemLite[]>', () => {
      const entities = [
        { 
          id: '00000000-0000-0000-0000-000000000001',
          parentId: '00000000-0000-0000-0000-000000000000',
          name: 'TestName',
          hasChilds: false,
          iconKey: '',
          childs: null
        },
        { 
          id: '00000000-0000-0000-0000-000000000002',
          parentId: '00000000-0000-0000-0000-000000000000',
          name: 'TestName2',
          hasChilds: false,
          iconKey: '',
          childs: null
         }
      ];

      const body = {
        "ServiceConfiguration": serviceConfig, 
        "ParentId": "00000000-0000-0000-0000-000000000000",
        "EntityId": "00000000-0000-0000-0000-000000000000",
        "SearchTerm": 'searchTerm',
        "SortOrderAsc": true,
        "Filter": null
      };

      service.getListEntities(serviceConfig, 'searchTerm', true, null).subscribe(nodes => {
        expect(nodes.length).toBe(2);
        expect(nodes).toEqual(entities);
      });
  
      const req = httpMock.expectOne(`${service['configUrl']}`);
      expect(req.request.method).toBe("PUT");
      expect(req.request.body).toEqual(body);
      req.flush(entities);

      verify(mockedNotificationService.showError(anyString())).never();
    });
  
    it('should handel status code Responses', () => {
      spyOn(console, 'log');

      service.getListEntities(serviceConfig, 'searchTerm', true, null).subscribe(data => 
        fail('should have failed with the 404 error'),
        (error: string) => { 
          expect(error).toEqual('Something bad happened; please try again later.');
        });

      const retryCount = 3;
      for (var i = 0, c = retryCount + 1; i < c; i++) {
        httpMock.expectOne(`${service['configUrl']}`).flush('deliberate 404 error', { status: 404, statusText: 'Not Found' });
      }
      
      verify(mockedNotificationService.showError(anyString())).once();

      expect(message).toMatch(/^Backend returned code/);
    });

    it('should handel error Responses', () => {
      
      spyOn(console, 'log');

      service.getListEntities(serviceConfig, 'searchTerm', true, null).subscribe(data => 
        fail('should have failed with an error'),
        (error: string) => { 
          expect(error).toEqual('Something bad happened; please try again later.');
        });

      const retryCount = 3;
      for (var i = 0, c = retryCount + 1; i < c; i++) {
        httpMock.expectOne(`${service['configUrl']}`).error(new ErrorEvent('Unkown Error'), { status: 500, statusText: 'Error' });
      }
      
      verify(mockedNotificationService.showError(anyString())).once();

      expect(message).toMatch(/^An error occurred/);
    });

  });

  describe('#getTreeEntities', () => {

    describe('#root nodes', () =>{

      it('should return an Observable<EntityItemLite[]>', () => {
        const entities = [
          { 
            id: '00000000-0000-0000-0000-000000000001',
            parentId: '00000000-0000-0000-0000-000000000000',
            name: 'TestName',
            hasChilds: false,
            iconKey: '',
            childs: null
          }
        ];
  
        const body = {
          "ServiceConfiguration": serviceConfig, 
          "ParentId": "00000000-0000-0000-0000-000000000000",
          "EntityId": "00000000-0000-0000-0000-000000000000",
          "SearchTerm": 'searchTerm',
          "SortOrderAsc": true,
          "Filter": null
        };
  
        service.getTreeEntities(serviceConfig, null, 'searchTerm', true, null).subscribe(nodes => {
          expect(nodes.length).toBe(1);
          expect(nodes).toEqual(entities);
        });
    
        const req = httpMock.expectOne(`${service['configUrl']}root`);
        expect(req.request.method).toBe("PUT");
        expect(req.request.body).toEqual(body);
        req.flush(entities);
  
        verify(mockedNotificationService.showError(anyString())).never();
      });
    
      it('should handel status code Responses', () => {
        spyOn(console, 'log');
    
        service.getTreeEntities(serviceConfig, null, 'searchTerm', true, null).subscribe(data => 
          fail('should have failed with the 404 error'),
          (error: string) => { 
            expect(error).toEqual('Something bad happened; please try again later.');
          });
  
        const retryCount = 3;
        for (var i = 0, c = retryCount + 1; i < c; i++) {
          httpMock.expectOne(`${service['configUrl']}root`).flush('deliberate 404 error', { status: 404, statusText: 'Not Found' });
        }
        
        verify(mockedNotificationService.showError(anyString())).once();
  
        expect(message).toMatch(/^Backend returned code/);
      });
  
      it('should handel error Responses', () => {
        
        spyOn(console, 'log');
  
        service.getTreeEntities(serviceConfig, null, 'searchTerm', true, null).subscribe(data => 
          fail('should have failed with an error'),
          (error: string) => { 
            expect(error).toEqual('Something bad happened; please try again later.');
          });
  
        const retryCount = 3;
        for (var i = 0, c = retryCount + 1; i < c; i++) {
          httpMock.expectOne(`${service['configUrl']}root`).error(new ErrorEvent('Unkown Error'), { status: 500, statusText: 'Error' });
        }
        
        verify(mockedNotificationService.showError(anyString())).once();
  
        expect(message).toMatch(/^An error occurred/);
      });
    });

    describe('#child nodes', () =>{

    it('should return an Observable<EntityItemLite[]>', () => {
      const entities = [
        { 
          id: '00000000-0000-0000-0000-000000000001',
          parentId: '00000000-0000-0000-0000-000000000000',
          name: 'TestName',
          hasChilds: false,
          iconKey: '',
          childs: null
        },
        { 
          id: '00000000-0000-0000-0000-000000000002',
          parentId: '00000000-0000-0000-0000-000000000000',
          name: 'TestName2',
          hasChilds: false,
          iconKey: '',
          childs: null
         }
      ];

      const body = {
        "ServiceConfiguration": serviceConfig, 
        "ParentId": "10000000-0000-0000-0000-000000000001",
        "EntityId": "00000000-0000-0000-0000-000000000000",
        "SearchTerm": 'searchTerm',
        "SortOrderAsc": true,
        "Filter": null
      };

      const parentNode = {
        id: '10000000-0000-0000-0000-000000000001',
        parentId: '',
        name: '',
        hasChilds: false,
        iconKey: '',
        childs: null
      }

      service.getTreeEntities(serviceConfig, parentNode, 'searchTerm', true, null).subscribe(nodes => {
        expect(nodes.length).toBe(2);
        expect(nodes).toEqual(entities);
      });
  
      const req = httpMock.expectOne(`${service['configUrl']}children`);
      expect(req.request.method).toBe("PUT");
      expect(req.request.body).toEqual(body);
      req.flush(entities);

      verify(mockedNotificationService.showError(anyString())).never();
    });
  
    it('should handel status code Responses', () => {
      spyOn(console, 'log');

      const parentNode = {
        id: '10000000-0000-0000-0000-000000000001',
        parentId: '',
        name: '',
        hasChilds: false,
        iconKey: '',
        childs: null
      }

      service.getTreeEntities(serviceConfig, parentNode, 'searchTerm', true, null).subscribe(data => 
        fail('should have failed with the 404 error'),
        (error: string) => { 
          expect(error).toEqual('Something bad happened; please try again later.');
        });

      const retryCount = 3;
      for (var i = 0, c = retryCount + 1; i < c; i++) {
        httpMock.expectOne(`${service['configUrl']}children`).flush('deliberate 404 error', { status: 404, statusText: 'Not Found' });
      }
      
      verify(mockedNotificationService.showError(anyString())).once();

      expect(message).toMatch(/^Backend returned code/);
    });

    it('should handel error Responses', () => {
      
      spyOn(console, 'log');

      const parentNode = {
        id: '10000000-0000-0000-0000-000000000001',
        parentId: '',
        name: '',
        hasChilds: false,
        iconKey: '',
        childs: null
      }

      service.getTreeEntities(serviceConfig, parentNode, 'searchTerm', true, null).subscribe(data => 
        fail('should have failed with an error'),
        (error: string) => { 
          expect(error).toEqual('Something bad happened; please try again later.');
        });

      const retryCount = 3;
      for (var i = 0, c = retryCount + 1; i < c; i++) {
        httpMock.expectOne(`${service['configUrl']}children`).error(new ErrorEvent('Unkown Error'), { status: 500, statusText: 'Error' });
      }
      
      verify(mockedNotificationService.showError(anyString())).once();

      expect(message).toMatch(/^An error occurred/);
    });

    });
  });

  describe('#deleteEntity', () => {

    it('should run without errors', () => {

      let deleteBaseUrl = `${service['configUrl']}${serviceConfig.moduleName}/${serviceConfig.serviceName}/${serviceConfig.classifiableType}/`;
      let id = '00000000-0000-0000-0000-000000000001';

      service.deleteEntity(serviceConfig, id).subscribe();
  
      const req = httpMock.expectOne(`${deleteBaseUrl}${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush('', { status: 200, statusText: 'OK' });

      verify(mockedNotificationService.showError(anyString())).never();
    });
  
    it('should handel status code Responses', () => {

      spyOn(console, 'log');

      let deleteBaseUrl = `${service['configUrl']}${serviceConfig.moduleName}/${serviceConfig.serviceName}/${serviceConfig.classifiableType}/`;
      let id = '00000000-0000-0000-0000-000000000001';

      service.deleteEntity(serviceConfig, id).subscribe(data => 
        fail('should have failed with the 404 error'),
        (error: string) => { 
          expect(error).toEqual('Something bad happened; please try again later.');
        });

      const retryCount = 3;
      for (var i = 0, c = retryCount + 1; i < c; i++) {
        httpMock.expectOne(`${deleteBaseUrl}${id}`).flush('deliberate 404 error', { status: 404, statusText: 'Not Found' });
      }
      
      verify(mockedNotificationService.showError(anyString())).once();

      expect(message).toMatch(/^Backend returned code/);
    });

    it('should handel error Responses', () => {
      
      spyOn(console, 'log');

      let deleteBaseUrl = `${service['configUrl']}${serviceConfig.moduleName}/${serviceConfig.serviceName}/${serviceConfig.classifiableType}/`;
      let id = '00000000-0000-0000-0000-000000000001';

      service.deleteEntity(serviceConfig, id).subscribe(data => 
        fail('should have failed with an error'),
        (error: string) => { 
          expect(error).toEqual('Something bad happened; please try again later.');
        });

      const retryCount = 3;
      for (var i = 0, c = retryCount + 1; i < c; i++) {
        httpMock.expectOne(`${deleteBaseUrl}${id}`).error(new ErrorEvent('Unkown Error'), { status: 500, statusText: 'Error' });
      }
      
      verify(mockedNotificationService.showError(anyString())).once();

      expect(message).toMatch(/^An error occurred/);
    });

  });

});
