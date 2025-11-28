const API_URL = "http://localhost:3000";
const API_KEY = "12345";

let allDevices = []; // Store devices here so we can filter them

// 1. Load Devices
async function loadDevices() {
    try {
        const res = await fetch(`${API_URL}/devices`, { headers: { 'x-api-key': API_KEY } });
        allDevices = await res.json();
        renderList(allDevices); // Show all initially
    } catch (err) {
        console.error(err);
    }
}

// 2. Render List to Screen
function renderList(devices) {
    const list = document.getElementById('deviceList');
    list.innerHTML = ''; 

    if(devices.length === 0) {
        list.innerHTML = '<p>No devices found.</p>';
        return;
    }

    devices.forEach(d => {
        const div = document.createElement('div');
        div.className = 'device-item';
        // Simple card showing Name, Type, and ID
        div.innerHTML = `<h3>${d.name}</h3><p>${d.type}</p><small>${d.deviceId}</small>`;
        div.onclick = () => showDetails(d);
        list.appendChild(div);
    });
}

// 3. Search / Filter Function (Mandatory)
function filterDevices() {
    const query = document.getElementById('search').value.toLowerCase();
    
    // Filter the global array based on the text typed
    const filtered = allDevices.filter(d => 
        d.name.toLowerCase().includes(query) || 
        d.type.toLowerCase().includes(query) || 
        d.deviceId.toLowerCase().includes(query)
    );
    
    renderList(filtered); // Update the screen
}

// 4. Add New Device
async function registerDevice() {
    const id = document.getElementById('newId').value;
    const name = document.getElementById('newName').value;
    const type = document.getElementById('newType').value;
    const msg = document.getElementById('msg');

    if(!id || !name) {
        msg.innerText = "Please fill in all fields";
        return;
    }

    const res = await fetch(`${API_URL}/devices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ deviceId: id, name, type })
    });

    const data = await res.json();
    msg.innerText = data.message || data.error;
    
    if(res.ok) {
        loadDevices(); 
        document.getElementById('newId').value = '';
        document.getElementById('newName').value = '';
    }
}

// 5. Show Details Popup
async function showDetails(device) {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('m-name').innerText = device.name;
    document.getElementById('m-type').innerText = device.type;
    document.getElementById('m-id').innerText = device.deviceId;
    
    const activityDiv = document.getElementById('activity-data');
    activityDiv.innerHTML = "Fetching...";

    try {
        const res = await fetch(`${API_URL}/devices/${device.deviceId}/activity/latest`, {
            headers: { 'x-api-key': API_KEY }
        });
        if (res.ok) {
            const act = await res.json();
            activityDiv.innerHTML = `
                <p><strong>Temp:</strong> ${act.temperature}°C</p>
                <p><strong>Battery:</strong> ${act.battery}%</p>
                <p><small>${new Date(act.timestamp).toLocaleString()}</small></p>
            `;
        } else {
            activityDiv.innerHTML = "No activity recorded yet.";
        }
    } catch (err) { activityDiv.innerHTML = "Error loading activity."; }
}

function closeModal() { document.getElementById('modal').style.display = 'none'; }

// Start App
loadDevices();