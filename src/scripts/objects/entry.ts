export class Entry {
    asEnglish: string;
    EnglishText: Text;
    asSpanish: string;
    asFrench: string;
    asTextureKey: string;
    eText: string;
    // Appropriate constructor
    constructor(e:string, s:string, f:string, t:string, et:string) {
        this.asEnglish = e;
        this.asSpanish = s;
        this.asFrench = f;
        this.asTextureKey = t;
        this.eText = et;
    }

}