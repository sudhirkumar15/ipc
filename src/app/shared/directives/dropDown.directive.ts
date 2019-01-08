import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Output
} from '@angular/core';

@Directive({
    selector: '[appDropDownOutsideClick]'
})

export class DropDownOutsideClickDirective {

    constructor(private _elementRef: ElementRef) { }

    @Output() public onDropdownOutsideClick = new EventEmitter<any>();

    @HostListener('document:click', ['$event.target'])

    public onClick(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.onDropdownOutsideClick.emit({ clickOutside: true });
        }
    }
}
