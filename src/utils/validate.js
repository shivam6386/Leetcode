const valiadtor=require('validator')
const registerValidation=function(data){

    const manditoryField=["Fristname","email" , "password" ];
    const requiredField=manditoryField.every((K)=>Object.keys(data).includes(k));
     
    if(!requiredField){
        throw new Error("Fill the missing field");
        
    }
    if (!validator.isEmail(data.email)){
   throw new Error ('InValid Email');
    }
   if (!validator.isStrongPassword(data.password)){
   throw new Error ('InValid Email');
    }
}

module.exports=registerValidation;