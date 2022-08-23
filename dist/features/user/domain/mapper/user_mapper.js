"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../../../../shared/functions/token");
class UserMapper {
    mapModeltoEntity(model) {
        const token = (0, token_1.generateAccessToken)(model.user_id, model.role);
        const user = {
            token: token,
            user_id: model.user_id,
            displayname: model.displayname,
            username: model.username,
            contact: model.contact,
            country: model.country,
            role: model.role,
            state: model.state,
            amount: model.state,
        };
        return user;
    }
}
