/* =========================================
   FRAME/ — ORIGINAL JAVASCRIPT
========================================= */


/* MOBILE MENU */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });


    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    });

}



/* ACTIVE NAVIGATION */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-menu a");


const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const id = entry.target.getAttribute("id");


                navigationLinks.forEach(link => {

                    link.classList.remove("active");

                });


                const activeLink =
                    document.querySelector(
                        `.nav-menu a[href="#${id}"]`
                    );


                if (activeLink) {

                    activeLink.classList.add("active");

                }

            }

        });

    },

    {
        threshold: 0.25
    }

);


sections.forEach(section => {

    observer.observe(section);

});



/* SMOOTH SCROLL */

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
                behavior: "smooth"
            });

        }

    });

});



/* SHOWREEL */

const showreel =
    document.querySelector(".showreel");


if (showreel) {

    showreel.addEventListener("click", () => {

        console.log(
            "Showreel clicked."
        );

    });

}



/* WORK CARDS */

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


/* PAGE LOADED */

console.log(
    "FRAME/ portfolio loaded."
);