const {query} = require('@arangodb');

const getTree = (id = null) =>
{
    const parent_id = Boolean(id) ? Number(id) : null;

    const res = query`
        for doc in categories
            filter doc.parent_id==${parent_id}
        return merge(doc, {_items: []})
    `.toArray();

    if (res.length === 0)
    {
        return res;
    }

    const tree = [];

    for (const el of res)
    {
        el._items = getTree(el.id);
        tree.push(el);
    }

    return tree;
};

module.exports = getTree;