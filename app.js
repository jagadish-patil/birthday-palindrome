function reverseStr(str){
    var listOfChars = str.split('');    // ['h', 'e', 'l',....]
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
    // return str.split('').reverse().join('');
}

// console.log(reverseStr('hello'));

function isPalindrome(str){
    var reverse = reverseStr(str);
    
    // if(str === reverse){
    //     return true;
    // }
    // return false;

    return str === reverse;
}

// console.log(isPalindrome('242'));
// console.log(isPalindrome('oppo'));
// console.log(isPalindrome('racecar'));
// console.log(isPalindrome('momo'));

function convertDateToStr(date){
    var dateStr = { day: "", month: '', year: ''}

    if(date.day < 10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }

    if(date.month < 10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

// var date = {
//     day: 15,
//     month: 9,
//     year: 2020
// }

// console.log(convertDateToStr(date));

function getAllDateFormats(date){
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + date.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
    
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date){
   var listOfPalindromes = getAllDateFormats(date);

   var flag = false;
   for (var i = 0; i < listOfPalindromes.length; i++) {
       if (isPalindrome(listOfPalindromes[i])) {
        flag = true;
           break;
       }
   }

   return flag;
}

// check for leap year
function isLeapYear(year){
    if (year % 400 === 0) {
        return true;        
    }
    if (year % 100 === 0) {
        return false;        
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

// gets next date
function getNextDate(date){
    var day = date.day + 1; // increment the day       
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // 0 - 11

    //check for February
    if (month === 2) {  
        // check for leap year
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;    //increment the month
            }
        }        
        else{
            if(day > 28){
                day = 1;
                month++;    //increment the month
            }
        }
    }
    // check for other months
    else{
        // check if the day exceeds the max days in month
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++; //increment the month
        }
    }

    // increment the year if month is greater than 12
    if(month > 12){
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

// get next palindrome date
function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];
}

// var date = {
//     day: 8,
//     month: 8,
//     year: 2021
// };

// console.log(getAllDateFormats(date));

// console.log(checkPalindromeForAllDateFormats(date));

// console.log(isLeapYear(2021));

// console.log(getNextDate(date));

// 15 aug 2021, 28 feb 2020, 31 dec 2020

// console.log(getNextDate(date));

// console.log(getNextPalindromeDate(date));

// getPreviuosDate h/w

var dateInputRef = document.querySelector("#bday-input");
var showBtnRef = document.querySelector("#show-btn");
var resultRef = document.querySelector("#result");

function clickHandler(e){
    var bdayStr = dateInputRef.value;   //2020-10-11

    if(bdayStr !== ''){
        var listOfDate = bdayStr.split('-');    // ['2020', '10', '11']
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        
        var isPalindrome =checkPalindromeForAllDateFormats(date);
        
        if(isPalindrome){
            resultRef.innerText = "Yay! Your Birthday is a Palindrome!!";
        }
        else{
            var [ctr, nextDate] = getNextPalindromeDate(date);

            resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days!`;
        }
    }
}

showBtnRef.addEventListener('click', clickHandler);

