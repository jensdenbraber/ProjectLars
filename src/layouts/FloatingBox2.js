import React from 'react';

export default function FloatingBox2(props) {

    return (
        <div className="fixed" style={{ zindex: -1, top: props.top, left: props.left, width: props.width, height: props.height, backgroundColor: props.backgroundColor }}>
            {props.children}
        </div>
    )
}
