var buttonColours = ['red', 'blue', 'green', 'yellow'];

var userClickedPattern = [];

var gamePattern = [];

var level = 0;

var started = false;

$(document).keypress(function () {
	if (!started) {
		$("#level-title").text(`Level ${level}`);
		nextSequence();
		started = true;
	}
});

function nextSequence() {
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);

	level++;
	$('#level-title').text(`Level ${level}`);

	userClickedPattern = [];
}

$('.btn').on('click', function () {
	var userChosenColour = $(this).attr('id');
	userClickedPattern.push(userChosenColour);

	playSound(userChosenColour);
	animatePress(userChosenColour);

	checkAnwswer(userClickedPattern.length - 1);
});

function playSound(name) {
	var audio = new Audio(`sounds/${name}.mp3`);
	audio.play();
}

function animatePress(currentColour) {
	$(`#${currentColour}`).addClass('pressed');
	setTimeout(function () {
		$(`#${currentColour}`).removeClass('pressed');
	}, 100);
}

function checkAnwswer(currentlevel) {
	if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
		if (gamePattern.length === userClickedPattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound('wrong');

		$('body').addClass('game-over');
		$('h1').text('Game Over Press Any Key to Restart');
		setTimeout(function () {
			$('body').removeClass('game-over');
		}, 200);
		startOver();
	}
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}
