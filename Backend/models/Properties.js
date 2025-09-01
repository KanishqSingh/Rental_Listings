import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types;

const propertySchema = new mongoose.Schema({
    owner:{type : ObjectId , ref:'User'},
    type:{type: String, required:true},
    image:{type: String, required:true},
    year:{type: Number, required:true},
    floorSize:{type: String, required:true},
    population_capacity:{type: String, required:true},
    petsAllowed:{type: String, required:true},
    noOfBedroom:{type: String, required:true},
    pricePerDay:{type:String,required:true},
    location:{type:String,required:true},
    description:{type:String,required:true},
    isAvailable:{type:Boolean,default:true}
},{timestamps:true})

const Property = mongoose.model('Property',propertySchema)

export default Property;