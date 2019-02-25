/*
When squirrels get together for a party, they like to have cigars. 
A squirrel party is successful when the number of cigars is between 40 and 60, inclusive. 
Unless it is the weekend, in which case there is no upper bound on the number of cigars. 
Return true if the party with the given values is successful, or false otherwise.

Examples

cigarParty(30, false) → false
cigarParty(50, false) → true
cigarParty(70, true) → true
*/

function cigarParty(cigars, isWeekend) {
    if (isWeekend == true && cigars >= 40) {
        return true;
    } else if (cigars >= 40 && cigars <= 60) {
        return true;
    }
    return false;
}

/*
You and your date are trying to get a table at a restaurant. 
The parameter "you" is the stylishness of your clothes, in the range 0..10, 
and "date" is the stylishness of your date's clothes. 
The result getting the table is encoded as an int value with 0=no, 1=maybe, 2=yes. 
If either of you is very stylish, 8 or more, then the result is 2 (yes). 
With the exception that if either of you has style of 2 or less, then the result is 0 (no). 
'Otherwise the result is 1 (maybe).

Examples

dateFashion(5, 10) → 2
dateFashion(5, 2) → 0
dateFashion(5, 5) → 1
*/

function dateFashion(you, date) {
    if (you <= 2 || date <= 2) {
        return 0;
    }

    if (you >= 8 || date >= 8) {
        return 2;
    }

    return 1;
}

/*
The squirrels in Palo Alto spend most of the day playing. 
In particular, they play if the temperature is between 60 and 90 (inclusive).
Unless it is summer, then the upper limit is 100 instead of 90. 
Given an int temperature and a boolean isSummer, return true if the squirrels play and false otherwise.

Examples

squirrelPlay(70, false) → true
squirrelPlay(95, false) → false
squirrelPlay(95, true) → true
*/

function squirrelPlay(temp, isSummer) {
    if (isSummer && temp >= 60 && temp <= 100) {
        return true;
    }

    if (!isSummer && temp >= 60 && temp <= 90) {
        return true;
    }

    return false;
}

function caughtSpeeding(speed, isBirthday) {
    if (isBirthday) {
        if (speed <= 65) {
            return 0;
        } else if (speed >= 66 && speed <= 85) {
            return 1;
        } else if (speed >= 86) {
            return 2;
        }
    }

    if (speed <= 60) {
        return 0;
    } else if (speed >= 61 && speed <= 80) {
        return 1;
    } else {
        return 2;
    }
}

/*
Given 2 ints, a and b, return their sum. However, 
sums in the range 10..19 inclusive, are forbidden, so in that case just return 20.

Examples

sortaSum(3, 4) → 7
sortaSum(9, 4) → 20
sortaSum(10, 11) → 21
*/

function sortaSum(a, b){
	var sum = a + b;
	if (sum >= 10 && sum <= 19) return 20;
	return sum;
}

/*
Given a day of the week encoded as 0=Sun, 1=Mon, 2=Tue, ...6=Sat, 
and a boolean indicating if we are on vacation, 
return a string of the form "7:00" indicating when the alarm clock should ring. 
Weekdays, the alarm should be "7:00" and on the weekend it should be "10:00". 
Unless we are on vacation -- then on weekdays it should be "10:00" and weekends it should be "off".

Examples

alarmClock(1, false) → 7:00
alarmClock(5, false) → 7:00
alarmClock(0, false) → 10:00
*/

function alarmClock(day, vacation){
	// if (vacation == false && day > 0 && day < 6) return "7:00";
	// if (vacation == false && (day == 0 || day == 6)) return "10:00";
	// if (vacation == true && day > 0 && day < 6) return "10:00";
	
	// CleanCode
	if (vacation) {
		if (day > 0 && day < 6) return '10:00';
	} else {
		if (day > 0 && day < 6) return '7:00';
		if (day == 0 || day == 6) return "10:00";
	}
	return "off";
}


