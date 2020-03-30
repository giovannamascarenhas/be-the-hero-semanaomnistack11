const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique Id', () => {
    it('Should generate a unique id', () => {
        const id = generateUniqueId();
        expect(id).toHaveLength(8);
    });
});