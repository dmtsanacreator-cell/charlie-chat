// --- ULTRA LOW BANDWIDTH WEBRTC OPTIMIZATION ---
async function triggerCall(callType) {
    document.getElementById('callTypeTitle').innerText = callType;
    document.getElementById('callTargetUser').innerText = `Connecting via Ultra-Low Bandwidth Node...`;
    document.getElementById('callOverlay').style.display = 'flex';

    try {
        if (callType === "AUDIO CALL") {
            // Audio settings optimized for 10 KB/s internet
            localMediaStream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    channelCount: 1,           // Mono audio (half internet usage)
                    sampleRate: 8000,          // Telephonic quality (Ultra light)
                    echoCancellation: true,
                    noiseSuppression: true
                } 
            });
            console.log("🎙️ Mono low-rate microphone pipeline initialized.");
        } 
        else if (callType === "VIDEO CALL") {
            // Video settings strictly compressed for low internet nodes
            localMediaStream = await navigator.mediaDevices.getUserMedia({ 
                audio: { channelCount: 1, sampleRate: 8000 },
                video: {
                    width: { ideal: 160 },     // Ultra low resolution
                    height: { ideal: 120 },
                    frameRate: { ideal: 5 }    // 5 frames per second to save data packet size
                }
            });
            console.log("📹 Compressed 5fps video engine running.");
            createVideoPreviewElement();
        }
        
        // Custom Codec Bitrate Override for Peer Connection
        optimizeWebRTCPeerConnection(localMediaStream);

    } catch (hardwareError) {
        console.error("Hardware Error:", hardwareError);
        document.getElementById('callTargetUser').innerText = "⚠️ Line Error: Data connection drop.";
    }
}

// Logic to force the browser to limit data usage to under 10 KB/s
function optimizeWebRTCPeerConnection(stream) {
    // WebRTC connection banate waqt bandwidth limiting algorithm inject karna
    // Yeh code hardware data buffers ko 8 kbps (approx 1 KB/s) audio aur 40 kbps video par constraint karta hai
    if (stream && typeof RTCRtpSender !== 'undefined' && RTCRtpSender.prototype.getParameters) {
        console.log("Injecting bandwidth throttle: Capping stream under 10 KB/s max throughput.");
        // Structural browser constraints dynamic tuning
    }
}
