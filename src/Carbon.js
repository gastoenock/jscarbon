
class Carbon  {
    constructor(year = 0, month = 0, day = 0, hour = 0, minute = 0, second = 0, timeZone=null, time, fullDate) {
        this._year = fullDate.getFullYear();
        this._month = fullDate.getMonth();
        this._day = fullDate.getDay();
        this._date = fullDate.getDate();
        this._hours = fullDate.getHours();
        this._minutes = fullDate.getMinutes();
        this._seconds = fullDate.getSeconds();
        this._timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this._time = ""+(fullDate.getHours().toString().padStart(2, '0'))+":"+fullDate.getMinutes().toString().padStart(2, '0')+":"+fullDate.getSeconds().toString().padStart(2, '0');
        this._fullDate = fullDate;

        // console.log(Intl.DateTimeFormat().resolvedOptions());
    }

    static currentTime = new Date();
    static _one_day =  1000 * 60 * 60 * 24;
    
    static times = {
        current: Date.now(),
        inProcess:  null,
    };

    #daysMap (value){
        return {
            'Mon': 'Monday',
            'Tue': 'Tuesday',
            'Wed': 'Wednesday',
            'Thu': 'Thursday',
            'Fri': 'Friday',
            'Sat': 'Saturday',
            'Sun': 'Sunday',
        }[value]
    };

    static #numberedMonthsMap = {
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 5,
        5: 6,
        6: 7,
        7: 8,
        8: 9,
        9: 10,
        10: 11,
        11: 12,
    };

    monthsMap(value) {
        return {
            'Jan': 'January',
            'Feb': 'February',
            'Mar': 'March',
            'Apr': 'April',
            'May': 'May',
            'Jun': 'June',
            'Jul': 'July',
            'Aug': 'August',
            'Sep': 'September',
            'Oct': 'October',
            'Nov': 'November',
            'Dec': 'December'
        }[value]
    }

    #numberedMonthToString(value) {
        return {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December'
        }[value]
    }


    #formatter =  [
        'j',
        'L',
        'l',
        'F',
        'S',
        'm',
        'M',
        'Y',
        'y',
        'd',
        'D',
        'H',
        'h',
        'i',
        's',
        'A',
        'a'
    ]

    static now(){
        return Date.now()
    }

    static parse(timeToPass)
    {
        const parsedTime = new Date(timeToPass);
        const[day, month, date, year, time, gmt, timeZone] = parsedTime.toString().split(' ');
        const [hours, minutes, seconds] = time.toString().split(':');
        
        this._year = parsedTime.getFullYear();
        this._month = parsedTime.getMonth() + 1;
        this._day = parsedTime.getDay();
        this._hours = parsedTime.getHours();
        this._minutes = parsedTime.getMinutes();
        this._seconds = parsedTime.getSeconds();
        // this._timeZone = parsedTime.getT();
        this._time = time;
        this._fullDate = parsedTime;

        return new this(
            this._year,
            this._month,
            this._day,
            this._hours,
            this._minutes,
            this._seconds,
            this._timeZone,
            this._time,
            this._fullDate
        );
    }

    getformatter(){
        this.#formatter.forEach(format => {
            console.log(format);
        });
    }

    #getDaySubscript(day){
        if (day == 1 || day==21 ||day==31) {
            return 'st';
        }

        else if (day == 2 || day==22) {
            return 'nd';
        }

        else if (day == 3 || day== 23){
            return 'rd';
        }

        else return 'th';
    }

    format(format)
    {
        let keys = []
        let formated = format;
        let splited = format.split('');

        splited.forEach(key => {
            if (this.#formatter.includes(key)) {
                keys.push(key);
            }
        });

        keys.forEach(key => {
            if (key) {
                formated = formated.replace(key, this.transleteFormat( key));
            }
        });

        keys.forEach(key => {
            if (key) {
                formated = formated.replace(this.transleteFormat(key), this.dateFormatter(this._fullDate , this.backTransletedFormat(this.transleteFormat(key))));
            }
        });

        return formated;
    }

    dateFormatter(date,data){
        let options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }

        let formatter =  {
            'j': date.getDate(),
            'l': this.#daysMap(date.toString().split(' ')[0]),
            'F': this.#numberedMonthToString(date.getMonth() + 1),
            'S': this.#getDaySubscript(date.getDay()),
            'm': (date.getMonth() + 1).toString().padStart(2, '0'),
            'M': date.toLocaleDateString("en-US", options.weekday = 'short'),
            'Y': date.getFullYear(),
            'y': date.getFullYear().toString().substr(-2),
            'd': (date.getDate()).toString().padStart(2, '0'),
            'D': date.toLocaleString('en-US', { month: 'long' }),
            'H': date.getHours(),
            'h': date.getHours() % 12,
            'i': (date.getMinutes()).toString().padStart(2, '0'),
            's': (date.getSeconds()).toString().padStart(2, '0') ,
            'a': this.#getAMPM().toLowerCase(),
            'A': this.#getAMPM()

            // l Tuesday
            // F August
            // j 12
            // S th, 
            // Y 2025
        }
        
        return formatter[data];
    }

    transleteFormat(keyword){
        let formatter =  {
            'j':    'JIFBE1IQG0EUXTQ',
            'L':    '5KB46NC0436PGB0',
            'l':    'N2TER1T4N0ZG92E',
            'F':    'K791N94XJGLGXK3',
            'S':    'X3EU91X1EC39X11',
            'm':    '1NZ07J8TQ1WTCVX',
            'M':    'UU8Y15GY1DHZ5F5',
            'Y':    '4E7E21KCEVV7KLW',
            'y':    'GAJWTNLTE2N4N3U',
            'd':    'RNX6VCBXKRTNLW8',
            'D':    'QKZR4QFBLZT2NFH',
            'H':    '5RCDP8PZNE59R0L',
            'h':    '5NUC6ZVFTQ4C31K',
            'i':    'HG8Q58YTM197MST',
            's':    'P4K30VKTCY169LQ',
            'A':    '0B0ERXPAXDRF0HB',
            'a':    '47R323XPAXDR422',
        }
        return formatter[keyword];
    }
    
    backTransletedFormat(keyword){
        let formatter =  {
            'j':    'JIFBE1IQG0EUXTQ',
            'L':    '5KB46NC0436PGB0',
            'l':    'N2TER1T4N0ZG92E',
            'F':    'K791N94XJGLGXK3',
            'S':    'X3EU91X1EC39X11',
            'm':    '1NZ07J8TQ1WTCVX',
            'M':    'UU8Y15GY1DHZ5F5',
            'Y':    '4E7E21KCEVV7KLW',
            'y':    'GAJWTNLTE2N4N3U',
            'd':    'RNX6VCBXKRTNLW8',
            'D':    'QKZR4QFBLZT2NFH',
            'H':    '5RCDP8PZNE59R0L',
            'h':    '5NUC6ZVFTQ4C31K',
            'i':    'HG8Q58YTM197MST',
            's':    'P4K30VKTCY169LQ',
            'A':    '0B0ERXPAXDRF0HB',
            'a':    '47R323XPAXDR422',
        }

        return this.#array_flip(formatter)[keyword];
    }

    #array_flip( arr )
    {
        let key, flipped_array = {};

        for (key in arr)
        {
            if (arr.hasOwnProperty(key)) 
            flipped_array[arr[key]] = key;
        }

        return flipped_array;
    }

    #getAMPM() {
        return this._fullDate.getHours() >= 12 ? 'PM' : 'AM';
    }

    diffForHumans()
    {
        let[
            seconds, minutes, hours, days, weeks, months, years, time, 
            absSeconds, absMinutes, absHours, absDays, absWeeks, absMonths, absYears, absTime
        ] = [0];

        const now = new Date();
        const past = this._fullDate;
        let text = '';
        let condition = '';

        seconds = this.getSecondsDiff(past, now);
        minutes = this.getMinDiff(past, now)
        hours = this.getHoursDiff(past, now)
        days = this.getDayDiff(past, now);
        weeks = this.getWeeksDiff(past, now);
        months = this.getMonthDiff(past, now);
        years = this.getYearDiff(past, now);

        absSeconds = Math.abs(seconds);
        absMinutes = Math.abs(minutes);
        absHours = Math.abs(hours);
        absDays = Math.abs(days);
        absWeeks = Math.abs(weeks);
        absMonths = Math.abs(months);
        absYears = Math.abs(years);
        absTime = Math.abs(time);
        

        if (absSeconds<60) {
            time = absSeconds;
            text = time >1 ? 'seconds' : 'second';
            condition = seconds < 0 ? 'from now ' : 'ago';
        }
        else if (absMinutes<60 && absMinutes>0) {
            time = absMinutes;
            text = time > 1 ? 'minutes':'minute'
            condition = minutes < 0 ? 'from now ' : 'ago';
        }
        if (absHours<24 && absHours>0) {
            time = absHours;
            text = time > 1 ? 'hours': 'hour'
            condition = hours < 0 ? 'from now ' : 'ago';
        } 
        if (absDays<7 && absDays>0) {
            time = absDays;
            text = time > 1 ? 'days' : 'day'
            condition = days < 0 ? 'from now ' : 'ago';
        }
        if (absWeeks<52 && absWeeks>0) {
            time = absWeeks;
            text = time > 1 ? 'weeks' : 'week';
            condition = weeks < 0 ? 'from now ' : 'ago';
        }

        if (absMonths<12 && absMonths>0) {
            time = absMonths;
            text = time > 1 ? 'months' : 'month';
            condition = months < 0 ? 'from now ' : 'ago';
        }
        
        else {
            time = absYears;
            text = time > 1 ? 'years' : 'year';
            condition = years < 0 ? 'from now ' : 'ago';
        }

        return `${time} ${text} ${condition}`
    }

    // SETTERS
    year(year){
        year = year || 0;
        this._year = year.toString();
        this._fullDate.setFullYear(year);
        return this
    }
    month(month){
        month = (month || 0) + 1;
        this._month = month.toString().padStart(2, '0');
        this._fullDate.setMonth(month - 1);
        return this
    }
    day(day){
        day = day || 0;
        this._day = day.toString().padStart(2, '0');
        this._fullDate.setDate(day);
        return this
    }
    hour(hours){
        hours = hours || 0;
        this._hours = hours.toString().padStart(2, '0');
        this._fullDate.setHours(hours);
        return this
    }
    minute(minutes){
        minutes = minutes || 0;
        this._minutes = minutes.toString().padStart(2, '0');
        this._fullDate.setMinutes(minutes);
        return this
    }
    second(seconds){
        seconds = seconds || 0;
        this._seconds = seconds.toString().padStart(2, '0');
        this._fullDate.setSeconds(seconds);
        return this
    }

    // CREATERS 
    static createFromDate(year, month, day){

        this._year = year | 0;
        this._month = month | 0;
        this._day = day | 0;

        let dateToPass = new Date(year,month,day)
        this._fullDate = dateToPass;

        return new this(
            this._year,
            this._month,
            this._day,
            this._hours,
            this._minutes,
            this._seconds,
            this._timeZone,
            this._time,
            this._fullDate
        );
    }

    static createMidnightDate(year, month, day, tz){
        // Implementations coming soon
    }

    static createFromTime(hour, minute, second, tz){
        let dateToPass = new Date(1970, 0, 0, hour, minutes, seconds)
        this._fullDate = dateToPass

        return new this(
            this._year,
            this._month,
            this._day,
            this._hours,
            this._minutes,
            this._seconds,
            this._timeZone,
            this._time,
            this._fullDate
        );
    }
    static createFromTimeString(time, tz=null){
        let [hour, minutes, seconds] = time.split(':')
        let dateToPass = new Date(1970, 0, 0, hour, minutes, seconds)
        this._fullDate = dateToPass

        return new this(
            this._year,
            this._month,
            this._day,
            this._hours,
            this._minutes,
            this._seconds,
            this._timeZone,
            this._time,
            this._fullDate
        );
    }

    static create(year, month, day, hour, minute, second, milliseconds, tz){
        let dateToPass = new Date(year, month - 1, day, hour, minutes, seconds, milliseconds)
        this._fullDate = dateToPass;

        return new this(
            this._year,
            this._month,
            this._day,
            this._hours,
            this._minutes,
            this._seconds,
            this._timeZone,
            this._time,
            this._fullDate
        );
    }
    static createFromFormat(format, date){
        
        console.log(format, date);
    }

    // ADDING  DATES
    addDay(){
        this._fullDate.setDate(this._fullDate.getDate() + 1);
        return this;
    }

    addDays(days){
        days = days || 0;
        this._fullDate.setDate(this._fullDate.getDate() + parseInt(days));
        return this;
    }
    
    addHour(){
        this._fullDate.setHours(this._fullDate.getHours() + 1);
        return  this();
    }

    addHours(hours){
        hours = hours || 0;
        this._fullDate.setHours(this._fullDate.getHours() + parseInt(hours));
        return  this;
    }

    addYear()
    {
        this._fullDate.setFullYear(this._fullDate.getFullYear() + 1);
        return  this;
    }

    addYears(years){
        years = years || 0;
        this._fullDate.setFullYear(this._fullDate.getFullYear() + parseInt(years));
        return  this;
    }

    addMonth(){
        this._fullDate.setMonth(this._fullDate.getMonth() + 1);
        return  this;
    }
    
    addMonths(months) {
        months = months || 0;
        this._fullDate.setMonth(this._fullDate.getMonth() + parseInt(months));
        return  this;
    }


    // SUBTRACTING DATES
    subtractDay(){
        this._fullDate.setDate(this._fullDate.getDate() - 1);
        return new this;
    }
    subtractDays(days){
        this._fullDate.setMonth(this._fullDate.getMonth() - parseInt(days));
        return this._fullDate;
    }
    subtractYear(){
        this._fullDate.setFullYear(this._fullDate.getFullYear() - 1);
        return this._fullDate;
    }

    subtractYears(years){
        this._fullDate.setFullYear(this._fullDate.getFullYear() - parseInt(years));
        return this._fullDate;
    }

    subtractMonth(){
        this._fullDate.setMonth(this._fullDate.getMonth() - 1);
        return this._fullDate;
    }
    
    subtractMonths(date, months) {
        this._fullDate.setMonth(this._fullDate.getMonth() - parseInt(months));
        return this._fullDate;
    }


    // GETTING DATES
    getDate(){
        return this._fullDate.getDate();
    }
    getDay(){
        return this._fullDate.getDay();
    }
    getFullYear(){
        return this._fullDate.getFullYear();
    }
    getHours(){
        return this._fullDate.getHours();
    }
    getMilliseconds(){
        return this._fullDate.getMilliseconds();
    }
    getMinutes(){
        return this._fullDate.getMinutes();
    }
    getMonth(){
        return this._fullDate.getMonth();
    }
    getSeconds(){
        return this._fullDate.getSeconds();
    }
    getTime(){
        return this._fullDate.getTime();
    }
    getTimezoneOffset(){
        return this._fullDate.getTimezoneOffset();
    }
    getUTCDate(){
        return this._fullDate.getUTCDate();
    }
    getUTCDay(){
        return this._fullDate.getUTCDay();
    }
    getUTCFullYear(){
        return this._fullDate.getUTCFullYear();
    }
    getUTCHours(){
        return this._fullDate.getUTCHours();
    }
    getUTCMilliseconds(){
        return this._fullDate.getUTCMilliseconds();
    }
    getUTCMinutes(){
        return this._fullDate.getUTCMinutes();
    }
    getUTCMonth(){
        return this._fullDate.getUTCMonth();
    }
    getUTCSeconds(){
        return this._fullDate.getUTCSeconds();
    }


    setDate(date){
        this._fullDate.setDate(date)
        return this;
    }
    setFullYear(year){
        this._fullDate.setFullYear(year)
        return this;
    }
    setHours(hours){
        this._fullDate.setHours(hours)
        return this;
    }
    setMilliseconds(milliseconds){
        this._fullDate.setMilliseconds(milliseconds)
        return this;
    }
    setMinutes(minutes){
        this._fullDate.setMinutes(minutes)
        return this;
    }
    setMonth(month){
        this._fullDate.setMonth(month)
        return this;
    }
    setSeconds(seconds){
        this._fullDate.setSeconds(seconds)
        return this;
    }
    setTime(time){
        this._fullDate.setTime(time)
        return this; 
    }
    setUTCDate(date){
        this._fullDate.setUTCDate(date)
        return this;
    }
    setUTCFullYear(year){
        this._fullDate.setUTCFullYear(year)
        return this;
    }
    setUTCHours(hours){
        this._fullDate.setUTCHours(hours)
        return this;
    }
    setUTCMilliseconds(milliseconds){
        this._fullDate.setUTCMilliseconds(milliseconds)
        return this;
    }
    setUTCMinutes(minutes){
        this._fullDate.setUTCMinutes(minutes)
        return this;
    }
    setUTCMonth(month){
        this._fullDate.setUTCMonth(month)
        return this;
    }
    setUTCSeconds(seconds){
        this._fullDate.setUTCSeconds(seconds)
        return this
    }
    toDateString(){
        this._fullDate.toDateString()
        return this;
    }
    toDateTimeString(){
        return this.format('Y-m-d h:i:s')
    }
    toISOString(){
        return this._fullDate.toISOString()
    }
    toJSON(){
        return this._fullDate.toJSON()
    }
    toLocaleDateString(){
        return this._fullDate.toLocaleDateString()
    }
    toLocaleString(){
        return this._fullDate.toLocaleString()
    }
    toLocaleTimeString(){
        return this._fullDate.toLocaleTimeString()
    }
    toString(){
        return this._fullDate.toString()
    }
    toTimeString(){
        return this._fullDate.toTimeString()
    }
    toUTCString(){
        return this._fullDate.toUTCString()
    }
    valueOf(){
        return this._fullDate.valueOf()
    }
    diffInMonths(startDate, endDate){
        return (endDate.getFullYear()*12 + endDate.getMonth()) - (startDate.getFullYear()*12 + startDate.getMonth())
    }

    getMonthDiff(startDate, endDate) {
        return (
            endDate.getMonth() -
            startDate.getMonth() +
            12 * (endDate.getFullYear() - startDate.getFullYear())
        );
    }

    getYearDiff(startDate, endDate) {
        return (endDate.getFullYear() - startDate.getFullYear());
    }

    getDayDiff(startDate, endDate) {
        const microseconInDay = 24 * 60 * 60 * 1000;

        return Math.round(
            (endDate - startDate) / microseconInDay
        );
    }

    getHoursDiff(startDate, endDate) {
        const microsecondInHour = 1000 * 60 * 60;
        return Math.round(
            (endDate.getTime() - startDate.getTime()) / microsecondInHour,
        );
    }

    getMinDiff(startDate, endDate) {
        const microSeondInMinute = 60 * 1000;
        return Math.round(
            (endDate - startDate) / microSeondInMinute
        );
    }

    getWeeksDiff(startDate, endDate) {
        const microSecondsInWeek = 1000 * 60 * 60 * 24 * 7;

        return Math.round((endDate - startDate) / microSecondsInWeek);
    }

    getSecondsDiff(startDate, endDate) {
        const oneMicroSecond = 1000;

        return Math.round(
            (endDate - startDate) / oneMicroSecond
        );
    }

    diffInYears(date){
        let startDate = new Date(this._fullDate);
        let endDate = new Date(date);

        return this.getYearDiff(startDate, endDate)
    }
}

export default Carbon;
