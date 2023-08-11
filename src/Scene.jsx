export default function Scene(props) {

  return (
    <div style={{
      background: "lightcyan",
      width: "600px",
      height: "600px",
      border: "2px solid black",
      "border-radius": "64px",
      margin: "120px auto 0 auto",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        width: "100%",
        height: '120px',
        background: "green",
        position: "absolute",
        bottom: 0
      }}/>
      
      {props.children}

    </div>
  )
}