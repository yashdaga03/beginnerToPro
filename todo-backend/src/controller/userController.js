const userService = require('../service/userService');

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(200).json({"success": true, "message": "Email sent to registered user"})
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

const verifyToken = async (req, res) => {
    try {
        const user = await userService.verifyToken(req);
        if(!user) {
            res.status(400).json({"success": false, "message": "Invalid Token, Authentication Failed!"});
        }
        return res.status(200).json({"success": true, "user": user});
    } catch (err) {
        res.status(400).json(err.message);
    }
}

module.exports = { createUser, deleteUser, updateUser, loginUser, getAllData, verifyToken };