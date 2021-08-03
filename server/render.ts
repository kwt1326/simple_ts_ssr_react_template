export default function renderHTML(component: string, src: string) {
  return (
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Welcome The Shop!</title>
      </head>
      <body>
        <div id="react-root">${component}</div>
        <script defer="defer" src=${src}></script>
      </body>
    </html>`
  )
}