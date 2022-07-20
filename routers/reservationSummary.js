const express = require("express");
const {Reservations} = require("../models/reservation");

const router = express.Router();

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul' ,'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']


// route to get yearly analysis data
router.get("/getYearlyData", [], async (req, res) => {
    try {
    if(JSON.parse(req.query.userDetails).isAdmin === undefined){
        return res.status(401);
    }
      // validate if the user is employee/admin or not
    allReservations = await Reservations.find({ isCancelled: false });
    let yearsColumns = [];
    let yearsBookings = [];
    let currentYearColumns = [];
    let currentYearBookings = [];
    const currentYear = new Date().getFullYear();

    allReservations.forEach(reservation => {
        const year = reservation.pickupDate.getFullYear();
        let index = yearsColumns.indexOf(year);
        if( index > -1){
            yearsBookings[index] += 1;
        }else{
            yearsColumns.push(year);
            yearsBookings.push(1);
        }

        if(year == currentYear){
            const test = new Date(reservation.pickupDate)
            const month = reservation.pickupDate.getMonth();
            let index = currentYearColumns.indexOf(month);
        if( index > -1){
            currentYearBookings[index] += 1;
        }else{
            currentYearColumns.push(month);
            currentYearBookings.push(1);
        }
        }

    });

    let yearlyBookingsTotal = currentYearBookings.reduce((sum, bookings) => sum + bookings, 0);
    const max = Math.max.apply(Math, currentYearColumns);
    currentYearColumnNames = months.slice(0, max+1);
    currentYearColumnValues = []
    for(let i=0;i<=max;i++){
        currentIndex = currentYearColumns.indexOf(i);
        if(currentIndex == -1){
            currentYearColumnValues.push(0);
        }else{
            currentYearColumnValues.push(currentYearBookings[currentIndex]);
        }
    }

    

    let objToSend = {
        yearlyColumns: yearsColumns,
        yearlyBookings: yearsBookings,
        currentYearColumns: currentYearColumnNames,
        currentYearBookings: currentYearColumnValues,
        totalBokkings: yearlyBookingsTotal
    }
      res.status(200).json(objToSend);
    } catch (err) {
        console.log(err.message)
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  });


// route to get monthly analysis data
router.get("/getMonthlyData", [], async (req, res) => {
    try {
        if(JSON.parse(req.query.userDetails).isAdmin === undefined){
            return res.status(401);
        }
      // validate if the user is employee/admin or not
    allReservations = await Reservations.find({ isCancelled: false });

    let monthsColumns = [];
    let monthsBookings = [];
    let currentMonthColumns = [];
    let currentMonthBookings = [];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    allReservations.forEach(reservation => {
        const year = reservation.pickupDate.getFullYear();
        if(year!=currentYear){
            return;
        }
        const month = reservation.pickupDate.getMonth();
        let index = monthsColumns.indexOf(month);
        if( index > -1){
            monthsBookings[index] += 1;
        }else{
            monthsColumns.push(month);
            monthsBookings.push(1);
        }

        if(month == currentMonth){
            const day = reservation.pickupDate.getDate();
            const week = Math.floor(day/7);
            let index = currentMonthColumns.indexOf(week);
        if( index > -1){
            currentMonthBookings[index] += 1;
        }else{
            currentMonthColumns.push(week);
            currentMonthBookings.push(1);
        }
        }

    });

    let monthlyBookingsTotal = currentMonthBookings.reduce((sum, bookings) => sum + bookings, 0);
    const max = Math.max.apply(Math, currentMonthColumns);
    currentMonthColumnNames = weeks.slice(0, max+1);
    currentMonthColumnValues = []
    for(let i=0;i<=max;i++){
        currentIndex = currentMonthColumns.indexOf(i);
        if(currentIndex == -1){
            currentMonthColumnValues.push(0);
        }else{
            currentMonthColumnValues.push(currentMonthBookings[currentIndex]);
        }
    }

    const maxMonth = Math.max.apply(Math, monthsColumns);
    monthsColumnNames = months.slice(0, maxMonth+1);
    monthsColumnValues = []
    for(let i=0;i<=maxMonth;i++){
        currentIndex = monthsColumns.indexOf(i);
        if(currentIndex == -1){
            monthsColumnValues.push(0);
        }else{
            monthsColumnValues.push(monthsBookings[currentIndex]);
        }
    }

    let objToSend = {
        monthlyColumns: monthsColumnNames,
        monthlyBookings: monthsColumnValues,
        currentMonthColumns: currentMonthColumnNames,
        currentMonthBookings: currentMonthColumnValues
    }
      res.status(200).json(objToSend);
    } catch (err) {
        console.log(err.message)
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  });


// route to get daily analysis data
router.get("/getDailyData", [], async (req, res) => {
    try {
        if(JSON.parse(req.query.userDetails).isAdmin === undefined){
            return res.status(401);
        }
      // validate if the user is employee/admin or not
    allReservations = await Reservations.find({ isCancelled: false });

    let dailyColumns = [];
    let dailyBookings = [];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    allReservations.forEach(reservation => {
        const year = reservation.pickupDate.getFullYear();
        const month = reservation.pickupDate.getMonth();
        const day = reservation.pickupDate.getDate();
        if(year!=currentYear || month!=currentMonth || day!=currentDay){
            return;
        }
        const hour = reservation.pickupDate.getHours();

        let index = dailyColumns.indexOf(hour);
        if( index > -1){
            dailyBookings[index] += 1;
        }else{
            dailyColumns.push(hour);
            dailyBookings.push(1);
        }

    });
    let objToSend = {
        dailyColumns: dailyColumns,
        dailyBookings: dailyBookings
    }
      res.status(200).json(objToSend);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  });

  module.exports = router;