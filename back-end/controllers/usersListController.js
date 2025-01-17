import Customer from '../models/customers.js'

const listUser = async (req, res) => {
    try {
        const users = await Customer.findAll({});
        if (users.length === 0) {
            return res.json({ success: true, message: "No users found.", users: [] });
        }
        return res.json({success: true, users});
    } catch (error) {
        console.log(error);
        return res.json({success: false, message: error.message});
    }
}

// FUNCTION FOR REMOVE USERS 
const removeUser = async (req, res) => {
    try {
        const { customer_id } = req.body;
        const removedUser = await Customer.destroy({ where: { customer_id } }); 

        if (!removedUser) {
            return res.json({ success: false, message: "User not found." });
        }

        res.json({ success: true, message: "User Removed" });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}

export {listUser, removeUser};