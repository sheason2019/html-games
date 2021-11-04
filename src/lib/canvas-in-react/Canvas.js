import React from "react"

function Canvas(props) {
  const { width = window.innerWidth, height = window.innerHeight } = props;
  return (
    <div>
      {React.Children.map(props.children, child => (
        React.cloneElement(child, {
          width: width,
          height: height,
        })
      ))}
    </div>
  )
}

export default Canvas;