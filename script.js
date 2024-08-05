$(document).ready(function () {
  $("section").each(function () {
    $(".slider-navigation").prepend('<div class="tick"></div>');
  });

  $(".tick").on("click", function () {
    var tickIndex = $(this).index();
    $("body").scrollTop($(window).height() * tickIndex);
  });

  updatePos();
});

var isDragging = false;
var sliderTop, pointerPos, currentSection;
var bodyHeight = $("body").height();
var sliderHeight = $(".slider-navigation").height();
var elementHeight = $("section").height();
var sectionAmount = $("section").length;
var scale =
  (bodyHeight - elementHeight) /
  (sliderHeight - $(".nav-pointer").outerHeight());

function updatePos() {
  var scrollTop = $(window).scrollTop();
  var maxScroll = $("body").height() - $(window).height();
  var scrollPercentage = (scrollTop / maxScroll) * 100;

  // Update slider pointer position
  currentSection = scrollTop / elementHeight;
  currentSectionNum = Math.ceil(currentSection + 0.01);
  sliderTop = scrollTop / scale;

  $(".nav-pointer")
    .css("top", sliderTop)
    .text("DAY" + " " + currentSectionNum);

  // Update the position of the orange divider
  $(".orange-divider").css("top", scrollPercentage + "%");
}

function sliderMove(e) {
  $("body").scrollTop(parseInt(e) * scale);
}

$(window).scroll(function () {
  if (!isDragging) {
    updatePos();
  }
});

$(window).resize(function () {
  waitForFinalEvent(
    function () {
      bodyHeight = $("body").height();
      sliderHeight = $(".slider-navigation").height();
      elementHeight = $("section").height();
      sectionAmount = $("section").length;
      scale =
        (bodyHeight - elementHeight) /
        (sliderHeight - $(".nav-pointer").outerHeight());

      updatePos();
    },
    500,
    "resizing"
  );
});

gsap.fromTo(
  ".slider-navigation",
  {
    y: -200, // Initial position off-screen
    scaleY: 1.5, // Optional: scale to extend vertically
  },
  {
    y: 0, // Final position in view
    scaleY: 1, // Reset scale to original
    duration: 0.2,
    scrollTrigger: {
      trigger: "main1",
      scroller: "main1",
      start: "top 40%",
      end: "top 0%",
      markers: false,
      scrub: 2,
    },
  }
);

gsap.from(".heading-div h1 span", {
  y: -120,
  opacity: 0,
  stagger: 0.3,
  duration: 2,
  scrollTrigger: {
    trigger: "main1",
    scroller: "main1",
    start: "top 100%",
    end: "top 0%",
    markers: false,
    scrub: 2,
  },
  delay: 2,
});
