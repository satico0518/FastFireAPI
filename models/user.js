const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    deviceId: {
        type: String,
        required: [true, 'El Id del dispositivo es obligatorio'],
    },
    identification: {
        type: String,
        required: [true, 'El documento es obligatorio'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    password: {
        type: String,
        required: [true, 'La contrasena es obligatoria'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        enum: ['ADMIN_ROLE', 'SUPERVISOR_ROLE', 'USER_ROLE'],
        default: 'USER_ROLE',
    },
    createdDate: { 
        type: Date, 
        default: Date.now()
    },
    isActive: {
        type: Boolean,
        default: false,
    },
});

UserSchema.methods.toJSON = function() {
    const {__v, password, ...rest} = this.toObject();
    return rest;
}

module.exports = model('User', UserSchema);
