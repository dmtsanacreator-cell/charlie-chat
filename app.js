/* ==========================================================================
   CCS - PRODUCTION DYNAMIC USER-ID ROUTING ARCHITECTURE (PART 1)
   ========================================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyB2szPQPPaZ9UyY9AYbTDqemti_No6KO-4",
    authDomain: "://firebaseapp.com",
    projectId: "charlie-ccs-auth",
    storageBucket: "://appspot.com",
    messagingSenderId: "435702870834",
    appId: "1:435702870834:web:a6e88a323381f6f3345d2b",
    measurementId: "G-0J9SMKN61S"
};

// Initialize Identity Provider Engines
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const badWords = ["gali1", "gali2"];

// LOCAL ENVIRONMENT NETWORK MATRIX TRACKER
// Testing Node Note: Laptops connectivity ke liye server laptop ka IPv4 address lagayein: io('http://192.168.1.10:3000')
const socket = io('https://onrender.com'); 

let chatThemesDatabase = {};
let currentActiveUserNode = null;
let isRecordingAudio = false;
let confirmationResultInstance = null;
let myUserId = ""; // Application Core Session Runtime Pointer

let localMediaStream = null;
let screenShareStream = null;
let mediaRecorderInstance = null;
let recordedAudioChunks = [];

// --- STRICT 056-ID GENERATOR FOR INTEGRATED SOCIAL/GUEST PLATFORMS ---
function generateCharlieNumber() {
    let prefix = "056";
    let remainingDigits = "";
    for (let i = 0; i < 7; i++) {
        remainingDigits += Math.floor(Math.random() * 10).toString();
    }
    return prefix + "-" + remainingDigits.substring(0,3) + remainingDigits.substring(3,7);
}

function switchLoginTab(tabId) {
    const contents = ["phoneTab", "emailTab", "guestTab"]; // UI views mapping elements
    contents.forEach(id => {
        const element = document.getElementById(id);
        if(element) element.style.display = "none";
        
        // Handle target tab button styling reset safely
        const btn = document.getElementById("btn-" + id);
        if(btn) btn.classList.remove("active");
    });
    
    const targetElement = document.getElementById(tabId);
    if(targetElement) targetElement.style.display = "flex";
    
    const targetBtn = document.getElementById("btn-" + tabId);
    if(targetBtn) targetBtn.classList.add("active");
}
// --- INTERPRISE RECAPTCHA VERIFIER INITIALIZATION ---
window.onload = function() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => { console.log("Identity compliance check complete."); }
    });
};

// --- CHANNEL 1: CELLULAR SMS NETWORK VALIDATORS ---
function sendRealSMSOTP() {
    let phoneInput = document.getElementById('realPhoneInput').value.trim();
    let errorBox = document.getElementById('loginErrorMsg');
    
    if(!phoneInput.startsWith('+')) {
        errorBox.style.display = "block";
        errorBox.innerText = "Error: System requires absolute country code prefix (e.g. +923001234567)";
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
            errorBox.innerText = "Carrier Signal Exception: " + error.message;
        });
}

function verifyRealOTPCode() {
    let otpCode = document.getElementById('realOTPInput').value.trim();
    let errorBox = document.getElementById('loginErrorMsg');

    if(otpCode.length !== 6) {
        errorBox.style.display = "block";
        errorBox.innerText = "Compliance rule failed: Verification signature token must be 6-digits.";
        return;
    }

    confirmationResultInstance.confirm(otpCode)
        .then((result) => {
            // RULE 1 CHOSEN: If logged via phone, their absolute User ID is their real phone number!
            grantApplicationAccess(result.user.phoneNumber);
        }).catch((error) => {
            errorBox.style.display = "block";
            errorBox.innerText = "Authorization Signature Rejected: " + error.message;
        });
}

// --- SECURE MULTI-PLATFORM OAUTH DRIVERS (GOOGLE / FACEBOOK / INSTAGRAM / EMAIL / GUEST) ---
function loginWithGoogleReal() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => { 
            // RULE 2 CHOSEN: Not phone? Generate custom 056-ID allocation!
            grantApplicationAccess(generateCharlieNumber()); 
        }).catch((err) => { showLoginError(err.message); });
}

function loginWithFacebookReal() {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => { grantApplicationAccess(generateCharlieNumber()); })
        .catch((err) => { showLoginError(err.message); });
}

function loginWithInstagramReal() {
    // Client Side Implicit Redirect flow handling
    const client_id = "YOUR_INSTAGRAM_CLIENT_ID";
    const redirect_uri = window.location.href; 
    window.location.href = `https://instagram.com{client_id}&redirect_uri=${redirect_uri}&scope=user_profile,user_media&response_type=code`;
}

function processRealEmailLogin() {
    let emailVal = document.getElementById('realEmailInput').value.trim();
    if (!emailVal.includes('@')) {
        showLoginError("Error: Malformed verification string data.");
        return;
    }
    // Rule 2 applied for manual email integration
    grantApplicationAccess(generateCharlieNumber());
}

function processRealGuestLogin() {
    // Rule 2 applied for anonymous node configuration
    grantApplicationAccess(generateCharlieNumber());
}

// --- REGISTER DIRECTORY ENGINE & LIFECYCLE CONTROLLERS ---
function grantApplicationAccess(identityString) {
    myUserId = identityString;
    localStorage.setItem('charlie_auth_token', 'true');
    localStorage.setItem('charlie_assigned_num', identityString);
    
    document.getElementById('myDisplayCharlieNumber').innerText = identityString;
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appMainContainer').style.display = 'flex';
    
    // Mount profile securely into active traffic tables instantly
    socket.emit('register-user', identityString);
}

window.addEventListener('DOMContentLoaded', () => {
    let checkToken = localStorage.getItem('charlie_auth_token');
    let savedNumber = localStorage.getItem('charlie_assigned_num');
    if (checkToken === 'true' && savedNumber) {
        grantApplicationAccess(savedNumber);
    }
});

// --- REAL-WORLD CONTACT EXPLORER LOOPS (WHATSAPP PARALLEL STRUCTURES) ---
function addNewContactToList() {
    const inputField = document.getElementById('newContactIdInput');
    let targetId = inputField.value.trim();

    if (!targetId) {
        alert("Error: Please enter an ID or Number.");
        return;
    }

    let myCurrentNum = localStorage.getItem('charlie_assigned_num');
    if (targetId === myCurrentNum) {
        alert("Security Error: Loop violation. You cannot track yourself.");
        return;
    }

    // Handshake check against live backend database cluster
    socket.emit('check-user-existence', targetId, (exists) => {
        if (!exists) {
            // Strict WhatsApp Response Engine Behavior
            alert("Discovery Error: The identity or phone number provided is not registered on Charlie System network records.");
            return;
        }

        const chatListContainer = document.querySelector('.chat-list');
        const newChatItem = document.createElement('div');
        newChatItem.className = 'chat-item';
        
        // FIXED ACTION LAYERS: Side row binding unlocks direct interaction rooms!
        newChatItem.onclick = function() {
            switchActiveChat(targetId, targetId);
        };

        newChatItem.innerHTML = `
            <span class="user-name">${targetId}</span>
            <span class="last-msg">🔑 Tap to connect session pipeline...</span>
        `;

        chatListContainer.appendChild(newChatItem);
        alert(`Pipeline bound successfully with identity node: ${targetId}`);
        inputField.value = '';
    });
}

function showLoginError(msg) {
    let errorBox = document.getElementById('loginErrorMsg');
    if(errorBox) {
        errorBox.style.display = "block";
        errorBox.innerText = "Handshake Failure: " + msg;
    }
}
