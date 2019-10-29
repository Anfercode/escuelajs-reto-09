const assert = require('assert');
const proxyquire = require('proxyquire');

const { productsMock, ProductServiceMock } = require('../src/utils/mocks/mocks');
const testServer = require('../src/utils/testServer');

describe('routes - products', function () {
    const route = proxyquire('../src/routes/index.js', {
        '../services/index.js': ProductServiceMock
    })

    const request = testServer(route);
    describe('GET /products', function () {
        it('should respond with status 200', function (done) {
            request.get('/api/products').expect(200, done);
        });
    });
});
