const joi = require('joi');
const {query, time} = require('@arangodb');
const crypto = require('@arangodb/crypto');

const schemaCategories = joi.object({
    id: joi.number().required(),
    parent_id: joi.number().default(null),
    name: joi.string().required()
}).required();

module.exports = {
    contentType: 'application/json',
    name: 'categories/post',
    body: {model: schemaCategories},
    handler: (req, res) =>
    {
        const start = time();

        const {parent_id} = req.body;

        if (Boolean(parent_id))
        {
            const [foundParents] = query`
            LET total = (FOR doc IN categories 
            FILTER doc.id==${Number(parent_id)} || doc.parent_id==null
            COLLECT WITH COUNT INTO totalFound 
            RETURN totalFound)[0]
            
            return total
        `.toArray();

            if (foundParents === 0)
            {
                res.throw(409, 'There is no such parent id');
            }
        }

        // check if id or name already exists
        const categories = query`
            FOR doc in categories
            FILTER doc.id==${req.body.id} || doc.name==${req.body.name}
            RETURN doc
            `.toArray();

        if (categories.length > 0)
        {
            res.throw(409, 'Category already exists!');
        }

        //create new category in collection
        const {insert} = module.context;

        const doc = {
            ...req.body
            //any additional fields created at run time
        };

        const result = insert('categories', doc).toArray()[0]._key;

        res.send({result: {_key: result}, execTime: time() - start});
    }
};