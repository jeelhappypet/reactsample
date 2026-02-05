import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'; // Import default styles

export default function MyPageAsPopup() {
  return (
    <div>
      <Popup trigger={<button> Click to open pop-up </button>} modal nested>
        {close => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            {/* Your entire React page content goes here */}
            <h2>Your Page Content</h2>
            <p>This content is now inside a library-managed modal.</p>
            <a className="button" onClick={close}>
              Close pop-up
            </a>
          </div>
        )}
      </Popup>
    </div>
  );
}