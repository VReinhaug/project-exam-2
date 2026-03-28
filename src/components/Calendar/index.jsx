import "./calendar.scss";
import { DateRange } from "react-date-range";
import { useState, useMemo, useEffect } from "react";
import { enUS } from "date-fns/locale";

function Calendar({ bookings, onDateChange }) {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Send selected dates to parent
  useEffect(() => {
    if (onDateChange) {
      onDateChange(dateRange[0]);
    }
  }, [dateRange, onDateChange]);

  // Convert bookings → disabled dates
  const disabledDates = useMemo(() => {
    if (!bookings) return [];

    return bookings.flatMap((booking) => {
      const dates = [];
      let current = new Date(booking.dateFrom);

      while (current <= new Date(booking.dateTo)) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }

      return dates;
    });
  }, [bookings]);

  return (
    <div className="calendar-wrapper">
      <DateRange
        editableDateInputs
        onChange={(item) => setDateRange([item.selection])}
        months={1}
        direction="vertical"
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
        disabledDates={disabledDates}
        locale={enUS}
      />
    </div>
  );
}

export default Calendar;
