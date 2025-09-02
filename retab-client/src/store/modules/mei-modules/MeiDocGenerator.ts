import MeiTag from "./MeiTag";

export default class MeiDocGenerator {
    static async generateJsonElem(sectionElement: MeiTag, meta?: any) {
        // put meta later
        const result = sectionElement.toJsonXmlElement();
        return result;

    }
}