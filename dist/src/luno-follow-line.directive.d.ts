import { AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
export declare class NgSmartTabsDirective implements AfterViewInit {
    private el;
    private router;
    private followLine;
    private nativeElement;
    private parentAttributeIdentifier;
    isFollowLineInvisible: boolean;
    lineColor: string;
    activeOnUrlMatch: string;
    underlineSidePadding: number;
    horizontalChangeSpeed: string;
    verticalChangeSpeed: string;
    opacityChangeSpeed: string;
    widthChangeSpeed: string;
    onClick(): void;
    constructor(el: ElementRef, router: Router);
    ngAfterViewInit(): void;
    private createNewFollowLine(shadowElement);
    private setLine();
    private updateLine(shadowElement);
    private initUrlWatcher();
    private urlMatcher(eventUrl);
}
