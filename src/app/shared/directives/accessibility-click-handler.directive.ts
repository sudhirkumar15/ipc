import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[appAccessibilityClickHandler]'
})

export class AccessibilityClickDirective {
    constructor() { }
    @HostListener('keypress') public handleKeyboardEvent() {
        if (event['keyCode'] === 32 || event['keyCode'] === 13) {
            const el = document.activeElement as HTMLElement;
            el.click();
        }
        return false;
    }
}
