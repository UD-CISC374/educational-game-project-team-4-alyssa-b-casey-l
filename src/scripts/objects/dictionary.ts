import {Entry} from './entry';
export class Dictionary {
    french: {[key: string]: Entry}
    english: {[key: string]: Entry}
    spanish: {[key: string]: Entry}
    texture: {[key: string]: Entry}
    constructor() {
        this.french = {}; // etc.
    }
    addEntry(e: string, s: string, f: string, t: string) {
        let newEntry = new Entry(e, s, f, t);
        this.english[e] = newEntry;
        this.spanish[s] = newEntry;
        this.french[f] = newEntry;
        this.texture[t] = newEntry;
    }
}