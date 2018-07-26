export function parseParsian(number){
    if(number.length!=0) {
      number  = number.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
           return d.charCodeAt(0) - 1632;
           }).replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d) { return d.charCodeAt(0) - 1776; })
    }
       return number;
  }