const puppeteer = require('puppeteer');

async function convertHTMLToPDF(htmlContent, outputPath) {
  try {
    // Launch a headless Chrome browser
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    // Set the HTML content of the page
    await page.setContent(htmlContent);

    // Generate the PDF
    await page.pdf({ path: outputPath });

    console.log('PDF created successfully:', outputPath);

    // Close the browser
    await browser.close();
  } catch (err) {
    console.error('Error generating PDF:', err);
  }
}

// Example usage
const htmlContent = `
  <html>
    <body>
      <h1>Hello, World!</h1>
      <p>This is an example HTML content.</p>
    </body>
  </html>
`;

const outputPath = 'output.pdf';

convertHTMLToPDF(htmlContent, outputPath);
