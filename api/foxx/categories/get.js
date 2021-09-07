const {query, time} = require('@arangodb');
const getTree = require(module.context.basePath + '/utils/getTree');

module.exports = {
    contentType: 'application/json',
    name: 'categories/get',
    body: null,
    handler: (req, res) =>
    {
        const start = time();

        const {skip, pageSize, id = null} = req.queryParams;

        const queryResult = getTree(id);

        res.send({result: queryResult, execTime: time() - start});
    }
};