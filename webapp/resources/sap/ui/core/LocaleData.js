/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Object','./Configuration','./Locale'],function(q,B,C,L){"use strict";var a=B.extend("sap.ui.core.LocaleData",{constructor:function(o){B.apply(this);this.mData=e(o);},_get:function(){return this._getDeep(this.mData,arguments);},_getDeep:function(o,p){var r=o;for(var i=0;i<p.length;i++){r=r[p[i]];if(r===undefined){break;}}return r;},getOrientation:function(){return this._get("orientation");},getLanguages:function(){return this._get("languages");},getScripts:function(){return this._get("scripts");},getTerritories:function(){return this._get("territories");},getMonths:function(w,s){return this._get(g(s),"months","format",w);},getMonthsStandAlone:function(w,s){return this._get(g(s),"months","stand-alone",w);},getDays:function(w,s){return this._get(g(s),"days","format",w);},getDaysStandAlone:function(w,s){return this._get(g(s),"days","stand-alone",w);},getQuarters:function(w,s){return this._get(g(s),"quarters","format",w);},getQuartersStandAlone:function(w,s){return this._get(g(s),"quarters","stand-alone",w);},getDayPeriods:function(w,s){return this._get(g(s),"dayPeriods","format",w);},getDayPeriodsStandAlone:function(w,s){return this._get(g(s),"dayPeriods","stand-alone",w);},getDatePattern:function(s,f){return this._get(g(f),"dateFormats",s);},getTimePattern:function(s,f){return this._get(g(f),"timeFormats",s);},getDateTimePattern:function(s,f){return this._get(g(f),"dateTimeFormats",s);},getCustomDateTimePattern:function(s,f){var A=this._get(g(f),"dateTimeFormats","availableFormats");return this._getFormatPattern(s,A,f);},_parseSkeletonFormat:function(s){var t=[],T={index:-1},S,o,G;for(var i=0;i<s.length;i++){S=s.charAt(i);if(S=="j"||S=="J"){S=this.getPreferredHourSymbol();}if(S==T.symbol){T.length++;continue;}o=m[S];G=c[o.group];if(o.group=="Other"){throw new Error("Symbol '"+S+"' is not allowed in skeleton format '"+s+"'");}if(G.index<=T.index){throw new Error("Symbol '"+S+"' at wrong position or duplicate in skeleton format '"+s+"'");}T={symbol:S,group:o.group,match:o.match,index:G.index,field:G.field,length:1};t.push(T);}return t;},_getFormatPattern:function(s,A,f){var p=A[s];if(!p){p=this._createFormatPattern(s,A,f);}return p;},_createFormatPattern:function(s,A,f){var t=this._parseSkeletonFormat(s),T,h,o,j,k,D,n,p,r,u,v=10000,P,w=/^([GyYqQMLwWEecdD]+)([hHkKjJmszZvVOXx]+)$/,x,y,F,z=-1;for(var E in A){T=this._parseSkeletonFormat(E);D=0;h=[];n=true;if(t.length<T.length){continue;}k=0;F=t.length;for(var i=0;i<t.length;i++){o=t[i];j=T[k];if(F===t.length){F=i;}if(j){x=m[o.symbol];y=m[j.symbol];if(o.symbol===j.symbol){if(o.length===j.length){if(F===i){F=t.length;}}else{if(o.length<x.numericCeiling?j.length<y.numericCeiling:j.length>=y.numericCeiling){D+=Math.abs(o.length-j.length);}else{D+=5;}}k++;continue;}else{if(o.match==j.match){D+=Math.abs(o.length-j.length)+10;k++;continue;}}}h.push(o);D+=50-i;}if(k<T.length){n=false;}if(n&&(D<v||(D===v&&F>z))){v=D;z=F;u=h;p=A[E];r=T;}}if(v==0){P=p;}else{if(!p){P=s;}else if(u.length>0){if(w.test(s)){P=this._getMixedFormatPattern(s,A,f);}else{P=this._expandFields(p,r,t);P=this._appendItems(P,u,f);}}else{P=this._expandFields(p,r,t);}}if(s.indexOf("J")>=0){P=P.replace(/ ?[abB](?=([^']*'[^']*')*[^']*)$/,"");}return P;},_expandFields:function(p,P,t){var G={},f={},r="",Q=false,i=0,s,h,o,n,S,k,u,v,w,x;t.forEach(function(T){G[T.group]=T;});P.forEach(function(T){f[T.group]=T;});while(i<p.length){x=p.charAt(i);if(Q){r+=x;if(x=="'"){Q=false;}}else{u=m[x];if(u&&G[u.group]&&f[u.group]){S=G[u.group];k=f[u.group];v=m[S.symbol];w=m[k.symbol];s=S.length;h=k.length;o=1;while(p.charAt(i+1)==x){i++;o++;}if(s===h||((s<v.numericCeiling)?(h>=w.numericCeiling):(h<w.numericCeiling))){n=o;}else{n=Math.max(o,s);}for(var j=0;j<n;j++){r+=x;}}else{r+=x;if(x=="'"){Q=true;}}}i++;}return r;},_appendItems:function(p,f,s){var A=this._get(g(s),"dateTimeFormats","appendItems"),D,h,j;f.forEach(function(t){h=A[t.group];D="'"+this.getDisplayName(t.field)+"'";j="";for(var i=0;i<t.length;i++){j+=t.symbol;}p=h.replace(/\{0\}/,p).replace(/\{1\}/,j).replace(/\{2\}/,D);}.bind(this));return p;},_getMixedFormatPattern:function(s,A,f){var r=/^([GyYqQMLwWEecdD]+)([hHkKjJmszZvVOXx]+)$/,h=/MMMM|LLLL/,i=/MMM|LLL/,j=/E|e|c/,R,D,t,S,k,T,n,o;R=r.exec(s);D=R[1];t=R[2];k=this._getFormatPattern(D,A,f);T=this._getFormatPattern(t,A,f);if(h.test(D)){S=j.test(D)?"full":"long";}else if(i.test(D)){S="medium";}else{S="short";}n=this.getDateTimePattern(S,f);o=n.replace(/\{1\}/,k).replace(/\{0\}/,T);return o;},getIntervalPattern:function(i,s){var I=this._get(g(s),"dateTimeFormats","intervalFormats"),f,h,D,o,p;if(i){f=i.split("-");h=f[0];D=f[1];o=I[h];if(o){p=o[D];if(p){return p;}}}return I.intervalFormatFallback;},getNumberSymbol:function(t){return this._get("symbols-latn-"+t);},getDecimalPattern:function(){return this._get("decimalFormat").standard;},getCurrencyPattern:function(s){return this._get("currencyFormat")[s]||this._get("currencyFormat").standard;},getCurrencySpacing:function(p){return this._get("currencyFormat","currencySpacing",p==="after"?"afterCurrency":"beforeCurrency");},getPercentPattern:function(){return this._get("percentFormat").standard;},getFirstDayOfWeek:function(){return this._get("weekData-firstDay");},getWeekendStart:function(){return this._get("weekData-weekendStart");},getWeekendEnd:function(){return this._get("weekData-weekendEnd");},getCurrencyDigits:function(s){var o=this._get("currencyDigits");var D=2;if(o){if(o[s]!=undefined){D=o[s];}else{D=o["DEFAULT"];}}if(s==="HUF"){D=0;}return D;},getCurrencySymbol:function(s){var o=this._get("currencySymbols");return(o&&o[s])||s;},getCurrencyCodeBySymbol:function(s){var o=this._get("currencySymbols"),f;for(f in o){if(o[f]===s){return f;}}return s;},getRelativePatterns:function(s,S){if(S===undefined){S="wide";}var p=[],o,t,v,i;if(!s){s=["year","month","week","day","hour","minute","second"];}s.forEach(function(f){o=this._get("dateFields",f+"-"+S);for(var E in o){if(E.indexOf("relative-type-")===0){v=parseInt(E.substr(14),10);p.push({scale:f,value:v,pattern:o[E]});}else if(E.indexOf("relativeTime-type-")==0){t=o[E];i=E.substr(18)==="past"?-1:1;if(t["relativeTimePattern-count-one"]){p.push({scale:f,sign:i,pattern:t["relativeTimePattern-count-one"]});}p.push({scale:f,sign:i,pattern:t["relativeTimePattern-count-other"]});}}}.bind(this));return p;},getRelativePattern:function(s,D,f,S){var p,t,k;if(typeof f==="string"){S=f;f=undefined;}if(f===undefined){f=D>0;}if(S===undefined){S="wide";}k=s+"-"+S;p=this._get("dateFields",k,"relative-type-"+D);if(!p){t=this._get("dateFields",k,"relativeTime-type-"+(f?"future":"past"));if(Math.abs(D)===1){p=t["relativeTimePattern-count-one"];}if(!p){p=t["relativeTimePattern-count-other"];}}return p;},getRelativeSecond:function(D,s){return this.getRelativePattern("second",D,s);},getRelativeMinute:function(D,s){if(D==0){return null;}return this.getRelativePattern("minute",D,s);},getRelativeHour:function(D,s){if(D==0){return null;}return this.getRelativePattern("hour",D,s);},getRelativeDay:function(D,s){return this.getRelativePattern("day",D,s);},getRelativeWeek:function(D,s){return this.getRelativePattern("week",D,s);},getRelativeMonth:function(D,s){return this.getRelativePattern("month",D,s);},getDisplayName:function(t,s){if(s===undefined){s="wide";}var S=["era","weekday","zone"],k=S.indexOf(t)===-1?t+"-"+s:t;return this._get("dateFields",k,"displayName");},getRelativeYear:function(D,s){return this.getRelativePattern("year",D,s);},getDecimalFormat:function(s,n,p){var f;var F;switch(s){case"long":F=this._get("decimalFormat-long");break;default:F=this._get("decimalFormat-short");break;}if(F){var N=n+"-"+p;f=F[N];if(!f){N=n+"-other";f=F[N];}}return f;},getEras:function(w,s){var E=this._get(g(s),"era-"+w),f=[];for(var i in E){f[parseInt(i,10)]=E[i];}return f;},getEraDates:function(s){var E=this._get("eras-"+s.toLowerCase()),f=[];for(var i in E){f[parseInt(i,10)]=E[i];}return f;},getCalendarWeek:function(s,w){var o=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core"),k="date.week.calendarweek."+s;return o.getText(k,w);},getPreferredCalendarType:function(){var s=this._get("calendarPreference"),f=s?s.split(" "):[],h,t,i;for(i=0;i<f.length;i++){h=f[i];for(t in sap.ui.core.CalendarType){if(h===g(t).substring(3)){return t;}}}return sap.ui.core.CalendarType.Gregorian;},getPreferredHourSymbol:function(){return this._get("timeData","_preferred");}});var c={"Era":{field:"era",index:0},"Year":{field:"year",index:1},"Quarter":{field:"quarter",index:2},"Month":{field:"month",index:3},"Week":{field:"week",index:4},"Day-Of-Week":{field:"weekday",index:5},"Day":{field:"day",index:6},"Hour":{field:"hour",index:7},"Minute":{field:"minute",index:8},"Second":{field:"second",index:9},"Timezone":{field:"zone",index:10}};var m={"G":{group:"Era",match:"Era",numericCeiling:1},"y":{group:"Year",match:"Year",numericCeiling:100},"Y":{group:"Year",match:"Year",numericCeiling:100},"Q":{group:"Quarter",match:"Quarter",numericCeiling:3},"q":{group:"Quarter",match:"Quarter",numericCeiling:3},"M":{group:"Month",match:"Month",numericCeiling:3},"L":{group:"Month",match:"Month",numericCeiling:3},"w":{group:"Week",match:"Week",numericCeiling:100},"W":{group:"Week",match:"Week",numericCeiling:100},"d":{group:"Day",match:"Day",numericCeiling:100},"D":{group:"Day",match:"Day",numericCeiling:100},"E":{group:"Day-Of-Week",match:"Day-Of-Week",numericCeiling:1},"e":{group:"Day-Of-Week",match:"Day-Of-Week",numericCeiling:3},"c":{group:"Day-Of-Week",match:"Day-Of-Week",numericCeiling:2},"h":{group:"Hour",match:"Hour12",numericCeiling:100},"H":{group:"Hour",match:"Hour24",numericCeiling:100},"k":{group:"Hour",match:"Hour24",numericCeiling:100},"K":{group:"Hour",match:"Hour12",numericCeiling:100},"m":{group:"Minute",match:"Minute",numericCeiling:100},"s":{group:"Second",match:"Second",numericCeiling:100},"z":{group:"Timezone",match:"Timezone",numericCeiling:1},"Z":{group:"Timezone",match:"Timezone",numericCeiling:1},"O":{group:"Timezone",match:"Timezone",numericCeiling:1},"v":{group:"Timezone",match:"Timezone",numericCeiling:1},"V":{group:"Timezone",match:"Timezone",numericCeiling:1},"X":{group:"Timezone",match:"Timezone",numericCeiling:1},"x":{group:"Timezone",match:"Timezone",numericCeiling:1},"S":{group:"Other",numericCeiling:100},"u":{group:"Other",numericCeiling:100},"U":{group:"Other",numericCeiling:1},"r":{group:"Other",numericCeiling:100},"F":{group:"Other",numericCeiling:100},"g":{group:"Other",numericCeiling:100},"a":{group:"Other",numericCeiling:1},"b":{group:"Other",numericCeiling:1},"B":{group:"Other",numericCeiling:1},"A":{group:"Other",numericCeiling:100}};var M={"orientation":"left-to-right","languages":{},"scripts":{},"territories":{},"ca-gregorian":{"dateFormats":{"full":"EEEE, MMMM d, y","long":"MMMM d, y","medium":"MMM d, y","short":"M/d/yy"},"timeFormats":{"full":"h:mm:ss a zzzz","long":"h:mm:ss a z","medium":"h:mm:ss a","short":"h:mm a"},"dateTimeFormats":{"full":"{1} 'at' {0}","long":"{1} 'at' {0}","medium":"{1}, {0}","short":"{1}, {0}","availableFormats":{"d":"d","E":"ccc","Ed":"d E","Ehm":"E h:mm a","EHm":"E HH:mm","Ehms":"E h:mm:ss a","EHms":"E HH:mm:ss","Gy":"y G","GyMMM":"MMM y G","GyMMMd":"MMM d, y G","GyMMMEd":"E, MMM d, y G","h":"h a","H":"HH","hm":"h:mm a","Hm":"HH:mm","hms":"h:mm:ss a","Hms":"HH:mm:ss","hmsv":"h:mm:ss a v","Hmsv":"HH:mm:ss v","hmv":"h:mm a v","Hmv":"HH:mm v","M":"L","Md":"M/d","MEd":"E, M/d","MMM":"LLL","MMMd":"MMM d","MMMEd":"E, MMM d","MMMMd":"MMMM d","ms":"mm:ss","y":"y","yM":"M/y","yMd":"M/d/y","yMEd":"E, M/d/y","yMMM":"MMM y","yMMMd":"MMM d, y","yMMMEd":"E, MMM d, y","yMMMM":"MMMM y","yQQQ":"QQQ y","yQQQQ":"QQQQ y"},"appendItems":{"Day":"{0} ({2}: {1})","Day-Of-Week":"{0} {1}","Era":"{0} {1}","Hour":"{0} ({2}: {1})","Minute":"{0} ({2}: {1})","Month":"{0} ({2}: {1})","Quarter":"{0} ({2}: {1})","Second":"{0} ({2}: {1})","Timezone":"{0} {1}","Week":"{0} ({2}: {1})","Year":"{0} {1}"},"intervalFormats":{"intervalFormatFallback":"{0} – {1}"}},"months":{"format":{"abbreviated":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"narrow":["J","F","M","A","M","J","J","A","S","O","N","D"],"wide":["January","February","March","April","May","June","July","August","September","October","November","December"]},"stand-alone":{"abbreviated":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"narrow":["J","F","M","A","M","J","J","A","S","O","N","D"],"wide":["January","February","March","April","May","June","July","August","September","October","November","December"]}},"days":{"format":{"abbreviated":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"narrow":["S","M","T","W","T","F","S"],"short":["Su","Mo","Tu","We","Th","Fr","Sa"],"wide":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},"stand-alone":{"abbreviated":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"narrow":["S","M","T","W","T","F","S"],"short":["Su","Mo","Tu","We","Th","Fr","Sa"],"wide":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]}},"quarters":{"format":{"abbreviated":["Q1","Q2","Q3","Q4"],"narrow":["1","2","3","4"],"wide":["1st quarter","2nd quarter","3rd quarter","4th quarter"]},"stand-alone":{"abbreviated":["Q1","Q2","Q3","Q4"],"narrow":["1","2","3","4"],"wide":["1st quarter","2nd quarter","3rd quarter","4th quarter"]}},"dayPeriods":{"format":{"abbreviated":["AM","PM"],"narrow":["a","p"],"wide":["AM","PM"]},"stand-alone":{"abbreviated":["AM","PM"],"narrow":["AM","PM"],"wide":["AM","PM"]}},"era-wide":{"0":"Before Christ","1":"Anno Domini"},"era-abbreviated":{"0":"BC","1":"AD"},"era-narrow":{"0":"B","1":"A"}},"eras-gregorian":{"0":{"_end":"0-12-31"},"1":{"_start":"1-01-01"}},"dateFields":{"era":{"displayName":"era"},"year-wide":{"displayName":"year","relative-type--1":"last year","relative-type-0":"this year","relative-type-1":"next year","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} year","relativeTimePattern-count-other":"in {0} years"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} year ago","relativeTimePattern-count-other":"{0} years ago"}},"quarter-wide":{"displayName":"quarter","relative-type--1":"last quarter","relative-type-0":"this quarter","relative-type-1":"next quarter","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} quarter","relativeTimePattern-count-other":"in {0} quarters"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} quarter ago","relativeTimePattern-count-other":"{0} quarters ago"}},"month-wide":{"displayName":"month","relative-type--1":"last month","relative-type-0":"this month","relative-type-1":"next month","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} month","relativeTimePattern-count-other":"in {0} months"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} month ago","relativeTimePattern-count-other":"{0} months ago"}},"week-wide":{"displayName":"week","relative-type--1":"last week","relative-type-0":"this week","relative-type-1":"next week","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} week","relativeTimePattern-count-other":"in {0} weeks"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} week ago","relativeTimePattern-count-other":"{0} weeks ago"}},"day-wide":{"displayName":"day","relative-type--1":"yesterday","relative-type-0":"today","relative-type-1":"tomorrow","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} day","relativeTimePattern-count-other":"in {0} days"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} day ago","relativeTimePattern-count-other":"{0} days ago"}},"weekday":{"displayName":"day of the week"},"hour-wide":{"displayName":"hour","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} hour","relativeTimePattern-count-other":"in {0} hours"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} hour ago","relativeTimePattern-count-other":"{0} hours ago"}},"minute-wide":{"displayName":"minute","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} minute","relativeTimePattern-count-other":"in {0} minutes"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} minute ago","relativeTimePattern-count-other":"{0} minutes ago"}},"second-wide":{"displayName":"second","relative-type-0":"now","relativeTime-type-future":{"relativeTimePattern-count-one":"in {0} second","relativeTimePattern-count-other":"in {0} seconds"},"relativeTime-type-past":{"relativeTimePattern-count-one":"{0} second ago","relativeTimePattern-count-other":"{0} seconds ago"}},"zone":{"displayName":"time zone"}},"decimalFormat":{"standard":"#,##0.###"},"currencyFormat":{"standard":"¤#,##0.00"},"percentFormat":{"standard":"#,##0%"},"symbols-latn-decimal":".","symbols-latn-group":",","symbols-latn-plusSign":"+","symbols-latn-minusSign":"-","symbols-latn-percentSign":"%","weekData-minDays":4,"weekData-firstDay":1,"weekData-weekendStart":6,"weekData-weekendEnd":0,"timeData":{_allowed:"H h",_preferred:"H"}};var b={"iw":"he","ji":"yi","in":"id","sh":"sr"};var d=(function(){var f=L._cldrLocales,r={},i;if(f){for(i=0;i<f.length;i++){r[f[i]]=true;}}return r;}());var l={};function g(s){if(!s){s=sap.ui.getCore().getConfiguration().getCalendarType();}return"ca-"+s.toLowerCase();}function e(o){var s=o.getLanguage()||"",S=o.getScript()||"",r=o.getRegion()||"",D;function f(j,k){var n,v,p;if(!k){return;}for(n in k){if(k.hasOwnProperty(n)){v=j[n];p=k[n];if(v===undefined){j[n]=p;}else if(v===null){delete j[n];}else if(typeof v==='object'&&typeof p==='object'){f(v,p);}}}}function h(i){if(!l[i]&&(!d||d[i]===true)){var j=l[i]=q.sap.loadResource("sap/ui/core/cldr/"+i+".json",{dataType:"json",failOnError:false});if(j&&j.__fallbackLocale){f(j,h(j.__fallbackLocale));delete j.__fallbackLocale;}}return l[i];}s=(s&&b[s])||s;if(s==="no"){s="nb";}if(s==="zh"&&!r){if(S==="Hans"){r="CN";}else if(S==="Hant"){r="TW";}}var i=s+"_"+r;if(s&&r){D=h(i);}if(!D&&s){D=h(s);}l[i]=D||M;return l[i];}a.extend("sap.ui.core.CustomLocaleData",{constructor:function(o){a.apply(this,arguments);this.mCustomData=sap.ui.getCore().getConfiguration().getFormatSettings().getCustomLocaleData();},_get:function(){var A=Array.prototype.slice.call(arguments),s,k;if(A[0].indexOf("ca-")==0){s=A[0];if(s==g()){A=A.slice(1);}}k=A.join("-");return this.mCustomData[k]||this._getDeep(this.mData,arguments);}});a.getInstance=function(o){return o.hasPrivateUseSubtag("sapufmt")?new sap.ui.core.CustomLocaleData(o):new a(o);};return a;});
