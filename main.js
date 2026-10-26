async function displayContacts(contents, filePath) {
    try {
        let response = await fetch(filePath);
        if (!response.ok) {
            console.error("Failed to fetch contacts.");
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
    await displayContacts(contacts, "contacts.html");
});