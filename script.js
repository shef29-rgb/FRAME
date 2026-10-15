
/* =====================================================
   FRAME/ — PORTFOLIO INTERACTIONS
===================================================== */

/* MOBILE NAVIGATION */
const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("mobile-active");

        menuButton.classList.toggle("active", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("mobile-active");
            menuButton.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}


/* ACTIVE NAVIGATION LINK */
const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

if (
    sections.length &&
    navigationLinks.length &&
    "IntersectionObserver" in window
) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            navigationLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${entry.target.id}`
                );
            });
        });
    }, {
        threshold: 0.35
    });

    sections.forEach(section => sectionObserver.observe(section));
}


/* =====================================================
   CATEGORY VIDEO DATA
   Update video paths when your client videos arrive.
===================================================== */

const categoryVideos = {

    "short-form": {
        title: "Short-Form Videos",
        items: [
            ["Hook-Driven Insight Short", "videos/short-form/hook-driven-insight.mp4"],
            ["Story-Arc Short", "videos/short-form/story-arc-short.mp4"],
            ["Controversial Soundbite Short", "videos/short-form/controversial-soundbite.mp4"],
            ["Listicle / Quick-Tip Short", "videos/short-form/listicle-quick-tip.mp4"]
        ]
    },

    "long-form": {
        title: "Long-Form Videos",
        items: [
            ["Talking-Head Tutorial / Explainer", "videos/long-form/talking-head-tutorial.mp4"],
            ["Podcast / Interview Full Episode Edit", "videos/long-form/podcast-interview.mp4"],
            ["Product / SaaS Walkthrough", "videos/long-form/product-saas-walkthrough.mp4"]
        ]
    },

    "documentary": {
        title: "Documentary Edits",
        items: [
            ["Short Documentary-Style Profile", "videos/documentary/short-profile.mp4"],
            ["Issue / Topic Mini-Documentary", "videos/documentary/mini-documentary.mp4"]
        ]
    },

    "motion-graphics": {
        title: "Motion Graphics Edits",
        items: [
            ["Explainer with Animated Graphics", "videos/motion-graphics/animated-explainer.mp4"],
            ["Lower-Thirds and Title Sequence Pack", "videos/motion-graphics/lower-thirds-title-sequence.mp4"]
        ]
    },

    "color-grading": {
        title: "Color Grading",
        items: [
            ["Before / After: Flat-to-Cinematic Grade", "videos/color-grading/flat-to-cinematic.mp4"],
            ["Skin-Tone Consistency Reel", "videos/color-grading/skin-tone-consistency.mp4"],
            ["Mood-Based Grade Comparison", "videos/color-grading/mood-based-comparison.mp4"]
        ]
    },

    "sound-design": {
        title: "Sound Design",
        items: [
            ["Dialogue Cleanup + Music Bed", "videos/sound-design/dialogue-cleanup-music.mp4"],
            ["SFX-Driven Short-Form Edit", "videos/sound-design/sfx-driven-short.mp4"],
            ["Full Ambient + Music Mix", "videos/sound-design/ambient-music-mix.mp4"]
        ]
    },

    "after-effects": {
        title: "After Effects Animation",
        items: [
            ["Kinetic Typography", "videos/after-effects/kinetic-typography.mp4"],
            ["2D Animation", "videos/after-effects/2d-animation.mp4"]
        ]
    }

};


/* =====================================================
   CATEGORY GALLERY ELEMENTS
===================================================== */

const projectCards = document.querySelectorAll(
    ".category-card[data-category]"
);

const categoryShowcase = document.querySelector("#category-showcase");
const categoryTitle = document.querySelector("#showcase-title");
const showcaseGrid = document.querySelector("#showcase-grid");
const showcaseBack = document.querySelector("#showcase-back");

const projectsGrid = document.querySelector(".category-projects");


/* STOP VIDEOS WHEN LEAVING A CATEGORY */
function stopShowcaseVideos() {

    if (!showcaseGrid) return;

    showcaseGrid.querySelectorAll("video").forEach(video => {

        video.pause();
        video.removeAttribute("src");

        video.querySelectorAll("source").forEach(source => {
            source.removeAttribute("src");
        });

        video.load();

    });

}


/* OPEN A CATEGORY */
function openShowcase(categoryKey) {

    if (!categoryShowcase || !categoryTitle || !showcaseGrid) {
        console.error("Category gallery elements were not found in index.html.");
        return;
    }

    const category = categoryVideos[categoryKey];

    if (!category) {
        console.error("Category not found:", categoryKey);
        return;
    }

    stopShowcaseVideos();

    showcaseGrid.replaceChildren();

    categoryTitle.textContent = category.title;


    /* CREATE EACH VIDEO CARD */
    category.items.forEach(([label, source], index) => {

        const card = document.createElement("article");
        card.className = "showcase-video-card";


        /* PROJECT NUMBER */
        const number = document.createElement("span");
        number.className = "showcase-video-number";

        number.textContent = String(index + 1).padStart(2, "0");


        /* VIDEO FRAME */
        const frame = document.createElement("div");
        frame.className = "showcase-video-frame";


        /* VIDEO PLAYER */
        const video = document.createElement("video");

        video.controls = true;
        video.preload = "metadata";
        video.playsInline = true;

        video.setAttribute("aria-label", label);


        /* VIDEO SOURCE */
        const videoSource = document.createElement("source");

        videoSource.src = source;
        videoSource.type = "video/mp4";

        video.appendChild(videoSource);


        /* PROJECT TITLE */
        const title = document.createElement("h4");

        title.textContent = label;


        /* VIDEO PATH */
        const note = document.createElement("p");

        note.className = "video-source-note";
        note.textContent = source;


        /* MISSING VIDEO MESSAGE */
        const missing = document.createElement("p");

        missing.className = "video-missing";

        missing.textContent =
            "Add your video at this path, or update the filename in script.js.";

        missing.style.display = "none";


        video.addEventListener("error", () => {
            missing.style.display = "block";
        });


        /* ADD ELEMENTS TO THE CARD */
        frame.appendChild(video);

        card.append(
            number,
            frame,
            title,
            note,
            missing
        );

        showcaseGrid.appendChild(card);

    });


    /* SHOW GALLERY */
    if (projectsGrid) {
        projectsGrid.hidden = true;
    }

    categoryShowcase.hidden = false;

    categoryShowcase.setAttribute("aria-hidden", "false");

    categoryShowcase.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* CLOSE CATEGORY GALLERY */
function closeShowcase() {

    if (!categoryShowcase) return;

    stopShowcaseVideos();

    categoryShowcase.hidden = true;

    categoryShowcase.setAttribute("aria-hidden", "true");

    if (projectsGrid) {
        projectsGrid.hidden = false;
    }

}


/* CLICK CATEGORY CARDS */
projectCards.forEach(card => {

    card.addEventListener("click", () => {
        openShowcase(card.dataset.category);
    });


    /* KEYBOARD ACCESSIBILITY */
    card.addEventListener("keydown", event => {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();

            openShowcase(card.dataset.category);

        }

    });

});


/* BACK TO ALL CATEGORIES */
if (showcaseBack) {

    showcaseBack.addEventListener("click", () => {

        closeShowcase();

        if (projectsGrid) {
            projectsGrid.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    });

}


/* =====================================================
   SHOWREEL PLAY OVERLAY
===================================================== */

const showreelVideo = document.querySelector(".showreel-image");

const playOverlay = document.querySelector(".play-overlay");

if (showreelVideo && playOverlay) {

    const updateOverlay = () => {
        playOverlay.style.opacity = showreelVideo.paused ? "1" : "0";
    };

    showreelVideo.addEventListener("play", updateOverlay);

    showreelVideo.addEventListener("pause", updateOverlay);

    showreelVideo.addEventListener("ended", updateOverlay);

    updateOverlay();

}


/* =====================================================
   PAGE LOADED
===================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    console.log("FRAME/ portfolio loaded successfully.");

});