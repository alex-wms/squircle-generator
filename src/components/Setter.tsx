import { useState } from "react"
import { CopyBlock, hybrid } from 'react-code-blocks';

function Setter({ color, onSetColor, height, width, curve, clipPath, onSetHeight, onSetWidth, onSetCurve, currentHeight, currentWidth }) {
    const [isResponsive, setIsResponsive] = useState(false)

    const cssRender = parseCssRender()
    const htmlI = "<button class='squircle'>\n   <i>Squircle</i>\n</button>";
    let jsContent = 'createClipPath = () => { \n'
    jsContent += '   const squircle = document.getElementsByClassName("squircle")[0] \n'
    jsContent += '   curve = ' + curve.toFixed(2) + ";\n";
    jsContent += '   const calc1 = (squircle.offsetHeight / 2) - ((squircle.offsetHeight / 2) * curve); \n'
    jsContent += '   const calc2 = (squircle.offsetWidth - squircle.offsetHeight) + ((squircle.offsetHeight / 2) * curve) + (squircle.offsetHeight / 2);\n'
    jsContent += '   const calc3 = ((squircle.offsetHeight / 2) * curve) + (squircle.offsetHeight / 2);\n'
    jsContent += '   const m = "M 0 " + (squircle.offsetHeight / 2);\n'
    jsContent += '   const c = "C 0 " + calc1 + " " + calc1 + " 0 " + (squircle.offsetWidth / 2) + " 0";\n'
    jsContent += '   const s1 = "S " + squircle.offsetWidth + " " + calc1 + " " + squircle.offsetWidth + " " + (squircle.offsetHeight / 2);\n'
    jsContent += '   const s2 = "S " + calc2 + " " + squircle.offsetHeight + " " + (squircle.offsetWidth / 2) + " " + squircle.offsetHeight\n'
    jsContent += '   const s3 = " S 0 " + calc3 + " 0 " + (squircle.offsetHeight / 2);\n'
    jsContent += '   clipPath = m + " " + c + " " + s1 + " " + s2 + " " + s3\n'
    jsContent += '   squircle.style.clipPath = "path(\'" + clipPath + "\')";\n'
    jsContent += '}\n'
    jsContent += 'createClipPath()\n'
    jsContent += 'window.addEventListener("resize", () => createClipPath())\n'

    const openCode = (evt, name) => {
        let i
        const tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            (tabcontent[i] as HTMLElement).style.display = "none";
        }
        const tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(name).style.display = "block";
        evt.target.className += " active";
    }

    function parseCssRender() {
        let cssParsingText = ".squircle {\n" + "   border: none;\n   background-color: " + color + ";\n   color: #FFF;\n   font-size: 1.3vw;\n   ";
        if (isResponsive) {
            cssParsingText += "height: " + height + "%;\n" + "   width: " + width + "%;"
        } else {
            cssParsingText += "height: " + currentHeight + "px;\n" + "   width: " + currentWidth + "px;"
        }
        cssParsingText += "\n   clip-path: path('" + clipPath + "');\n}"
        return cssParsingText;
    }

    return (
        <div id="setter">

            <form id="form" >
                <label>Pick a color :</label>
                <input onChange={onSetColor} type="color" name="color" id="color" value={color} />
                <label>Height : {(currentHeight > 0) ? currentHeight + "px" : ""}</label>
                <input type="range" onChange={onSetHeight} name="height" id="height" min="0" max="100" value={height} />
                <label>Width : {(currentWidth > 0) ? currentWidth + "px" : ""}</label>
                <input type="range" onChange={onSetWidth} name="height" id="width" min="0" max="100" value={width} />
                <label>Curve : {curve.toFixed(2)}</label>
                <input type="range" onChange={onSetCurve} name="curve" id="curve" min="-50" max="200" value={curve * 100} ></input>
                <div>
                    <input type="checkbox" id="responsive" onClick={() => setIsResponsive(!isResponsive)} />
                    <label htmlFor="responsive">Responsive</label>
                </div>
            </form >

            <div id="code-renderer-container" className="tab">
                <button className="tablinks" onClick={() => openCode(event, 'html-renderer-container')}>HTML</button>
                <button className="tablinks active" onClick={() => openCode(event, 'css-renderer-container')}>CSS</button>
                <button className="tablinks" onClick={() => openCode(event, 'js-renderer-container')}>JS</button>
                <div id="html-renderer-container" className="tabcontent">
                    <CopyBlock
                        text={htmlI}
                        language={"html"}
                        showLineNumbers={true}
                        theme={hybrid}
                    />
                </div>
                <div id="css-renderer-container" className="tabcontent" style={{ display: "block" }}>
                    <CopyBlock
                        text={cssRender}
                        language={"css"}
                        showLineNumbers={true}
                        theme={hybrid}
                    />
                </div>
                <div id="js-renderer-container" className="tabcontent">
                    {isResponsive ?
                        <CopyBlock
                            text={jsContent}
                            language={"js"}
                            showLineNumbers={true}
                            theme={hybrid}
                        /> : ""
                    }
                </div>
                <p id="know-more-link">Read more about <a href="https://fr.wikipedia.org/wiki/Squircle" target="_blank">squircle</a></p>
            </div >
        </div >
    )
}

export default Setter