"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (roles) => (req, res, next) => {
    var _a;
    const userRoles = (_a = req.user) === null || _a === void 0 ? void 0 : _a.roles;
    if (!userRoles || !userRoles.some((userRole) => roles.includes(userRole))) {
        return res.status(403).json({
            message: "Forbidden",
        });
    }
    next();
};
