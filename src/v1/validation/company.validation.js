const { body } = require("express-validator")
const validationLang = require("../resource/validation")
const db = require("../model");
const { Op } = require("sequelize");
const Company = db.company;
const Sector = db.sector;

module.exports = {
    createValidation : () => {
        return [ 
            body("owner_name", `Field Owner Name ${validationLang.is_required}`).notEmpty(),
            body("logo", `Field Logo ${validationLang.is_required}`).notEmpty(),
            body("sector_id", `Field Sector ID ${validationLang.is_required}`).notEmpty().custom((value, { req }) => {
                return Sector.findByPk(value).then(data => {
                    if (!data) {
                        return Promise.reject(`Sector ID ${validationLang.invalid}`);
                    }
                });
            }),
            body("name", `Field Name ${validationLang.is_required}`).notEmpty().custom((value, { req }) => {
                return Company.findOne({where : { name: value }}).then(data => {
                    if (data) {
                        return Promise.reject(`Name ${validationLang.already_exists}`);
                    }
                });
            })
        ]
    },
    updateValidation : () => {
        return [ 
            body("owner_name", `Field Owner Name ${validationLang.is_required}`).notEmpty(),
            body("logo", `Field Logo ${validationLang.is_required}`).notEmpty(),
            body("sector_id", `Field Sector ID ${validationLang.is_required}`).notEmpty().custom((value, { req }) => {
                return Sector.findByPk(value).then(data => {
                    if (!data) {
                        return Promise.reject(`Sector ID ${validationLang.invalid}`);
                    }
                });
            }),
            body("name", `Field Name ${validationLang.is_required}`).notEmpty().custom((value, { req }) => {
                console.log(req.params.id)
                return Company.findOne({where : { name: value, id : {[Op.not]:parseInt(req.params.id)}}}).then(data => {
                    if (data) {
                        return Promise.reject(`Name ${validationLang.already_exists}`);
                    }
                });
            })
        ]
    }
}