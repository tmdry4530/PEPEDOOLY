const BaseDTO = require("../../lib/base.dto");
const { BadRequest } = require("../../lib/customException");

class AdminLoginRequestDTO extends baseDTO {
  adminId;
  adminPassword;

  constructor(body) {
    super();
    this.adminId = body.adminId;
    this.adminPassword = body.adminPassword;

    this.validate(this, BadRequest);
  }
}

class AdminInfoRequestDTO extends BaseDTO {
  adminId;

  constructor(admin) {
    super();
    this.adminId = admin.Admin_id;

    this.validate(this, BadRequest);
  }
}

class AdminUpdateRequestDTO extends BaseDTO {
  adminId;
  adminName;
  adminNickname;
  adminEmail;
  adminProfile;

  constructor(admin) {
    super();
    this.adminId = admin.Admin_id;
    this.adminName = admin.Admin_name;
    this.adminNickname = admin.Admin_nickname;
    this.adminEmail = admin.Admin_email;
    this.adminProfile = admin.Admin_profile;

    this.validate(this, BadRequest);
  }
}

class AdminDeleteRequestDTO extends BaseDTO {
  adminId;

  constructor(admin) {
    super();
    this.adminId = body.Admin_id;

    this.validate(this, BadRequest);
  }
}

module.exports = {
  AdminLoginRequestDTO,
  AdminInfoRequestDTO,
  AdminUpdateRequestDTO,
  AdminDeleteRequestDTO,
};
