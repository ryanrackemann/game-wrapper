$(function () {
// Contains all listeners, view events, and css alterations

difficulty.init()
game.init()
$('#difficulty').on('change', function () {
    difficulty.setDifficulty($(this).val())
})

$('#play').on('click', function () {
    game.startGame()
})

// prevent right click menu on game board
$('#gameBoard').on('contextmenu', function (event) { event.preventDefault() })

// reset game
$('#restart').on('click', function () { game.restart() })

})

const game = {
    init: function () {
        this.startScreen.show()
        this.playScreen.hide()
    },

    startScreen: {
        show: function () {
            $('#start').removeClass('hidden')
        },
        hide: function () {
            $('#start').addClass('hidden')
        }
    },

    playScreen: {
        show: function () {
            $('#stats, #game, #gameBoard, #restart').removeClass('hidden')
        },
        hide: function () {
            $('#stats, #game, #gameBoard, #lose, #win, #newHighScore, #restart').addClass('hidden')
        }
    },

    restart: function () {
        this.playScreen.hide()
        this.startScreen.show()
    },

    startGame: function () {
        this.startScreen.hide()
        this.playScreen.show()
    }
}