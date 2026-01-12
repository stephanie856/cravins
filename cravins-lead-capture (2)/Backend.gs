
/**
 * ==============================================================================
 * CRAVINS LEAD CAPTURE - SETUP GUIDE
 * ==============================================================================
 * 1. Create a Google Sheet and name it exactly: Cravins Leads
 * 2. Rename 'Sheet1' to 'Leads'
 * 3. Add these headers in Row 1:
 *    Email | Timestamp | Verified | Token | Code1 | Code2 | Source
 * 4. In the Sheet: Extensions > Apps Script
 * 5. Paste this entire code into the editor.
 * 6. Click 'Project Settings' (Gear icon) and add a Script Property:
 *    Name: SPREADSHEET_ID
 *    Value: [Copy the long ID from your Google Sheet URL]
 * 7. Click 'Deploy' > 'New Deployment'
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 8. Copy the 'Web App URL' and paste it into constants.tsx in your React app.
 * ==============================================================================
 */

function doPost(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    const email = params.email;
    const consent = params.consent;
    const source = params.source || 'nfc-direct';
    
    if (!email || !consent) {
      return createJsonResponse('error', 'Missing required fields');
    }

    const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID'));
    const sheet = ss.getSheetByName('Leads');
    
    // Check for duplicates
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === email) {
        return createJsonResponse('already_subscribed', 'Email already registered');
      }
    }

    const timestamp = new Date();
    const verificationToken = Math.random().toString(36).substring(2, 15);
    
    // Generate Both Codes Immediately
    const code1 = generateUniqueCode('A', data.length);
    const code2 = generateUniqueCode('B', data.length + 1);

    // Save to Sheet (Row: Email, Time, Verified, Token, Code1, Code2, Source)
    sheet.appendRow([
      email,           // A
      timestamp,       // B
      false,           // C: Verified
      verificationToken, // D
      code1,           // E
      code2,           // F
      source           // G
    ]);

    sendVerificationEmail(email, verificationToken);

    return createJsonResponse('success', 'Verification email sent');

  } catch (err) {
    return createJsonResponse('error', err.toString());
  }
}

/**
 * Handles the "Verify Email" link clicks
 */
function doGet(e) {
  const token = e.parameter.token;
  const action = e.parameter.action;

  if (action === 'verify' && token) {
    const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID'));
    const sheet = ss.getSheetByName('Leads');
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (data[i][3] === token && data[i][2] === false) { // Match token and check if not already verified
        // Mark as Verified
        sheet.getRange(i + 1, 3).setValue(true);
        
        const email = data[i][0];
        const code1 = data[i][4];
        const code2 = data[i][5];

        // Send the codes immediately
        sendCodesEmail(email, code1, code2);
        
        return HtmlService.createHtmlOutput(`
          <div style="font-family: Arial; text-align: center; padding: 50px;">
            <h1 style="color: #DD3333;">Cravins Verified!</h1>
            <p>Your codes have been sent to <strong>${email}</strong>.</p>
            <p>Check your inbox (and spam folder) for your $10 in savings!</p>
            <a href="https://cravins.ca" style="color: #DD3333; font-weight: bold;">Return to Cravins</a>
          </div>
        `);
      }
    }
  }

  return HtmlService.createHtmlOutput("Invalid verification link.");
}

function sendVerificationEmail(email, token) {
  const url = ScriptApp.getService().getUrl() + '?action=verify&token=' + token;
  const subject = "🎁 Confirm your email for $10 in Cravins discounts!";
  const body = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
      <h1 style="color: #DD3333;">Welcome to the Cravins Fam! 👋</h1>
      <p>You're one click away from unlocking <strong>$10 in total discounts</strong> at Cravins Caribbean Grill & Lounge.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${url}" style="background-color: #DD3333; color: white; padding: 18px 35px; text-decoration: none; border-radius: 50px; display: inline-block; font-weight: bold; font-size: 18px;">CONFIRM MY EMAIL</a>
      </div>
      <p><strong>What happens next?</strong></p>
      <ul>
        <li>You'll get BOTH $5 off codes instantly.</li>
        <li>Each code is valid for 14 days on orders of $15+.</li>
      </ul>
      <p>See you soon!<br>The Cravins Team</p>
    </div>
  `;
  
  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body
  });
}

function sendCodesEmail(email, code1, code2) {
  const subject = "🔥 Your Cravins Discount Codes are Here!";
  const body = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 2px solid #DD3333; padding: 20px; border-radius: 20px;">
      <h1 style="color: #DD3333; text-align: center;">YOUR CODES!</h1>
      <p>Thanks for verifying. Here are your two discount codes:</p>
      
      <div style="background: #f8f8f8; padding: 15px; border-radius: 10px; margin: 10px 0; text-align: center; border: 1px dashed #DD3333;">
        <p style="margin: 0; font-size: 12px; color: #666;">CODE 1 (USE NOW)</p>
        <h2 style="margin: 5px 0; color: #DD3333; font-size: 32px; letter-spacing: 2px;">${code1}</h2>
      </div>

      <div style="background: #f8f8f8; padding: 15px; border-radius: 10px; margin: 10px 0; text-align: center; border: 1px dashed #DD3333;">
        <p style="margin: 0; font-size: 12px; color: #666;">CODE 2 (VALID TODAY)</p>
        <h2 style="margin: 5px 0; color: #DD3333; font-size: 32px; letter-spacing: 2px;">${code2}</h2>
      </div>

      <p style="font-size: 12px; color: #999; text-align: center; margin-top: 20px;">
        *Each code valid for 14 days. Minimum $15 purchase per order. One code per visit.
      </p>
      
      <div style="text-align: center; margin-top: 20px;">
        <a href="https://cravins.ca" style="color: #DD3333; font-weight: bold; text-decoration: none;">Order Online Now →</a>
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body
  });
}

function generateUniqueCode(prefix, index) {
  const date = new Date();
  const d = date.getDate().toString().padStart(2, '0');
  const seq = index.toString().padStart(3, '0');
  return `CRV-${prefix}${d}${seq}`;
}

function createJsonResponse(status, message) {
  return ContentService.createTextOutput(JSON.stringify({ status, message }))
    .setMimeType(ContentService.MimeType.JSON);
}
