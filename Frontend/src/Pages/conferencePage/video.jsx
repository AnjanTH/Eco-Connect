import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


const VideoPage = () => {
    const { roomCode } = useParams();
    const meetingContainerRef = useRef(null);
    
    useEffect(() => {
        const initMeeting = async () => {
            const appID = 1851883805; 
            const serverSecret = "00314d178d918b1ca6c7f9c2795c0438"; 
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomCode,
                Date.now().toString(),
                "Anjan"
            );

            const zc = ZegoUIKitPrebuilt.create(kitToken);

            zc.joinRoom({
                container: meetingContainerRef.current,
                sharedLinks: [
                    {
                        name: "Personal link",
                        url:
                            window.location.protocol +
                            "//" +
                            window.location.host +
                            window.location.pathname +
                            "?roomCode=" +
                            roomCode,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                showScreenSharingButton: false,
            });
        };

        initMeeting();
    }, [roomCode]);

    return <div ref={meetingContainerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default VideoPage;
