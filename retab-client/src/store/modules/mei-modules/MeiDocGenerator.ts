import MeiTag from "./MeiTag";

export default class MeiDocGenerator {
    static async generateJsomElem(mainElement: MeiTag, meta?: any) {
        // put meta later
        const result = mainElement.toJsonElem();
        return result;

    }
}