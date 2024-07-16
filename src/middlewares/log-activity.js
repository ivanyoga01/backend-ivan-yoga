const LogActivityRepo = require('../repository/log-activity');
const UserRepository = require('../repository/users');
const requestIp = require('request-ip');

module.exports = function (task) {
  return async function (req, res, next) {
    // User Data
    const user = await UserRepository.findByPk(req.auth.id, {
      attributes: ['id', 'fullName', 'firstName', 'lastName', 'role']
    });

    // get user IP 
    const ipAddress = requestIp.getClientIp(req);

    // request method
    if (req.method === 'POST') {
      method = 'create';
    } else if (req.method === 'GET') {
      method = 'read';
    } else if (req.method === 'PUT') {
      method = 'update';
    } else if (req.method === 'DELETE') {
      method = 'delete';
    }

    let activity = `${user.fullName} ${method} ${task}`;

    // insert log activity to db
    const data = {
      activity,
      userId: user.id,
      ipAddress,
      data: new Date(),
    };

    await LogActivityRepo.create(data);

    next();
  };
};
