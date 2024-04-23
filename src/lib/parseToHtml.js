import LexicalHTMLRenderer from "@tryghost/kg-lexical-html-renderer";
const renderer = new Renderer();

const lexicalState = "{...}";
const html = await renderer.render(lexicalState);
