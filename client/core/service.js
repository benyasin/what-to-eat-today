import constants from './constants'
import request from './request'

/**
 * 遍历预设的二级分类集合,依次检出其对应的所有三级分类
 * 并添加到其对应父级分类的后面,用来扩充食谱的选择范围
 */
function getAllCategories() {

    let catsArray = window.localStorage.getItem('wtet_categories');
    if (catsArray === null || catsArray.length === 0) {
        catsArray = [];
        let pCats = constants.materials;
        for (let i = 0; i < pCats.length; i++) {
            let pid = pCats[i].id;
            let values = [pCats[i]];
            request({
                url: `/api/fetchAllByPid/${pid}`,
                method: 'GET'
            }).then((resp) => {
                if (resp && resp.length > 0) {
                    for (let j = 0; j < resp.length; j++) {
                        values.push({
                            id: resp[j].id,
                            name: resp[j].name
                        })
                    }
                }
                catsArray.push({
                    parent: pCats[i],
                    family: values
                });
            })
        }

        setTimeout(function () {
            if (catsArray.length === constants.materials.length) {
                window.localStorage.setItem('wtet_categories', JSON.stringify(catsArray));
            }
        }, 4000)
    }

}

/**
 * 随机产生一个二级或三级分类,并随机请求其下面的任意一个食谱
 */
function generateARecipe() {

    let catsArray = window.localStorage.getItem('wtet_categories');
    if (catsArray !== null) {
        catsArray = JSON.parse(catsArray)
    }
    let rindex1 = random(catsArray.length);
    let rindex2 = random(catsArray[rindex1].family.length);
    let targetCat = catsArray[rindex1].family[rindex2];
    let cid = targetCat.id;
    let cname = targetCat.name;

    return request({
        url: `/api/fetchRandomRecipe/${cid}/${cname}`,
        method: 'GET'
    })
}


function random(length) {
    return Math.floor(Math.random() * length);
}

/*function get(id) {
 return request({
 url:    `/message/${id}`,
 method: 'GET'
 });
 }*/

/*function create({subject, content}) {
 return request({
 url:    '/message/create',
 method: 'POST',
 data:   {
 subject,
 content
 }
 });
 }*/

/*const RecipeService = {
 get, create //, update, delete, etc. ...
 }*/

const Service = {
    getAllCategories, generateARecipe
}

getAllCategories();

export default Service;