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
});