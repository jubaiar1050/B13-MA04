let currentTab = "all";
const tabActive = 'btn-primary';
const tabInactive = 'bg-white';

const allContainer = document.getElementById('all-container');
const interveiwContainer = document.getElementById('interveiw-container');
const rejectedContainer = document.getElementById('rejected-container');
const emptyState = document.getElementById('empty-state');

function switchTab(tab) {
    currentTab = tab;
    const tabs = ["all", "interveiw", "rejected"];
    for (const t of tabs) {
        const tabName = document.getElementById("tab-" + t);
        if (tab === t) {
            tabName.classList.add(tabActive);
            tabName.classList.remove(tabInactive);
        }
        else {
            tabName.classList.remove(tabActive);
            tabName.classList.add(tabInactive);
        }
    }

    emptyState.classList.add("hidden");

    const pages = [allContainer, interveiwContainer, rejectedContainer]
    for (const section of pages) {
        section.classList.add('hidden');
    }
    if (tab === 'all') {
        allContainer.classList.remove('hidden');
        if (allContainer.children.length < 1) {
            emptyState.classList.remove('hidden');
        }
    }
    else if (tab === 'interveiw') {
        interveiwContainer.classList.remove('hidden');
        if (interveiwContainer.children.length < 1) {
            emptyState.classList.remove('hidden');
        }
    }
    else {
        rejectedContainer.classList.remove('hidden');
        if (rejectedContainer.children.length < 1) {
            emptyState.classList.remove('hidden');
        }
    }
    updatState();
}

// update state
const allState = document.getElementById('all-state');
const interveiwState = document.getElementById('interveiw-state');
const rejectedState = document.getElementById('rejected-state');
const availableState = document.getElementById('available');
switchTab(currentTab);

document.getElementById('jobs-container').addEventListener("click", function(event){
    const clickedElement = event.target;
    const card = clickedElement.closest(".Card");
    const status = card.querySelector(".Status");
    const parent = card.parentNode;

    if (clickedElement.classList.contains("interveiw")) {
        status.innerHTML = ` <button class="btn-outline btn-success">Interview</button> `;
        interveiwContainer.appendChild(card);
    }
    if (clickedElement.classList.contains("rejected")) {
        status.innerHTML = ` <button class="btn-outline btn-error rejected">Rejected</button> `;
        rejectedContainer.appendChild(card);
    }
    if (clickedElement.classList.contains("delete-btn")) {
        parent.removeChild(card);
    }
    updatState();
})

function updatState(){
    const counts = {
        all: allContainer.children.length,
        interveiw: interveiwContainer.children.length,
        rejected: rejectedContainer.children.length,
    }
    allState.innerText = counts.all;
    interveiwState.innerText = counts.interveiw;
    rejectedState.innerText = counts.rejected;

    availableState.innerText = counts[currentTab];

    if (counts[currentTab] < 1){
        emptyState.classList.remove("hidden");
    }
    else {
        emptyState.classList.add("hidden");
    }
}
updatState();