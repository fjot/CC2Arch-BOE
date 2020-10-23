import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { IFilter } from '@proleit/sdk-components-filterbar';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { BotEditorService } from './bot-editor.service';
import { BotEditorDetailService } from './bot-editor-detail.service';
import { DisplayTypeEnum } from '../models/display-type.enum';
import { DetailData, EntityItemLite, FormlyDefinitionUI, ServiceConfiguration } from '../../public-api';

@Injectable()
export class DatahandlingService {

  constructor(private botEditorService: BotEditorService,
    private botEditorDetailService: BotEditorDetailService) { }

  // Global Settings after creation
  displayType: DisplayTypeEnum = DisplayTypeEnum.DetailView;
  serviceConfiguration: ServiceConfiguration;
  filters: IFilter[];

  // Filter Settings
  sortOrderAsc$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  searchTerm$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Tree/ List Data
  listData$: BehaviorSubject<EntityItemLite[]> = new BehaviorSubject<EntityItemLite[]>([]);
  setSelectedNodes$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(undefined);
  selectedNode: EntityItemLite;
  hasSelectedItem$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private tempSelectedNode: EntityItemLite;
  subTreeNodesChanged$: Subject<any> = new Subject<any>();

  // Detail Data
  detailViewData$: BehaviorSubject<DetailData> = new BehaviorSubject<DetailData>({
    visible: false,
    form: new FormArray([new FormGroup({})])
  } as DetailData);
  modelHasChanges$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Dialogs
  addEntityVisible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  addEntityLayout$: BehaviorSubject<FormlyFieldConfig[]> = new BehaviorSubject<FormlyFieldConfig[]>(undefined);
  deleteEntityVisible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  deleteMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  showUnsavedQuestion$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  LoadData() {
    if (this.displayType === DisplayTypeEnum.TreeWithDetailView) {
      this.isLoading$.next(true);

      this.loadTreeItems(undefined).subscribe(data => this.dataLoaded(data));
    }

    if (this.displayType === DisplayTypeEnum.ListWithDetailView) {
      this.isLoading$.next(true);

      this.botEditorService.getListEntities(this.serviceConfiguration,
        this.searchTerm$.getValue(),
        this.sortOrderAsc$.getValue(),
        this.filters)
        .subscribe(data => this.dataLoaded(data));
    }
  }

  private dataLoaded(data: EntityItemLite[]) {
    this.isLoading$.next(false);
    this.listData$.next(data);
    this.selelectInitalItem();
  }

  loadTreeItems(node: EntityItemLite): Observable<EntityItemLite[]> {
    if (this.displayType === DisplayTypeEnum.TreeWithDetailView) {
      return this.botEditorService.getTreeEntities(this.serviceConfiguration,
        node,
        this.searchTerm$.getValue(),
        this.sortOrderAsc$.getValue(),
        this.filters);
    }
  }

  selectedNodeChanged(dataItem: EntityItemLite) {
    if (!this.selectedNode) {
      this.changeSelectedNode(dataItem);
      return;
    }

    if (this.selectedNode.id !== dataItem.id) {
      if (!this.modelHasChanges$.getValue()) {
        this.changeSelectedNode(dataItem);
        return;
      }

      this.showUnsavedQuestion$.next(true);
      this.tempSelectedNode = dataItem;
    }
  }

  private changeSelectedNode(node: EntityItemLite) {
    this.selectedNode = node;

    if (node) {
      this.hasSelectedItem$.next(!this.selectedNode ? false : true);
      this.botEditorDetailService.getDetailsLayout(this.serviceConfiguration, this.selectedNode.id).subscribe(detailData => this.setDetailViewData(true, detailData));
    } else {
      this.hasSelectedItem$.next(false);
      this.setDetailViewData(false, undefined)
    }
  }

  private setDetailViewData(visible: boolean, detailData: FormlyDefinitionUI) {
    let data: DetailData = {
      visible: visible,
      form: undefined,
      tabs: undefined,
      options: undefined,
      model: undefined
    };

    if (detailData) {
      data.form = new FormArray(detailData.tabs.map(() => new FormGroup({})));
      data.tabs = detailData.tabs;
      data.options = detailData.tabs.map(() => ({} as FormlyFormOptions));
      data.model = detailData.model;
    };

    this.modelHasChanges$.next(false);
    this.detailViewData$.next(data);
  }

  invertSort() {
    this.sortOrderAsc$.next(!this.sortOrderAsc$.value);
    this.LoadData();
  }

  search(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
    this.LoadData();
  }

  updateEntity(model: any) {
    this.botEditorDetailService.updateEntity(this.serviceConfiguration, this.selectedNode.id, model).subscribe(() => this.entityUpdated());
  }

  private entityUpdated() {
    this.showUnsavedQuestion$.next(false);
    this.modelHasChanges$.next(false);

    if (this.displayType === DisplayTypeEnum.ListWithDetailView) {
      this.LoadData();
    }

    if (this.displayType === DisplayTypeEnum.TreeWithDetailView) {
      this.subTreeNodesChanged$.next(this.selectedNode);
    }

    if (this.tempSelectedNode) {
      this.changeSelectedNode(this.tempSelectedNode);
      this.tempSelectedNode = undefined;
    }
    else {
      this.changeSelectedNode(this.selectedNode);
    }
  }

  detailViewModelChanged() {
    this.modelHasChanges$.next(true);
  }

  rejectSaveDialog() {
    this.showUnsavedQuestion$.next(false);
    this.changeSelectedNode(this.tempSelectedNode);
    this.tempSelectedNode = undefined;
  }

  saveDialogCancel() {
    this.showUnsavedQuestion$.next(false);
    this.tempSelectedNode = undefined;
    this.setSelectedNodes$.next([this.selectedNode.id]);
  }

  showAddEntity() {
    this.botEditorDetailService.getNewLayout(this.serviceConfiguration).subscribe(data => this.showAddEntityLayoutLoaded(data));
  }

  showAddEntityLayoutLoaded(data: FormlyFieldConfig[]) {
    this.addEntityLayout$.next(data);
    this.addEntityVisible$.next(true);
  }

  hideAddEntity() {
    this.addEntityVisible$.next(false);
  }

  createEntity(createModel: any) {
    let parentId = '00000000-0000-0000-0000-000000000000';

    if (this.selectedNode && this.displayType === DisplayTypeEnum.TreeWithDetailView) {
      parentId = this.selectedNode.id
    }

    this.botEditorDetailService.createEntity(this.serviceConfiguration, parentId, createModel)
      .subscribe(data => this.entityCreated(data));
  }

  private entityCreated(node: EntityItemLite) {
    if (this.displayType === DisplayTypeEnum.ListWithDetailView || !this.selectedNode) {
      let data = this.listData$.getValue();

      if (data) {
        data.push(node);
        data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      }
      else {
        data = [node];
      }

      this.listData$.next(data);
    }

    if (this.displayType === DisplayTypeEnum.TreeWithDetailView) {

      if (this.selectedNode) {
        this.subTreeNodesChanged$.next(this.selectedNode);
      } else {
        this.LoadData();
      }
    }

    this.setSelectedNodes$.next([node.id]);
    this.selectedNodeChanged(node);
    this.addEntityVisible$.next(false);
  }

  showDeleteEntity() {
    this.deleteMessage$.next($localize`:@@datahandling.delete:Soll der Eintrag ${this.selectedNode ? '\'' + this.selectedNode.name + '\'' : ''} wirklich gelöscht werden?`);
    this.deleteEntityVisible$.next(true);
  }

  hideDeleteEntity() {
    this.deleteEntityVisible$.next(false);
  }

  deleteEntityConfirmed() {
    this.botEditorService.deleteEntity(this.serviceConfiguration, this.selectedNode.id).subscribe(() => this.entityDeleted());
    this.deleteEntityVisible$.next(false);
  }

  private entityDeleted() {
    if (this.displayType === DisplayTypeEnum.ListWithDetailView || !this.selectedNode) {
      let data = this.listData$.getValue();
      let index = data.indexOf(this.selectedNode);

      if (index > 0) {
        index--;
      }

      this.listData$.next(data.filter(obj => obj !== this.selectedNode));
      this.selelectInitalItem();
    }

    if (this.displayType === DisplayTypeEnum.TreeWithDetailView) {
      this.subTreeNodesChanged$.next(this.selectedNode);
      this.selelectInitalItem();
    }
  }

  private selelectInitalItem() {
    let data = this.listData$.getValue();

    if (data && data.length > 0) {
      this.setSelectedNodes$.next([data[0].id]);
      this.changeSelectedNode(data[0]);
    } else {
      this.changeSelectedNode(null);
    }
  }
}
