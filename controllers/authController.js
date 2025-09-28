/*const userModel = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const JWT = require('jsonwebtoken')

//REGISTER
const registerController = async(req,res)=>{
    try{
     const {userName,email,password,phone,address} = req.body;
     //validation
     if(!userName || !email || !password || !phone || !address){
        return res.status(400).send({
            success:false,
            message:'Please Provide All Fields'
        });
     }
     //check existing user
     const existing = await userModel.findOne({email});
     if(existing){
        return res.status(400).send({
            success:false,
            message:'Email Already Registered',
        });
     }
     // Hashing Password
     const salt =  bcryptjs.genSaltSync(10);
     const hashedPassword = await bcryptjs.hash(password,salt)

     //create new user
     const user = await userModel.create({
        userName,
        email,   
        phone , 
        address,
        password:hashedPassword,
    });
     res.status(201).send({
        success:true,
        message:'Successfully Registered',
     })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in register API',
            error
        });
    }
};

//LOGIN
const loginController = async(req,res)=>{
    try{
        const {email,password} = req.body;
      //validation
      if(!email || !password){
        return res.status(400).send({
            success:false,
            message:'Please Provide Email or Password'
        });
      }
      //check user
      const user = await userModel.findOne({email});
      if(!user){
        return res.status(404).send({
            success:false,
            message:'User Not Found ',
        });
      }

      //CHECK USER PASSWORD || COMPARE PASSWORD
      const isMatch = await bcryptjs.compare(password,user.password);
      if(!isMatch){
        return res.status(500).send({
            success:false,
            message:'Invalid Credentials'
        });
      }

      return res.status(200).send({
        success:true,
        message:"Login Successfully",user,
      });

      

  const token = JWT.sign({id:userName_.id},process.env.JWT_SECRET,{EexpiresIn:'7d',
        
      })
    //  user.password=undefined;
   // res.status(200).send({
      //  success:true,
      // message:'Login Successfully',
      //  token,
      //  user,
    // })
   // }catch(error){
      // console.log(error)
       // res.status(500).send({
          //  success:false,
           // message:'Error in Login API',
           // error 
    //});
//}
//};

module.exports = {registerController,loginController};*/

const userModel = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const JWT = require('jsonwebtoken');

// REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address } = req.body;

    // Validation
    if (!userName || !email || !password || !phone || !address) {
      return res.status(400).send({
        success: false,
        message: 'Please Provide All Fields',
      });
    }

    // Check existing user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(400).send({
        success: false,
        message: 'Email Already Registered',
      });
    }

    // Hashing Password
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const user = await userModel.create({
      userName,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    res.status(201).send({
      success: true,
      message: 'Successfully Registered',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in register API',
      error,
    });
  }
};

// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: 'Please Provide Email or Password',
      });
    }

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User Not Found',
      });
    }

    // Compare password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: 'Invalid Credentials',
      });
    }

    // Generate Token
    const token = JWT.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Hide password before sending response
    user.password = undefined;

    return res.status(200).send({
      success: true,
      message: 'Login Successfully',
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Login API',
      error,
    });
  }
};

module.exports = { registerController, loginController };


