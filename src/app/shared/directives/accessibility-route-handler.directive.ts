import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';
@Directive({
    selector: '[appAccessibilityRouteHandler]'
})

export class AccessibilityRouteDirective {

    constructor(private route: Router) { }

    @HostListener('keypress') public handleLinks() {

        if (event['keyCode'] === 32 || event['keyCode'] === 13) {
            const el = document.activeElement as HTMLElement;
            this.route.navigate([el['pathname']]);
            return false;
        }
    }

}
