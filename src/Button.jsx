export default function Button(props) {
  return (
    <button
      onClick={props.onClick}
      style={{
        background: props.color,
        width: "200px",
        height: "100px",
        margin: "auto",
        "border-radius": "50px",
        "font-size": "32px",
        "font-family": "Lato",
      }}
    >
      {props.children}
    </button>
  )
}