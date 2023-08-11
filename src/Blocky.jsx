import { createEffect, createSignal, untrack } from "solid-js"
import {
  MAX_HEALTH,
  MAX_HUNGER,
  MAX_AFFECTION,
} from "./const"

// =============================================================================
export const [health, setHealth] = createSignal(5)
export const [hunger, setHunger] = createSignal(0, { equals: false })
export const [affection, setAffection] = createSignal(MAX_AFFECTION, { equals: false })

export const [lastFeed, setLastFeed] = createSignal(0)
export const [lastPet, setLastPet] = createSignal(0)

export default function Blocky(props) {

  createEffect(() => {
    if (isAboveLimit(lastFeed(), props.day, 1)) {
      if (untrack(hunger) < MAX_HUNGER) 
        setHunger(untrack(hunger) + 1)
      else
        setHunger(3)
    }
  })

  createEffect(() => {
    if (isAboveLimit(lastPet(), props.day, 1)) {
      if (untrack(affection) > 0)
        setAffection(untrack(affection) - 1)
      else {
        setAffection(0)
      }
    }
  })

  createEffect(() => {
    if (affection() == 0 || hunger() == 3) {
      if (untrack(health) > 0) setHealth(untrack(health) - 1)
    }
  })

  return (
    <div style={{
      width: "80px",
      height: "80px",
      background: getStatusColor(health()),
      position: "absolute",
      bottom: "120px",
      left: `${(600 - 80)/2}px`,
      animation: getStatusAnimation(health()),
      // left: 'calc((600px - 80px)/2)',
    }}/>
  )
}

function isAboveLimit(lastDay, currentDay, limit) {
  if (currentDay - lastDay <= limit) return false;
  return true;
}

function getStatusColor(health) {
  if (health >= MAX_HEALTH - 2) return "lightgreen";
  if (health >= MAX_HEALTH - 4) return "orange";
  if (health == 0 ) return "black";
}

function getStatusAnimation(health) {
  if (health >= MAX_HEALTH - 2) return "2s jumping infinite";
  if (health >= MAX_HEALTH - 4) return '2s wiggling infinite';
  if (health == 0 ) return undefined;
}