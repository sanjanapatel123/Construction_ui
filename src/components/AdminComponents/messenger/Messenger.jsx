

// import React, { useState } from 'react';

// const Messenger = () => {
//   const [isChatExpanded, setIsChatExpanded] = useState(true);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [messageText, setMessageText] = useState('');

//   const toggleChat = () => {
//     setIsChatExpanded(!isChatExpanded);
//   };

//   const toggleMute = () => {
//     setIsMuted(!isMuted);
//   };

//   const toggleVideo = () => {
//     setIsVideoOn(!isVideoOn);
//   };

//   const toggleScreenShare = () => {
//     setIsScreenSharing(!isScreenSharing);
//   };

//   const toggleFullScreen = () => {
//     setIsFullScreen(!isFullScreen);
//   };

//   const handleSendMessage = () => {
//     if (messageText.trim()) {
//       // Logic to send message would go here
//       setMessageText('');
//     }
//   };

//   return (
//     <div className="flex h-screen bg-white">
//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
           
//         {/* Main Meeting Area */}
//         <div className="flex-1 flex">
//           {/* Video Conference Area */}
//           <div className="flex-1 p-6 flex flex-col">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-semibold"> Project Meeting</h2>
//               <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg !rounded-button whitespace-nowrap cursor-pointer">
//                 <i className="fas fa-plus mr-2"></i>
//                 Invite Participant
//               </button>
//             </div>
            
//             {/* Participant Carousel */}
//             <div className="relative mb-4">
//               <div className="flex justify-center space-x-4">
//                 <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 cursor-pointer">
//                   <i className="fas fa-chevron-left text-gray-600"></i>
//                 </button>
                
//                 <div className="flex space-x-4">
//                   <div className="relative w-40 h-24 rounded-lg overflow-hidden">
//                     <img src="https://readdy.ai/api/search-image?query=professional%20business%20woman%20with%20dark%20skin%2C%20smiling%2C%20office%20setting%2C%20professional%20attire%2C%20headshot%20style%2C%20high%20quality%20portrait%2C%20realistic&width=160&height=96&seq=2&orientation=landscape" alt="Sarah Parker" className="w-full h-full object-cover" />
//                     <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-sm">
//                       Sarah Parker
//                     </div>
//                     <div className="absolute top-2 right-2">
//                       <i className="fas fa-microphone-slash text-white bg-red-500 p-1 rounded-full"></i>
//                     </div>
//                   </div>
                  
//                   <div className="relative w-40 h-24 rounded-lg overflow-hidden">
//                     <img src="https://readdy.ai/api/search-image?query=asian%20business%20man%20with%20glasses%2C%20smiling%2C%20office%20setting%2C%20professional%20attire%2C%20headshot%20style%2C%20high%20quality%20portrait%2C%20realistic&width=160&height=96&seq=3&orientation=landscape" alt="Mike Johnson" className="w-full h-full object-cover" />
//                     <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-sm">
//                       Mike Johnson
//                     </div>
//                   </div>
                  
//                   <div className="relative w-40 h-24 rounded-lg overflow-hidden">
//                     <img src="https://readdy.ai/api/search-image?query=professional%20business%20man%2C%20smiling%2C%20office%20setting%2C%20professional%20attire%2C%20headshot%20style%2C%20high%20quality%20portrait%2C%20realistic&width=160&height=96&seq=4&orientation=landscape" alt="John Smith" className="w-full h-full object-cover" />
//                     <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-sm">
//                       John Smith
//                     </div>
//                   </div>
//                 </div>
                
//                 <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 cursor-pointer">
//                   <i className="fas fa-chevron-right text-gray-600"></i>
//                 </button>
//               </div>
//             </div>
            
//             {/* Main Video Display */}
//             <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-100 mb-4">
//               <img 
//                 src="https://readdy.ai/api/search-image?query=young%20professional%20woman%20with%20headphones%20in%20home%20office%2C%20smiling%20and%20giving%20thumbs%20up%2C%20casual%20business%20attire%2C%20bright%20well-lit%20room%20with%20plants%20and%20desk%2C%20high%20quality%20realistic%20image&width=800&height=450&seq=5&orientation=landscape" 
//                 alt="Active Speaker" 
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm flex items-center">
//                 <i className="fas fa-circle text-xs mr-1"></i>
//                 12:32
//               </div>
//               <div className="absolute top-4 right-4">
//                 <button className="bg-white bg-opacity-75 text-gray-700 px-3 py-1 rounded-md text-sm !rounded-button whitespace-nowrap cursor-pointer">
//                   <i className="fas fa-eye-slash mr-1"></i>
//                   Hide
//                 </button>
//               </div>
//             </div>
            
//             {/* Video Controls */}
//             <div className="flex justify-center space-x-4 py-4">
//               <button 
//                 onClick={toggleMute}
//                 className={`w-12 h-12 rounded-full flex items-center justify-center ${isMuted ? 'bg-gray-200' : 'bg-gray-100'} !rounded-button whitespace-nowrap cursor-pointer`}
//               >
//                 <i className={`fas ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'} text-gray-600 text-lg`}></i>
//               </button>
              
//               <button 
//                 onClick={toggleScreenShare}
//                 className={`w-12 h-12 rounded-full flex items-center justify-center ${isScreenSharing ? 'bg-blue-100' : 'bg-gray-100'} !rounded-button whitespace-nowrap cursor-pointer`}
//               >
//                 <i className="fas fa-desktop text-gray-600 text-lg"></i>
//               </button>
              
//               <button className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-500 text-white !rounded-button whitespace-nowrap cursor-pointer">
//                 <i className="fas fa-phone-alt text-2xl"></i>
//               </button>
              
//               <button 
//                 onClick={toggleVideo}
//                 className={`w-12 h-12 rounded-full flex items-center justify-center ${isVideoOn ? 'bg-gray-100' : 'bg-gray-200'} !rounded-button whitespace-nowrap cursor-pointer`}
//               >
//                 <i className={`fas ${isVideoOn ? 'fa-video' : 'fa-video-slash'} text-gray-600 text-lg`}></i>
//               </button>
              
//               <button className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
//                 <i className="fas fa-cog text-gray-600 text-lg"></i>
//               </button>
              
//               <button 
//                 onClick={toggleFullScreen}
//                 className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer"
//               >
//                 <i className={`fas ${isFullScreen ? 'fa-compress' : 'fa-expand'} text-gray-600 text-lg`}></i>
//               </button>
//             </div>
//           </div>
          
//           {/* Right Sidebar - Participants & Chat */}
//           <div className="w-80 border-l border-gray-200 flex flex-col">
//             {/* Participants Section */}
//             <div className="border-b border-gray-200">
//               <div className="p-4 flex justify-between items-center">
//                 <h4 className="font-medium">Participant <span className="text-gray-500">(5)</span></h4>
//                 <button className="text-gray-500 cursor-pointer">
//                   <i className="fas fa-ellipsis-v"></i>
//                 </button>
//               </div>
              
//               <div className="px-4 pb-4 space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <img src="https://readdy.ai/api/search-image?query=middle%20eastern%20business%20man%2C%20professional%20headshot%2C%20office%20setting%2C%20business%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic&width=40&height=40&seq=6&orientation=squarish" alt="Akbar Husain" className="w-10 h-10 rounded-full object-cover" />
//                     <span className="ml-2">Akbar Husain</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <span className="text-blue-500 text-sm">Host</span>
//                     <i className="fas fa-microphone text-gray-500"></i>
//                     <i className="fas fa-video text-gray-500"></i>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <img src="https://readdy.ai/api/search-image?query=indian%20business%20man%2C%20professional%20headshot%2C%20office%20setting%2C%20business%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic&width=40&height=40&seq=7&orientation=squarish" alt="Aneesh Menon" className="w-10 h-10 rounded-full object-cover" />
//                     <span className="ml-2">Aneesh Menon</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-microphone-slash text-gray-400"></i>
//                     <i className="fas fa-video text-gray-500"></i>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <img src="https://readdy.ai/api/search-image?query=caucasian%20business%20man%2C%20professional%20headshot%2C%20office%20setting%2C%20business%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic&width=40&height=40&seq=8&orientation=squarish" alt="Jonathan Sasi" className="w-10 h-10 rounded-full object-cover" />
//                     <span className="ml-2">Jonathan Sasi</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-microphone text-gray-500"></i>
//                     <i className="fas fa-video-slash text-gray-400"></i>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <img src="https://readdy.ai/api/search-image?query=indian%20business%20woman%2C%20professional%20headshot%2C%20office%20setting%2C%20business%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic&width=40&height=40&seq=9&orientation=squarish" alt="Riska Thakur" className="w-10 h-10 rounded-full object-cover" />
//                     <span className="ml-2">Riska Thakur</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-microphone text-gray-500"></i>
//                     <i className="fas fa-video-slash text-gray-400"></i>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <img src="https://readdy.ai/api/search-image?query=hispanic%20business%20woman%2C%20professional%20headshot%2C%20office%20setting%2C%20business%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic&width=40&height=40&seq=10&orientation=squarish" alt="Natalia" className="w-10 h-10 rounded-full object-cover" />
//                     <span className="ml-2">Natalia</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-microphone-slash text-gray-400"></i>
//                     <i className="fas fa-video text-gray-500"></i>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <img src="https://readdy.ai/api/search-image?query=indian%20business%20woman%2C%20younger%2C%20professional%20headshot%2C%20office%20setting%2C%20business%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic&width=40&height=40&seq=11&orientation=squarish" alt="Alia Thakur" className="w-10 h-10 rounded-full object-cover" />
//                     <span className="ml-2">Alia Thakur</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-microphone-slash text-gray-400"></i>
//                     <i className="fas fa-video text-gray-500"></i>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Chat Room Section */}
//             <div className="flex-1 flex flex-col">
//               <div className="p-4 flex justify-between items-center border-b border-gray-200">
//                 <h4 className="font-medium">Chat Room</h4>
//                 <button onClick={toggleChat} className="text-gray-500 cursor-pointer">
//                   <i className={`fas ${isChatExpanded ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
//                 </button>
//               </div>
              
//               {isChatExpanded && (
//                 <>
//                   <div className="p-4 border-b border-gray-200">
//                     <div className="flex items-center text-blue-500 text-sm">
//                       <i className="fas fa-pen mr-2"></i>
//                       <span>Riska Thakur is Typing...</span>
//                     </div>
//                   </div>
                  
//                   <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                     <div className="text-center text-xs text-gray-500">
//                       2 hours ago
//                     </div>
                    
//                     <div className="flex">
//                       <img src="https://readdy.ai/api/search-image?query=caucasian%20business%20man%2C%20professional%20headshot%2C%20office%20setting%2C%20business%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic&width=40&height=40&seq=12&orientation=squarish" alt="User" className="w-8 h-8 rounded-full object-cover mr-2" />
//                       <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
//                         <p>Can u hear my voice</p>
//                       </div>
//                     </div>
                    
//                     <div className="flex justify-end">
//                       <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs">
//                         <p>Ok wait, 5 min</p>
//                       </div>
//                       <img src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20project%20manager%2C%20male%2C%2035%20years%20old%2C%20business%20attire%2C%20neutral%20background%2C%20high%20quality%20professional%20portrait%2C%20realistic&width=40&height=40&seq=13&orientation=squarish" alt="You" className="w-8 h-8 rounded-full object-cover ml-2" />
//                     </div>
                    
//                     <div className="flex">
//                       <img src="https://readdy.ai/api/search-image?query=caucasian%20business%20man%2C%20professional%20headshot%2C%20office%20setting%2C%20business%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20realistic&width=40&height=40&seq=14&orientation=squarish" alt="User" className="w-8 h-8 rounded-full object-cover mr-2" />
//                       <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
//                         <p>Thanks ...</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="p-4 border-t border-gray-200">
//                     <div className="flex">
//                       <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
//                         <i className="fas fa-paperclip text-gray-400 mr-2"></i>
//                         <input 
//                           type="text" 
//                           placeholder="Message..." 
//                           className="bg-transparent border-none outline-none w-full text-sm"
//                           value={messageText}
//                           onChange={(e) => setMessageText(e.target.value)}
//                           // onKeyPress={handleKeyPress}
//                         />
//                       </div>
//                       <button 
//                         onClick={handleSendMessage}
//                         className="ml-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white !rounded-button whitespace-nowrap cursor-pointer"
//                       >
//                         <i className="fas fa-paper-plane"></i>
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messenger;

import React from 'react'

function Messenger() {
  return (
    <>
        <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Sidebar */}
        <div className="col-md-4 border-end d-flex flex-column p-0">
          <div className="p-3 border-bottom">
            <h6>Chats</h6>
            <input type="text" className="form-control" placeholder="Search" />
          </div>
          <div className="flex-grow-1 overflow-auto">
            {[...Array(10)].map((_, idx) => (
              <div
                key={idx}
                className="d-flex align-items-center p-3 border-bottom hover-bg"
                style={{ cursor: "pointer" ,hover:"backgroundColor:'#f8f9fa'"}}
              >
                <div className="me-2">
                  <img
                    src={`https://i.pravatar.cc/40?img=${idx + 1}`}
                    alt="user"
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                </div>
                <div className="flex-grow-1">
                  <div className="fw-bold">User {idx + 1}</div>
                  <small className="text-muted">Last message preview...</small>
                </div>
                <div className="text-muted small">3:4{idx % 10} PM</div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="col-md-8 d-flex flex-column p-0">
          {/* Header */}
          <div className="d-flex align-items-center border-bottom p-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <div>
              <div className="fw-bold">Construction management system</div>
              <small className="text-muted"></small>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow-1 overflow-auto p-3" id="chat-body" style={{overflowY:"auto",height:"calc(100vh-150px)"}}>
            <div className="text-center text-muted small mb-3">Today</div>

            <div className="d-flex justify-content-start mb-2">
              <div className="bg-light p-2 rounded shadow-sm">
                <div className="fw-bold mb-1"> Developer</div>
                <div>I improved A to Z working for SEMS</div>
              </div>
            </div>

            <div className="d-flex justify-content-end mb-2">
              <div className="bg-success text-white p-2 rounded shadow-sm">
                Will check and provide feedback soon
              </div>
            </div>

            {/* Add more chat bubbles here */}
          </div>

          {/* Message Input */}
          <div className="border-top p-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message"
              />
              <button className="btn btn-primary">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Messenger
