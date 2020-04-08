(function() {
    let that; //游戏对象
    function Game(map) {
        this.food = new Food()
        this.snake = new Snake()
        this.map = map
        that = this
    }
    Game.prototype.start = function() {
            //食物 和 蛇 渲染到地图上
            this.food.render(this.map)
            this.snake.render(this.map)
            runSnake()
            bindKey()
        }
        //1.让蛇移动起来
    function runSnake() {
        let timerId = setInterval(() => {
            //让蛇走一格
            //console.log(that)
            that.snake.move(that.food, that.map)
            that.snake.render(that.map)


            //3.蛇遇到食物 做相应处理
            //4.蛇遇到边界游戏结束
            //4.1获取蛇头坐标
            let maxX = that.map.offsetWidth / that.snake.width
            let maxY = that.map.offsetHeight / that.snake.height
            let headX = that.snake.body[0].x
            let headY = that.snake.body[0].y
            if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
                alert("Game Over!")
                clearInterval(timerId)
            }
        }, 150)
    }
    //2.通过键盘控制蛇移动的方向
    function bindKey() {
        document.addEventListener('keydown', function(e) {

                //console.log(e.keyCode)
                // left-37 top-38 right-39 button-40
                switch (e.keyCode) {
                    case 37:
                        that.snake.direction = 'left'
                        break
                    case 38:
                        that.snake.direction = 'top'
                        break
                    case 39:
                        that.snake.direction = 'right'
                        break
                    case 40:
                        that.snake.direction = 'bottom'
                        break
                }
            }, false) //false事件冒泡  true事件捕获
    }

    //3.蛇遇到食物
    window.Game = Game
})()