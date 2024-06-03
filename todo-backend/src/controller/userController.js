const userService = require('../service/userService');

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        return res.status(200).json({"success": true, "message": "User created with ID: " + user.id});
    } catch(err) {
        return res.status(500).json({"status": false, "message": "User creation failed!"})
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(parseInt(req.params.id));
        if (!user) {
            return res.status(404).json({"success": false, "message":"User with id " + req.params.id + " does not exist"});
        } 
        return res.status(200).json({"success": true, "message": "User Deleted Successfully"});
    } catch (err) {
        return res.status(500).json({"success": false, "message": "Internal Server Error"});
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(parseInt(req.params.id), req.body);
        if (!user) {
            return res.status(404).json({"success": false, "message":"User with id " + req.params.id + " does not exist"});
        }
        return res.status(200).json({"success": true, "message": "User Updated Successfully", "data": user});
    } catch (err) {
        return res.status(500).json({"success": false, "message": "Internal Server Error"});
    }
};

module.exports = { createUser, deleteUser, updateUser };