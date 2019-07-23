export interface ChangeActions {
    [index: string]: boolean,
    blur: boolean, // When we lose focus
    input: boolean, // Element changed
    change: boolean, // When the element is updated
    mouseleave: boolean // When the element loses the mouse (For visual controls)
}
