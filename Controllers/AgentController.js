const agentModel = require("../Models/AgentModel");

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
        const { email } = req.body;
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

const getAgentById = async(req, res) =>{
    try{
        const { id } = req.params;
        const findAgent = await agentModel.findById(id);
        if(!findAgent){
            return res.status(400).json({ message: "No Data Found" })
        }
        return res.status(200).json({ message: findAgent });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Network Error" })
    }
}

module.exports = { getAgents, createAgent, loginAgent, getAgentById };
