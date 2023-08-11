import * as Solid from "solid-js";
import {
  TIME_PER_DAY,
  MAX_AFFECTION
} from './const';
import Blocky, { 
  health, 
  hunger, 
  setHunger,
  affection, 
  setAffection,
  setLastFeed,
  setLastPet
} from "./Blocky";
import StatusBar from "./StatusBar";
import Scene from "./Scene";
import CustomButton from "./Button";

// =============================================================================
function App() {

  const [day, setDay] = Solid.createSignal(1);
  const [time, setTime] = Solid.createSignal(0);

  const [feed, setFeed] = Solid.createSignal(false);
  const [pet, setPet] = Solid.createSignal(false);

  Solid.createEffect(() => {
    let timer = setInterval(() => { 
      if (time() == TIME_PER_DAY) setTime(0);
      setTime(time => time + 1);
      
      console.log("time", time())
      if (health() == 0) clearInterval(timer)
    }, 1000)

  })
  
  Solid.createEffect(() => {
    if (time() == TIME_PER_DAY) {
      setDay(day => day + 1);
      setFeed(false);
      setPet(false);
    }
  })

  return (
    <div>

      <div style={{
        "font-family": "Lato",
        "font-size": "40px",
        "font-weight": "bold",
        width: "fit-content",
        margin: "60px auto",
      }}>
        Blocky Tamagotchi
      </div>

      <Scene>
        <StatusBar 
          label="Health" 
          value={health()} 
          color="red" 
          style={{
            top: "60px",
          }}
        />
        <StatusBar 
          label="Hunger" 
          value={hunger()} 
          color="rosybrown" 
          style={{
            top: "100px",
          }}
        />
        <StatusBar 
          label="Affection" 
          value={affection()} 
          color="lightpink" 
          style={{
            top: "140px",
          }}
        />

        <h2 style={{
          width: "fit-content",
          margin: "auto",
          "font-family": "Lato"
        }}>
          Day: {day()}
        </h2>

        <Blocky 
          day={day()} 
          feed={feed()} 
          pet={pet()}
        />
      </Scene>
      
      <div style={{
        margin: "40px auto",
        width: "600px",
        display: "grid",
        "grid-template-columns": "auto auto",
      }}>
        <CustomButton
          color="rosybrown"
          onClick={() => {
            if (feed() != true && hunger() > 0) {
              setHunger(hunger() - 1)
            }
            setFeed(true)
            setLastFeed(day())
          }}
        >
          Feed
        </CustomButton>

        <CustomButton
          color="lightpink"
          onClick={() => {
            if (pet() != true && affection() < MAX_AFFECTION) {
              setAffection(affection() + 1)
            }
            setPet(true)
            setLastPet(day())
          }}
        >
          Pet
        </CustomButton>
      </div>

    </div>
  );
}

export default App;
