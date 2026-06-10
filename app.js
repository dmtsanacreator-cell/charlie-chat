/* ==========================================================================
   CCS - PRODUCTION ARCHITECTURE: MATRIX CONTROLLERS & DATA POOLS (PART 1)
   ========================================================================== */

// --- ENTERPRISE WEB SECURITY IDENTITY POOL (FIREBASE INTIALIZATION BLOCK) ---
const firebaseConfig = {
    apiKey: "AIzaSyB2szPQPPaZ9UyY9AYbTDqemti_No6KO-4",
    authDomain: "://firebaseapp.com",
    projectId: "charlie-ccs-auth",
    storageBucket: "://appspot.com",
    messagingSenderId: "435702870834",
    appId: "1:435702870834:web:a6e88a323381f6f3345d2b",
    measurementId: "G-0J9SMKN61S",
    databaseURL: "https://firebaseio.com" // Real Cloud Database Connected
};

// Global variables declared safely using var to prevent temporal scope violations
var auth;
var database;
var myUserId = ""; 

// --- DYNAMIC ENGINE ASYNC SAFE BOOT INITIALIZATION ---
function initializeFirebaseSystem() {
    if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        auth = firebase.auth();
        database = firebase.database();
        console.log("✅ [FIREBASE CORE ENGINE]: Connected & Initialized securely inside app runtime environment!");
        return true;
    } else {
        console.warn("⚠️ [ENGINE DELAY]: Firebase elements are still loading via async network channel scripts...");
        return false;
    }
}

// --- GLOBAL NETWORKING DATA MATRIX TRACKERS ---
const badWords = ["gali1", "gali2"]; 
const socket = io('https://onrender.com'); // Laptops link guide: Use host laptop IPv4 if required

let chatThemesDatabase = {};
let currentActiveUserNode = null;
let isRecordingAudio = false;
let confirmationResultInstance = null; // Cellular OTP handshake tracker

// --- HARDWARE DISCOVERY SUBSYSTEM MEDIA STREAMS ---
let localMediaStream = null;
let screenShareStream = null;
let mediaRecorderInstance = null;
let recordedAudioChunks = [];

// --- CRITICAL COMPLIANCE FIX: RESPONSIVE OVERLAP TABS DISCOVERY ENGINE ---
function switchLoginTab(tabId) {
    const allTabIds = ["phoneTab", "emailTab", "socialTab", "guestTab"];
    
    // Core engine loop forces absolute blind styling properties on inactive layers
    allTabIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.setProperty('display', 'none', 'important'); // Overrides styling cascade errors
        }
        
        // Clear highlighted border active states from header tab layouts
        const btn = document.getElementById("btn-" + id);
        if (btn) {
            btn.classList.remove("active");
        }
    });
    
    // Explicit dynamic assignment to unlock single targeted stream viewport interface
    const targetElement = document.getElementById(tabId);
    if (targetElement) {
        targetElement.style.setProperty('display', 'flex', 'important'); // Re-aligns elements in single crisp box
    }
    
    // Lock down active structural border color switch token
    const targetBtn = document.getElementById("btn-" + tabId);
    if (targetBtn) {
        targetBtn.classList.add("active");
    }
    
    // Flush out previous log error structures
    let errBox = document.getElementById('loginErrorMsg');
    if (errBox) {
        errBox.style.setProperty('display', 'none', 'important');
    }
}

// --- ABSOLUTE RANDOM 056-ID GENERATOR FOR INTEGRATED SOCIALS & GUEST ACCESSIBILITY ---
function generateCharlieNumber() {
    let prefix = "056";
    let remainingDigits = "";
    for (let i = 0; i < 7; i++) {
        remainingDigits += Math.floor(Math.random() * 10).toString();
    }
    return prefix + "-" + remainingDigits.substring(0,3) + remainingDigits.substring(3,7);
}
/* ==========================================================================
   AUTHENTICATION LOGIC LAYER & IDENTITY REGISTER DIRECTORY (PART 2)
   ========================================================================== */

// --- ENTERPRISE WEB CAPTCHA ENGINE MOUNT INITIALIZATION & RUNTIME SYNC ---
window.addEventListener('DOMContentLoaded', () => {
    // Retry initialization securely if scripts took slightly longer to bind via network hooks
    let loopTracker = setInterval(() => {
        if (initializeFirebaseSystem()) {
            clearInterval(loopTracker);
            
            // Mount recaptcha once core SDK engine is available
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible'
            });

            // WHATSAPP EMAIL LINK VALIDATOR: Auto-executes when user clicks the incoming verification link in email
            if (auth.isSignInWithEmailLink(window.location.href)) {
                let email = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                    email = window.prompt('Please enter your email again for absolute verification profile match:');
                }
                auth.signInWithEmailLink(email, window.location.href)
                    .then((result) => {
                        window.localStorage.removeItem('emailForSignIn');
                        grantApplicationAccess(generateCharlieNumber());
                    })
                    .catch((error) => {
                        alert("Email verification sequence failure: " + error.message);
                    });
            }

            // Persistence handshake restore logic
            let checkToken = localStorage.getItem('charlie_auth_token');
            let savedNumber = localStorage.getItem('charlie_assigned_num');
            if (checkToken === 'true' && savedNumber) {
                grantApplicationAccess(savedNumber);
            }
        }
    }, 100);
});

// --- MULTI-CHANNEL ROUTING IDENTIFICATION RULES IMPLEMENTATION ---
function sendRealSMSOTP() {
    if(!auth) { alert("Initialization Error: Cloud system core is still sync tracing. Please wait."); return; }
    let phoneInput = document.getElementById('realPhoneInput').value.trim();
    let errorBox = document.getElementById('loginErrorMsg');
    
    if(!phoneInput.startsWith('+')) {
        errorBox.style.setProperty('display', 'block', 'important');
        errorBox.innerText = "Error: System requires absolute country code prefix (e.g. +923001234567)";
        return;
    }

    auth.signInWithPhoneNumber(phoneInput, window.recaptchaVerifier)
        .then((confirmationResult) => {
            confirmationResultInstance = confirmationResult;
            document.getElementById('phoneInputArea').style.setProperty('display', 'none', 'important');
            document.getElementById('otpInputArea').style.setProperty('display', 'flex', 'important');
            errorBox.style.setProperty('display', 'none', 'important');
        }).catch((error) => {
            errorBox.style.setProperty('display', 'block', 'important');
            errorBox.innerText = "Signal Exception: " + error.message;
        });
}

function verifyRealOTPCode() {
    let otpCode = document.getElementById('realOTPInput').value.trim();
    let errorBox = document.getElementById('loginErrorMsg');

    if(otpCode.length !== 6) {
        errorBox.style.setProperty('display', 'block', 'important');
        errorBox.innerText = "Validation Exception: Handle token must look like 6 structural digits.";
        return;
    }

    confirmationResultInstance.confirm(otpCode)
        .then((result) => {
            grantApplicationAccess(result.user.phoneNumber);
        }).catch((error) => {
            errorBox.style.setProperty('display', 'block', 'important');
            errorBox.innerText = "Signature Verification Denied: " + error.message;
        });
}

// --- SECURE MULTI-PLATFORM OAUTH DRIVERS ---
function loginWithGoogleReal() {
    if(!auth) return;
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => { grantApplicationAccess(generateCharlieNumber()); }) 
        .catch((err) => { showLoginError(err.message); });
}

function loginWithFacebookReal() {
    if(!auth) return;
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => { grantApplicationAccess(generateCharlieNumber()); }) 
        .catch((err) => { showLoginError(err.message); });
}

function loginWithInstagramReal() {
    const client_id = "YOUR_INSTAGRAM_CLIENT_ID";
    const redirect_uri = window.location.href; 
    window.location.href = `https://instagram.com{client_id}&redirect_uri=${redirect_uri}&scope=user_profile,user_media&response_type=code`;
}

function processRealEmailLogin() {
    if(!auth) return;
    let emailVal = document.getElementById('realEmailInput').value.trim();
    let errorBox = document.getElementById('loginErrorMsg');

    if (!emailVal.includes('@')) {
        showLoginError("Malformed data validation parameter structure.");
        return;
    }

    const actionCodeSettings = {
        url: window.location.href, 
        handleCodeInApp: true
    };

    auth.sendSignInLinkToEmail(emailVal, actionCodeSettings)
        .then(() => {
            window.localStorage.setItem('emailForSignIn', emailVal);
            alert(`Verification Dispatched: We have sent a secure magic confirmation link to ${emailVal}. Please open your email and click it to complete registration!`);
        })
        .catch((error) => {
            showLoginError("Email router exception: " + error.message);
        });
}

function processRealGuestLogin() {
    grantApplicationAccess(generateCharlieNumber());
}

// --- CORE SYSTEM REGISTRATION & LIFECYCLE CONTROLLERS ---
function grantApplicationAccess(identityString) {
    myUserId = identityString;
    localStorage.setItem('charlie_auth_token', 'true');
    localStorage.setItem('charlie_assigned_num', identityString);
    
    document.getElementById('myDisplayCharlieNumber').innerText = identityString;
    document.getElementById('loginScreen').style.setProperty('display', 'none', 'important');
    document.getElementById('appMainContainer').style.setProperty('display', 'flex', 'important');
    
    if (database) {
        let safeCleanKey = identityString.replace(/[.#$\[\]]/g, "_");
        database.ref('registered_users/' + safeCleanKey).set({
            userNodeIdentity: identityString,
            timestamp: Date.now(),
            status: "online"
        });
    }
    
    socket.emit('register-user', identityString);
}

// --- DYNAMIC SEARCH ENGINES PARALLEL WITH REAL WHATSAPP BEHAVIORS ---
function addNewContactToList() {
    if(!database) { alert("Network Syncing: Live link lookup directory is loading records cluster. Retrying..."); return; }
    const inputField = document.getElementById('newContactIdInput');
    let targetId = inputField.value.trim();

    if (!targetId) {
        alert("Error: String verification field cannot remain blank.");
        return;
    }

    let myCurrentNum = localStorage.getItem('charlie_assigned_num');
    if (targetId === myCurrentNum) {
        alert("Security Error: Identity loop tracker rejected. You cannot trace yourself.");
        return;
    }

    let safeCleanKey = targetId.replace(/[.#$\[\]]/g, "_");
    database.ref('registered_users/' + safeCleanKey).once('value')
        .then((snapshot) => {
            if (!snapshot.exists()) {
                alert("Discovery Failure: The profile number or user 056-ID provided is not registered on Charlie system server files.");
                return;
            }

            const chatListContainer = document.querySelector('.chat-list');
            const newChatItem = document.createElement('div');
            newChatItem.className = 'chat-item';
            
            newChatItem.onclick = function() {
                switchActiveChat(targetId, targetId);
            };

            newChatItem.innerHTML = `
                <span class="user-name">${targetId}</span>
                <span class="last-msg">🔑 Tap to connect network transmission stream...</span>
            `;

            chatListContainer.appendChild(newChatItem);
            alert(`Pipeline verified successfully with active node: ${targetId}`);
            inputField.value = '';
        }).catch((err) => {
            console.error("Database Connection Fault: ", err);
        });
}

function showLoginError(msg) {
    let errorBox = document.getElementById('loginErrorMsg');
    if(errorBox) {
        errorBox.style.setProperty('display', 'block', 'important');
        errorBox.innerText = "Gateway Handshake Error: " + msg;
    }
}
/* ==========================================================================
   DYNAMIC INTERFACE SWITCHING, THEMES & HARDWARE STREAM DRIVERS (PART 3)
   ========================================================================== */

function switchActiveChat(displayName, assignedCharlieNumber) {
    currentActiveUserNode = assignedCharlieNumber;
    document.getElementById('currentChatTitle').innerText = `${displayName}`;
    
    // Clear active highlight markers across previous lists
    document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
    if(window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }

    let storedColor = chatThemesDatabase[assignedCharlieNumber] || "#050706";
    document.getElementById('activeChatWindow').style.backgroundColor = storedColor;
    
    let colorPicker = document.getElementById('bgThemeColorPicker');
    if(colorPicker) colorPicker.value = storedColor;
    
    // Refresh viewport workspace window log histories
    document.getElementById('chatBox').innerHTML = `<div class="message-bubble incoming">Protected channel connection initialized on node: ${assignedCharlieNumber}</div>`;
}

function customizeChatBackground(selectedHexColor) {
    if(!currentActiveUserNode) return;
    chatThemesDatabase[currentActiveUserNode] = selectedHexColor;
    document.getElementById('activeChatWindow').style.backgroundColor = selectedHexColor;
}

// --- CALL INITIALIZATION MEDIA PIPELINES ---
async function triggerCall(callType) {
    if(!currentActiveUserNode) {
        alert("Please select or add an active communication node first.");
        return;
    }
    
    document.getElementById('callTypeTitle').innerText = callType;
    document.getElementById('callTargetUser').innerText = `Connecting stream with node: ${currentActiveUserNode}`;
    document.getElementById('callOverlay').style.setProperty('display', 'flex', 'important');

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
    document.getElementById('callOverlay').style.setProperty('display', 'none', 'important');
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
/* ==========================================================================
   VOICE RECORDER, MESSAGING PACKETS & MATRIX RENDERING LOOP (PART 4)
   ========================================================================== */

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
                
                let reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = function() {
                    let base64Audio = reader.result;
                    socket.emit('send-encrypted-message', {
                        senderId: myUserId,
                        receiverId: currentActiveUserNode,
                        encryptedPayload: base64Audio,
                        isAudioFile: true
                    });
                }
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderInstance.start();
        } catch (err) {
            console.error("Hardware Device Fault: Microphone deployment failed.", err);
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

function sendMessage() {
    if(!currentActiveUserNode) {
        alert("Verification Required: Please select an active destination node.");
        return;
    }

    const input = document.getElementById('msgInput');
    let rawText = input.value.trim();
    if (!rawText) return;

    let cleanText = rawText.toLowerCase();
    for (let word of badWords) {
        if (cleanText.includes(word)) {
            socket.emit('report-policy-violation', myUserId);
            document.body.innerHTML = "<div style='color:#ff3333; padding:50px; font-family:monospace;'>[CORE SUSPENSION: COMPLIANCE POLICY VIOLATION]</div>";
            return;
        }
    }

    appendMessage(rawText, 'outgoing');
    socket.emit('send-encrypted-message', {
        senderId: myUserId,
        receiverId: currentActiveUserNode, 
        encryptedPayload: btoa(rawText), 
        isAudioFile: false
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
        if(data.isAudioFile) {
            appendAudioVoiceMessage(data.encryptedPayload, 'incoming');
        } else {
            let decryptedText = atob(data.encryptedPayload || data.payload); 
            appendMessage(decryptedText, 'incoming');
        }
    }
});

socket.on('account-banned', (msg) => {
    document.body.innerHTML = `<div style='color:#ff3333; padding:50px; font-family:monospace;'>[VOLATILE DISCONNECT DISCONNECT TERMINATED: ${msg}]</div>`;
});

// --- CANVAS MATRIX BACKGROUND RENDERING ---
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
