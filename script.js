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
   VIDEO CATEGORY DATA
===================================================== */

/*
    CHANGE ONLY THE VIDEO FILENAMES HERE.

    Keep the category names and titles.

    Example:

    src: "my-real-video.mp4"

    If your videos are inside a folder called videos:

    src: "videos/my-real-video.mp4"
*/


const videoCategories = {

    "short-form": {

        title: "SHORT-FORM VIDEOS",

        videos: [

            {
                title: "HOOK-DRIVEN INSIGHT SHORT",
                src: "short-hook.mp4"
            },

            {
                title: "STORY-ARC SHORT",
                src: "short-story.mp4"
            },

            {
                title: "CONTROVERSIAL SOUNDBITE SHORT",
                src: "short-soundbite.mp4"
            },

            {
                title: "LISTICLE / QUICK-TIP SHORT",
                src: "short-listicle.mp4"
            }

        ]

    },


    "long-form": {

        title: "LONG-FORM VIDEOS",

        videos: [

            {
                title: "TALKING-HEAD TUTORIAL / EXPLAINER",
                src: "long-tutorial.mp4"
            },

            {
                title: "PODCAST / INTERVIEW FULL EPISODE EDIT",
                src: "long-podcast.mp4"
            },

            {
                title: "PRODUCT / SAAS WALKTHROUGH",
                src: "long-product.mp4"
            }

        ]

    },


    "documentary": {

        title: "DOCUMENTARY EDITS",

        videos: [

            {
                title: "SHORT DOCUMENTARY-STYLE PROFILE",
                src: "documentary-profile.mp4"
            },

            {
                title: "ISSUE / TOPIC MINI-DOCUMENTARY",
                src: "documentary-topic.mp4"
            }

        ]

    },


    "motion": {

        title: "MOTION GRAPHICS EDITS",

        videos: [

            {
                title: "EXPLAINER WITH ANIMATED GRAPHICS",
                src: "motion-explainer.mp4"
            },

            {
                title: "LOWER-THIRDS AND TITLE SEQUENCE PACK",
                src: "motion-titles.mp4"
            }

        ]

    },


    "color": {

        title: "COLOR GRADING",

        videos: [

            {
                title: "BEFORE / AFTER FLAT-TO-CINEMATIC GRADE",
                src: "color-cinematic.mp4"
            },

            {
                title: "SKIN-TONE CONSISTENCY REEL",
                src: "color-skin.mp4"
            },

            {
                title: "MOOD-BASED GRADE COMPARISON",
                src: "color-mood.mp4"
            }

        ]

    },


    "sound": {

        title: "SOUND DESIGN",

        videos: [

            {
                title: "DIALOGUE CLEANUP + MUSIC BED",
                src: "sound-dialogue.mp4"
            },

            {
                title: "SFX-DRIVEN SHORT-FORM EDIT",
                src: "sound-sfx.mp4"
            },

            {
                title: "FULL AMBIENT + MUSIC MIX",
                src: "sound-ambient.mp4"
            }

        ]

    },


    "after-effects": {

        title: "AFTER EFFECTS ANIMATION",

        videos: [

            {
                title: "KINETIC TYPOGRAPHY",
                src: "aftereffects-kinetic.mp4"
            },

            {
                title: "2D ANIMATION",
                src: "aftereffects-2d.mp4"
            }

        ]

    }

};



/* =====================================================
   VIDEO SHOWCASE
===================================================== */

const categoryCards =
    document.querySelectorAll(
        ".video-category"
    );


const videoShowcase =
    document.getElementById(
        "videoShowcase"
    );


const videoGrid =
    document.getElementById(
        "videoGrid"
    );


const showcaseTitle =
    document.getElementById(
        "showcaseTitle"
    );


const showcaseClose =
    document.getElementById(
        "videoShowcaseClose"
    );


const showcaseBackdrop =
    document.querySelector(
        ".video-showcase-backdrop"
    );



function openVideoShowcase(categoryKey) {

    if (
        !videoShowcase ||
        !videoGrid ||
        !showcaseTitle
    ) {

        return;

    }


    const category =
        videoCategories[categoryKey];


    if (!category) {

        return;

    }


    showcaseTitle.textContent =
        category.title;


    videoGrid.innerHTML = "";


    category.videos.forEach(
        (videoItem, index) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "showcase-video-card";


            card.innerHTML = `

                <div class="showcase-video-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <div class="showcase-video-frame">

                    <video
                        controls
                        playsinline
                        preload="metadata"
                    >

                        <source
                            src="${videoItem.src}"
                            type="video/mp4"
                        >

                        Your browser does not support the video tag.

                    </video>

                </div>

                <h3>
                    ${videoItem.title}
                </h3>

            `;


            videoGrid.appendChild(card);

        }
    );


    videoShowcase.classList.add(
        "showcase-open"
    );


    videoShowcase.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "showcase-lock"
    );


    setTimeout(() => {

        const firstVideo =
            videoGrid.querySelector(
                "video"
            );

        if (firstVideo) {

            firstVideo.focus();

        }

    }, 100);

}



function closeVideoShowcase() {

    if (!videoShowcase) {

        return;

    }


    const videos =
        videoShowcase.querySelectorAll(
            "video"
        );


    videos.forEach(video => {

        video.pause();

        video.currentTime = 0;

    });


    videoShowcase.classList.remove(
        "showcase-open"
    );


    videoShowcase.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "showcase-lock"
    );

}



categoryCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const categoryKey =
                card.dataset.category;


            openVideoShowcase(
                categoryKey
            );

        }
    );

});



if (showcaseClose) {

    showcaseClose.addEventListener(
        "click",
        closeVideoShowcase
    );

}


if (showcaseBackdrop) {

    showcaseBackdrop.addEventListener(
        "click",
        closeVideoShowcase
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            videoShowcase &&
            videoShowcase.classList.contains(
                "showcase-open"
            )
        ) {

            closeVideoShowcase();

        }

    }
);



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
   HERO SHOWREEL
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