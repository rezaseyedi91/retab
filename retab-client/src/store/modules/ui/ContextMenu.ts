import store  from  '@/store'

export default class ContextMenu {
    items: ContextMenuItem[] = []

    static initialize(event: MouseEvent) {
        event.preventDefault();
        store.state.ui.contextMenu.isOpen = true

        // store.state.ui.contextMenu.location = even
        
    }
}


class ContextMenuItem {

}

