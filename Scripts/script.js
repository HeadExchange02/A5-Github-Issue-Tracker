let allData = [];

const container = document.getElementById("issues-container");
const tabButtons = document.querySelectorAll('#tab-btns button');
const allButton = document.getElementById("tab-all");
const openButton = document.getElementById("tab-open");
const closedButton = document.getElementById("tab-closed");
const detailsModal = document.getElementById("details_modal")

// Loading Function
function showLoading() {
    loadingSpinner.classList.remove("hidden");
}

function hideLoading() {
    loadingSpinner.classList.add("hidden");
}

// Fetch data from API
async function allIssuesData() {
    showLoading();
    const reponse = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await reponse.json()
    hideLoading();
    allData = data.data;
    console.log(allData);
    renderData(allData);
}

// Display ALL Data
function renderData(dataList) {
    console.log(container);
    container.innerHTML = "";

    document.getElementById('issue-total').innerText = `${dataList.length} Issues Found`;
    document.getElementById('open-total').innerText = allData.filter(i => i.status === 'open').length;
    document.getElementById('closed-total').innerText = allData.filter(i => i.status === 'closed').length;

    dataList.forEach(item => {
        const isOpen = item.status === 'open';
        const topBorder = isOpen ? 'border-t-green-500' : 'border-t-purple-500';


        const isPriorityHigh = item.priority === 'high';
        // console.log(isPriorityHigh);

        const isPriorityMedium = item.priority === 'medium';
        // console.log(isPriorityMedium);


        const labelStyle = (item.label && item.label.trim() !== "") ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500";

        const card = document.createElement('div');
        card.className = `bg-white border-t-4 ${topBorder} rounded-lg p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col h-full border border-gray-100`;
        card.onclick = () => getSingleIssue(item.id);

        card.innerHTML = `
            <div class="flex justify-between items-center mb-3">
            <span class="${isOpen ? 'text-green-600' : 'text-purple-600'} text-[10px] font-bold uppercase">
            ${isOpen ? '🟢 Open' : '🟣 Closed'}
            </span>

            <div>
                <h3 class="${isPriorityHigh ? 'text-red-500 font-semibold bg-[#ef444448]' : ''} ${isPriorityMedium ? 'text-yellow-500 font-semibold bg-[#d4da2548]' : ''} text-gray-600 font-semibold bg-[#73717148] px-2 py-1 rounded-2xl">${item.priority}</h3>
            </div>

            </div>
            <h2 class="font-bold text-sm mb-2 text-gray-800 line-clamp-2">${item.title}</h2>
            <p class="text-xl text-gray-500 mb-6 flex-grow line-clamp-3">${item.description}</p>

            <span class="${labelStyle} px-3 py-1 rounded-full text-[10px] font-black uppercase border">
                ${item.labels}
            </span>

            <div class="flex justify-between items-center pt-4 border-t border-gray-50 mt-auto">
                <div class="flex items-center gap-2">
                    <div class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold uppercase">${item.author[0]}</div>
                    <span class="text-[11px] font-bold text-gray-700">${item.author}</span>
                </div>           
            </div>
        `;
        container.appendChild(card);
    })
}

// Change Tab Buttons
function changeTab(type, btn) {
    tabButtons.forEach(button => {
        button.classList.add("btn-soft")
    })
    btn.classList.remove("btn-soft");
    btn.classList.add("btn-primary");

    if (type === 'all') renderData(allData);
    else renderData(allData.filter(i => i.status === type));
}

// Show Modal Function
async function getSingleIssue(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const issue = data.data;

    const modalBody = document.getElementById('modal-body-content');
    modalBody.innerHTML = `
        <div class="mb-4"><span class="bg-blue-600 text-white text-[10px] px-2 py-1 rounded font-bold uppercase">${issue.label || 'N/A'}</span></div>
        <h3 class="font-black text-2xl text-gray-800 mb-4">${issue.title}</h3>
        <p class="text-gray-600 text-sm mb-6 bg-gray-50 p-4 rounded-lg border-l-4 border-blue-200 italic">"${issue.description}"</p>
        <div class="grid grid-cols-2 gap-4 text-xs font-bold uppercase text-gray-400">
            <div><p>Reporter</p><p class="text-gray-800 text-sm">${issue.author}</p></div>
            <div><p>Priority</p><p class="text-orange-500 text-sm">${issue.priority}</p></div>
        </div>
    `;
    document.getElementById('details_modal').showModal();
}

// handleSearch function
async function handleSearch() {
    const q = document.getElementById("search-box").value;
    if (!q) return;
    showLoading();
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${q}`)
    const data = await res.json();
    renderData(data.data);
    hideLoading();
}

allIssuesData();