const userService = require('../service/userService');

const createUser = async (req, res) => {
    try {
        const token = await userService.createUser(req.body);
        return res.status(200).json({"success": true, "token": token});
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

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await userService.login(email, password);
        res.status(200).json({"success": true, "token": token});
    } catch (err) {
        res.status(400).json(err.message);
    }
};

const getAllData = async (req, res) => {
    try {
        const users = await userService.getAll();
        return res.status(200).json({"success": true, "users": users});
    } catch (err) {
        res.status(400).json(err.message);
    }
};

module.exports = { createUser, deleteUser, updateUser, loginUser, getAllData };