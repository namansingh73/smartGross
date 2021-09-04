module.exports = (req) => {
    return `${req.protocol}://${req.get('host')}`;
};