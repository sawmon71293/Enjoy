/** @jest-environment jsdom */
import counter from "../src/modules/helper.js";
import { populateView } from "../src/modules/render.js";

describe('Counting the Number of Items in the homepage', () => {

    document.body.innerHTML =`
        <span id="show-count"></span>
        <div id="movies"></div>
    `


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
    
    const mainSection = document.getElementById('movies');
    const counterArea = document.getElementById('show-count');
    
    populateView(data, mainSection);
    
    const cards = document.querySelectorAll('.card');
    counterArea.innerText = counter(cards);

    test('Counts the number of items in the homepage ', () => {
        expect(counter(cards)).toBe(2);
    });

    test('Shows that the number of items is added to the homepage', ()=> {
        expect(counterArea.innerText).toEqual(2);
    })

});
