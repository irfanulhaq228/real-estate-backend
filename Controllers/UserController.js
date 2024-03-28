const userModel = require("../Models/UserModel.js");
const jwt = require("jsonwebtoken");

const getAllUser = async(req, res) => {
    try{
        const data = await userModel.find();
        if(data?.length === 0){
            return res.status(400).json({ message: "no Data Found" })
        };
        return res.status(200).json({ message: data });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Server Error!" })
    }
};

const createUser = async(req, res) => {
    try{
        const { email } = req.body;
        const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '30d' });
        res.cookie(
            'auth', 
            token, 
            { 
                httpOnly: true, 
                maxAge: 30 * 24 * 60 * 60 * 1000
            }
        );
        const user = await userModel.create({ ...req.body, token });
        return res.status(200).json({ message: "User created successfully", user, token });
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: "Server Error!" })
    }
};

const loginUser = async(req, res) => {
    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password }).select("_id, email, name, token");
        if(!user){
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        return res.status(200).json({ message: user });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Server Error!" });
    }
};


module.exports = {
    getAllUser,
    createUser,
    loginUser
}