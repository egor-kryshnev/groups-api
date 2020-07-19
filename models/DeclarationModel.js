var mongoose = require("mongoose");

// const isPhone = function(V){
//     return /\d{3}-\d{3}-\d{4}/.test(v);
// }
const ranks = [1,2,3];
const clinics = [1,2,3];
const declarationSchema = mongoose.Schema({
    suspectIdentityNumber: {type: String, required: true},
    suspectFirstName: {type: String, required: true},
    suspectLastName: {type: String, required: true},
    suspectPhoneNumer: {type: String, required: true},
    suspectTimeOfPositioning: {type: Date, required: true},
    suspectPlaceOfPositioning: {type: String, required: true},
    reporterFirstName: {type: String, required: false},
    reporterLastName: {type: String, required: false},
    reporterRank: {type: Number, enum: ranks, required: false},
    reporterIdentityNumber: {type: String, required: false},
    reporterMail: {type: String, required: false},
    reporterPhoneNumber:  {type: String, required: false},
    clinicInCharge: {type: Number, enum: clinics, required: false},
    suspectHasDeclaredInocense: {type: Boolean, required: false},
    suspectWasInBaseDuringPos: {type: Boolean, required: false},
    suspectWasSentToConfinment: {type: Boolean, required: false},
    isColonelConfinment: {type: Boolean, required: false},
    isClinicConfinment: {type: Boolean, required: false},
    wasExported: {type: Boolean},
    workFinished: {type: Boolean},
    reporterNotes: {type: String},
    clinicNotes: {type: String},
    hamalNotes: {type: String}
});

declarationSchema.set("versionKey", false);
module.exports = mongoose.model('declaration',declarationSchema, 'declarations');



