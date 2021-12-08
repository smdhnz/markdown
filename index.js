const showdown  = require('showdown');
const path = require('path');
const fs = require('fs');
const http = require('http');

const filename = path.basename(process.argv[2]);
const data = fs.readFileSync('mnt/' + filename)
const text = data.toString();

const converter = new showdown.Converter({
    ghCompatibleHeaderId: true,
    simpleLineBreaks: true,
    ghMentions: true,
    tables: true,
});
converter.setFlavor('github');

const html = `
<html>
  <head>
    <title>` + filename + `</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/default.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>
    <style>
        body {
            box-sizing: border-box;
            min-width: 200px;
            max-width: 980px;
            margin: 0 auto;
            padding: 45px;
        }
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #0d1117;
            }
        }
    </style>
  </head>
  <body>
    <article class="markdown-body">` + converter.makeHtml(text) + `</article>
  </body>
</html>
`;

const server = http.createServer(function(_,response){
    response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    response.end(html);
})
console.log('Running on http://localhost:1234');
server.listen(1234);

