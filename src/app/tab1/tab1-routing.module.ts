import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewEntryPage } from '../new-entry/new-entry.page';
import { Tab2Page } from '../tab2/tab2.page';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'addEntries',
    component: NewEntryPage,
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
