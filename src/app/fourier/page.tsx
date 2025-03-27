import "katex/dist/katex.min.css";
import katex from "katex";


export default function Fourier(){

    const Euler =  "e^{j\\pi}"
    const test = katex.renderToString(Euler);

    return (

        <main>
            <h1>Fourier Series</h1>
            <div dangerouslySetInnerHTML={{ __html: test }}/>
        </main>
    )

}