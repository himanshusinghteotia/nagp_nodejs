const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
    ac.grant("employee")
        .readAny("position")
        .updateOwn("position")

    ac.grant("manager")
        .extend("employee")
        .createAny("position")
        .updateAny("position")

    return ac;
})();