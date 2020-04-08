(function() {
    let position = 'absolute'
        //记录上次食物的位置，为删除做准备
    let elements = []
        //食物对象
    function Food(options) {
        options = options || {} //options为空的时候要设置成空对象
        this.x = options.x || 0
        this.y = options.y || 0
        this.width = this.width || 20
        this.height = this.height || 20
        this.color = this.color || '#ea7000'
    }

    //这里如果用箭头函数 this指向的是window
    Food.prototype.render = function(map) {
            remove()
                //生成随机x,y坐标
            this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width
            this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height
                //动态创建div
            let div = document.createElement('div')
            map.appendChild(div)
            elements.push(div)
                //设置div样式，left横坐标，top纵坐标
            div.style.left = this.x + 'px'
            div.style.top = this.y + 'px'
            div.style.position = position //position = absolute
            div.style.width = this.width + 'px'
            div.style.height = this.height + 'px'
            div.style.backgroundColor = this.color
        }
        //删除吃掉的食物
    function remove() {
        for (let i = elements.length - 1; i >= 0; i--) {
            //删除div
            elements[i].parentNode.removeChild(elements[i])
                //删除数组
            elements.splice(i, 1)
        }
    }
    window.Food = Food
})()