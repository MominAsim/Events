import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import { MONTHS, DAYS, DATES, STUDENTS } from "../../constants/constants";
import { useCreateEventMutation } from "../../redux/api/eventApi";

const NewEvent = () => {
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    name: "",
    description: "",
    timeStart: "",
    timeEnd: "",
    day: "",
    date: "",
    month: "",
    year: "",
    category: [], // Change category to an array
  });

  const { name, description, timeStart, timeEnd, day, date, month, year, category } = event;

  const [createEvent, { isLoading, error, isSuccess }] = useCreateEventMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Event created");
      navigate("/admin/events");
    }
  }, [error, isSuccess]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      // Handle checkbox selection for category (multiple students)
      if (checked) {
        setEvent((prevState) => ({
          ...prevState,
          category: [...prevState.category, value],
        }));
      } else {
        setEvent((prevState) => ({
          ...prevState,
          category: prevState.category.filter((student) => student !== value),
        }));
      }
    } else {
      // Handle other input fields
      setEvent({ ...event, [name]: value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createEvent(event);
  };

  return (
    <AdminLayout>
      <MetaData title={"Create new Event"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">New School Event</h2>
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label"> Name </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description_field" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description_field"
                rows="8"
                name="description"
                value={description}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="timeStart_field" className="form-label"> Start Time </label>
                <input
                  type="text"
                  id="timeStart_field"
                  className="form-control"
                  name="timeStart"
                  value={timeStart}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3 col">
                <label htmlFor="timeEnd_field" className="form-label"> End Time </label>
                <input
                  type="text"
                  id="timeEnd_field"
                  className="form-control"
                  name="timeEnd"
                  value={timeEnd}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="mb-3 col">
              <label htmlFor="day_field" className="form-label"> Day </label>
              <select
                className="form-select"
                id="day_field"
                name="day"
                value={day}
                onChange={onChange}
              >
                {DAYS?.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div className="mb-3 col">
              <label htmlFor="date_field" className="form-label"> Date </label>
              <select
                className="form-select"
                id="date_field"
                name="date"
                value={date}
                onChange={onChange}
              >
                {DATES?.map((date) => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </div>

            <div className="mb-3 col">
              <label htmlFor="month_field" className="form-label"> Month </label>
              <select
                className="form-select"
                id="month_field"
                name="month"
                value={month}
                onChange={onChange}
              >
                {MONTHS?.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Students</label>
              <div className="d-flex flex-wrap">
                {STUDENTS?.map((student) => (
                  <div className="form-check me-3" key={student}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="category"
                      value={student}
                      id={`student-${student}`}
                      checked={category.includes(student)}
                      onChange={onChange}
                    />
                    <label className="form-check-label" htmlFor={`student-${student}`}>
                      {student}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3 col">
              <label htmlFor="year_field" className="form-label"> Year </label>
              <input
                type="number"
                id="year_field"
                className="form-control"
                name="year"
                value={year}
                onChange={onChange}
              />
            </div>              

            <button
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "CREATE"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewEvent;
