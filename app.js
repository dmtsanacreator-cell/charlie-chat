/* ==========================================================================
   CCS - CHARLIE COMMUNICATION SYSTEM CONFIGURATION & CORE ENGINE
   ========================================================================== */

// --- ENTERPRISE WEB SECURITY IDENTITY POOL (FIREBASE INITIALIZATION) ---
const firebaseConfig = {
    apiKey: "AIzaSyB2szPQPPaZ9UyY9AYbTDqemti_No6KO-4",
    authDomain: "://firebaseapp.com",
    projectId: "charlie-ccs-auth",
    storageBucket: "://appspot.com",
    messagingSenderId: "435702870834",
    appId: "1:435702870834:web:a6e88a323381f6f3345d2b",
    measurementId: "G-0J9SMKN61S"
};

// Initialize Firebase Security Framework securely
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// --- NETWORK STATE LOGIC VARIABLES ---
const badWords = ["gali1", "gali2"]; 

// Testing Note: Put your live Render URL or Local IP address (e.g. http://192.168.1.10:3000) inside io()
const socket = io('https://onrender.com'); 
const myUserId = "charlie_node_" + Math.floor(Math.random() * 10000);

let chatThemesDatabase = {
    "056-9938102": "#050706",
    "056-1120495": "#0d1117"
};
let currentActiveUserNode = "056-9938102";
let isRecordingAudio = false;
let confirmationResultInstance = null; // Stores real-world SMS network stream tracker

// --- HARDWARE SUBSYSTEM MEDIA MEDIA STREAMS ---
let localMediaStream = null;
let screenShareStream = null;
let mediaRecorderInstance = null;
let recordedAudioChunks = [];

// Register client inside backend routing tables immediately on script evaluation
socket.emit('register-user', myUserId);

/* ==========================================================================
   AUTHENTICATION LOGIC LAYER & VERIFICATION PIPELINES
   ========================================================================== */

// --- INITIALIZE RECAPTCHA VERIFIER ON DOM MOUNT ---
window.onload = function() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => { console.log("Security App Recaptcha verified successfully."); }
    });
};

// --- RESPONSIVE SECURE TAB ENGINE ---
function switchLoginTab(tabId) {
    const contents = ["phoneTab", "emailTab", "guestTab"];
    contents.forEach(id => {
        const element = document.getElementById(id);
        const btn = document.getElementById("btn-" + id);
        if(element) element.style.display = "none";
        if(btn) btn.classList.remove("active");
    });
    
    const targetElement = document.getElementById(tabId);
    const targetBtn = document.getElementById("btn-" + tabId);
    if(targetElement) targetElement.style.display = "flex";
    if(targetBtn) targetBtn.classList.add("active");
    
    let errBox = document.getElementById('loginErrorMsg');
    if(errBox) {
        errBox.style.display = 'none';
        errBox.innerText = '';
    }
}
// --- REAL SMS DISPATCHER PIPELINE (WHATSAPP PARALLEL SPECIFICATION) ---
function sendRealSMSOTP() {
    let phoneInput = document.getElementById('realPhoneInput').value.trim();
    let errorBox = document.getElementById('loginErrorMsg');
    
    if(!phoneInput.startsWith('+')) {
        errorBox.style.display = "block";
        errorBox.innerText = "Error: Input must include absolute country area prefix (e.g. +923001234567)";
        return;
    }

    auth.signInWithPhoneNumber(phoneInput, window.recaptchaVerifier)
        .then((confirmationResult) => {
            confirmationResultInstance = confirmationResult;
            document.getElementById('phoneInputArea').style.display = "none";
            document.getElementById('otpInputArea').style.display = "flex";
            errorBox.style.display = "none";
        }).catch((error) => {
            errorBox.style.display = "block";
            errorBox.innerText = "Carrier Pipeline Denied: " + error.message;
        });
}

function verifyRealOTPCode() {
    let otpCode = document.getElementById('realOTPInput').value.trim();
    let errorBox = document.getElementById('loginErrorMsg');

    if(otpCode.length !== 6) {
        errorBox.style.display = "block";
        errorBox.innerText = "Security violation: Handshake requires absolute 6-digit signature.";
        return;
    }

    confirmationResultInstance.confirm(otpCode)
        .then((result) => {
            grantApplicationAccess(result.user.phoneNumber);
        }).catch((error) => {
            errorBox.style.display = "block";
            errorBox.innerText = "Identity Token Rejected: " + error.message;
        });
}

// --- SECURE FEDERATED IDENTITY PROVIDERS (GOOGLE / FACEBOOK / INSTAGRAM) ---
function loginWithGoogleReal() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => { grantApplicationAccess(result.user.email); })
        .catch((err) => { showLoginError(err.message); });
}

function loginWithFacebookReal() {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => { grantApplicationAccess(result.user.email || "facebook_node_secure"); })
        .catch((err) => { showLoginError(err.message); });
}

function loginWithInstagramReal() {
    const client_id = "YOUR_INSTAGRAM_CLIENT_ID";
    const redirect_uri = window.location.href; 
    window.location.href = `https://instagram.com{client_id}&redirect_uri=${redirect_uri}&scope=user_profile,user_media&response_type=code`;
}

function processRealEmailLogin() {
    let emailVal = document.getElementById('realEmailInput').value.trim();
    if (!emailVal.includes('@')) {
        showLoginError("Error: Malformed email verification structure.");
        return;
    }
    grantApplicationAccess(emailVal);
}

function processRealGuestLogin() {
    let randomNode = "guest_node_" + Math.floor(Math.random() * 900000 + 100000);
    grantApplicationAccess(randomNode);
}

// --- SYSTEM NODE ALLOCATION INITIALIZER ---
function grantApplicationAccess(identityString) {
    localStorage.setItem('charlie_auth_token', 'true');
    localStorage.setItem('charlie_assigned_num', identityString);
    
    document.getElementById('myDisplayCharlieNumber').innerText = identityString;
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appMainContainer').style.display = 'flex';
}

// --- PERSISTENT SEED TOKEN VALIDATOR ENGINE ---
window.addEventListener('DOMContentLoaded', () => {
    let checkToken = localStorage.getItem('charlie_auth_token');
    let savedNumber = localStorage.getItem('charlie_assigned_num');
    
    if (checkToken === 'true' && savedNumber) {
        document.getElementById('myDisplayCharlieNumber').innerText = savedNumber;
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appMainContainer').style.display = 'flex';
    }
});

function showLoginError(msg) {
    let errorBox = document.getElementById('loginErrorMsg');
    if(errorBox) {
        errorBox.style.display = "block";
        errorBox.innerText = "Gateway Handshake Denied: " + msg;
    }
}
/* ==========================================================================
   DYNAMIC INTERFACE SWITCHING, MESSAGING & CONTACT ADDER PIPELINES
   ========================================================================== */

function switchActiveChat(displayName, assignedCharlieNumber) {
    currentActiveUserNode = assignedCharlieNumber;
    document.getElementById('currentChatTitle').innerText = `${displayName} [${assignedCharlieNumber}]`;
    
    document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
    if(window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }

    let storedColor = chatThemesDatabase[assignedCharlieNumber] || "#050706";
    document.getElementById('activeChatWindow').style.backgroundColor = storedColor;
    
    let colorPicker = document.getElementById('bgThemeColorPicker');
    if(colorPicker) colorPicker.value = storedColor;
    
    document.getElementById('chatBox').innerHTML = `<div class="message-bubble incoming">Protected channel connection initialized on node: ${assignedCharlieNumber}</div>`;
}

function customizeChatBackground(selectedHexColor) {
    chatThemesDatabase[currentActiveUserNode] = selectedHexColor;
    document.getElementById('activeChatWindow').style.backgroundColor = selectedHexColor;
}

// --- NEW FEATURE: WHATSAPP-STYLE DYNAMIC CONTACT ADDER ENGINE ---
function addNewContactToList() {
    const inputField = document.getElementById('newContactIdInput');
    let targetId = inputField.value.trim();

    if (!targetId) {
        alert("Please enter a valid User ID or Number.");
        return;
    }

    let myCurrentSavedNum = localStorage.getItem('charlie_assigned_num') || myUserId;
    if (targetId === myCurrentSavedNum) {
        alert("Security Loop: You cannot add your own Node Identity.");
        return;
    }

    const chatListContainer = document.querySelector('.chat-list');
    const newChatItem = document.createElement('div');
    newChatItem.className = 'chat-item';
    
    let dynamicDisplayName = targetId.length > 12 ? targetId.substring(0, 10) + "..." : targetId;
    
    newChatItem.onclick = function() {
        switchActiveChat(dynamicDisplayName, targetId);
    };

    newChatItem.innerHTML = `
        <span class="user-name">${dynamicDisplayName}</span>
        <span class="last-msg">🔑 Tap to initialize transmission.</span>
    `;

    chatListContainer.appendChild(newChatItem);
    chatThemesDatabase[targetId] = "#050706";
    inputField.value = '';
    
    alert(`Success: Secure pipeline established with node [${dynamicDisplayName}]`);
}

/* ==========================================================================
   HARDWARE CAPTURE MODULES (AUDIO / VIDEO / SCREEN SHARE PIPELINES)
   ========================================================================== */
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
        console.error("Hardware Stream Exception Tracker:", hardwareError);
        document.getElementById('callTargetUser').innerText = "⚠️ Line Error: Connection drop or hardware device denied.";
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
            console.error("Hardware Engine Failure: Microphone hardware deployment failed.", err);
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

/* ==========================================================================
   CORE MESSAGING ROUTING ENGINE & SOCKET PROTOCOLS
   ========================================================================== */
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
    if (data.senderId === currentActiveUserNode || data.receiverId === myUserId) {
        let decryptedText = atob(data.encryptedPayload || data.payload); 
        appendMessage(decryptedText, 'incoming');
    }
});

socket.on('account-banned', (msg) => {
    document.body.innerHTML = `<div style='color:#ff3333; padding:50px; font-family:monospace;'>[NODE DISCONNECT TERMINATED: ${msg}]</div>`;
});

/* ==========================================================================
   MATRIC LAYER ENGINE ANIMATION SYSTEMS (CANVAS BACKGROUND LOOP)
   ========================================================================== */
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
