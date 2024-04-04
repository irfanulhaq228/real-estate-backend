const agentModel = require("../Models/AgentModel");
const homeForRentModel = require("../Models/HomeForRentModel");
const homeForSaleModel = require("../Models/HomeForSaleModel");

const getAgents = async(req, res) => {
    try{
        const data = await agentModel.find();
        if(!data || data.length === 0){
            return res.status(400).json({message: "No Data Found"});
        }
        return res.status(200).json({ message: data });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Network Error" });
    }
};

const createAgent = async(req, res) => {
    try{
        var { email, name, city } = req.body;
        name = name.toLowerCase();
        city = city.toLowerCase();
        req.body.name = name;
        req.body.city = city;
        const isEmailExists = await agentModel.findOne({ email });
        if(isEmailExists){
            return res.status(400).json({ message: "Email already Exists" })
        }
        const newAgent = await agentModel.create(req.body);
        return res.status(200).json({ message: newAgent });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Network Error" })
    }
};

const loginAgent = async(req, res) => {
    try{
        const { email, password } = req.body;
        const correctAgent = await agentModel.findOne({ email }).select("-passwod");
        if(!correctAgent){
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        if(correctAgent.password !== password){
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        if(correctAgent.status !== true){
            return res.status(400).json({ message: "This Agent not yet approved" });
        }
        return res.status(200).json({ message: {
            address: correctAgent.address,
            email: correctAgent.email,
            name: correctAgent.name,
            status: correctAgent.status,
            _id: correctAgent._id
        } });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Network Error" })
    }
};

const getAgentById = async(req, res) => {
    try{
        const { id } = req.params;
        const findAgent = await agentModel.findById(id).select("-password");
        if(!findAgent){
            return res.status(400).json({ message: "No Data Found" })
        };
        const rentalHomes = await homeForRentModel.find();
        const saleHomes = await homeForSaleModel.find();
        return res.status(200).json({ message: findAgent, rent: rentalHomes, sale: saleHomes });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Network Error" })
    }
};

const searchAgentByUser = async(req, res) =>{
    try{
        var { location, name } = req.body;
        name = name.toLowerCase();
        var searchedAgent = [];
        const regex = new RegExp(name, 'i');
        if(name == "" && location == ""){
            return res.status(400).json({ message: "Enter Agent Location or Agent Name to Search" });
        }
        if (name !== "" && location !== "") {
            location = location.toLowerCase();
            searchedAgent = await agentModel.find({ name: regex, $or: [{ city: location }, { zipcode: location }] });
        } else if (name !== "" && location === "") {
            searchedAgent = await agentModel.find({ name: regex });
        } else if (name === "" && location !== "") {
            if (isNaN(location)) {
                location = location.toLowerCase();
                searchedAgent = await agentModel.find({ city: location });
            } else {
                searchedAgent = await agentModel.find({ zipcode: location });
            }
        }
        if(searchedAgent?.length === 0){
            return res.status(400).json({ message: "No Agent of this Search Found" });
        }
        return res.status(200).json({ message: searchedAgent });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Network Error" })
    }
};

module.exports = { getAgents, createAgent, loginAgent, getAgentById, searchAgentByUser };
