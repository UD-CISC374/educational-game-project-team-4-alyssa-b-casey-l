export class Entry {
    asEnglish: string;
    EnglishText: Text;
    asSpanish: string;
    asFrench: string;
    asTextureKey: string;

    // Appropriate constructor
    constructor(e:string, s:string, f:string, t:string) {
        this.asEnglish = e;
        this.asSpanish = s;
        this.asFrench = f;
        this.asTextureKey = t;

    }

}