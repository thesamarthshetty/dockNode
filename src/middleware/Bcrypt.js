import bcrypt from 'bcrypt'

const hashPassword = async(pass)=>{
    let salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);
    return hashedPassword
}

const verifyPassword = async(pass, storedPassword)=>{
    const passwordMatched = await bcrypt.compare(pass, storedPassword) || false;
    return passwordMatched ? true : false
}

export { hashPassword, verifyPassword }
