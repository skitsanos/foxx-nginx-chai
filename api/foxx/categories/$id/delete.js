const {query, time} = require('@arangodb');

module.exports = {
    contentType: 'application/json',
    name: 'categories/delete',
    body: null,
    handler: (req, res) =>
    {
        const start = time();

        try
        {
            const {id} = req.pathParams;

            const queryResult = query`
                REMOVE ${id} IN categories
                `.toArray();
            res.send({
                result: queryResult,
                execTime: time() - start
            });
        } catch (e)
        {
            res.throw(500, e.message);
        }
    }
};