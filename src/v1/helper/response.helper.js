const lang = require("../resource/lang")
const responseFormat = (data,message) => {
    return {
        data,
        message
    }
}

exports.responseFound = (res, data) => {
    res.json(responseFormat(data,lang.data_found))
}

exports.responseNotFound = (res) => {
    res.status(404).json(responseFormat(null,lang.data_not_found))
}

exports.responseErrorCode = (res, message) => {
    res.status(500).json(responseFormat(null,message))
}