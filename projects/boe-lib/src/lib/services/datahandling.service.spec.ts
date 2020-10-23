import { TestBed } from '@angular/core/testing';

import { DatahandlingService } from './datahandling.service';

import { BotEditorDetailService, BotEditorService } from '.';
import { mock, instance, reset, verify, anyString, when, anything } from 'ts-mockito'

import { EMPTY, Observable, of } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { EntityItemLite, FormlyDefinitionUI, ServiceConfiguration } from '../../public-api';
import { DisplayTypeEnum } from '../models/display-type.enum';

describe('DatahandlingService', () => {
  let service: DatahandlingService;

  let mockedBoeService: BotEditorService = mock(BotEditorService);
  let boeService: BotEditorService = instance(mockedBoeService);
  let mockedBoeDetailService: BotEditorDetailService = mock(BotEditorDetailService);
  let boeDetailService: BotEditorDetailService = instance(mockedBoeDetailService);

  let serviceConfiguration: ServiceConfiguration = new ServiceConfiguration('TestModule', 'TestService', 'TestType');

  beforeEach(() => {

    TestBed.overrideProvider(BotEditorService, { useValue: boeService });
    TestBed.overrideProvider(BotEditorDetailService, { useValue: boeDetailService });

    TestBed.configureTestingModule({
      providers: [DatahandlingService]
    });

    service = TestBed.inject(DatahandlingService);
    boeService = TestBed.inject(BotEditorService);
    boeDetailService = TestBed.inject(BotEditorDetailService);
  });

  afterEach(() => {
    reset(mockedBoeService);
    reset(mockedBoeDetailService);
  });

  it('should be created', () => {
    const service: DatahandlingService = TestBed.inject(DatahandlingService);
    expect(service).toBeTruthy();

    expect(service.displayType).toEqual(DisplayTypeEnum.DetailView);

    expect(service.sortOrderAsc$.getValue()).toEqual(true);
    expect(service.searchTerm$.getValue()).toEqual('');
    expect(service.isLoading$.getValue()).toEqual(false);

    expect(service.listData$.getValue()).toEqual([]);
    expect(service.setSelectedNodes$.getValue()).toEqual(undefined);
    expect(service.selectedNode).toEqual(undefined);
    expect(service.hasSelectedItem$.getValue()).toEqual(false);

    expect(service.detailViewData$.getValue().visible).toEqual(false);
    expect(service.modelHasChanges$.getValue()).toEqual(false);

    expect(service.addEntityVisible$.getValue()).toEqual(false);
    expect(service.addEntityLayout$.getValue()).toEqual(undefined);
    expect(service.deleteEntityVisible$.getValue()).toEqual(false);
    expect(service.deleteMessage$.getValue()).toEqual('');
    expect(service.showUnsavedQuestion$.getValue()).toEqual(false);
  });

  it('should load treeData', () => {
    let data: EntityItemLite[] = [
      {
        id: '10000000-0000-0000-0000-000000000001',
        parentId: '00000000-0000-0000-0000-000000000000',
        name: 'test',
        hasChilds: true,
        iconKey: '',
        childs: undefined
      }
    ];

    let details: FormlyDefinitionUI = {
      entityId: '10000000-0000-0000-0000-000000000001',
      tabs: [],
      model: {}
    }

    when(mockedBoeService.getTreeEntities(serviceConfiguration, undefined, '', true, anything())).thenReturn(of(data));
    when(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, '10000000-0000-0000-0000-000000000001')).thenReturn(of(details))

    const service: DatahandlingService = TestBed.inject(DatahandlingService);
    service.displayType = DisplayTypeEnum.TreeWithDetailView;
    service.serviceConfiguration = serviceConfiguration;

    service.LoadData();

    verify(mockedBoeService.getTreeEntities(serviceConfiguration, undefined, '', true, anything())).once();
    verify(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, '10000000-0000-0000-0000-000000000001')).once();

    expect(service.displayType).toEqual(DisplayTypeEnum.TreeWithDetailView);

    expect(service.sortOrderAsc$.getValue()).toEqual(true);
    expect(service.searchTerm$.getValue()).toEqual('');
    expect(service.isLoading$.getValue()).toEqual(false);

    expect(service.listData$.getValue()).toEqual(data);
    expect(service.setSelectedNodes$.getValue()).toEqual(['10000000-0000-0000-0000-000000000001']);
    expect(service.selectedNode).toEqual(data[0]);
    expect(service.hasSelectedItem$.getValue()).toEqual(true);

    expect(service.detailViewData$.getValue().visible).toEqual(true);
    expect(service.modelHasChanges$.getValue()).toEqual(false);

    expect(service.addEntityVisible$.getValue()).toEqual(false);
    expect(service.addEntityLayout$.getValue()).toEqual(undefined);
    expect(service.deleteEntityVisible$.getValue()).toEqual(false);
    expect(service.deleteMessage$.getValue()).toEqual('');
    expect(service.showUnsavedQuestion$.getValue()).toEqual(false);
  });

  it('should load treeData no result', () => {
    let data: EntityItemLite[] = undefined;

    when(mockedBoeService.getTreeEntities(serviceConfiguration, undefined, '', true, anything())).thenReturn(of(data));

    const service: DatahandlingService = TestBed.inject(DatahandlingService);
    service.displayType = DisplayTypeEnum.TreeWithDetailView;
    service.serviceConfiguration = serviceConfiguration;

    service.LoadData();

    verify(mockedBoeService.getTreeEntities(serviceConfiguration, undefined, '', true, anything())).once();

    expect(service.displayType).toEqual(DisplayTypeEnum.TreeWithDetailView);

    expect(service.sortOrderAsc$.getValue()).toEqual(true);
    expect(service.searchTerm$.getValue()).toEqual('');
    expect(service.isLoading$.getValue()).toEqual(false);

    expect(service.listData$.getValue()).toEqual(undefined);
    expect(service.setSelectedNodes$.getValue()).toEqual(undefined);
    expect(service.selectedNode).toEqual(null);
    expect(service.hasSelectedItem$.getValue()).toEqual(false);

    expect(service.detailViewData$.getValue().visible).toEqual(false);
    expect(service.modelHasChanges$.getValue()).toEqual(false);

    expect(service.addEntityVisible$.getValue()).toEqual(false);
    expect(service.addEntityLayout$.getValue()).toEqual(undefined);
    expect(service.deleteEntityVisible$.getValue()).toEqual(false);
    expect(service.deleteMessage$.getValue()).toEqual('');
    expect(service.showUnsavedQuestion$.getValue()).toEqual(false);
  });

  it('should load listdata', () => {
    let data: EntityItemLite[] = [
      {
        id: '10000000-0000-0000-0000-000000000001',
        parentId: '00000000-0000-0000-0000-000000000000',
        name: 'test',
        hasChilds: true,
        iconKey: '',
        childs: undefined
      }
    ];

    let details: FormlyDefinitionUI = {
      entityId: '10000000-0000-0000-0000-000000000001',
      tabs: [],
      model: {}
    }

    when(mockedBoeService.getListEntities(serviceConfiguration, '', true, anything())).thenReturn(of(data));
    when(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, '10000000-0000-0000-0000-000000000001')).thenReturn(of(details))

    const service: DatahandlingService = TestBed.inject(DatahandlingService);
    service.displayType = DisplayTypeEnum.ListWithDetailView;
    service.serviceConfiguration = serviceConfiguration;

    service.LoadData();

    verify(mockedBoeService.getListEntities(serviceConfiguration, '', true, anything())).once();
    verify(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, '10000000-0000-0000-0000-000000000001')).once();

    expect(service.displayType).toEqual(DisplayTypeEnum.ListWithDetailView);

    expect(service.sortOrderAsc$.getValue()).toEqual(true);
    expect(service.searchTerm$.getValue()).toEqual('');
    expect(service.isLoading$.getValue()).toEqual(false);

    expect(service.listData$.getValue()).toEqual(data);
    expect(service.setSelectedNodes$.getValue()).toEqual(['10000000-0000-0000-0000-000000000001']);
    expect(service.selectedNode).toEqual(data[0]);
    expect(service.hasSelectedItem$.getValue()).toEqual(true);

    expect(service.detailViewData$.getValue().visible).toEqual(true);
    expect(service.modelHasChanges$.getValue()).toEqual(false);

    expect(service.addEntityVisible$.getValue()).toEqual(false);
    expect(service.addEntityLayout$.getValue()).toEqual(undefined);
    expect(service.deleteEntityVisible$.getValue()).toEqual(false);
    expect(service.deleteMessage$.getValue()).toEqual('');
    expect(service.showUnsavedQuestion$.getValue()).toEqual(false);
  });

  it('should load listdata no result', () => {
    let data: EntityItemLite[] = undefined;

    when(mockedBoeService.getListEntities(serviceConfiguration, '', true, anything())).thenReturn(of(data));

    const service: DatahandlingService = TestBed.inject(DatahandlingService);
    service.displayType = DisplayTypeEnum.ListWithDetailView;
    service.serviceConfiguration = serviceConfiguration;

    service.LoadData();

    verify(mockedBoeService.getListEntities(serviceConfiguration, '', true, anything())).once();

    expect(service.displayType).toEqual(DisplayTypeEnum.ListWithDetailView);

    expect(service.sortOrderAsc$.getValue()).toEqual(true);
    expect(service.searchTerm$.getValue()).toEqual('');
    expect(service.isLoading$.getValue()).toEqual(false);

    expect(service.listData$.getValue()).toEqual(undefined);
    expect(service.setSelectedNodes$.getValue()).toEqual(undefined);
    expect(service.selectedNode).toEqual(null);
    expect(service.hasSelectedItem$.getValue()).toEqual(false);

    expect(service.detailViewData$.getValue().visible).toEqual(false);
    expect(service.modelHasChanges$.getValue()).toEqual(false);

    expect(service.addEntityVisible$.getValue()).toEqual(false);
    expect(service.addEntityLayout$.getValue()).toEqual(undefined);
    expect(service.deleteEntityVisible$.getValue()).toEqual(false);
    expect(service.deleteMessage$.getValue()).toEqual('');
    expect(service.showUnsavedQuestion$.getValue()).toEqual(false);
  });

  it('should select nothing', () => {
    let detailResult: FormlyDefinitionUI = {
      entityId: '10000000-0000-0000-0000-000000000001',
      tabs: [{
        tabName: 'huhu',
        isSelected: false,
        isPrimary: false,
        sortOrderIndex: 0,
        fields: []
      }],
      model: {}
    }

    when(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, anyString())).thenReturn(of(detailResult));
    const service: DatahandlingService = TestBed.inject(DatahandlingService);
    service.selectedNode = undefined;

    service.selectedNodeChanged(undefined);
    expect(service.selectedNode).toEqual(undefined);
    expect(service.hasSelectedItem$.getValue()).toEqual(false);
    expect(service.modelHasChanges$.getValue()).toEqual(false);
    expect(service.detailViewData$.getValue().visible).toEqual(false);

    verify(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, anyString())).never();
  });

  it('should change selected node', () => {
    let data: EntityItemLite = {
      id: '10000000-0000-0000-0000-000000000001',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'test',
      hasChilds: true,
      iconKey: '',
      childs: undefined
    };

    let detailResult: FormlyDefinitionUI = {
      entityId: '10000000-0000-0000-0000-000000000001',
      tabs: [{
        tabName: 'huhu',
        isSelected: false,
        isPrimary: false,
        sortOrderIndex: 0,
        fields: []
      }],
      model: { 'huhu': 'uhuh'}
    }

    when(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, data.id)).thenReturn(of(detailResult));

    const service: DatahandlingService = TestBed.inject(DatahandlingService);
    service.serviceConfiguration = serviceConfiguration;
    service.selectedNode = undefined;

    service.selectedNodeChanged(data);
    expect(service.selectedNode).toEqual(data);
    expect(service.hasSelectedItem$.getValue()).toEqual(true);
    expect(service.modelHasChanges$.getValue()).toEqual(false);
    expect(service.detailViewData$.getValue().visible).toEqual(true);

    verify(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, data.id)).once();
  });
  
  it('should change selected node no model changes', () => {
    let data: EntityItemLite = {
      id: '10000000-0000-0000-0000-000000000001',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'test',
      hasChilds: true,
      iconKey: '',
      childs: undefined
    };

    let detailResult: FormlyDefinitionUI = {
      entityId: '10000000-0000-0000-0000-000000000001',
      tabs: [{
        tabName: 'huhu',
        isSelected: false,
        isPrimary: false,
        sortOrderIndex: 0,
        fields: []
      }],
      model: {}
    }
    
    when(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, data.id)).thenReturn(of(detailResult));

    const service: DatahandlingService = TestBed.inject(DatahandlingService);
    service.serviceConfiguration = serviceConfiguration;
    service.selectedNode = {
      id: '20000000-0000-0000-0000-000000000002',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'test2',
      hasChilds: true,
      iconKey: '',
      childs: undefined
    };

    service.selectedNodeChanged(data);
    expect(service.selectedNode).toEqual(data);
    expect(service.hasSelectedItem$.getValue()).toEqual(true);
    expect(service.modelHasChanges$.getValue()).toEqual(false);
    expect(service.detailViewData$.getValue().visible).toEqual(true);

    verify(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, data.id)).once();
  });

  it('should change selected node has model changes reject', () => {
    let oldData: EntityItemLite = {
      id: '20000000-0000-0000-0000-000000000002',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'test2',
      hasChilds: true,
      iconKey: '',
      childs: undefined
    };

    let data: EntityItemLite = {
      id: '10000000-0000-0000-0000-000000000001',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'test',
      hasChilds: true,
      iconKey: '',
      childs: undefined
    };

    let detailResult: FormlyDefinitionUI = {
      entityId: '10000000-0000-0000-0000-000000000001',
      tabs: [{
        tabName: 'huhu',
        isSelected: false,
        isPrimary: false,
        sortOrderIndex: 0,
        fields: []
      }],
      model: {}
    };

    when(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, data.id)).thenReturn(of(detailResult));

    const service: DatahandlingService = TestBed.inject(DatahandlingService);
    service.selectedNode = oldData;
    service.serviceConfiguration = serviceConfiguration;
    service.modelHasChanges$.next(true);

    service.selectedNodeChanged(data);
    expect(service.selectedNode).toEqual(oldData);
    expect(service.hasSelectedItem$.getValue()).toEqual(false);
    expect(service.modelHasChanges$.getValue()).toEqual(true);
    expect(service.showUnsavedQuestion$.getValue()).toEqual(true);
    expect(service['tempSelectedNode']).toEqual(data);
    expect(service.detailViewData$.getValue().visible).toEqual(false);

    service.rejectSaveDialog();
    expect(service.selectedNode).toEqual(data);
    expect(service.showUnsavedQuestion$.getValue()).toEqual(false);
    expect(service.hasSelectedItem$.getValue()).toEqual(true);
    expect(service.modelHasChanges$.getValue()).toEqual(false);
    expect(service['tempSelectedNode']).toEqual(undefined);
    expect(service.detailViewData$.getValue().visible).toEqual(true);

    verify(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, data.id)).once();
  });

  it('should change selected node has model changes save', () => {
    let oldData: EntityItemLite = {
      id: '20000000-0000-0000-0000-000000000002',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'test2',
      hasChilds: true,
      iconKey: '',
      childs: undefined
    };

    let data: EntityItemLite = {
      id: '10000000-0000-0000-0000-000000000001',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'test',
      hasChilds: true,
      iconKey: '',
      childs: undefined
    };

    let detailResult: FormlyDefinitionUI = {
      entityId: '10000000-0000-0000-0000-000000000001',
      tabs: [{
        tabName: 'huhu',
        isSelected: false,
        isPrimary: false,
        sortOrderIndex: 0,
        fields: []
      }],
      model: {}
    };

    when(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, data.id)).thenReturn(of(detailResult));
    when(mockedBoeDetailService.updateEntity(anything(), anything(), anything())).thenReturn(of({}));

    const service: DatahandlingService = TestBed.inject(DatahandlingService);
    service.selectedNode = oldData;
    service.modelHasChanges$.next(true);
    service.displayType = DisplayTypeEnum.TreeWithDetailView;
    service.serviceConfiguration = serviceConfiguration;

    service.selectedNodeChanged(data);
    expect(service.selectedNode).toEqual(oldData);
    expect(service.hasSelectedItem$.getValue()).toEqual(false);
    expect(service.modelHasChanges$.getValue()).toEqual(true);
    expect(service.showUnsavedQuestion$.getValue()).toEqual(true);
    expect(service['tempSelectedNode']).toEqual(data);
    expect(service.detailViewData$.getValue().visible).toEqual(false);

    service.updateEntity({});

    expect(service.selectedNode).toEqual(data);
    expect(service.showUnsavedQuestion$.getValue()).toEqual(false);
    expect(service.hasSelectedItem$.getValue()).toEqual(true);
    expect(service.modelHasChanges$.getValue()).toEqual(false);
    expect(service['tempSelectedNode']).toEqual(undefined);
    
    verify(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, data.id)).once();
    verify(mockedBoeDetailService.updateEntity(anything(), anything(), anything())).once();
  });

  it('should load data on Sort Changed', () => {
    let data: EntityItemLite[] = [
      {
        id: '10000000-0000-0000-0000-000000000001',
        parentId: '00000000-0000-0000-0000-000000000000',
        name: 'test',
        hasChilds: true,
        iconKey: '',
        childs: undefined
      }
    ];

    let details: FormlyDefinitionUI = {
      entityId: '10000000-0000-0000-0000-000000000001',
      tabs: [],
      model: {}
    }

    when(mockedBoeService.getTreeEntities(serviceConfiguration, undefined, '', false, anything())).thenReturn(of(data));
    when(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, '10000000-0000-0000-0000-000000000001')).thenReturn(of(details))

    const service: DatahandlingService = TestBed.inject(DatahandlingService);
    service.displayType = DisplayTypeEnum.TreeWithDetailView;
    service.serviceConfiguration = serviceConfiguration;

    service.invertSort();

    verify(mockedBoeService.getTreeEntities(serviceConfiguration, undefined, '', false, anything())).once();
    verify(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, '10000000-0000-0000-0000-000000000001')).once();

    expect(service.displayType).toEqual(DisplayTypeEnum.TreeWithDetailView);

    expect(service.sortOrderAsc$.getValue()).toEqual(false);
    expect(service.searchTerm$.getValue()).toEqual('');
    expect(service.isLoading$.getValue()).toEqual(false);

    expect(service.listData$.getValue()).toEqual(data);
    expect(service.setSelectedNodes$.getValue()).toEqual(['10000000-0000-0000-0000-000000000001']);
    expect(service.selectedNode).toEqual(data[0]);
    expect(service.hasSelectedItem$.getValue()).toEqual(true);

    expect(service.detailViewData$.getValue().visible).toEqual(true);
    expect(service.modelHasChanges$.getValue()).toEqual(false);

    expect(service.addEntityVisible$.getValue()).toEqual(false);
    expect(service.addEntityLayout$.getValue()).toEqual(undefined);
    expect(service.deleteEntityVisible$.getValue()).toEqual(false);
    expect(service.deleteMessage$.getValue()).toEqual('');
    expect(service.showUnsavedQuestion$.getValue()).toEqual(false);
  });

  it('should load data on Search', () => {
    let data: EntityItemLite[] = [
      {
        id: '10000000-0000-0000-0000-000000000001',
        parentId: '00000000-0000-0000-0000-000000000000',
        name: 'test',
        hasChilds: true,
        iconKey: '',
        childs: undefined
      }
    ];

    let details: FormlyDefinitionUI = {
      entityId: '10000000-0000-0000-0000-000000000001',
      tabs: [],
      model: {}
    }

    when(mockedBoeService.getTreeEntities(serviceConfiguration, undefined, 'testString', true, anything())).thenReturn(of(data));
    when(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, '10000000-0000-0000-0000-000000000001')).thenReturn(of(details))

    const service: DatahandlingService = TestBed.inject(DatahandlingService);
    service.displayType = DisplayTypeEnum.TreeWithDetailView;
    service.serviceConfiguration = serviceConfiguration;
    service.serviceConfiguration = serviceConfiguration;

    service.search('testString');

    verify(mockedBoeService.getTreeEntities(serviceConfiguration, undefined, 'testString', true, anything())).once();
    verify(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, '10000000-0000-0000-0000-000000000001')).once();

    expect(service.displayType).toEqual(DisplayTypeEnum.TreeWithDetailView);

    expect(service.sortOrderAsc$.getValue()).toEqual(true);
    expect(service.searchTerm$.getValue()).toEqual('testString');
    expect(service.isLoading$.getValue()).toEqual(false);

    expect(service.listData$.getValue()).toEqual(data);
    expect(service.setSelectedNodes$.getValue()).toEqual(['10000000-0000-0000-0000-000000000001']);
    expect(service.selectedNode).toEqual(data[0]);
    expect(service.hasSelectedItem$.getValue()).toEqual(true);

    expect(service.detailViewData$.getValue().visible).toEqual(true);
    expect(service.modelHasChanges$.getValue()).toEqual(false);

    expect(service.addEntityVisible$.getValue()).toEqual(false);
    expect(service.addEntityLayout$.getValue()).toEqual(undefined);
    expect(service.deleteEntityVisible$.getValue()).toEqual(false);
    expect(service.deleteMessage$.getValue()).toEqual('');
    expect(service.showUnsavedQuestion$.getValue()).toEqual(false);
  });

  it('should mark model as changed', () => {
    const service: DatahandlingService = TestBed.inject(DatahandlingService);
    service.serviceConfiguration = serviceConfiguration;

    expect(service.modelHasChanges$.getValue()).toEqual(false);
    service.detailViewModelChanged();
    expect(service.modelHasChanges$.getValue()).toEqual(true);
  });

  it('should create no new item', () => {
    let fields: FormlyFieldConfig[] = [{

    }];

    when(mockedBoeDetailService.getNewLayout(serviceConfiguration)).thenReturn(of(fields));

    const service: DatahandlingService = TestBed.inject(DatahandlingService);
    service.serviceConfiguration = serviceConfiguration;
    service.showAddEntity();

    expect(service.addEntityLayout$.getValue()).toEqual(fields);
    expect(service.addEntityVisible$.getValue()).toEqual(true);

    service.hideAddEntity();
    expect(service.addEntityVisible$.getValue()).toEqual(false);

    verify(mockedBoeDetailService.getNewLayout(serviceConfiguration)).once();
  });

  it('should create new item', () => {
    let oldData: EntityItemLite = {
      id: '20000000-0000-0000-0000-000000000002',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'test2',
      hasChilds: true,
      iconKey: '',
      childs: undefined
    };

    let fields: FormlyFieldConfig[] = [{
    }];

    let data: EntityItemLite = {
      id: '10000000-0000-0000-0000-000000000001',
      parentId: '00000000-0000-0000-0000-000000000000',
      name: 'test',
      hasChilds: true,
      iconKey: '',
      childs: undefined
    };

    let detailData: FormlyDefinitionUI = {
      entityId: '10000000-0000-0000-0000-000000000001',
      tabs: [{
        tabName: 'huhu',
        isSelected: false,
        isPrimary: false,
        sortOrderIndex: 0,
        fields: []
      }],
      model: {}
    }

    when(mockedBoeDetailService.getNewLayout(serviceConfiguration)).thenReturn(of(fields));
    when(mockedBoeDetailService.createEntity(anything(), anything(), anything())).thenReturn(of(data));
    when(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, data.id)).thenReturn(of(detailData));

    const service: DatahandlingService = TestBed.inject(DatahandlingService);
    service.displayType = DisplayTypeEnum.TreeWithDetailView;
    service.serviceConfiguration = serviceConfiguration;
    service.selectedNode = oldData;

    service.showAddEntity();

    expect(service.addEntityLayout$.getValue()).toEqual(fields);
    expect(service.addEntityVisible$.getValue()).toEqual(true);

    service.createEntity({});
    expect(service.addEntityVisible$.getValue()).toEqual(false);
    expect(service.setSelectedNodes$.getValue()).toEqual( [data.id] );

    verify(mockedBoeDetailService.getNewLayout(serviceConfiguration)).once();
    verify(mockedBoeDetailService.createEntity(anything(), anything(), anything())).once();
    verify(mockedBoeDetailService.getDetailsLayout(serviceConfiguration, data.id)).once();

  });

});
