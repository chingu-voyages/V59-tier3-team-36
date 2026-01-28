import Role from "../models/roleModel.js";

const getRoles = async () => {
    try {
        const roles = await Role.find({});
        return roles;
    } catch (error) {
        console.log(`Error in getting roles from service: ${error}`);
        throw error;
    }
}

export default { getRoles };