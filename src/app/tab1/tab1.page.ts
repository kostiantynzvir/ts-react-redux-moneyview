import { Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NavigationOptions } from '@ionic/angular/providers/nav-controller';
import { Entry } from '../models/Entry';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  constructor(public storage:StorageService, private navCtrl: NavController) {}
  month = new Date().getMonth()
  allMonth = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
  year = new Date().getFullYear() 

  // bearbeiten von Eintrag
  openEdit(index: number) {
    const options: NavigationExtras = {
      state: {
        index: index
      }
    }
    this.navCtrl.navigateForward("tabs/tab1/addEntries", options)
  }

  // wählt das vorherige Monat aus und schaltet das Jahr um wenn man von Jan auf Dez schaltet
  previous() {
    if(this.month -1 < 0) {
      this.month = 11
      this.year -= 1
    } else {
      this.month -= 1
    }
    this.storage.filter(this.month, this.year)
  }

  // wählt das nächste Monat aus und schaltet das Jahr um wenn man von Dez auf Jan schaltet
  next() {
    if(this.month +1 > 11) {
      this.month = 0 
      this.year += 1
    } else {
      this.month += 1
    }
    this.storage.filter(this.month, this.year)
  }

  // löscht Eintrag an jeweiligen Index
  deleteEntry(index: number) {
    this.storage.deleteEntry(index)
  }

}