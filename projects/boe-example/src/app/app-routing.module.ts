import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BotTreeEditorEquipmentComponent } from './components/bottreeeditorequipment/bottreeeditorequipment.component';
import { BotListEditorEquipmentComponent } from './components/botlisteditorequipment/botlisteditorequipment.component';
import { BotDetailEditorEquipmentComponent } from './components/botdetaileditorequipment/botdetaileditorequipment.component';
import { BotListEditorMaterialComponent } from './components/botlisteditormaterial/botlisteditormaterial.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tree',
    pathMatch: 'full'
  },
  {
    path: 'tree',
    component: BotTreeEditorEquipmentComponent
  },
  {
    path: 'list',
    component: BotListEditorEquipmentComponent
  },
  {
    path: 'matlist',
    component: BotListEditorMaterialComponent
  },
  {
    path: 'details',
    component: BotDetailEditorEquipmentComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
