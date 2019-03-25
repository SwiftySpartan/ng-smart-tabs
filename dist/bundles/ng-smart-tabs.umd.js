(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/router', '@angular/common'], factory) :
    (factory((global['ng-smart-tabs'] = global['ng-smart-tabs'] || {}),global.ng.core,global._angular_router,global._angular_common));
}(this, (function (exports,_angular_core,_angular_router,_angular_common) { 'use strict';

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
            if (event instanceof _angular_router.NavigationEnd) {
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
        { type: _angular_core.Directive, args: [{
                    selector: '[ng-smart-tab]'
                },] },
    ];
    /** @nocollapse */
    NgSmartTabsDirective.ctorParameters = function () { return [
        { type: _angular_core.ElementRef },
        { type: _angular_router.Router }
    ]; };
    NgSmartTabsDirective.propDecorators = {
        isFollowLineInvisible: [{ type: _angular_core.Input }],
        lineColor: [{ type: _angular_core.Input }],
        activeOnUrlMatch: [{ type: _angular_core.Input }],
        underlineSidePadding: [{ type: _angular_core.Input }],
        horizontalChangeSpeed: [{ type: _angular_core.Input }],
        verticalChangeSpeed: [{ type: _angular_core.Input }],
        opacityChangeSpeed: [{ type: _angular_core.Input }],
        widthChangeSpeed: [{ type: _angular_core.Input }],
        onClick: [{ type: _angular_core.HostListener, args: ['click',] }]
    };
    return NgSmartTabsDirective;
}());

var NgSmartTabsModule = /** @class */ (function () {
    function NgSmartTabsModule() {
    }
    NgSmartTabsModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [
                        _angular_common.CommonModule,
                    ],
                    declarations: [
                        NgSmartTabsDirective,
                    ],
                    exports: [
                        NgSmartTabsDirective,
                    ]
                },] },
    ];
    return NgSmartTabsModule;
}());

exports.NgSmartTabsDirective = NgSmartTabsDirective;
exports.NgSmartTabsModule = NgSmartTabsModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
