export default class MeiAttribute {
    title: string
    value: string
    constructor(title: string, value: string | number) {
        this.title = title; this.value = value + ''
    } 
}