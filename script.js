const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


//gsap for animation
function firstPageAnimation() {
    var tl = gsap.timeline();

    tl.from('#nav', {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to('.bound-elem', {
            y: 0,
            ease: Expo.easeInOut,
            duration: 1.5,
            delay: -1,
            stagger: .2
        })
        .from('#hero-footer', {
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut
        })
}

var timeout;

function circleSqueeze() {
    //default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener('mousemove', function (details) {
        clearTimeout(timeout);

        // var xdiff = details.clientX - xprev;
        // var ydiff = details.clientY- yprev;
        xscale = gsap.utils.clamp(0.8, 1.2, details.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, details.clientY - yprev);

        xprev = details.clientX;
        yprev = details.clientY;

        circleMove(xscale, yscale)
        // console.log(xdiff, ydiff);

        timeout = setTimeout(function () {
            document.querySelector('#mini-circle').style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1,1)`;
        }, 100)
    })
}


function circleMove(xscale, yscale) {
    window.addEventListener('mousemove', function (details) {
        document.querySelector('#mini-circle').style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

circleMove();
firstPageAnimation();
circleSqueeze();


document.querySelectorAll('.element').forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener('mousemove', (details) => {
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX

        gsap.to(elem.querySelector('.image'), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
        });
    });

    elem.addEventListener('mouseleave', () => {
        gsap.to(elem.querySelector('.image'), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });
});