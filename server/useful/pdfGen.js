var pdf = require("pdf-creator-node");
var fs = require("fs");

// Read HTML Template
var html = fs.readFileSync(`./Certificates/template.html`, "utf8");

async function generatepdf(data) {
  try {
    var options = {
      format: "A5",
      orientation: "landscape",
      border: "5mm",
      // Allow proto properties for the Handlebars engine
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
      },
    };

    var users = {
      name: data?.name,
      title: data?.course?.title,
      updatedAt:data?.course?.updatedAt,
      pic:`http://localhost:3003/image/${data?.course?.pic}`
    };

    var document = {
      html: html,
      data: {
        users: users,
      },
      path: `./Certificates/${data?.id}.pdf`,
      type: "",
    };

    // Await the promise returned by pdf.create
    const res = await pdf.create(document, options);
    console.log(res);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}

module.exports = { generatepdf };
