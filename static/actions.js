var waves;
var slider;
var sliderInfo;
var playerIsPaused = true;

$(document).ready(function(){
    waves = [];
    $(".tracks-wrapper .track").each(function( index ) {
      // console.log( index + ": " + $( this ).attr("data-audiofile") );
        var wavesurfer = WaveSurfer.create({
            container: "#" + $(this).attr("id"),
            waveColor: 'white',
            progressColor: 'gray',
            cursorColor: '#4353FF',
            barWidth: 2,
            barRadius: 1,
            cursorWidth: 1,
            height: 50,
            barGap: 4,
            normalize: true,
            responsive: true
        });
        waves.push(wavesurfer);
        wavesurfer.load($(this).attr("data-audiofile"));
    });
    slider = tns({
        container: '.tracks-slider',
        items: 1,
        slideBy: "page",
        mouseDrag: false,
        swipeAngle: false,
        speed: 2000,
        prevButton: ".tracks-controls-prev",
        nextButton: ".tracks-controls-next",
        nav: false
    });
    var granimInstance = new Granim({
        element: '.main-canvas',
        direction: 'top-bottom',
        isPausedWhenNotInView: true,
        states : {
            "default-state": {
                gradients: [
                    ['#03112c', '#112e6e'],
                    ['#011b2a', '#0b5383'],
                    ['#00273f', '#00798f']
                ]
            }
        },
        onStart: function () {
            $(".content").show(1500);
            $(".header-nav-button").show(2000);
            $(".header-nav-button").fadeTo(2000, 0.7);
            $(".content").fadeTo(400, 1);
            $(".main-name").fadeTo(1000, 1);
            $(".main-name-sign").show(1500);
            $(".main-name-sign").fadeTo(3000, 0.75);
        }
    });
    scrollCue.init({
        docSlider:true,
        pageChangeReset:true,
        duration:2000
    });
    docSlider.init({
        speed: 600,
        scrollReset:true,
    });
    $(".docSlider-pager").fadeTo(6000, 0.8);
});
$(".tracks-controls-play-pause").click(function () {
    var currentTrackIndex = parseInt($(".tns-slide-active .track").attr("data-index")) - 1;
    if (playerIsPaused) {
        $(".tracks-controls-play-pause img").attr("src", "/static/icons/pause.svg");
        playerIsPaused = false;
    }
    else {
        $(".tracks-controls-play-pause img").attr("src", "/static/icons/play.svg");
        playerIsPaused = true;
    }
    waves[currentTrackIndex].playPause();
});


$(".tracks-controls-prev").click(function () {
    waves.forEach(function (element) {
        element.pause();
        $(".tracks-controls-play-pause img").attr("src", "/static/icons/play.svg");
        playerIsPaused = true;
    })
});

$(".tracks-controls-next").click(function () {
    waves.forEach(function (element) {
        element.pause();
        $(".tracks-controls-play-pause img").attr("src", "/static/icons/play.svg");
        playerIsPaused = true;
    })
});

$(".navbar a").click(function () {
    docSlider.jumpPage($(this).attr("nav-button-index"));
});