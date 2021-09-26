module.exports = (req) => {
    return `https://${req.get('host')}`;
};