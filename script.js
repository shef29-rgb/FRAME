/* =====================================================
   FRAME/ — JAVASCRIPT
===================================================== */


/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });


    /* Close menu after clicking a link */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    });

}



/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-menu a");


const observerOptions = {

    root: null,

    threshold: 0.25

};


const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const currentId = entry.target.getAttribute("id");


                navigationLinks.forEach(link => {

                    link.classList.remove("active");

                });


                const activeLink =
                    document.querySelector(
                        `.nav-menu a[href="#${currentId}"]`
                    );


                if (activeLink) {

                    activeLink.classList.add("active");

                }

            }

        });

    },
    observerOptions
);


sections.forEach(section => {

    sectionObserver.observe(section);

});



/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");


        if (targetId === "#") {
            return;
        }


        const target =
            document.querySelector(targetId);


        if (target) {

            event.preventDefault();


            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

});



/* =========================
   SHOWREEL PLACEHOLDER
========================= */

const showreelFrame =
    document.querySelector(".showreel-frame");


if (showreelFrame) {

    showreelFrame.addEventListener("click", () => {

        console.log(
            "Showreel clicked — connect your showreel video here."
        );

    });

}



/* =========================
   WORK CARD INTERACTION
========================= */

const workCards =
    document.querySelectorAll(".work-card");


workCards.forEach(card => {

    card.addEventListener("click", () => {

        const title =
            card.querySelector("h3");

        if (title) {

            console.log(
                "Selected:",
                title.innerText
            );

        }

    });

});



/* =========================
   PAGE LOAD
========================= */

window.addEventListener("load", () => {

    console.log(
        "FRAME/ portfolio loaded successfully."
    );

});