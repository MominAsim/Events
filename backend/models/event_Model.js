import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      maxLength: [1000, "Product name cannot exceed 200 characters"],
    },

      description: {
        type: String,
        required: [true, "Please enter product description"],
      },

        timeStart: {
          type: String,
          required: [true, "Please enter an event start time"],
        },
      timeEnd: {
          type: String,
          required: [true, "Please enter an event end time"],
        },
        month:{
            type: String,
            required: [true, "Please enter a Month"],
            enum: {
              values: [
                "January",
                "Feburary",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              message: "Please select a correct month",
            },
          },

          day:{
            type: String,
            required: [true, "Please enter a Day of the week"],
            enum: {
              values: [
                "Select a day",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              message: "Please select a correct Day of the week",
            },
          },
          
          category:{
            type: [String], // Changed to array of strings
            required: [true, "Please enter a Student Name"],
            enum: {
              values: [
                "Select a Student",
                "Momin",
                "Zuraiz",
                "Ali",
                "Zarrar",
                "Abdullah",
                "Zeeshan",
              ],
              message: "Please enter a Student Name",
            },
          },

          date:{
            type: String,
            required: [true, "Please enter a date"],
            enum: {
              values: [
                "Select a Date",
                "1ST", "2ND", "3RD", "4TH",
                "5TH", "6TH", "7TH", "8TH", 
                "9TH", "10TH","11TH", "12TH", 
                "13TH", "14TH", "15TH", "16TH", 
                "17TH", "18TH", "19TH", "20TH",
                "21ST", "22ND", "23RD", "24TH", 
                "25TH", "26TH", "27TH", "28TH", 
                "29TH", "30TH", "31ST"
              ],
              message: "Please select a correct Date",
            },
          },

          year:{
            type: String,
            required: [true, "Please enter a Day of the week"],
            },
  

      user: {
        type: mongoose.Schema.Types.String,
        ref: "User",
        required: true,
      },
    },
    { timestamps: true }
  );

export default mongoose.model("Event", eventSchema);