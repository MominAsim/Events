import Event from "../models/event_Model.js";
import ErrorHandler from "../utils/errorHandler.js";
import errorMiddleware from "../middlewares/errors.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import APIFilters from "../utils/apiFilters.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";

//get all Events   =>  /api/events
export const getEvents = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 8;
  const apiFilters = new APIFilters(Event, req.query).search().filters();

  let events = await apiFilters.query;
  let filteredEventsCount = events.length;
 
  apiFilters.pagination(resPerPage);
  events = await apiFilters.query.clone();

  res.status(200).json({
    resPerPage,
    filteredEventsCount,
    events,
  });
});

//Create a new Event  =>  /api/admin/events
export const newEvent = catchAsyncErrors(async (req, res) => {

  req.body.user = req.user._id

  const event = await Event.create(req.body);
  res.status(200).json({
    event,
  });
});

//get single event  =>  /api/events/:id
export const getEventDetails = catchAsyncErrors(async (req, res, next) => {
  const event = await Event.findById(req?.params?.id)

  if(!event){
    return next(new ErrorHandler("Event Not found", 404)) 
  }
  res.status(200).json({
     event,
  });
});

// Update event details   =>  /api/events/:id
export const updateEvent = catchAsyncErrors(async (req, res) => {
  let event = await Event.findById(req?.params?.id);

  if (!event) {
    return next(new ErrorHandler("Event not found", 404));
  }

  event = await Event.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    event,
  });
});

//delete a event  =>  /api/events/:id
export const deleteEvent = catchAsyncErrors(async (req, res) => {
  let event = await Event.findById(req?.params?.id);

  if(!event){
    return next(new ErrorHandler("Event Not found", 404)) 
  }

  await event.deleteOne();
 
  res.status(200).json({
     message: "Event deleted",
});
});

// Get events - ADMIN   =>  /api/admin/events
export const getAdminEvents = catchAsyncErrors(async (req, res, next) => {
  const events = await Event.find();

  res.status(200).json({
    events,
  });
});
