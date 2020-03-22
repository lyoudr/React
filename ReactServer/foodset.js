function Set(){
    var items = {};
    // 如果值在集合中，返回 true，否則返回 false
    this.has = function (value) {
        return items.hasOwnProperty(value);
    }
    // 向集合添加一個新的項目
    this.add = function(value){
        if(!this.has(value)){
            items[value] = value;
            return true;
        }
        return false;
    } 
    // 從集合移除一個值 
    this.remove = function(value) {
        if(this.has(value)) {
            delete items[value];
            return true;
        }
        return false;
    }
    // 移除集合中的所有項目
    this.clear= function() {
        items = {};
    }
    // size 方法
    // (1) 使用 Object.keys 方法提取
    this.size = function() {
        return Object.keys(items).length;
    }
    // (2) 
    this.sizeLegacy = function(){
        var count = 0;
        for (var props in items){
            if(items.hasOwnProperty(props))
                ++count;
        }
        return count;
    }

    // values 方法
    // (1)
    this.values = function(){
        return Object.keys(items);
    }
    // (2)
    this.valuesLegacy = function(){
        var keys = [];
        for (var key in items) {
            keys.push(key);
        }
        return keys;
    }
    
    // A. Union 聯集方法
    this.union = function(otherSet) {
        var unionSet = new Set();

        var values = this.values();
        for(var i = 0; i < values.length; i++){
            unionSet.add(values[i])
        }

        values = otherSet.values();
        for (var i = 0; i < values.length; i++){
            unionSet.add(values[i]);
        }

        return unionSet;
    }

    // B. Intersection 交集方法
    this.intersection = function(otherSet) {
        var intersectionSet = new Set();

        var values = this.values();
        for (var i = 0; i < values.length; i++){
            if(otherSet.has(values[i])) {
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet;
    }

    // C. Difference 差集方法
    this.difference = function(otherSet) {
        var differenceSet = new Set();

        var values = this.values();
        for(var i = 0; i < values.length; i++){
            if(!otherSet.has(values[i])){
                differenceSet.add(values[i]);
            }
        }
        return differenceSet;
    }

    // D. Subset 子集方法
    this.subset = function(otherSet){
        if(this.size() > otherSet.size()){
            return false;
        } else {
            var values = this.values();
            for (var i = 0; i < values.length; i++){
                if(!otherSet.has(values[i])){
                    return false;
                }
            }
            return true;
        }
    }
}

const decies1 = new Set();
decies1.add('cheese');
decies1.add('vegetable');
decies1.add('meat');
decies1.add('mushroom');

const decies2 = new Set();
decies2.add('milk');
decies2.add('fish');
decies2.add('cheese');
decies2.add('vegetable');
decies2.add('mushroom');

const decies3 = new Set();
decies3.add('vegetable');
decies3.add('fish');
decies3.add('mushroom');
decies3.add('meat');

const decies4 = new Set();
decies4.add('vegetable');
decies4.add('meat');
decies4.add('cheese');
decies4.add('mushroom');

const disharray = [decies1, decies2, decies3, decies4];

exports.countDishes = (inputdishes) =>{
    var inputSet = new Set();
    var resultdish = [];
    inputdishes.forEach((value) => {
        inputSet.add(value);
    });
    disharray.forEach((dish, index) => {
        var intersectiondish = dish.intersection(inputSet);
        if(intersectiondish.size() > (dish.size()/2)){
            resultdish.push(`dish${index}`);
        }
    });
    console.log('resultdish is =>', resultdish);
    return resultdish;
}