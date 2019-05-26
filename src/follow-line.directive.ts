import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[ng-smart-tab]'
})
export class NgSmartTabsDirective implements AfterViewInit {
  private followLine: HTMLElement;
  private nativeElement: HTMLElement;
  private parentAttributeIdentifier: string;

  @Input() isFollowLineInvisible: boolean;
  @Input() lineColor: string = '#EF476F';
  @Input() lineThickness: string = '1px';
  @Input() lineBorderRadius: string = '0px';
  @Input() activeOnUrlMatch: string;
  @Input() underlineSidePadding: number = 0;
  @Input() horizontalChangeSpeed: string = '1';
  @Input() verticalChangeSpeed: string = '1';
  @Input() opacityChangeSpeed: string = '1.25';
  @Input() widthChangeSpeed: string = '0.35';
  @Input() zIndex: number = 1;

  @HostListener('click') onClick() {
    this.setLine();
  }

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.el.nativeElement.style.outline = 'none';
    // Only needs first angular identifier as only one is needed
    this.parentAttributeIdentifier = this.el.nativeElement.parentElement.attributes[0].name;

    this.nativeElement = this.el.nativeElement as HTMLElement;
    if (this.activeOnUrlMatch) {
      this.urlMatcher(location.pathname);
    }
  }

  private createNewFollowLine(shadowElement: HTMLElement) {
    this.followLine = document.createElement('div');
    this.followLine.style.width = `${shadowElement.getBoundingClientRect().right
    - shadowElement.getBoundingClientRect().left
    - this.underlineSidePadding}px`;
    this.followLine.style.height = this.lineThickness;
    this.followLine.style.borderRadius = this.lineBorderRadius;
    this.followLine.style.backgroundColor = this.lineColor;
    this.followLine.style.position = 'fixed';
    this.followLine.style.top = `${shadowElement.getBoundingClientRect().bottom}px`;
    this.followLine.style.left = `${shadowElement.getBoundingClientRect().left + this.underlineSidePadding/2}px`;
    this.followLine.style.zIndex = this.zIndex ? `${this.zIndex}` : '1';
    this.followLine.style.transition = `left ${this.horizontalChangeSpeed}s cubic-bezier(0.25, 0.1, 0.25, 1),
                                        top ${this.verticalChangeSpeed}s cubic-bezier(0.25, 0.1, 0.25, 1),
                                        width ${this.widthChangeSpeed}s cubic-bezier(0.25, 0.1, 0.25, 1),
                                        opacity ${this.opacityChangeSpeed}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
    this.followLine.id = `${this.parentAttributeIdentifier}-follow-line`;
    if (this.isFollowLineInvisible) {
      this.followLine.style.opacity = '0';
    }
    document.body.appendChild(this.followLine);
  }

  private setLine() {
    this.followLine = document.getElementById(`${this.parentAttributeIdentifier}-follow-line`) as HTMLElement;
    if (!this.followLine) {
      return this.createNewFollowLine(this.el.nativeElement);
    }
    return this.updateLine(this.el.nativeElement);
  }

  private updateLine(shadowElement: HTMLElement) {
    if (!shadowElement) {
      return;
    }
    if (!this.followLine) {
      this.setLine();
    }
    this.followLine.style.transform = `translateX(0px)`;
    if (this.isFollowLineInvisible) {
      this.followLine.style.opacity = '0';
    } else {
      this.followLine.style.opacity = '1';
    }

    requestAnimationFrame(() => {
      this.followLine.style.left = `${shadowElement.getBoundingClientRect().left + this.underlineSidePadding/2}px`;
      this.followLine.style.top = `${shadowElement.getBoundingClientRect().bottom}px`;
      this.followLine.style.width = `${shadowElement.getBoundingClientRect().right
      - shadowElement.getBoundingClientRect().left
      - this.underlineSidePadding}px`;
    });
  }

  private urlMatcher(eventUrl: string) {
    if (!this.nativeElement) {
      return;
    }

    const matchingSegments = this.activeOnUrlMatch.split('&&');
    for (let urlSegment of matchingSegments) {
      urlSegment = urlSegment.trim();
      if (urlSegment === eventUrl) {
        return this.updateLine(this.nativeElement);
      } else if (eventUrl.includes(urlSegment.split('*')[0])) {
        // This condition takes care of /route/* configuration
        return this.updateLine(this.nativeElement);
      }
    }
  }
}
