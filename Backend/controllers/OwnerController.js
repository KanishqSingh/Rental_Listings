import imagekit from "../configs/imagekit.js";
import Booking from "../models/Booking.js";
import Property from "../models/Properties.js";
import User from "../models/User.js";
import fs from 'fs'

export const changeRoleToOwner = async (req, res) => {

    try {

        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { role: "owner" })
        res.json({ success: true, message: "Now you can list Properties" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }

}

export const addProperty = async (req, res) => {
    try {

        const { _id } = req.user;
        let property = JSON.parse(req.body.propertyData);
        const imageFile = req.file;

        const fileBuffer = fs.readFileSync(imageFile.path);

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [{
                width: '1280'
            }, {
                quality: 'auto'
            }, {
                format: 'webp'
            }]
        });

        const image = optimizedImageUrl;
        await Property.create({ ...property, owner: _id, image })

        res.json({ success: true, message: "Property Added" })


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}



export const getOwnerProperty = async (req, res) => {


    try {

        const { _id } = req.user;
        const properties = await Property.find({ owner: _id })
        res.json({ success: true, properties })


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

export const togglePropertyAvailabilty = async (req, res) => {
    try {
        const { _id } = req.user;
        const { propertyId } = req.body;

        const property = await Property.findById(propertyId); // ✅ Correct

        if (!property) {
            return res.json({ success: false, message: "Property not found" });
        }

        if (property.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        property.isAvailable = !property.isAvailable;
        await property.save();

        res.json({ success: true, message: "Availability Toggled" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};


export const deleteProperty = async (req, res) => {
    try {
        const { _id } = req.user;
        const { propertyId } = req.body;  

        const property = await Property.findById(propertyId); 


        if (!property) {
            return res.json({ success: false, message: "Propety not found" });
        }

        if (property.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        property.owner = null;
        property.isAvailable = false;
        await property.save();

        res.json({ success: true, message: "Property removed" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

//Dashboard data
export const getDashBoardData = async (req, res) => {


    try {

        const { _id, role } = req.user;

        if (role !== "owner") {
            return res.json({ success: false, message: "unauthorized" })

        }
        const properties = await Property.find({ owner: _id })

        const bookings = await Booking.find({ owner: _id }).populate('property').sort({ createdAt: -1 })

        const pendingBookings = await Booking.find({ owner: _id, status: "pending" })
        const completedBookings = await Booking.find({ owner: _id, status: "confirmed" })

        const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking) => acc + booking.price, 0)

        const dashBoardData = {
            totalRent: properties.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue
        }

        console.log(dashBoardData.totalCars);


        res.json({ success: true, dashBoardData })

        // res.json({ success: true, message: "Availability Toggled" })


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

//api to update user image
export const updateUserImage = async (req, res) => {
    try {

        const { _id } = req.user;

        const imageFile = req.file;

        const fileBuffer = fs.readFileSync(imageFile.path);

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [{
                width: '400'
            }, {
                quality: 'auto'
            }, {
                format: 'webp'
            }]
        });

        const image = optimizedImageUrl;

        await User.findByIdAndUpdate(_id, { image });

        res.json({ success: true, message: "Image updated" })

        // res.json({ success: true, message: "Car Added" })


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}