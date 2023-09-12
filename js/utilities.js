
var timer = {
    formatTime: function (seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        return formattedTime;
    }
}
  
var highScores = {
    init: function () {
        this.easyRecordTime = -1,
        this.easyWinCount = 0,
        this.mediumRecordTime = -1,
        this.mediumWinCount = 0,
        this.hardRecordTime = -1,
        this.hardWinCount = 0,
        this.getStoredScores()
        this.displayScores()
    },
  
    getStoredScores: function () {
        this.easyRecordTime = localStorage.getItem('easyRecordTime') != null ? localStorage.getItem('easyRecordTime') : this.easyRecordTime
        this.easyWinCount = localStorage.getItem('easyWinCount') != null ? localStorage.getItem('easyWinCount') : this.easyWinCount
        this.mediumRecordTime = localStorage.getItem('mediumRecordTime') != null ? localStorage.getItem('mediumRecordTime') : this.mediumRecordTime
        this.mediumWinCount = localStorage.getItem('mediumWinCount') != null ? localStorage.getItem('mediumWinCount') : this.mediumWinCount
        this.hardRecordTime = localStorage.getItem('hardRecordTime') != null ? localStorage.getItem('hardRecordTime') : this.hardRecordTime
        this.hardWinCount = localStorage.getItem('hardWinCount') != null ? localStorage.getItem('hardWinCount') : this.hardWinCount
    },
  
    displayScores: function () {
        let formattedTime = ''
        
        if (this.easyWinCount > 0) {
            formattedTime = secondsToClockFormat(this.easyRecordTime)
            $('.easyWinCount').text(this.easyWinCount)
            $('.easyRecordTime').text(formattedTime)
        }

        if (this.mediumWinCount > 0) {
            formattedTime = secondsToClockFormat(this.easyRecordTime)
            $('.mediumWinCount').text(this.mediumWinCount)
            $('.mediumRecordTime').text(secondsToClockFormat(this.mediumRecordTime))
        }

        if (this.hardWinCount > 0) {
            formattedTime = secondsToClockFormat(this.easyRecordTime)
            $('.hardWinCount').text(this.hardWinCount)
            $('.hardRecordTime').text(secondsToClockFormat(this.hardRecordTime))
        }

        $('.highScore').text(formattedTime)
    },
  
    hasHighScore: function () {
        switch (difficulty) {
            case 'easy':
                if (this.easyWinCount > 0) {
                    return true
                }
            case 'medium':
                if (this.mediumWinCount > 0) {
                    return true
                }
            case 'hard':
                if (this.hardWinCount > 0) {
                    return true
                }
        }
        return false
    },
  
    checkHighScore: function() {
        let newRecord = false
        let formattedTime = ''
        switch (difficulty) {
        case 'easy':
            if (runningTimer < this.easyRecordTime || this.easyRecordTime == -1)
            {
                newRecord = true
                this.easyWinCount++
                this.easyRecordTime = runningTimer
                formattedTime = secondsToClockFormat(runningTimer)
                $('.easyWinCount').text(this.easyWinCount)
                $('.easyRecordTime').text(formattedTime)
                localStorage.setItem('easyRecordTime', this.easyRecordTime)
                localStorage.setItem('easyWinCount', this.easyWinCount)
            }
            break;
        case 'medium':
            if (runningTimer < this.mediumRecordTime || this.mediumRecordTime == -1)
            {
                newRecord = true
                this.mediumWinCount++
                this.mediumRecordTime = runningTimer
                formattedTime = secondsToClockFormat(runningTimer)
                $('.mediumWinCount').text(this.mediumWinCount)
                $('.mediumRecordTime').text(formattedTime)
                localStorage.setItem('mediumRecordTime', this.mediumRecordTime)
                localStorage.setItem('mediumWinCount', this.mediumWinCount)
            }
            break;
        case 'hard':
            if (runningTimer < this.hardRecordTime || this.hardRecordTime == -1)
            {
                newRecord = true
                this.hardWinCount++
                this.hardRecordTime = runningTimer
                formattedTime = secondsToClockFormat(runningTimer)
                $('.hardWinCount').text(this.hardWinCount)
                $('.hardRecordTime').text(formattedTime)
                localStorage.setItem('hardRecordTime', this.hardRecordTime)
                localStorage.setItem('hardWinCount', this.hardWinCount)
            }
            break;
        }

        if (newRecord) {
            $('.highScore').text(formattedTime)
            $('.highScores, .highScoreWrapper, #newHighScore, #newRecordWrapper').removeClass('hidden')
        }
    },
  
    getCurrentHighScore: function () {
        let currentHighScoreFormatted = '--:--'
        switch (difficulty) {
            case 'easy':
                if (this.easyWinCount > 0) {
                    currentHighScoreFormatted = secondsToClockFormat(this.easyRecordTime)
                }
                break;
            case 'medium':
                if (this.mediumWinCount > 0) {
                    currentHighScoreFormatted = secondsToClockFormat(this.mediumRecordTime)
                }
                break;
            case 'hard':
                if (this.hardWinCount > 0) {
                    currentHighScoreFormatted = secondsToClockFormat(this.hardRecordTime)
                }
                break;
        }


        $('.highScore').text(currentHighScoreFormatted)
    }
}
  
var difficulty = {
    init: function () {
        this.storageKey = 'difficulty'

        this.difficulties = {
            easy: 'easy',
            medium: 'medium',
            hard: 'hard'
        }

        let storageDifficulty = localStorage.getItem(this.storageKey)

        if (storageDifficulty == null) {
            storageDifficulty = this.difficulties.easy
            localStorage.setItem(this.storageKey, storageDifficulty)
        }
        this.currentTheme = storageDifficulty

        this.currentDifficulty = this.difficulties.easy
    },

    setDifficulty: function (newDifficulty) {
        localStorage.setItem(this.storageKey, newDifficulty)
    },

    getDifficulty: function () {
        return $('#difficulty').val()
    }
}