const joi = require('joi');
const {time} = require('@arangodb');

const schemaCategories = joi.object({
    id: joi.number().required(),
    parent_id: joi.number().default(null),
    name: joi.string().required()
}).required();

module.exports = {
    contentType: 'application/json',
    name: 'categories/update',
    body: {model: schemaCategories},
    handler: (req, res) =>
    {
        const start = time();

        try
        {
            const {id} = req.pathParams;

            const {update, get} = module.context;

            const [category] = get('categories', id).toArray();
            if (!category)
            {
                res.statusCode = 404;
                res.send({errorMessage: 'Category not found'});
                return;
            }

            const doc = {...req.body, updatedOn: new Date().getTime()};
            const queryResult = update('categories', req.pathParams.id, doc).toArray();

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