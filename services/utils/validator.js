
const validateParams = function (validationResult, req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ status: "error", message: errors.array() });
    }
};

module.exports = validateParams;