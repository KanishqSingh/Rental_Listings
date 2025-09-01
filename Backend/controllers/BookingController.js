import Booking from "../models/Booking.js"
import Property from "../models/Properties.js";


//Function to check availabilbity of car 
const checkAvailability = async (car, startDate, returnDate) => {
    const bookings = await Booking.find({
        car,
        startDate: { $lte: returnDate },
        returnDate: { $gte: startDate }
    })
    return bookings.length === 0;
}

//api to check availabilty of cars for the given date and location
export const checkAvailabilityOfProperty = async (req, res) => {
    try {
        const { location, startDate, returnDate } = req.body;

        console.log("location, startDate, returnDate",location, startDate, returnDate);
        

        const properties = await Property.find({
            location: { $regex: new RegExp(`^${location.trim()}$`, "i") }
            , isAvailable: true
        });
        console.log('location', properties);


        // check car availability using promises
        const availablePropertiesPromise = properties.map(async (property) => {
            const isAvailable = await checkAvailability(property._id, startDate, returnDate);
            return { ...property._doc, isAvailable: isAvailable };
        });

        let availableProperties = await Promise.all(availablePropertiesPromise);
        availableProperties = availableProperties.filter((p) => p.isAvailable === true);

        console.log("availableProperties -- ",availableProperties);
        

        return res.json({ success: true, availableProperties });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};


//api to create booking
export const createBooking = async (req, res) => {
    try {

        console.log("req.user -- ", req.user);

        const { _id } = req.user;
        console.log("_id -- ", _id);

        const { property, startDate, returnDate } = req.body;

        if (!startDate || !returnDate) {
            return res.json({ success: false, message: "Start Date and Return Date are required" });
        }
        const isAvailable = await checkAvailability(property, startDate, returnDate)


        if (!isAvailable) {
            return res.json({ success: false, message: "property not available" })

        }

        const propertyData = await Property.findById(property)

        const start = new Date(startDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - start) / (1000 * 60 * 60 * 24))
        const price = propertyData.pricePerDay * noOfDays;

        await Booking.create({
            property, owner: propertyData.owner, user: _id, startDate, returnDate, price
        })

        res.json({ success: true, message: "Booking Created" })



    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

//Get list of user booking
export const getUserBookings = async (req, res) => {
    try {

        const { _id } = req.user;
        const bookings = await Booking.find({ user: _id }).populate("property").sort({ createdAt: -1 })


        return res.json({ success: true, bookings })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

//get owner bookings

export const getOwnerBooking = async (req, res) => {
    try {

        if (req.user.role !== 'owner') {
            return res.json({ success: false, message: "unauthorized" })
        }

        const bookings = await Booking.find({ owner: req.user._id }).populate('property user').select("-user.password").sort({ createdAt: -1 })

        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

//api to change booking status
export const changeBookingStatsu = async (req, res) => {
    try {

        const { _id } = req.user;
        const { bookingId, status } = req.body
        const booking = await Booking.findById(bookingId)

        if (booking.owner.toString() !== _id.toString()) {

            return res.json({ success: false, message: "not authorized" })

        }

        booking.status = status;
        await booking.save()

        res.json({ success: true, message: "status updated" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({ isAvailable: true });

    res.json({
      success: true,
      properties,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching properties",
      error: error.message,
    });
  }
};
