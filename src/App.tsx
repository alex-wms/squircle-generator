import Setter from './components/Setter'
import Squircle from './components/Squircle'

import './App.css'
import { useEffect, useState } from 'react';
import wmsLogo from "./assets/logo-wms.svg"

function App() {
  const [color, setColor] = useState("#31B1D9");
  const [height, setHeight] = useState(30);
  const [width, setWidth] = useState(23);
  const [curve, setCurve] = useState(0.89);
  const [clipPath, setClipPath] = useState("")
  const [currentHeight, setCurrentHeight] = useState(172)
  const [currentWidth, setCurrentWidth] = useState(172)

  const onSetColor = (event) => {
    const newColor: string = event.target.value
    setColor(newColor)
  }

  const onSetCurrentHeight = () => {
    const element: HTMLElement = (document.getElementsByClassName("squircle")[0]) as HTMLElement
    setCurrentHeight(element.offsetHeight)
  }
  const onSetCurrentWidth = () => {
    const element: HTMLElement = (document.getElementsByClassName("squircle")[0]) as HTMLElement
    setCurrentWidth(element.offsetWidth)
  }

  const onSetHeight = (event) => {
    const newHeight: number = event.target.value
    setHeight(newHeight)
    onSetCurrentHeight()
  }

  const onSetWidth = (event) => {
    const newWidth: number = event.target.value
    setWidth(newWidth)

    onSetCurrentWidth()
  }

  const onSetCurve = (e) => {
    setCurve(e.target.value * 0.01)
  }

  function createClipPath() {
    const squircle: HTMLElement = document.getElementsByClassName("squircle")[0] as HTMLElement
    const calc1 = (squircle.offsetHeight / 2) - ((squircle.offsetHeight / 2) * curve);
    const calc2 = (squircle.offsetWidth - squircle.offsetHeight) + ((squircle.offsetHeight / 2) * curve) + (squircle.offsetHeight / 2);
    const calc3 = ((squircle.offsetHeight / 2) * curve) + (squircle.offsetHeight / 2);

    const m = "M 0 " + (squircle.offsetHeight / 2).toFixed(2);
    const c = "C 0 " + calc1.toFixed(2) + " " + calc1.toFixed(2) + " 0 " + (squircle.offsetWidth / 2).toFixed(2) + " 0";
    const s1 = "S " + squircle.offsetWidth.toFixed(2) + " " + calc1.toFixed(2) + " " + squircle.offsetWidth.toFixed(2) + " " + (squircle.offsetHeight / 2).toFixed(2);
    const s2 = "S " + calc2 + " " + squircle.offsetHeight.toFixed(2) + " " + (squircle.offsetWidth / 2).toFixed(2) + " " + squircle.offsetHeight.toFixed(2)
    const s3 = " S 0 " + calc3 + " 0 " + (squircle.offsetHeight / 2).toFixed(2);
    setClipPath(m + " " + c + " " + s1 + " " + s2 + " " + s3)
  }

  useEffect(() => {
    onSetCurrentWidth()
    onSetCurrentHeight()
    createClipPath()
    window.addEventListener('resize', createClipPath);
  })

  return (
    <div id="app">
      <h1>Squircle generator</h1>
      <h2>Generate <span className='black'>CSS</span> & <span className='black'>JS</span> code for squircle</h2>
      <div id="app-container">

        < Squircle
          color={color}
          height={height}
          width={width}
          clipPath={clipPath}
        />
        <Setter
          color={color}
          height={height}
          currentHeight={currentHeight}
          currentWidth={currentWidth}
          width={width}
          curve={curve}
          clipPath={clipPath}
          onSetColor={onSetColor}
          onSetHeight={onSetHeight}
          onSetWidth={onSetWidth}
          onSetCurve={onSetCurve}
        />
      </div>
      <div className="bottom">
        <a href="https://webmate-services.com" target="_blank">
          <img src={wmsLogo} alt="" />
        </a>
      </div>
    </div>
  )
}

export default App
