import Mind from 'node-mind';

const mind = Mind({learningRate: 0.3, activator: 'sigmoid'});
const trainingData = [];
let catsArray = _getTargetCollection();


function learn() {
    mind.learn(trainingData);
}

function predict(recipe) {

    let input = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (catsArray.length === 0)
        catsArray = _getTargetCollection();

    recipe.categories.forEach(function (cat) {
        for (let i = 0; i < catsArray.length; i++) {
            let index = catsArray[i].indexOf(cat.id);
            if (index > -1) input[i] = 1;
        }
    })

    let prediction = mind.predict(input) * 5;
    prediction = Math.round(prediction);
    return prediction;
}

function rate(recipe, rating) {

    let input = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (catsArray.length === 0)
        catsArray = _getTargetCollection();

    recipe.categories.forEach(function (cat) {
        for (let i = 0; i < catsArray.length; i++) {
            let index = catsArray[i].indexOf(cat.id);
            if (index > -1) input[i] = 1;
        }
    })
    let data = {input: input, output: [rating / 5]};
    trainingData.push(data);
}

function _getTargetCollection() {
    catsArray = window.localStorage.getItem('wtet_categories');
    return catsArray !== null ? JSON.parse(catsArray) : [];
}

const brain = {
    learn, predict, rate
}

export default brain;