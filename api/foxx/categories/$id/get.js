const {query, time} = require('@arangodb');

module.exports = {
    contentType: 'application/json',
    name: 'categories/$id/get',
    body: null,
    handler: (req, res) =>
    {
        const start = time();

        const {id} = req.pathParams;

        const {get} = module.context;
        const [doc] = get('categories', id).toArray();

        if (Boolean(doc))
        {
            res.send({result: doc, execTime: time() - start});
        }
        else
        {
            res.throw('404', 'No found');
        }
    }
};