import { Directive, Input, OnDestroy, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appTooltip]'
})
export class TooltipDirective implements OnDestroy {

    private popup:any;
    private timer:any;

    @Input() appTooltip: string = '';
    @Input() delay?: number = 0;
    @Input() direction?: string = 'top'; // top, bottom, left, right
    @Input() useArrow?: boolean = false;
    @Input() theme?: string = 'info'; // success, warn, error, info

    constructor(private el: ElementRef) {

    }

    @HostListener('mouseenter') onMouseEnter() {
        if (this.appTooltip !== '') {
            this.timer = setTimeout(() => {
                let x, y;
                switch(this.direction) {
                    case 'bottom':
                        x = this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth / 2;
                        y = this.el.nativeElement.getBoundingClientRect().top + this.el.nativeElement.offsetHeight + 6;
                        break;
                    case 'top':
                        x = this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth / 2;
                        y = this.el.nativeElement.getBoundingClientRect().top - 6;
                        break;
                    case 'left':
                        x = this.el.nativeElement.getBoundingClientRect().left - 6;
                        y = this.el.nativeElement.getBoundingClientRect().top + this.el.nativeElement.offsetHeight / 2;
                        break;
                    case 'right':
                        x = this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth + 6;
                        y = this.el.nativeElement.getBoundingClientRect().top + this.el.nativeElement.offsetHeight / 2;
                        break;
                    default:
                        x = this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth / 2;
                        y = this.el.nativeElement.getBoundingClientRect().top - 6;
                        break;
                }

                this.createTooltipPopup(x, y);
            }, this.delay);
        }
    }

    @HostListener('mouseleave') onMouseLeave() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.destroyPopup();
    }

    private createTooltipPopup(x: number, y: number):void {

        let popup = document.createElement('div');
        popup.innerHTML = this.appTooltip;
        popup.setAttribute("class", `tooltip-container tooltip-direction-${this.direction} tooltip-theme-${this.theme}${this.useArrow ? ' tooltip-arrow' : ''}`);
        popup.style.top = y.toString() + "px";
        popup.style.left = x.toString() + "px";

        document.body.appendChild(popup);

        this.popup = popup;
    }

    private destroyPopup(): void {
        if (this.popup) {
            this.popup.remove();
        }
    }

    ngOnDestroy(): void {
        this.destroyPopup();
    }
}