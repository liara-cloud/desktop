import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
	font-family: iranyekan;
	font-style: normal;
	font-weight: bold;
	src: url('../../static/fonts/eot/iranyekanwebbold.eot');
	src: url('../../static/fonts/eot/iranyekanwebbold.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
	url('../../static/fonts/woff/iranyekanwebbold.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
	url('../../static/fonts/ttf/iranyekanwebbold.ttf') format('truetype');
}

@font-face {
	font-family: iranyekan;
	font-style: normal;
	font-weight: 100;
	src: url('../../static/fonts/eot/iranyekanwebthin.eot');
	src: url('../../static/fonts/eot/iranyekanwebthin.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
	url('../../static/fonts/woff/iranyekanwebthin.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
	url('../../static/fonts/ttf/iranyekanwebthin.ttf') format('truetype');
}

@font-face {
	font-family: iranyekan;
	font-style: normal;
	font-weight: 300;
	src: url('../../static/fonts/eot/iranyekanweblight.eot');
	src: url('../../static/fonts/eot/iranyekanweblight.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
	url('../../static/fonts/woff/iranyekanweblight.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
	url('../../static/fonts/ttf/iranyekanweblight.ttf') format('truetype');
}

@font-face {
	font-family: iranyekan;
	font-style: normal;
	font-weight: normal;
	src: url('../../static/fonts/eot/iranyekanwebregular.eot');
	src: url('../../static/fonts/eot/iranyekanwebregular.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
	url('../../static/fonts/woff/iranyekanwebregular.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
	url('../../static/fonts/ttf/iranyekanwebregular.ttf') format('truetype');
}

@font-face {
	font-family: iranyekan;
	font-style: normal;
	font-weight: 500;
	src: url('../../static/fonts/eot/iranyekanwebmedium.eot');
	src: url('../../static/fonts/eot/iranyekanwebmedium.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
	url('../../static/fonts/woff/iranyekanwebmedium.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
	url('../../static/fonts/ttf/iranyekanwebmedium.ttf') format('truetype');
}

@font-face {
	font-family: iranyekan;
	font-style: normal;
	font-weight: 800;
	src: url('../../static/fonts/eot/iranyekanwebextrabold.eot');
	src: url('../../static/fonts/eot/iranyekanwebextrabold.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
	url('../../static/fonts/woff/iranyekanwebextrabold.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
	url('../../static/fonts/ttf/iranyekanwebextrabold.ttf') format('truetype');
}

@font-face {
	font-family: iranyekan;
	font-style: normal;
	font-weight: 900;
	src: url('../../static/fonts/eot/iranyekanwebblack.eot');
	src: url('../../static/fonts/eot/iranyekanwebblack.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
	url('../../static/fonts/woff/iranyekanwebblack.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
	url('../../static/fonts/ttf/iranyekanwebblack.ttf') format('truetype');
}

	*{
		padding : 0;
		margin : 0;
		box-sizing: border-box;
	}

  body {
    margin: 0;
    font-family: Open-Sans, iranyekan ,Helvetica, Sans-Serif;
	color : #303030
  }
  


::selection { background: transparent; }
::-moz-selection { background: transparent; }

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


input[type=number] {
  -moz-appearance: textfield;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inherit;
  border-radius: 10px;
  margin-top : 10px;
  margin-bottom : 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #0070F3;
  border-radius: 10px;
}
`;

export default GlobalStyle;
