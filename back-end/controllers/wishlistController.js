import Customer from "../models/customers.js"

// ADD PRODUCT TO USER WISHLIST
const addToWishlist = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const userData = await Customer.findByPk(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let wishlistData = userData.wishlistData || {}; 
        wishlistData[itemId] = true;

        userData.wishlistData = wishlistData;
        userData.changed('wishlistData', true);

        await userData.save();
        res.json({ success: true, message: "Added to wishlist" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
    
};


// REMOVE PRODUCT TO USER WISHLIST
const removeFromWishlist = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const userData = await Customer.findByPk(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let wishlistData = userData.wishlistData || {}; 

        delete wishlistData[itemId];

        userData.wishlistData = wishlistData;
        userData.changed('wishlistData', true);

        await userData.save();
        res.json({ success: true, message: "Deleted to wishlist" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
    
};

const getUserWishlist = async (req, res) => {
    try {
        const {userId} = req.body;
        const userData = await Customer.findByPk(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let wishlistData = userData.wishlistData || {};

        res.json({success: true, wishlistData});

    } catch (error) {
        console.log(error);
        res.json({success: true, message: error.message});
    }
}


export {addToWishlist, removeFromWishlist, getUserWishlist}