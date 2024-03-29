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
        const user = await userModel.create({ ...req.body, token }).select("_id email name token");
        return res.status(200).json({ message: "User created successfully", user, token });
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: "Server Error!" })
    }
};

const loginUser = async(req, res) => {
    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password }).select("_id email name token");
        if(!user){
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        return res.status(200).json({ message: user });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Server Error!" });
    }
};

const editUser = async(req, res) => {
    try{
        const { id } = req.params;
        const { editFor } = req.body;
        const user = await userModel.findById(id);
        if(!user){
            return res.status(400).json({ message: "No Data Found" });
        }
        var updateUser = {}
        if(editFor === "name"){
            updateUser = await userModel.findByIdAndUpdate(id, { name: req.body.name }).select("_id email name token");
        }else if(editFor === "email"){
            updateUser = await userModel.findByIdAndUpdate(id, { email: req.body.email }).select("_id email name token");
        }else{
            const { prevPassword } = req.body;
            if(prevPassword !== user?.password){
                return res.status(400).json({ message: "Enter Correct Previous Password" }).select("_id email name token");
            }
            updateUser = await userModel.findByIdAndUpdate(id, { password: req.body.password });
        }
        return res.status(200).json({ message: updateUser });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Server Error!" });
    }
};

const getUserById = async(req, res) => {
    try{
        const { id } = req.params;
        const user = await userModel.findById(id);
        if(!user){
            return res.status(400).json({ message: "No Data Found" }).select("_id email name token");
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
    loginUser,
    editUser,
    getUserById
}