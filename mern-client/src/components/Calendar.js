import { useState } from "react";
import Calendar from "react-calendar";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Calendar.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CustomCalendar() {
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [births, setBirths] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [events, setEvents] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showBirths, setShowBirths] = useState(true);
  const [showDeaths, setShowDeaths] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const [showHolidays, setShowHolidays] = useState(true);
  const [showSelected, setShowSelected] = useState(true);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    handleDateInfo(date);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDateInfo = async (date) => {
    setIsLoading(true);
    let today = date;
    let month = String(today.getMonth() + 1).padStart(2, "0");
    let day = String(today.getDate()).padStart(2, "0");
    let url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;

    let response = await fetch(url);
    let { births, deaths, events, holidays, selected } = await response.json();
    setBirths(births);
    setDeaths(deaths);
    setEvents(events);
    setHolidays(holidays);
    setSelected(selected);
    setIsLoading(false);
  };

  const hashCode = function (text) {
    var hash = 0,
      i,
      chr;
    if (text.length === 0) return hash;
    for (i = 0; i < text.length; i++) {
      chr = text.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

  return (
    <div className="calendar">
      <Calendar
        onChange={onChange}
        value={value}
        onClickDay={handleDateClick}
      />

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedDate && selectedDate.toDateString()}
          </Typography>
          {isLoading ? (
            <Typography variant="body1">Loading...</Typography>
          ) : (
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              <div><Button
                onClick={() => {
                  setShowBirths(true);
                  setShowDeaths(false);
                  setShowEvents(false);
                  setShowHolidays(false);
                  setShowSelected(false);
                }}
              >
                Show Births
              </Button>
              <Button
                onClick={() => {
                  setShowBirths(false);
                  setShowDeaths(true);
                  setShowEvents(false);
                  setShowHolidays(false);
                  setShowSelected(false);
                }}
              >
                Show Deaths
              </Button>
              <Button
                onClick={() => {
                  setShowBirths(false);
                  setShowDeaths(false);
                  setShowEvents(true);
                  setShowHolidays(false);
                  setShowSelected(false);
                }}
              >
                Show Events
              </Button>
              <Button
                onClick={() => {
                  setShowBirths(false);
                  setShowDeaths(false);
                  setShowEvents(false);
                  setShowHolidays(true);
                  setShowSelected(false);
                }}
              >
                Show Holidays
              </Button>
              <Button
                onClick={() => {
                  setShowBirths(false);
                  setShowDeaths(false);
                  setShowEvents(false);
                  setShowHolidays(false);
                  setShowSelected(true);
                }}
              >
                Show WikiMedia Select
              </Button>
              </div>
              {showBirths &&
                births.map((birth) => (
                  <div
                    key={hashCode(birth.text)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography variant="body1" style={{ width: "85%" }}>
                      {birth.text}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ width: "15%", marginLeft: "10px" }}
                    >
                      Year: {birth.year}
                    </Typography>
                  </div>
                ))}
              {showDeaths && deaths.map((death) => (
                  <div
                    key={hashCode(death.text)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography variant="body1" style={{ width: "85%" }}>
                      {death.text}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ width: "15%", marginLeft: "10px" }}
                    >
                      Year: {death.year}
                    </Typography>
                  </div>
                ))}
              {showEvents &&
                events.map((event) => (
                  <div
                    key={hashCode(event.text)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography variant="body1" style={{ width: "85%" }}>
                      {event.text}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ width: "15%", marginLeft: "10px" }}
                    >
                      Year: {event.year}
                    </Typography>
                  </div>
                ))}
              {showHolidays && holidays.map((holiday) => (
                  <div
                    key={hashCode(holiday.text)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography variant="body1" style={{ width: "100%" }}>
                      {holiday.text}
                    </Typography>
                  </div>
                ))}
              {showSelected && selected.map((select) => (
                  <div
                    key={hashCode(select.text)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography variant="body1" style={{ width: "85%" }}>
                      {select.text}
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ width: "15%", marginLeft: "10px" }}
                    >
                      Year: {select.year}
                    </Typography>
                  </div>
                ))}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
