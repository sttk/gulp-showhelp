!function(){"use strict";var n=require("gulp"),r=require("gulp-util"),o=require("yargs").argv,t=n.task;n.task=function(){t.apply(n,arguments);var r=arguments[0];return n.tasks[r]},module.exports=new function(){function t(){var r;r=1==arguments.length&&Array.isArray(arguments[0])?arguments[0]:arguments.length>0?Array.prototype.slice.call(arguments):Object.getOwnPropertyNames(n.tasks),h=a(r),f=!1;var o="",t=console.log;console.log=function(n){o+=(null!=n?n:"")+"\n"},u(r),o=c()+o,console.log=t,console.log(o)}function e(n,r){var o=r[""];s(n,o);for(var t in r)""!==t&&l(t,r[t])}function s(n,o){null==o&&(o="");for(var t="",e=n.length;h>e;e++)t+=" ";console.log("  "+r.colors.cyan(n)+t+" : "+o)}function l(n,o){null==o&&(o="");var t="";console.log("    "+r.colors.green(n)+t+" : "+o),f=!0}function a(r){for(var o=0,t=0;t<r.length;t++){var e=r[t];if(null!=e){var s=n.tasks[e];null!=s&&"undefined"!=typeof s.help&&(o=Math.max(o,e.length))}}return o}function u(o){console.log(r.colors.bold("Tasks"));for(var t=0;t<o.length;t++){var l=o[t];if(null!=l&&""!==l){var a=n.tasks[l];if(null!=a)switch(typeof a.help){case"function":a.help();break;case"object":e(l,a.help,h);break;case"string":s(l,a.help,h)}}else console.log()}}function c(){var n="\n"+r.colors.bold("Usage")+"\n";return n+="  gulp "+r.colors.cyan("task"),f&&(n+=" [ "+r.colors.green("option ...")+" ]"),n+="\n\n"}function i(){for(var n=Array.prototype.slice.call(arguments),r=0;r<n.length;r++)if(n[r]in o)return o[n[r]];return null}function g(){return Object.getOwnPropertyNames(n.tasks)}this.show=t,this.showTask=s,this.showOption=l,this.getArgv=i,this.taskNames=g,this.show_task=s,this.show_option=l,this.get_argv=i;var h=0,f=!1}}();