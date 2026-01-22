let activities = [];
const logList = document.getElementById('logList');
const interactionZone = document.getElementById('interactionZone');
const warningBox = document.getElementById('warningBox');


const CLICK_THRESHOLD = 10; 
let clickCount = 0;


function logActivity(type, target, details = "") {
    const entry = {
        timestamp: new Date().toLocaleTimeString(),
        type: type,
        target: target,
        details: details
    };
    
    activities.push(entry);
    updateDOM(entry);
    checkSuspiciousActivity();
}


window.addEventListener('focus', (e) => {
    logActivity('Focus', e.target.tagName, 'Window focused');
}, true);


interactionZone.addEventListener('click', (e) => {
    logActivity('Click', e.target.id || e.target.tagName);
    
   
    clickCount++;
    setTimeout(() => clickCount--, 5000); 
});

interactionZone.addEventListener('keydown', (e) => {
    logActivity('KeyPress', e.target.tagName, `Key: ${e.key}`);
});


function updateDOM(entry) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>[${entry.timestamp}]</strong> ${entry.type} on <em>${entry.target}</em> ${entry.details}`;
    logList.prepend(li); 
}


function checkSuspiciousActivity() {
    if (clickCount > CLICK_THRESHOLD) {
        warningBox.style.display = 'block';
        setTimeout(() => warningBox.style.display = 'none', 3000);
    }
}

function resetLog() {
    activities = [];
    logList.innerHTML = '';
    clickCount = 0;
}

function exportLog() {
    const formattedText = activities.map(a => 
        `[${a.timestamp}] TYPE: ${a.type} | TARGET: ${a.target} | DATA: ${a.details}`
    ).join('\n');

    const blob = new Blob([formattedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'activity_log.txt';
    a.click();
}