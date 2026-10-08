/* =====================================================
   FRAME/ — JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuButton =
    document.querySelector(".menu-btn");

const navLinks =
    document.querySelector(".nav-links");


if (menuButton && navLinks) {

    menuButton.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "mobile-active"
            );

            menuButton.classList.toggle(
                "active"
            );

        }
    );


    const links =
        navLinks.querySelectorAll("a");


    links.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navLinks.classList.remove(
                    "mobile-active"
                );

                menuButton.classList.remove(
                    "active"
                );

            }
        );

    });

}



/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


if (
    sections.length &&
    navigationLinks.length
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const currentId =
                            entry.target.id;


                        navigationLinks.forEach(
                            link => {

                                link.classList.remove(
                                    "active"
                                );


                                if (
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${currentId}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    }

                });

            },
            {
                threshold: 0.45
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(
            section
        );

    });

}



/* =====================================================
   PROJECT CARD CLICK
===================================================== */

const projectCards =
    document.querySelectorAll(
        ".project"
    );


projectCards.forEach(project => {

    project.addEventListener(
        "click",
        () => {

            console.log(
                "Editing service selected."
            );

        }
    );

});



/* =====================================================
   PAGE LOAD
===================================================== */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

        console.log(
            "FRAME/ portfolio loaded successfully."
        );

    }
);



/* =====================================================
   SHOWREEL PLAY OVERLAY
===================================================== */

const showreelVideo =
    document.querySelector(
        ".showreel-image"
    );


const showreelFrame =
    document.querySelector(
        ".showreel-frame"
    );


if (
    showreelVideo &&
    showreelFrame
) {

    showreelVideo.addEventListener(
        "play",
        () => {

            showreelFrame.classList.add(
                "playing"
            );

        }
    );


    showreelVideo.addEventListener(
        "pause",
        () => {

            showreelFrame.classList.remove(
                "playing"
            );

        }
    );


    showreelVideo.addEventListener(
        "ended",
        () => {

            showreelFrame.classList.remove(
                "playing"
            );

        }
    );

}