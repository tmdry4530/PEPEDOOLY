const JWT = require("../lib/jwt");
const jwt = new JWT();

class AdminService {
  constructor(Admin) {
    this.admin = Admin;
  }
  async login(adminLoginRequestDTO) {
    const admin = await this.admin.findOne({
      where: { Admin_id: adminLoginRequestDTO.adminId },
    });
    console.log(admin);
    if (
      admin &&
      admin.dataValues.Admin_password === adminLoginRequestDTO.adminPassword
    ) {
      const jwtPayload = {
        adminId: admin.dataValues.Admin_id,
        adminPassword: admin.dataValues.Admin_password,
        adminUid: admin.dataValues.Admin_uid,
      };
      console.log(jwtPayload);
      const token = jwt.sign(jwtPayload);
      return token;
    } else {
      console.error("Admin login Error", e);
      throw new Error(e.message);
    }
  }

  async getAdminById(decoded) {
    const admin = await this.admin.findOne({
      where: { Admin_uid: decoded.adminUid },
    });
    const adminInfo = admin.dataValues;
    return adminInfo;
  }

  async updateAdmin(adminData) {
    const updatedAdmin = await this.admin.update(adminData, {
      where: { adminId: adminData.adminId },
    });
    return updatedAdmin;
  }

  async deleteAdmin(adminId) {
    await this.admin.destroy({ where: { adminId } });
  }
}

module.exports = AdminService;
