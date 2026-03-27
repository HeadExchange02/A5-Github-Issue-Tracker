const container = document.getElementById("issues-container")

// Fetch data from API
async function allIssuesData() {
    const reponse = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await reponse.json()
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

allIssuesData();