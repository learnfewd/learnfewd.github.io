!function(e){function i(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,i),n.l=!0,n.exports}var t={};return i.m=e,i.c=t,i.i=function(e){return e},i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)},i.p="/static/bundles/",i(i.s=1665)}({1:function(e,i,t){"use strict";function o(e,i,t,o,r,a,p,d){if(n(i),!e){var s;if(void 0===i)s=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[t,o,r,a,p,d],c=0;s=new Error(i.replace(/%s/g,function(){return l[c++]})),s.name="Invariant Violation"}throw s.framesToPop=1,s}}var n=function(e){};e.exports=o},1070:function(e,i,t){var o=t(51),n=o({MOUNTED:null,LOADING:null,UNMOUNTING:null,MEASURE:null});e.exports=n},1137:function(e,i,t){"use strict";function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=window._postLogEmbedPerformanceTimings;i&&"function"==typeof i?i():e<=10&&setTimeout(function(){o(e+1)},100*Math.pow(2,e))}function n(){if(!h)if(f)r(),h=!0;else if(!u){var e=document.getElementsByClassName("efImage");if(0===e.length||!document.body){if(window._sharedData){var i=null;try{i=window._sharedData.entry_data.EmbedPostlude[0].media}catch(e){}i||(f=!0,g=!0,setTimeout(n,0))}else setTimeout(n,100);return}var t=e[0];u=new Image,u.onload=function(){f=!0,setTimeout(n,0)};var o=t.getAttribute("src");if(o){u.src=o;var a=t.parentElement;a instanceof HTMLAnchorElement&&(a.removeChild(t),a.style.backgroundImage='url("'+o+'")')}}}function r(){window.parent.postMessage(JSON.stringify({type:m,details:{styles:window._d2r&&t.i(d.c)(g)}}),"*"),c.a("contentLoaded"),a(),"function"==typeof window.addEventListener&&window.addEventListener("resize",p),o()}function a(){var e=document.getElementsByClassName("Embed")[0];if(!document.body)throw new Error;var i=g?document.body.offsetWidth:e.offsetHeight;i!==w&&(window.parent.postMessage(JSON.stringify({type:x,details:{height:i}}),"*"),w=i)}function p(){null==k&&(k=setTimeout(function(){k=null,a()},20))}Object.defineProperty(i,"__esModule",{value:!0});var d=t(1466),s=t(1070),l=t.n(s),c=t(684),m=l.a.MOUNTED,b=l.a.LOADING,x=l.a.MEASURE;window._d2r?t.i(d.a)():t.i(d.b)();var u=null,f=!1,g=!1,h=!1,w=void 0,k=void 0;window.parent.postMessage(JSON.stringify({type:b,details:{}}),"*"),c.a("contentLoading"),n()},1359:function(e,i,t){var o=t(2),n=t(1575);o(n,"is6689556c")},1360:function(e,i,t){var o=t(2),n=t(1576);o(n,"is-44acab7a")},1364:function(e,i,t){var o=t(2),n=t(1580);o(n,"is6b745489")},1365:function(e,i,t){var o=t(2),n=t(1581);o(n,"is27ce58ca")},1366:function(e,i,t){var o=t(2),n=t(1582);o(n,"is6fdd56f8")},1367:function(e,i,t){var o=t(2),n=t(1583);o(n,"is6eb756d2")},1368:function(e,i,t){var o=t(2),n=t(1584);o(n,"is28bc58ea")},1369:function(e,i,t){var o=t(2),n=t(1585);o(n,"is70a9570d")},1370:function(e,i,t){var o=t(2),n=t(1586);o(n,"is-2521a676")},1466:function(e,i,t){"use strict";function o(){t.i(a.a)({flexbox:!1}),t(700),t(1364),t(1365),t(1366),t(1367),t(1368),t(1370),t(1369)}function n(){t.i(a.a)(),t(700),t(1359),t(1360)}function r(e){var i=e?"#efefef":"#dbdbdb";return[["boxShadow","none"],["border","1px solid "+i],["margin","1px 1px 12px 1px"]]}var a=t(633);i.b=o,i.a=n,i.c=r},1575:function(e,i){e.exports="body{background-color:#fff}.Embed{display:block}.EmbedHeader{-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;padding:12px}.ehAvatarLink{display:block;-ms-flex-negative:0;flex-shrink:0;height:40px;margin-right:12px;width:40px}.ehAvatar{border:1px solid #dbdbdb;border-radius:19px;height:38px;width:38px}.ehNextToAvatar{display:block;-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;line-height:0;overflow:hidden;padding-right:12px}.ehUsername{margin-right:100%}.ehLocationLink,.ehUsername{display:inline-block;font-size:16px;line-height:20px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ehUsername,.ehUsername:visited{color:#262626;font-weight:600}.ehCallToAction{-webkit-box-align:start;-ms-flex-align:start;align-items:start;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.ehVerifiedBadge{display:inline-block;margin-left:6px;overflow:hidden;text-indent:110%;white-space:nowrap}.ehLocationLink,.ehLocationLink:visited{color:#262626;font-weight:400}.ehRight{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.EmbedLogo{display:block}.elSprite{display:inline-block}.EmbedFrame{position:relative;padding-bottom:100%}.efImageLink{background-size:100% 100%;display:block;position:absolute;top:0;bottom:0;left:0;right:0}.efImage{width:100%}.EmbedFooter{padding:12px 56px 12px 12px}.espMetric{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;margin-right:12px}.espMetricIcon{display:inline-block;margin-right:8px}.espMetricText{color:#262626;display:inline-block;font-size:16px;font-weight:600;line-height:20px}.EmbedFooterLogoContainer{bottom:12px;position:absolute;right:12px}.EmbedSocialProof{-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;height:20px}.EmbedCaption,.EmbedTimestamp,.EmbedTimestamp:visited{color:#262626;display:block;font-size:16px;font-weight:400;line-height:20px;margin-top:6px}.EmbedTimestamp,.EmbedTimestamp:visited{color:#999;font-size:14px;line-height:18px;text-transform:uppercase}.EmbedIsBroken{height:100%}.EmbedBrokenMedia{-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#efefef;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;height:100%;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;width:100%}.ebmLogo{margin-bottom:20px}.ebmMessage{color:#262626;font-size:16px;font-weight:400;line-height:20px;margin:0 20px;text-align:center}"},1576:function(e,i){e.exports=".embedHideText{display:block;overflow:hidden;text-indent:110%;white-space:nowrap}.embedNonTextLink:active{opacity:1}"},1580:function(e,i){e.exports=".Embed{padding:8px}.EmbedCaption{display:block;margin-bottom:0;padding:0 4px;word-wrap:break-word}.EmbedCaption,.EmbedMedia{margin-top:8px}.EmbedMedia .video-js{position:absolute}.emuIcon,.emuMessage{position:absolute;left:50%}.emuMessage{padding-top:80px;text-align:center;top:50%;width:320px;margin:-40px 0 0 -160px}.emuIcon{top:0;width:70px;height:70px;margin:0 0 0 -35px}.ebdFooterCTA,.ebdHeaderCTA{position:absolute;right:8px}.ebdHeaderCTA{top:8px}.ebdFooterCTA{bottom:8px}.EmbedCaption{font-size:14px;line-height:17px;color:#000}.emuMessage{color:#a5a9ac;font-size:18px;font-weight:700;text-shadow:0 1px 0 rgba(255,255,255,.9)}@media screen and (max-width:400px){.EmbedCaption{font-size:12px;line-height:15px}}"},1581:function(e,i){e.exports=".EmbedBrokenMedia{background:#edeeef;margin-top:0;padding-bottom:100%;position:relative}"},1582:function(e,i){e.exports=".EmbedFooter{margin-bottom:-8px;margin-top:8px;position:relative}.EmbedFooterBrand{display:block;height:40px;overflow:hidden;position:absolute;right:4px;top:0;width:80px}.efbSprite{display:block;margin:10px auto 5px}@media screen and (max-width:400px){.efbSprite{margin:6px auto 5px}}"},1583:function(e,i){e.exports=".EmbedHeader{min-height:32px;white-space:nowrap}.ehAvatar{border-radius:16px;height:32px;position:absolute;top:0;left:0;width:32px}.ehByline{font-weight:700;position:relative}.ehInfo{padding-left:40px;white-space:nowrap}.ehInfoTimestamp,.ehInfoUsername{display:inline-block;line-height:32px;vertical-align:middle}.ehInfoTimestampContent{line-height:1}.ehInfoUsername{font-size:14px;max-width:44.7732%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ehInfoVerifiedUsername{max-width:41.72043%}.ehInfoTimestamp{color:#c9c8cd;font-size:14px}.ehInfoTimestamp::before{content:'\\2022';margin:0 4px}.ehCallToAction{position:absolute;right:8px;top:10px}.ehVerifiedBadge{margin-left:3px;position:relative;top:1px;vertical-align:middle}@media screen and (max-width:480px){.ehInfoUsername{max-width:31.5789%}.ehInfoVerifiedUsername{max-width:31.060606%}.timestamp:after{content:attr(data-timestamp-short)}.tsContent{display:none}}.tsContent{font-weight:600}"},1584:function(e,i){e.exports=".EmbedSocialProof{background-color:rgba(237,238,239,.5);cursor:pointer;line-height:40px;margin:0 -8px;padding:0 12px}.espComments,.espLikes,.espViews{line-height:40px;vertical-align:baseline;padding:0 16px 0 0;position:relative}.espComments .espIcon,.espLikes .espIcon,.espViews .espIcon{position:absolute;left:0;top:12px}.espLikes,.espViews{display:inline-block;float:left;padding-left:19px}.espComments{display:block;overflow:hidden;padding-left:20px}.EmbedSocialProof{font-weight:700;font-size:14px}.EmbedSocialProof,a.espComments,a.espComments:visited,a.espLikes,a.espLikes:visited,a.espViews,a.espViews:visited{color:#a5a9ac}a.espComments:hover,a.espLikes:hover,a.espViews:hover{text-decoration:none;color:#a5a9ac}@media screen and (max-width:400px){.EmbedSocialProof{line-height:32px;font-size:12px}.espComments,.espLikes,.espViews{line-height:32px}.espComments .espIcon,.espLikes .espIcon,.espViews .espIcon{position:absolute;left:0;top:8px}.espCommentsLabel,.espLikesLabel,.espViewsLabel{display:none}}"},1585:function(e,i){e.exports="html{-webkit-font-smoothing:antialiased}a,a:visited{color:#3f729b;text-decoration:none}a:hover{color:#1c5380;text-decoration:underline}.EmbedFrame{position:relative;padding-bottom:100%}.efImageLink{background-size:100% 100%;display:block;position:absolute;top:0;bottom:0;left:0;right:0}.efImage{width:100%}"},1586:function(e,i){e.exports=".EmbedVerifiedBadge{content:'';display:inline-block;overflow:hidden;text-indent:100%;vertical-align:middle;white-space:nowrap}"},16:function(e,i){var t;t=function(){return this}();try{t=t||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(t=window)}e.exports=t},1665:function(e,i,t){e.exports=t(1137)},2:function(e,i,t){"use strict";(function(i){function t(e){var i=document.getElementsByTagName("head")[0];return i.querySelector("["+r+"="+JSON.stringify(e)+"]")}function o(e){var i={"<":"&lt;",">":"&gt;",'"':"&quot;","&":"&amp;"};return e.replace(/[<>"&]/g,function(e){return i[e]})}function n(e,n){if("object"!=typeof document||!document.createElement)return i._cssMarkup=i._cssMarkup||[],void i._cssMarkup.push('<style type="text/css" '+r+'="'+o(n)+'">'+e+"</style>\n");var a;if(!(a=t(n))){a=document.createElement("style"),a.type="text/css",a.setAttribute(r,n);var p=document.getElementsByTagName("head")[0];p.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}var r="data-isostyle-id";e.exports=n}).call(i,t(16))},51:function(e,i,t){"use strict";var o=t(1),n=function(e){var i,t={};e instanceof Object&&!Array.isArray(e)?void 0:o(!1);for(i in e)e.hasOwnProperty(i)&&(t[i]=i);return t};e.exports=n},590:function(e,i,t){var o=t(2),n=t(596);o(n,"is683e557d")},596:function(e,i){e.exports="a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font:inherit;vertical-align:baseline}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:none}table{border-collapse:collapse;border-spacing:0}"},627:function(e,i,t){var o=t(2),n=t(635);o(n,"is151c5653")},628:function(e,i,t){var o=t(2),n=t(636);o(n,"is-3fccac84")},629:function(e,i,t){var o=t(2),n=t(637);o(n,"is15b65562")},633:function(e,i,t){"use strict";function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{flexbox:!0};t(590),e.flexbox&&t(627),t(628),t(629)}i.a=o},635:function(e,i){e.exports="#react-root,article,div,footer,header,main,nav,section{-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;border:0 solid #000;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-ms-flex-negative:0;flex-shrink:0;margin:0;padding:0;position:relative}"},636:function(e,i){e.exports="body{overflow-y:scroll}#react-root,body,html{height:100%}#react-root{z-index:0}"},637:function(e,i){e.exports='body,button,input,textarea{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:18px}a,a:visited{color:#003569;text-decoration:none}a:active{opacity:.5}'},684:function(e,i,t){"use strict";function o(){return"performance"in window&&null!=window.performance&&"object"==typeof window.performance&&"function"==typeof window.performance.now?window.performance.now():Date.now()}function n(e){window._timings||(window._timings={}),window._timings[e]=o()}function r(){return window._timings||{}}i.a=n,i.b=r},700:function(e,i,t){var o=t(2),n=t(798);o(n,"is4c736f00")},798:function(e,i){e.exports=".embedSpriteBrand{background-image:url(/static/sprites/embed/9d26e1.png);background-repeat:no-repeat;background-position:-72px 0;height:25px;width:80px}.embedSpriteBrokenMedia,.embedSpriteComments,.embedSpriteCommentsNew,.embedSpriteFollowFollowing{background-image:url(/static/sprites/embed/9d26e1.png);background-repeat:no-repeat;background-position:0 0;height:70px;width:70px}.embedSpriteComments,.embedSpriteCommentsNew,.embedSpriteFollowFollowing{background-position:-134px -27px;height:16px;width:16px}.embedSpriteCommentsNew,.embedSpriteFollowFollowing{background-position:-84px -72px;height:20px;width:20px}.embedSpriteFollowFollowing{background-position:0 -72px;height:26px;width:26px}.embedSpriteFollowNotFollowing,.embedSpriteFollowNotFollowingHover,.embedSpriteFollowRequested,.embedSpriteGlyph,.embedSpriteLikes{background-image:url(/static/sprites/embed/9d26e1.png);background-repeat:no-repeat;background-position:-28px -72px;height:26px;width:26px}.embedSpriteFollowNotFollowingHover,.embedSpriteFollowRequested,.embedSpriteGlyph,.embedSpriteLikes{background-position:-56px -72px}.embedSpriteFollowRequested,.embedSpriteGlyph,.embedSpriteLikes{background-position:-106px -27px}.embedSpriteGlyph,.embedSpriteLikes{background-position:-72px -27px;height:32px;width:32px}.embedSpriteLikes{background-position:0 -100px;height:16px;width:16px}.embedSpriteLikesNew,.embedSpriteVerifiedBadgeSmall,.embedSpriteViewCount,.embedSpriteViewCountNew{background-image:url(/static/sprites/embed/9d26e1.png);background-repeat:no-repeat;background-position:-106px -72px;height:20px;width:20px}.embedSpriteVerifiedBadgeSmall,.embedSpriteViewCount,.embedSpriteViewCountNew{background-position:-36px -100px;height:12px;width:12px}.embedSpriteViewCount,.embedSpriteViewCountNew{background-position:-18px -100px;height:16px;width:16px}.embedSpriteViewCountNew{background-position:-128px -72px;height:20px;width:20px}@media (min-device-pixel-ratio:1.5),(-webkit-min-device-pixel-ratio:1.5),(min-resolution:144dpi){.embedSpriteBrand,.embedSpriteBrokenMedia,.embedSpriteComments{background-image:url(/static/sprites/embed/74520e.png);background-size:151px 114px;background-position:-71px 0}.embedSpriteBrokenMedia,.embedSpriteComments{background-position:0 0}.embedSpriteComments{background-position:-123px -71px}.embedSpriteCommentsNew,.embedSpriteFollowFollowing,.embedSpriteFollowNotFollowing{background-image:url(/static/sprites/embed/74520e.png);background-size:151px 114px;background-position:-131px -26px}.embedSpriteFollowFollowing,.embedSpriteFollowNotFollowing{background-position:0 -71px}.embedSpriteFollowNotFollowing{background-position:-27px -71px}.embedSpriteFollowNotFollowingHover,.embedSpriteFollowRequested,.embedSpriteGlyph,.embedSpriteLikes{background-image:url(/static/sprites/embed/74520e.png);background-size:151px 114px;background-position:-54px -71px}.embedSpriteFollowRequested,.embedSpriteGlyph,.embedSpriteLikes{background-position:-104px -26px}.embedSpriteGlyph,.embedSpriteLikes{background-position:-71px -26px}.embedSpriteLikes{background-position:0 -98px}.embedSpriteLikesNew,.embedSpriteVerifiedBadgeSmall,.embedSpriteViewCount,.embedSpriteViewCountNew{background-image:url(/static/sprites/embed/74520e.png);background-size:151px 114px;background-position:-81px -71px}.embedSpriteVerifiedBadgeSmall,.embedSpriteViewCount,.embedSpriteViewCountNew{background-position:-34px -98px}.embedSpriteViewCount,.embedSpriteViewCountNew{background-position:-17px -98px}.embedSpriteViewCountNew{background-position:-102px -71px}}"}});