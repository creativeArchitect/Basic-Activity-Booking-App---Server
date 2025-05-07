const validator = require('validator');

const validateRegistration = (req)=>{
    const { firstName, lastName, email, phone, password } = req.body;

    if(!firstName) {
        return res.status(400).json({ message: "FirstName is required." });
    }
    else if(!validator.isEmail(email)){
        return res.status(400).json({ message: "Enter valid email address." });
    }
    else if(!validator.isStrongPassword(password)){
        return res.status(400).json({ message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."});
    }
    else if(!validator.isMobilePhone(phone)){
        return res.status(400).json({ message: "Enter valid phone number." });
    }
}

const validateEditProfileData = (req)=>{
    const allowedEditFields = [
        "firstName", "lastName", "email", "phone"
    ];

    const isEditAllowed = Object.keys(req.body).every((field)=>             allowedEditFields.includes(field)
    )

    return isEditAllowed;
}

const validateActivitiesAddition = (req)=>{
    const { title, description, location, dateTime } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }else if(!dateTime){
        return res.status(400).json({ message: "DateTime is required." });
    }else if(!location){
        return res.status(400).json({ message: "Location is required." });
    }
}

module.exports = {
    validateRegistration,
    validateEditProfileData,
    validateActivitiesAddition
}




















