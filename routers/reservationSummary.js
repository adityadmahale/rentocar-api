const express = require("express");
const {Reservations} = require("../models/reservation");

const router = express.Router();


// route to get yearly analysis data
router.get("/getYearlyData", [], async (req, res) => {
    try {
      // validate if the user is employee/admin or not
    allReservations = await Reservations.find({ isCancelled: false });
    console.log(allReservations);
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
    let objToSend = {
        yearlyColumns: yearsColumns,
        yearlyBookings: yearsBookings,
        currentYearColumns: currentYearColumns,
        currentYearBookings: currentYearBookings
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
            const day = reservation.pickupDate.getDay();
            console.log(day)
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
    let objToSend = {
        monthlyColumns: monthsColumns,
        monthlyBookings: monthsBookings,
        currentMonthColumns: currentMonthColumns,
        currentMonthBookings: currentMonthBookings
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
      // validate if the user is employee/admin or not
    allReservations = await Reservations.find({ isCancelled: false });

    let dailyColumns = [];
    let dailyBookings = [];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDay();

    allReservations.forEach(reservation => {
        const year = reservation.pickupDate.getFullYear();
        const month = reservation.pickupDate.getMonth();
        const day = reservation.pickupDate.getDay();

        if(year!=currentYear && month!=currentMonth && day!=currentDay){
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