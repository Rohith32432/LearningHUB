const { GoogleGenerativeAI } = require("@google/generative-ai");
const { course } = require("../models/Courses");
const doenv=require('dotenv')
const nodemailer=require('nodemailer')

doenv.config()

 async function recomed(req,res) {
    const {cname}=req.body
    const genAI = new GoogleGenerativeAI(process.env.geminikey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
        const courses = await course.find().select('-articles -users -quiz').limit(5); 
        // res.json(courses);
    
      // Construct the prompt with dynamic course name
      let prompt = `
      mydata = ${courses}
      Given the following list of courses in JSON format, recommend courses for a user who has completed '${cname}'.
      If no related courses are found, return 'No specific courses in DB'.
      
      For each recommended course, provide complete details including:
        - courseID
        - name
        - instructor
        - duration (in weeks)
        - credits
        - category
        - a brief reason explaining why it's recommended
      
      Additionally, suggest new relevant courses that are not in the given list. 
      
      The output must be in valid JSON format and exactly follow this structure:
      {
        "recommendations": [
          {
            "courseID": "",
            "name": "",
            "instructor": "",
            "duration": "",
            "credits": "",
            "category": "",
            "reason": ""
          }
          // ... additional recommended courses if applicable
        ],
        "suggestedNewCourses": [
          {
            "courseName": "",
            "category": "",
            "reason": ""
          }
          // ... additional suggested new courses if applicable
        ]
      }
      `;
      
    
        const result = await model.generateContent(prompt)
        // Send the list of courses as a JSON response
        // res.json(result.response.text());
        const formattedJson=  convertToJson(result.response.text())
        res.json(formattedJson)
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
    
    // const result = await model.generateContent(prompt)

}

function convertToJson(input) {
  // Trim the input string.
  let rawData = input.trim();

  // Remove backticks and code block formatting.
  rawData = rawData.replace(/```json\n|\n```/g, '').trim();

  // Debug: log the last 50 characters to help identify extra characters.
  console.log("Last 50 characters of rawData:", rawData.slice(-50));

  // Optional: Trim any extra characters after the final closing brace or bracket.
  let lastCurly = rawData.lastIndexOf("}");
  let lastSquare = rawData.lastIndexOf("]");
  let lastIndex = Math.max(lastCurly, lastSquare);
  if (lastIndex !== -1) {
    rawData = rawData.slice(0, lastIndex + 1);
  }

  try {
    // Parse the JSON string into an object.
    let parsedData = JSON.parse(rawData);

    // Validate and adjust the structure of the "recommendations" array.
    if (parsedData && Array.isArray(parsedData.recommendations)) {
      parsedData.recommendations.forEach(course => {
        // Ensure missing fields like credits are set to null if not present.
        if (course.credits === undefined) {
          course.credits = null;
        }
        // Add category to ensure structure is clear.
        if (!course.category) {
          course.category = "Uncategorized"; // Default value if category is missing.
        }
        // Ensure the duration is set correctly.
        if (course.duration === undefined) {
          course.duration = null;
        }
      });
    }

    // Validate and adjust the structure of the "suggestedCourses" array.
    if (parsedData && Array.isArray(parsedData.suggestedCourses)) {
      parsedData.suggestedCourses.forEach(course => {
        // Ensure suggested courses have a category field.
        if (!course.category) {
          course.category = "Uncategorized"; // Default value if category is missing.
        }
      });
    }

    // Return the formatted JSON object.
    return parsedData;
  } catch (error) {
    console.error('Error parsing input:', error);
    return null;
  }
}

async function createmail(data) {
  const {foundUser,resetToken}=data
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465, // Use 587 if secure is false
    secure: true, // Port 465 requires secure: true
    auth: {
      user: process.env.main_mail,
      pass: process.env.mail_pwd,
    },
  });

  const resetUrl = `${process.env.furl}/forgot/${encodeURIComponent(resetToken)}`;


  try {
    const info = await transporter.sendMail({
      from: `Learning-HUB <${process.env.main_mail}>`, // Use env for sender email
      to: foundUser.email, 
      subject: `Hi ${foundUser.name}`, 
      text: `Hello ${foundUser.name},\n\nClick the link to reset your password: ${resetUrl}`,
      html: `<h2 align="center">Welcome to <b>L-HUB</b></h2>
             <p>Click the link below to reset your password:</p>
             <p><a href="${resetUrl}" target="_blank">${resetUrl}</a></p>`,
    });

    console.log("Email sent: ", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
}



module.exports={recomed,createmail}