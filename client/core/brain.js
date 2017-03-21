import Mind from 'node-mind';
import constants from './constants'
import _ from 'lodash'


const mind = Mind({learningRate: 0.3,activator:'sigmoid'});

const trainingData = [];
let catsArray = window.localStorage.getItem('wtet_categories');
if (catsArray !== null) {
    catsArray = JSON.parse(catsArray)
}

function learn() {
    mind.learn(trainingData);
}

function predict(recipe) {

    let input = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    recipe.categories.forEach(function (cat) {
        let target = {};
        catsArray.forEach(function (obj) {
            let index = _.findIndex(obj.family, cat);
            if (index > -1) {
                target = obj.parent;
            }
        })
        let index = _.findIndex(constants.materials, target);
        if (index > -1) input[index] = 1;
    })

    let prediction = mind.predict(input) * 5;
    prediction = Math.round(prediction);
    return prediction;
}

function rate(recipe, rating) {

    let input = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    recipe.categories.forEach(function (cat) {
        let target = {};
        catsArray.forEach(function (obj) {
            let index = _.findIndex(obj.family, cat);
            if (index > -1) {
                target = obj.parent;
            }
        })
        let index = _.findIndex(constants.materials, target);
        if (index > -1) input[index] = 1;
    })
    let data = { input: input, output: [ rating / 5 ] };
    console.log(data)
    trainingData.push(data);
}

const brain = {
    learn, predict, rate
}

export default brain;