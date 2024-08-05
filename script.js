document.addEventListener("DOMContentLoaded", (event) => {
  const quoteId = new URLSearchParams(window.location.search).get("id");
  const quoteFile = quoteId ? `quotes/${quoteId}.md` : "quotes/default.md";

  fetch(quoteFile)
    .then((response) => response.text())
    .then((markdown) => {
      const converter = new showdown.Converter();
      const html = converter.makeHtml(markdown);
      document.getElementById("quote-content").innerHTML = html;

      // Update meta tags
      const firstLine = markdown.split("\n")[0];
      document.title = firstLine;
      document
        .querySelector('meta[property="og:title"]')
        .setAttribute("content", firstLine);
      document
        .querySelector('meta[property="og:description"]')
        .setAttribute("content", firstLine);
    })
    .catch((error) => {
      console.error("Error loading quote:", error);
      document.getElementById("quote-content").innerHTML =
        "<p>Error loading quote. Please try again later.</p>";
    });
});
