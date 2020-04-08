(function() {
    var Tools = {
        // The random number
        getRandom: (min, max) => Math.floor(Math.random() * (max - min)) + min
    }
    window.Tools = Tools
})()