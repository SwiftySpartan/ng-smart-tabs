import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
var NgSmartTabsDirective = /** @class */ (function () {
    function NgSmartTabsDirective(el, router) {
        this.el = el;
        this.router = router;
        this.lineColor = '#EF476F';
        this.underlineSidePadding = 0;
        this.horizontalChangeSpeed = '1';
        this.verticalChangeSpeed = '1';
        this.opacityChangeSpeed = '1.25';
        this.widthChangeSpeed = '0.35';
    }
    NgSmartTabsDirective.prototype.onClick = function () {
        this.setLine();
    };
    NgSmartTabsDirective.prototype.ngAfterViewInit = function () {
        this.el.nativeElement.style.outline = 'none';
        // Only needs first angular identifier as only one is needed
        this.parentAttributeIdentifier = this.el.nativeElement.parentElement.attributes[0].name;
        this.nativeElement = this.el.nativeElement;
        if (this.activeOnUrlMatch) {
            this.urlMatcher(this.router.url); // For init load
            this.initUrlWatcher();
        }
    };
    NgSmartTabsDirective.prototype.createNewFollowLine = function (shadowElement) {
        this.followLine = document.createElement('div');
        this.followLine.style.width = shadowElement.getBoundingClientRect().right
            - shadowElement.getBoundingClientRect().left
            - this.underlineSidePadding + "px";
        this.followLine.style.height = '1px';
        this.followLine.style.backgroundColor = this.lineColor;
        this.followLine.style.position = 'fixed';
        this.followLine.style.top = shadowElement.getBoundingClientRect().bottom + "px";
        this.followLine.style.left = shadowElement.getBoundingClientRect().left + this.underlineSidePadding / 2 + "px";
        this.followLine.style.zIndex = '1';
        this.followLine.style.transition = "left " + this.horizontalChangeSpeed + "s cubic-bezier(0.25, 0.1, 0.25, 1),\n                                        top " + this.verticalChangeSpeed + "s cubic-bezier(0.25, 0.1, 0.25, 1),\n                                        width " + this.widthChangeSpeed + "s cubic-bezier(0.25, 0.1, 0.25, 1),\n                                        opacity " + this.opacityChangeSpeed + "s cubic-bezier(0.25, 0.1, 0.25, 1)";
        this.followLine.id = this.parentAttributeIdentifier + "-follow-line";
        if (this.isFollowLineInvisible) {
            this.followLine.style.opacity = '0';
        }
        document.body.appendChild(this.followLine);
    };
    NgSmartTabsDirective.prototype.setLine = function () {
        this.followLine = document.getElementById(this.parentAttributeIdentifier + "-follow-line");
        if (!this.followLine) {
            return this.createNewFollowLine(this.el.nativeElement);
        }
        return this.updateLine(this.el.nativeElement);
    };
    NgSmartTabsDirective.prototype.updateLine = function (shadowElement) {
        var _this = this;
        if (!shadowElement) {
            return;
        }
        if (!this.followLine) {
            this.setLine();
        }
        this.followLine.style.transform = "translateX(0px)";
        if (this.isFollowLineInvisible) {
            this.followLine.style.opacity = '0';
        }
        else {
            this.followLine.style.opacity = '1';
        }
        requestAnimationFrame(function () {
            _this.followLine.style.left = shadowElement.getBoundingClientRect().left + _this.underlineSidePadding / 2 + "px";
            _this.followLine.style.top = shadowElement.getBoundingClientRect().bottom + "px";
            _this.followLine.style.width = shadowElement.getBoundingClientRect().right
                - shadowElement.getBoundingClientRect().left
                - _this.underlineSidePadding + "px";
        });
    };
    NgSmartTabsDirective.prototype.initUrlWatcher = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            if (event instanceof NavigationEnd) {
                _this.urlMatcher(event.urlAfterRedirects);
            }
        });
    };
    NgSmartTabsDirective.prototype.urlMatcher = function (eventUrl) {
        if (!this.nativeElement) {
            return;
        }
        var matchingSegments = this.activeOnUrlMatch.split('&&');
        for (var _i = 0, matchingSegments_1 = matchingSegments; _i < matchingSegments_1.length; _i++) {
            var urlSegment = matchingSegments_1[_i];
            urlSegment = urlSegment.trim();
            if (urlSegment === eventUrl) {
                return this.updateLine(this.nativeElement);
            }
            else if (urlSegment.slice(-1) === '*' &&
                eventUrl.includes(urlSegment.split('*')[0]) ||
                urlSegment.slice(-1) === '*' &&
                    urlSegment.split('*')[0] === eventUrl) {
                // This condition takes care of /route/* configuration
                return this.updateLine(this.nativeElement);
            }
        }
    };
    NgSmartTabsDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ng-smart-tab]'
                },] },
    ];
    /** @nocollapse */
    NgSmartTabsDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Router }
    ]; };
    NgSmartTabsDirective.propDecorators = {
        isFollowLineInvisible: [{ type: Input }],
        lineColor: [{ type: Input }],
        activeOnUrlMatch: [{ type: Input }],
        underlineSidePadding: [{ type: Input }],
        horizontalChangeSpeed: [{ type: Input }],
        verticalChangeSpeed: [{ type: Input }],
        opacityChangeSpeed: [{ type: Input }],
        widthChangeSpeed: [{ type: Input }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return NgSmartTabsDirective;
}());
export { NgSmartTabsDirective };
//# sourceMappingURL=luno-follow-line.directive.js.map