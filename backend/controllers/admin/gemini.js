const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}
async function run_gemini(req, res){
  try {
    // Process the uploaded image and extract information
    const extractedInfo = await run(req.file.buffer);

    // Send the extracted information as a JSON response
    res.json(extractedInfo);
  } catch (error) {
    // Handle errors
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function run(imageBuffer) {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  // Prompt for extracting information from the invoice image
  const prompt = `This is an invoice image. Extract the information and provide the output in JSON format:
  {
    "vendor_name": "ABC Traders",
    "bill_number": "B12345",
    "vendor_address": "456 Elm Street\\nSometown, NY 54321",
    "vendor_contact_number": "9876543210",
    "bill_date": "2023-03-08",
    "payment_type": "Credit Card",
    "due_date": "2023-03-22",
    "gst_number": "GST123456789",
    "products": [
      {
        "product_name": "Product 1",
        "category": "Electronics",
        "qty": 1,
        "price": 100.00,
        "tax": 10.00,
        "total_amount": 110.00
      },
      {
        "product_name": "Product 2",
        "category": "Clothing",
        "qty": 2,
        "price": 200.00,
        "tax": 20.00,
        "total_amount": 440.00
      }
    ]
  }
  If there are some fields missing in this invoice, write null for those fields. The backend will send your output, so provide the exact JSON, without unnecessary information.`;

  // Prepare image data as GoogleGenerativeAI.Part object
  const imageParts = [
    fileToGenerativePart(imageBuffer, "image/png"),
  ];

  // Generate content using Google Generative AI
  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = await response.text();
  const jsonData = JSON.parse(text.slice(8, -3));

  return jsonData;
}

module.exports = {
  run_gemini
};