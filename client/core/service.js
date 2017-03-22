import constants from './constants'
import request from './request'

/**
 * 遍历预设的二级分类集合,依次检出其对应的所有三级分类
 * 并添加到其对应父级分类的后面,用来扩充食谱的选择范围
 */
function getAllCategories() {

    let catsArray = window.localStorage.getItem('wtet_categories');
    if (catsArray === null) {
        catsArray = [];
        let materials = constants.materials;
        let promises = [];
        for (let i = 0; i < materials.length; i++) {
            let promise = new Promise((resolve, reject) => {
                request({
                    url: `/api/fetchAllByPid/${materials[i].id}`,
                    method: 'GET'
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            });
            promises.push(promise)
        }

        Promise.all(promises).then(values => {
            values.forEach(function (value, i) {
                let ids = value.map(function (v) {
                    return v.id
                })
                catsArray.push(value.length ? [materials[i].id].concat(ids) : [materials[i].id]);
            })
            window.localStorage.setItem('wtet_categories', JSON.stringify(catsArray));
        }).catch(reason => {
            console.log(reason)
        });
    }

}

/**
 * 随机产生一个二级或三级分类,并随机请求其下面的任意一个食谱
 */
function generateARecipe() {
    let catsArray = window.localStorage.getItem('wtet_categories');
    let targetId = 1;
    if (catsArray == null) {
        targetId = constants.materials[random(constants.materials.length)].id;
    } else {
        catsArray = JSON.parse(catsArray)
        let rindex1 = random(catsArray.length);
        let rindex2 = random(catsArray[rindex1].length);
        targetId = catsArray[rindex1][rindex2];
    }
    return request({
        url: `/api/fetchRandomRecipe/${targetId}`,
        method: 'GET',
        timeout: 1000
    })
}


function random(length) {
    return Math.floor(Math.random() * length);
}

const Service = {
    getAllCategories, generateARecipe
}

getAllCategories();

export default Service;