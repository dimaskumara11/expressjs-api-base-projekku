const lang = require("../resource/lang")
const responseFormat = (data,message) => {
    return {
        data,
        message
    }
}

exports.responseFound = (data) => {
    return {
        res_body : responseFormat(data,lang.data_found),
        status : 200
    }
}

exports.responseNotFound = () => {
    return {
        res_body : responseFormat(null,lang.data_not_found),
        status : 404
    }
}

exports.responseErrorCode = (message) => {
    return {
        res_body : responseFormat(null,message),
        status : 500
    }
}

exports.responseInsertSuccess = (data) => {
    return {
        res_body : responseFormat(data,lang.insert_success),
        status : 200
    }
}

exports.responseInsertFail = () => {
    return {
        res_body : responseFormat(null,lang.insert_fail),
        status : 400
    }
}

exports.responseUpdateSuccess = (data) => {
    return {
        res_body : responseFormat(data,lang.update_success),
        status : 200
    }
}

exports.responseUpdateFail = () => {
    return {
        res_body : responseFormat(null,lang.update_fail),
        status : 400
    }
}

exports.responseDeleteSuccess = (data) => {
    return {
        res_body : responseFormat(data,lang.delete_success),
        status : 200
    }
}

exports.responseDeleteFail = () => {
    return {
        res_body : responseFormat(null,lang.delete_fail),
        status : 400
    }
}

exports.responseErrorValidation = (message) => {
    return {
        res_body : responseFormat(null,message),
        status : 422
    }
}