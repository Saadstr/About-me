document.addEventListener("DOMContentLoaded", () => {
  const getQuoteButton = document.getElementById("getQuote");
  
  if (!getQuoteButton) {
    console.error("Error: Element with ID 'getQuote' not found.");
    return;
  }

  getQuoteButton.addEventListener("click", () => {
    const ticker = document.getElementById("tickerInput").value.trim();
    if (!ticker) return alert("Please enter a ticker symbol.");
    
    const apiKey = "FJ3WABMY8AT2MJDW";
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data); 

        const globalQuote = data["Global Quote"];
        if (globalQuote) {
          console.log("Parsed Global Quote:", globalQuote); 

          const price = globalQuote["05. price"] || "N/A";
          const open = globalQuote["02. open"] || "N/A";
          const high = globalQuote["03. high"] || "N/A";
          const low = globalQuote["04. low"] || "N/A";
          const volume = globalQuote["06. volume"] || "N/A";

          document.getElementById("stockData").value = 
            `Ticker: ${ticker}\n` +
            `Price: $${price}\n` +
            `Open: $${open}\n` +
            `High: $${high}\n` +
            `Low: $${low}\n` +
            `Volume: ${volume}`;
        } else {
          document.getElementById("stockData").value = "No data found. Please check the ticker symbol.";
        }
      })
      .catch(error => {
        console.error("Error fetching stock data:", error);
        document.getElementById("stockData").value = "Error fetching data.";
      });
  });
});