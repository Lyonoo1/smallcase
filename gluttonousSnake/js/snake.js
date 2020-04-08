(function() {
    let position = 'absolute'
        //记录之前创建的蛇
    let elements = []
        //蛇对象
    function Snake(options) {
        //蛇节大小
        options = this.options || {}
        this.width = options.width || 20
        this.height = options.height || 20

        //移动方向
        this.direction = options.direction || 'right'
            //蛇的身体
        this.body = [
            { x: 3, y: 2, color: 'red' },
            { x: 2, y: 2, color: 'blue' },
            { x: 1, y: 2, color: 'blue' }
        ]
    }

    Snake.prototype.render = function(map) {
            //删除之前的蛇
            remove()
                //蛇节渲染到map上
            for (let i = 0, len = this.body.length; i < len; i++) {
                let snakeBody = this.body[i]
                let div = document.createElement('div')
                map.appendChild(div)
                    //j记录当前蛇
                elements.push(div)
                div.style.position = position
                div.style.width = this.width + 'px'
                div.style.height = this.height + 'px'
                div.style.left = snakeBody.x * this.width + 'px'
                div.style.top = snakeBody.y * this.height + 'px'
                div.style.backgroundColor = snakeBody.color
                    //console.log(div)
            }
        }
        //私有成员
    function remove() {
        for (let i = elements.length - 1; i >= 0; i--) {
            elements[i].parentNode.removeChild(elements[i])
            elements.splice(i, 1)
        }
    }
    //蛇身体移动
    Snake.prototype.move = function(food, map) {
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x
            this.body[i].y = this.body[i - 1].y
        }
        //控制蛇头移动
        //判断移动方向
        let head = this.body[0]
        switch (this.direction) {
            case 'right':
                head.x += 1
                break
            case 'left':
                head.x -= 1
                break
            case 'top':
                head.y -= 1
                break
            case 'bottom':
                head.y += 1
                break
        }
        //判断蛇头是否与食物重复
        let headX = this.body[0].x * this.width
        let headY = this.body[0].y * this.height
            // console.log(headX, headY)
            //重复的时候 让食物随机生成一个 并且 在蛇尾部添加一节
            // console.log(this.body)
        if (headX === food.x && headY === food.y) {
            //尾部
            let last = {
                    x: food,
                    y: food.y,
                    color: this.body[this.body.length - 1].color
                }
                //添加至蛇神
            this.body.push(last)
                // console.log(last, this.body)
                //食物随机生成
            food.render(map)
        }

    }
    window.Snake = Snake
})()