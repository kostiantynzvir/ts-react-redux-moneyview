import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Entry } from '../models/Entry';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.page.html',
  styleUrls: ['./new-entry.page.scss'],
})

export class NewEntryPage {
  entry = new Entry()
  passedIndex: number
  editMode = false
  

  constructor(private navCtrl: NavController, private router: Router, public storage: StorageService) { 
    this.passedIndex = this.router.getCurrentNavigation().extras.state?.index;
    if(this.passedIndex != null) {
      this.entry = storage.entries[this.passedIndex]
      this.editMode = true
    }
  }

  addEntries() {
    console.log(JSON.stringify(this.entry))
    this.storage.addEntry(this.entry)
    this.navCtrl.pop()
  }

  editEntry() {
    this.storage.editEntry(this.passedIndex, this.entry)
    this.navCtrl.pop()
  }
}
