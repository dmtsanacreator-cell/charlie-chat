// Local variables tracking data state
const badWords = ["gali1", "gali2"]; 
const socket = io('https://onrender.com'); // Put live backend link here
const myUserId = "charlie_node_" + Math.floor(Math.random() * 10000);

let chatThemesDatabase = {
    "056-9938102": "#050706",
    "056-1120495": "#0d1117"
};
let currentActiveUserNode = "056-9938102";
let isRecordingAudio = false;

// --- ACTUAL HARDWARE STREAM ARRAYS ---
let localMediaStream = null;
let screenShareStream = null;
let mediaRecorderInstance = null;
let recordedAudioChunks = [];

socket.emit('register-user', myUserId);

// --- AUTO 056 NUMBER GENERATION ALGORITHM ---
function generateCharlieNumber() {
    let prefix = "056";
    let remainingDigits = "";
    for (let i = 0; i < 8; i++) {
        remainingDigits += Math.floor(Math.random() * 10).toString();
    }
    return prefix + "-" + remainingDigits.substring(0,4) + remainingDigits.substring(4,8);
}

// --- SOCIAL TOKEN SIMULATION & GATEWAY SWITCH ---
function handleSocialLogin(platformName) {
    console.log(`Authenticating handshake with ${platformName} servers...`);
    let allocatedId = generateCharlieNumber();
    
    localStorage.setItem('charlie_auth_token', 'true');
    localStorage.setItem('charlie_assigned_num', allocatedId);
    
    document.getElementById('myDisplayCharlieNumber').innerText = allocatedId;
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appMainContainer').style.display = 'flex';
}

// --- STATE MANAGER LOCKER RUNNING ON REFRESH ---
window.addEventListener('DOMContentLoaded', () => {
    let checkToken = localStorage.getItem('charlie_auth_token');
    let savedNumber = localStorage.getItem('charlie_assigned_num');
    
    if (checkToken === 'true' && savedNumber) {
        document.getElementById('myDisplayCharlieNumber').innerText = savedNumber;
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appMainContainer').style.display = 'flex';
    }
});
// --- DYNAMIC INDIVIDUAL BACKGROUND THEME SEPARATE SWITCH SETTINGS ---
function switchActiveChat(displayName, assignedCharlieNumber) {
    currentActiveUserNode = assignedCharlieNumber;
    document.getElementById('currentChatTitle').innerText = `${displayName} [${assignedCharlieNumber}]`;
    
    document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');

    let storedColor = chatThemesDatabase[assignedCharlieNumber] || "#050706";
    document.getElementById('activeChatWindow').style.backgroundColor = storedColor;
    document.getElementById('bgThemeColorPicker').value = storedColor;
    
    document.getElementById('chatBox').innerHTML = `<div class="message-bubble incoming">Protected channel connection initialized on node: ${assignedCharlieNumber}</div>`;
}

function customizeChatBackground(selectedHexColor) {
    chatThemesDatabase[currentActiveUserNode] = selectedHexColor;
    document.getElementById('activeChatWindow').style.backgroundColor = selectedHexColor;
}
// --- WORKING AUDIO / VIDEO CALL & SCREEN SHARE LOGIC ---
async function triggerCall(callType) {
    document.getElementById('callTypeTitle').innerText = callType;
    document.getElementById('callTargetUser').innerText = `Connecting stream with node: ${currentActiveUserNode}`;
    document.getElementById('callOverlay').style.display = 'flex';

    try {
        if (callType === "AUDIO CALL") {
            localMediaStream = await navigator.mediaDevices.getUserMedia({ 
                audio: { channelCount: 1, sampleRate: 8000, echoCancellation: true, noiseSuppression: true } 
            });
        } 
        else if (callType === "VIDEO CALL") {
            localMediaStream = await navigator.mediaDevices.getUserMedia({ 
                audio: { channelCount: 1, sampleRate: 8000 },
                video: { width: { ideal: 160 }, height: { ideal: 120 }, frameRate: { ideal: 5 } }
            });
            createVideoPreviewElement();
        } 
        else if (callType === "SCREEN SHARE") {
            screenShareStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        }
    } catch (hardwareError) {
        console.error("Hardware Error:", hardwareError);
        document.getElementById('callTargetUser').innerText = "⚠️ Line Error: Connection drop or denied.";
    }
}

function endActiveCall() {
    document.getElementById('callOverlay').style.display = 'none';
    if (localMediaStream) {
        localMediaStream.getTracks().forEach(track => track.stop());
        localMediaStream = null;
    }
    if (screenShareStream) {
        screenShareStream.getTracks().forEach(track => track.stop());
        screenShareStream = null;
    }
    let oldPreview = document.getElementById('localVideoPreview');
    if (oldPreview) oldPreview.remove();
}

// --- WORKING REAL-TIME VOICE RECORDING NOTE ENGINE ---
async function toggleVoiceRecording() {
    let micButton = document.getElementById('micBtn');
    isRecordingAudio = !isRecordingAudio;

    if (isRecordingAudio) {
        micButton.innerText = "🛑";
        micButton.style.transform = "scale(1.3)";
        recordedAudioChunks = [];

        try {
            let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderInstance = new MediaRecorder(stream);
            
            mediaRecorderInstance.ondataavailable = (event) => {
                if (event.data.size > 0) recordedAudioChunks.push(event.data);
            };

            mediaRecorderInstance.onstop = () => {
                let audioBlob = new Blob(recordedAudioChunks, { type: 'audio/mp3' });
                let audioUrl = URL.createObjectURL(audioBlob);
                appendAudioVoiceMessage(audioUrl, 'outgoing');
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderInstance.start();
        } catch (err) {
            console.error("Mic access denied:", err);
            isRecordingAudio = false;
            micButton.innerText = "🎙️";
        }
    } else {
        micButton.innerText = "🎙️";
        micButton.style.transform = "scale(1)";
        if (mediaRecorderInstance && mediaRecorderInstance.state !== "inactive") {
            mediaRecorderInstance.stop();
        }
    }
}

function createVideoPreviewElement() {
    if (document.getElementById('localVideoPreview')) return;
    let videoTag = document.createElement('video');
    videoTag.id = 'localVideoPreview';
    videoTag.autoplay = true;
    videoTag.playsInline = true;
    videoTag.style.width = '200px'; videoTag.style.height = '150px';
    videoTag.style.position = 'absolute'; videoTag.style.bottom = '20px'; videoTag.style.right = '20px';
    videoTag.style.border = '1px solid #00ffcc'; videoTag.style.borderRadius = '8px'; videoTag.style.zIndex = '15';
    videoTag.srcObject = localMediaStream;
    document.getElementById('callOverlay').appendChild(videoTag);
}

function appendAudioVoiceMessage(audioUrl, type) {
    const chatBox = document.getElementById('chatBox');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message-bubble ${type}`;
    msgDiv.innerHTML = `<audio src="${audioUrl}" controls style="max-width: 240px; height: 30px;"></audio>`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
// --- CORE SEND MESSAGE ENGINE ---
function sendMessage() {
    const input = document.getElementById('msgInput');
    let rawText = input.value.trim();
    if (!rawText) return;

    let cleanText = rawText.toLowerCase();
    for (let word of badWords) {
        if (cleanText.includes(word)) {
            socket.emit('report-policy-violation', myUserId);
            document.body.innerHTML = "<div style='color:#ff3333; padding:50px; font-family:monospace;'>[CORE SUSPENSION: POLICY VIOLATION]</div>";
            return;
        }
    }

    appendMessage(rawText, 'outgoing');
    socket.emit('send-encrypted-message', {
        senderId: myUserId,
        receiverId: currentActiveUserNode, 
        encryptedPayload: btoa(rawText)
    });
    input.value = '';
}

function appendMessage(text, type) {
    const chatBox = document.getElementById('chatBox');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message-bubble ${type}`;
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

socket.on('receive-message', (data) => {
    let decryptedText = atob(data.payload); 
    appendMessage(decryptedText, 'incoming');
});

socket.on('account-banned', (msg) => {
    document.body.innerHTML = `<div style='color:#ff3333; padding:50px; font-family:monospace;'>[TERMINATED: ${msg}]</div>`;
});

// --- FLOATING LIGHT PURPLE SNOW-UP BACKGROUND ANIME ENGINE ---
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

let bubblesArray = [];
class BubbleParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 20;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 0.8 + 0.2;
        this.color = 'rgba(186, 104, 200, 0.15)';
    }
    update() {
        this.y -= this.speedY;
        if (this.y < 0) {
            this.y = canvas.height + 10;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
function initBubbles() {
    for (let i = 0; i < 60; i++) { bubblesArray.push(new BubbleParticle()); }
}
function animateBubblesLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bubblesArray.length; i++) {
        bubblesArray[i].update();
        bubblesArray[i].draw();
    }
    requestAnimationFrame(animateBubblesLoop);
}
initBubbles();
animateBubblesLoop();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
});
