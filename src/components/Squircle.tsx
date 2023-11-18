function Squircle({ color, height, width, clipPath }) {


    const squirclesStyle = {
        backgroundColor: color,
        height: height + "%",
        width: width + "%",
        clipPath: 'path("' + clipPath + '")'
    }

    return (
        <div id='squircle-container'>
            <button className="squircle"
                style={squirclesStyle} >
                <b>SQUIRCLE</b>
            </button>
        </div >
    )
}

export default Squircle