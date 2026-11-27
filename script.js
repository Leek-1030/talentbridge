// TALENTBRIDGE - Skills Without Borders

console.log("Welcome to TALENTBRIDGE!");

const skillsForm = document.getElementById("skillsForm");
const profileResult = document.getElementById("profileResult");

// Save and display a Skills Passport
skillsForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const profile = {
        fullName: document.getElementById("fullName").value,
        skills: document.getElementById("skills").value,
        education: document.getElementById("education").value,
        experience: document.getElementById("experience").value
    };

    localStorage.setItem("talentbridgeProfile", JSON.stringify(profile));

    profileResult.innerHTML = `
        <h3>Your Skills Passport Has Been Saved!</h3>
        <p><strong>Name:</strong> ${escapeHTML(profile.fullName)}</p>
        <p><strong>Skills:</strong> ${escapeHTML(profile.skills)}</p>
        <p><strong>Education:</strong> ${escapeHTML(profile.education)}</p>
        <p><strong>Experience:</strong> ${escapeHTML(profile.experience)}</p>
    `;

    skillsForm.reset();
});

// Safely display user-entered text
function escapeHTML(value) {
    return value.replace(/[&<>"']/g, function(character) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[character];
    });
}

console.log("TALENTBRIDGE is ready!");
// EVIDENCE WALLET FUNCTIONALITY

const evidenceForm = document.getElementById("evidenceForm");
const evidenceList = document.getElementById("evidenceList");

// Load previously saved evidence
let evidenceItems = JSON.parse(
    localStorage.getItem("talentbridgeEvidence") || "[]"
);

function displayEvidence() {
    evidenceList.innerHTML = "<h3>My Evidence</h3>";

    evidenceItems.forEach(function(item) {
        const card = document.createElement("div");
        card.className = "evidence-card";

        const title = document.createElement("h4");
        title.textContent = item.title;

        const type = document.createElement("p");
        type.textContent = "Type: " + item.type;

        const description = document.createElement("p");
        description.textContent = item.description;

        card.append(title, type, description);
        evidenceList.appendChild(card);
    });
}

evidenceForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const evidence = {
        title: document.getElementById("evidenceTitle").value,
        type: document.getElementById("evidenceType").value,
        description: document.getElementById("evidenceDescription").value
    };

    evidenceItems.push(evidence);

    localStorage.setItem(
        "talentbridgeEvidence",
        JSON.stringify(evidenceItems)
    );

    displayEvidence();
    evidenceForm.reset();

    alert("Your evidence has been saved successfully!");
});

// Display saved evidence when the page opens
displayEvidence();
// CAREER READINESS CHECKLIST

const checklistItems = document.querySelectorAll(
    ".readiness-container input[type='checkbox']"
);

// Restore saved progress
const savedChecklist = JSON.parse(
    localStorage.getItem("talentbridgeChecklist") || "[]"
);

checklistItems.forEach(function(checkbox, index) {
    checkbox.checked = savedChecklist[index] || false;

    checkbox.addEventListener("change", function() {
        const progress = Array.from(checklistItems).map(
            item => item.checked
        );

        localStorage.setItem(
            "talentbridgeChecklist",
            JSON.stringify(progress)
        );
    });
});
// RESTORE SAVED SKILLS PASSPORT

const savedProfile = localStorage.getItem("talentbridgeProfile");

if (savedProfile) {
    const profile = JSON.parse(savedProfile);

    profileResult.innerHTML = `
        <h3>Your Saved Skills Passport</h3>
        <p><strong>Name:</strong> ${escapeHTML(profile.fullName)}</p>
        <p><strong>Skills:</strong> ${escapeHTML(profile.skills)}</p>
        <p><strong>Education:</strong> ${escapeHTML(profile.education)}</p>
        <p><strong>Experience:</strong> ${escapeHTML(profile.experience)}</p>
    `;
}
// DELETE ALL SAVED TALENTBRIDGE DATA

const deleteDataBtn = document.getElementById("deleteDataBtn");

deleteDataBtn.addEventListener("click", function() {
    const confirmDelete = confirm(
        "Are you sure you want to delete all your saved TALENTBRIDGE data?"
    );

    if (confirmDelete) {
        localStorage.removeItem("talentbridgeProfile");
        localStorage.removeItem("talentbridgeEvidence");
        localStorage.removeItem("talentbridgeChecklist");

        // Clear the displayed information
        profileResult.innerHTML = "";
        evidenceItems = [];
        displayEvidence();

        // Reset forms and checklist
        skillsForm.reset();
        evidenceForm.reset();

        checklistItems.forEach(function(item) {
            item.checked = false;
        });

        alert("Your saved TALENTBRIDGE data has been deleted.");
    }
});