import { Injectable } from '@angular/core';
import { Entry, SpendType } from './models/Entry';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _entries: Entry[] = []
  totalIncome = 0;
  totalSpending = 0;
  private month = 0;
  private year = 2021;

  constructor() { 
    const savedEntries = localStorage.getItem("allEntries")
    if(savedEntries) {
      this._entries = JSON.parse(localStorage.getItem("allEntries"))
    }
    this.calculateIncomeAndSpending()
  }

  get entries(){
    return this._entries.filter((value, index, array) => {
      const date=new Date(value.newDate)
      return date.getMonth() == this.month && date.getFullYear() == this.year
    })
  }

  filter (month: number, year: number) {
    this.month = month
    this.year = year
    this.calculateIncomeAndSpending()
  }

  addEntry(entry: Entry) {
    this._entries.push(entry)
    localStorage.setItem("allEntries", JSON.stringify(this._entries))
    this.calculateIncomeAndSpending()
  }

  editEntry(index: number, entry: Entry) {
    this._entries[index] = entry
    localStorage.setItem("allEntries", JSON.stringify(this._entries))
    this.calculateIncomeAndSpending()
  }

  deleteEntry(index: number) {
    this._entries.splice(index, 1)
    localStorage.setItem("allEntries", JSON.stringify(this._entries))
    this.calculateIncomeAndSpending()
  }

  // gruppiert entries nach Kategorie und addiert Einnahmen und Ausgaben der jeweiligen Kategorie
  // @return {Map<string, number>} Map aus Kategorie und Einnahmen/Ausgaben
  getDataByCategory(): Map<string, number> {
    const map = new Map<string, number>()
    const categories = this.entries.map((value) => {
      return value.category
    })
    categories.forEach((value) => {
      map.set(value, 0)
    })

    this.entries.forEach((value => {
      map.set(value.category, map.get(value.category) + value.amount)
    }))

    return map
  }

  private calculateIncomeAndSpending() {
    this.totalIncome = 0;
    this.totalSpending = 0;
    for(var entry of this.entries) {
      switch(entry.type) {
        case SpendType.income:
        this.totalIncome += entry.amount
        break
        case SpendType.spending:
        this.totalSpending += entry.amount
        break
      }
    }
  }
}
