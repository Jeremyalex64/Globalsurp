const express = require("express");
const fs = require("fs");
const path = require("path");
const products = require(`${__dirname}/data/products.json`);
const contentjson = require(`${__dirname}/data/terms.json`);

const app = express();
const port = process.env.PORT || 3000;

app.set("view cache", false);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

const homepage = {
  title: "this is the home page",
  favLink: "./images/globalsurp-favicon.png",
};

const PRODUCTS_PER_PAGE = 15;

// Only one route handler for '/'
app.get("/", async (req, res) => {
  try {
    // Get page number from query, default to 1
    const page = parseInt(req.query.page) || 1;

    // Calculate pagination values
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endIndex = Math.min(startIndex + PRODUCTS_PER_PAGE, totalProducts);

    // Get products for current page
    const paginatedProducts = products.slice(startIndex, endIndex);

    // Get current date
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
    });

    // Add console.log to debug data
    console.log("Total products:", totalProducts);
    console.log("Paginated products:", paginatedProducts.length);

    res.render("index", {
      data: paginatedProducts,
      currentPage: page,
      totalPages: totalPages,
      homepage,
      date,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server Error");
  }
});

app.get("/about", (req, res) => {
  res.render("about", {
    homepage: homepage, // Make sure to pass all needed variables
    date: new Date().getFullYear().toString(), // Add date if used in footer
  });
});
app.get("/contact", (req, res) => {
  res.render("contact", {
    homepage: homepage, // Make sure to pass all needed variables
    date: new Date().getFullYear().toString(), // Add date if used in footer
  });
});

app.get("/blogs", (req, res) => {
  res.render("blogs", {
    homepage: homepage, // Make sure to pass all needed variables
    date: new Date().getFullYear().toString(), // Add date if used in footer
  });
});

app.get("/services", (req, res) => {
  res.render("services", {
    homepage: homepage,
    date: new Date().getFullYear().toString(),
  });
});
app.get("/terms", (req, res) => {
  res.render("terms", {
    homepage: homepage,
    terms: contentjson,
    date: new Date().getFullYear().toString(),
  });
});
app.get("/privacy", (req, res) => {
  res.render("privacy", {
    homepage: homepage,
    terms: contentjson,
    date: new Date().getFullYear().toString(),
  });
});
app.get("/refund", (req, res) => {
  res.render("refund", {
    homepage: homepage,
    terms: contentjson,
    date: new Date().getFullYear().toString(),
  });
});
app.get("/disclaimer", (req, res) => {
  res.render("disclaimer", {
    homepage: homepage,
    terms: contentjson,
    date: new Date().getFullYear().toString(),
  });
});

fs.stat(`${__dirname}/data/products.json`, (err, data) => {
  if (err) throw err;
  console.log(`file size: ${data.size} byte`);
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
