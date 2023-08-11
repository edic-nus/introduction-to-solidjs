import { createEffect, createSignal } from "solid-js";

export default function StatusBar(props) {

  const [bars, setBars] = createSignal([])

  createEffect(() => {
    let temp = []
    for (let i = 0; i < props.value; i++) {
      temp.push(
        <div style={{
          width: "16px",
          height: "16px",
          background: props.color,
          display: "inline-block",
          margin: "0 4px"
        }}/>
      )
    }
    setBars(temp)
  })

  return (
    <div style={{
      position: "absolute",
      left: "24px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      ...props.style
    }}>
      <h4 style={{margin: 0, width: "90px"}}> {props.label} </h4>
      {bars()}
    </div>
  )
}