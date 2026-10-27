async function loadComponents(contents, filePath) {
    try {
        let response = await fetch(filePath);
        if (!response.ok) {
            console.error("Failed to fetch contents.");
            return;
        }
        contents.innerHTML = await response.text();
    }
    catch (error) {
        console.error("An error occurred while fetching ${filePath}:.", error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const contacts = document.querySelector("#contacts");
    if (!contacts) {
        console.error("Placeholder #contacts not found in this page.");
    }
    await loadComponents(contacts, "contacts.html");

    const topnav = document.querySelector("#topnav");
    if (!topnav) {
        console.error("Placeholder #topnav not found in this page.");
    }
    await loadComponents(topnav, "TopNav.html");

    const slideShow = document.querySelector("#slideshow");
    if (slideShow) {
        initSlideshow(slideShow, projectSlides);
    }
});

const projectSlide = {
    aHRef : "",
    caption : "",
    image : ""
}

let projectSlides = [
    {
        aHRef : "Group Projects.html#Aislinn",
        caption : "Aislinn by Daydreams Studio",
        image : "Images/AislinnThumbnail.png"
    },
    {
        aHRef : "Group Projects.html#HiveMind",
        caption : "HiveMind by Deathcap Studios",
        image : "Images/HiveMindThumbnail.png"
    },
    {
        aHRef : "Group Projects.html#DiplomaticEmmunity",
        caption : "Diplomatic Emmunity by The Emu Agenda",
        image : "Images/Diplomatic_Emmunity.png"
    }
]

function initSlideshow(container, slideData) {
    if (slideData.length === 0) {
        console.error("Slideshow has no slides to show.");
        return;
    }

    let currentIndex = 0;
    const slideElements = [];
    const dotElements = [];

    // Show the new slide and update the dots
    function showSlide(newIndex) {
        slideElements[currentIndex].classList.remove("active");
        dotElements[currentIndex].classList.remove("active");

        currentIndex = (newIndex + slideElements.length) % slideElements.length;

        slideElements[currentIndex].classList.add("active");
        dotElements[currentIndex].classList.add("active");
    }

    // Contains the dots
    const dotsHolder = document.createElement("div");
    dotsHolder.className = "dots";
    dotsHolder.style.textAlign = "center";

    slideData.forEach((data, index) => {
        // Set the class of the slide
        const slide = document.createElement("div");
        slide.className = "mySlides";

        // Assign the link
        const link = document.createElement("a");
        link.href = data.aHRef;

        // Assign the image to display
        const img = document.createElement("img");
        img.src = data.image;
        img.alt = "";
        if (index > 0) {
            img.loading = "lazy";
        }

        // Set the caption for the slide
        const caption = document.createElement("div");
        caption.className = "caption";
        caption.textContent = data.caption;

        // Append each array/list
        link.append(img, caption);
        slide.append(link);
        container.append(slide);
        slideElements.push(slide);

        // Update the dots for navigation
        const dot = document.createElement("a");
        dot.className = "dot";
        dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
        dot.addEventListener("click", () => showSlide(index));
        dotsHolder.append(dot);
        dotElements.push(dot);
    });

    // Previous button
    const prev = document.createElement("a");
    prev.className = "prev";
    prev.textContent = "\u276E";
    prev.setAttribute("aria-label", "Previous slide");
    prev.addEventListener("click", () => showSlide(currentIndex - 1));

    // Next button
    const next = document.createElement("a");
    next.className = "next";
    next.textContent = "\u276F";
    next.setAttribute("aria-label", "Next slide");
    next.addEventListener("click", () => showSlide(currentIndex + 1));

    container.append(prev, next, dotsHolder);

    // Show the first slide once everything exists
    slideElements[0].classList.add("active");
    dotElements[0].classList.add("active");
}