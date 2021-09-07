const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const {expect, should} = chai;

const urlApi = 'http://localhost:9999/_db/demo/api';

const resultCheck = (err, res) =>
{
    expect(err).to.be.null;
    expect(res).to.have.status(200);
    expect(res).to.be.json;

    expect(res.body).to.have.own.property('result');
};

describe('Categories', () =>
{
    describe('GET /categories', () =>
    {
        it('should return categories', done =>
        {
            chai.request(urlApi)
                .get('/categories')
                .end((err, res) =>
                {
                    resultCheck(err, res);

                    expect(res.body.result).to.be.an('array');

                    done();
                });
        });

        it('should return categories for [1]', done =>
        {
            chai.request(urlApi)
                .get('/categories/1')
                .end((err, res) =>
                {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    expect(res).to.be.json;

                    expect(res.body).to.have.own.property('errorMessage');

                    done();
                });
        });

        it('should fail on unknown id', done=>{
            chai.request(urlApi)
                .get('/categories?id=1')
                .end((err, res) =>
                {
                    resultCheck(err, res);

                    expect(res.body.result).to.be.an('array');

                    done();
                });
        })
    });
});