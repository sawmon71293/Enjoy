import counter from "../src/modules/helper.js";
/** @jest-environment jsdom */
describe('Tests the counter functionality', () => {
    const data = [
        {
            id: '1',
            name: 'movie 1',
            url:'http://placeholder/12X12.jpg',
            likes: 3
        },
        {
            id: '2',
            name: 'movie 2',
            url:'http://placeholder/12X12.jpg',
            likes: 4
        }
    ];

    const data2 = [];

    test('Counter returns item number', ()=> {
        expect(counter(data)).toEqual(2);
        expect(counter(data2)).toEqual(0);
    })

});
