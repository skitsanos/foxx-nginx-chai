const {db} = require('@arangodb');

const collections = [
    {
        name: 'categories',
        index: [
            {
                type: 'hash',
                unique: true,
                fields: ['id', 'parent_id', 'name']
            }
        ]
    }
];

const defaultData = [
    {parent_id: null, id: 1, name: 'Category 1'},
    {parent_id: 1, id: 11, name: 'Category 1-1'},
    {parent_id: 1, id: 12, name: 'Category 1-2'},
    {parent_id: null, id: 2, name: 'Category 2'},
    {parent_id: 2, id: 21, name: 'Category 2-1'},
    {parent_id: 2, id: 22, name: 'Category 2-2'},
    {parent_id: null, id: 3, name: 'Category 3'},
    {parent_id: 3, id: 31, name: 'Category 3-1'},
    {parent_id: 3, id: 32, name: 'Category 3-2'},
    {parent_id: null, id: 4, name: 'Category 4'}
];

for (const col of collections)
{
    const {name, index} = col;

    //create collection if not exists
    let curentCollection = db._collection(name);
    if (!curentCollection)
    {
        curentCollection = db._createDocumentCollection(name);
    }

    if (name === 'categories')
    {
        curentCollection.truncate();

        for (const sampleDoc of defaultData)
        {
            curentCollection.insert(sampleDoc, {overwrite: true});
        }
    }

    //ensure index, if any
    if (index && Array.isArray(index))
    {
        for (const ndx of index)
        {
            db._collection(name).ensureIndex(ndx);
        }
    }
}