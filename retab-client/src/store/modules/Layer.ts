import Measure from "./Measure";
import MeiAttribute from "./mei-modules/MeiAttribute";
import MeiTag, { TMeiTagFactoryArgs } from "./mei-modules/MeiTag";
import Staff from "./Staff";
import TabGroup from "./TabGroup";
import { generateId } from "./utils";

export default class Layer extends MeiTag {
    tagTitle = 'layer';
    n?: number;
    tabGroups: TabGroup[] = []
    staff: Staff
    constructor(staff: Staff, n = 1) {
        super();
        this.staff = staff
        this.n = n
        // this.init()
    }
    setAttributes(): void {
        this.attributes.push(
            new MeiAttribute('xml:id', this.xmlId || ''),
            new MeiAttribute('n', this.n || ''),
        )
    }
    updateChildren(): MeiTag {
        this.children = this.tabGroups.map(tg => tg.updateChildren());
        return this
    }

    static fromMeiFactoryArgs(staff: Staff, arg: TMeiTagFactoryArgs) {

        const instance = new Layer(staff, Number(arg.attributes?.find(at => at.title == 'n')?.value));
        instance.id = arg.id
        
        
        instance.setAttribute(new MeiAttribute('xml:id', arg.attributes?.find(a => a.title == 'xml:id')?.value || generateId()))
        if (arg.children?.length) instance.tabGroups = arg.children
            .map(tje => TabGroup.fromMeiFactoryArgs(instance, tje));

        return instance;
    }


}