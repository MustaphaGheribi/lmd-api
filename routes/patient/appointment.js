



const handleCreate = (req,res, Patient) => {
    //JOI validation.
    const {title,description,category,days,prefered_location} = req.body;
    Patient.findById(req.user.id)
        .then(user => {
            const appointments = {};
            appointments.title= title;
            appointments.description = description;
            appointments.category = category;
            appointments.days = days;
            appointments.prefered_location= prefered_location;
            user.appointments.push(appointments);
            user.save().
                then(updatedUser => {
                    res.json(updatedUser);
                })
                .catch(err => {
                    res.json(err.message);
                })
        })
        .catch(err => {
            res.status(404).json('User not found');
        });
};

module.exports = {
    handleCreate
}