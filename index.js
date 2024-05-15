import Carbon from "./src/Carbon.js";

    let date1 = Carbon.parse('2025-08-14 02:53:01.0 +00:00 (East Africa Time)')
    // let date1 = Carbon.createFromDate(2025,8,14)
    // let date1 = Carbon.createFromFormat("dd-mm-yyyy", '2025-08-14')
    // .getTime()
    // .diffForHumans()
    // .diffInYears('Thu Dec 04 2020 16:17:46 GMT+0300 (East Africa Time)')
    // .format('L -mm-yyyy')
    // .format('dd-mm-yyyy l,L'); 
    // .format('d-m-Y F, A jS')
    // .year(2021)
    // .month(2)
    // .day(15)
    // .hour(2)
    // .minute(15)
    .addMonths(1)
    .format('d/m/Y h:i:s A')
    // .toDateTimeString()
    console.log(Carbon);
    console.log(date1);
