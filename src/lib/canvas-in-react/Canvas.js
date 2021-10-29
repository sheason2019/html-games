import React from "react"

function Canvas(props) {
  const size = { width: window.innerWidth, height: window.innerHeight };
  return (
    <div>
      {React.Children.map(props.children, child => (
        React.cloneElement(child, {
          width: size.width,
          height: size.height,
        })
      ))}
    </div>
  )
}

export default Canvas;