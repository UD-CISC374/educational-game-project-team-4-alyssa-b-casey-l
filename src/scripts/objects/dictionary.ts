import {Entry} from './entry';
export class Dictionary {
    french: {[key: string]: Entry}
    english: {[key: string]: Entry}
    eText: {[key: string]: Entry}
    spanish: {[key: string]: Entry}
    texture: {[key: string]: Entry}
    constructor() {
        this.english = {};
        this.spanish = {};
        this.french = {};
        this.texture = {};
        this.eText = {};
    }
    addEntry(e: string, s: string, f: string, t: string, et: string) {
        let newEntry = new Entry(e, s, f, t, et);
        this.english[e] = newEntry;
        this.spanish[s] = newEntry;
        this.french[f] = newEntry;
        this.texture[t] = newEntry;
        this.eText[et] = newEntry;
    }
}