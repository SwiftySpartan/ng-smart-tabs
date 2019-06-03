import { AfterViewInit, ElementRef } from '@angular/core';
export declare class NgSmartTabsDirective implements AfterViewInit {
    private el;
    private followLine;
    private nativeElement;
    private parentAttributeIdentifier;
    isFollowLineInvisible: boolean;
    lineColor: string;
    lineThickness: string;
    lineBorderRadius: string;
    activeOnUrlMatch: string;
    underlineSidePadding: number;
    horizontalChangeSpeed: string;
    verticalChangeSpeed: string;
    opacityChangeSpeed: string;
    widthChangeSpeed: string;
    zIndex: number;
    index: number;
    static selectedItem: number;
    static instanceCounter: number;
    onClick(): void;
    constructor(el: ElementRef);
    onResize(): void;
    ngAfterViewInit(): void;
    private createNewFollowLine(shadowElement);
    private setLine();
    private updateLine(shadowElement);
    private urlMatcher(eventUrl);
}
