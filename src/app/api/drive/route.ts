// src/app/api/drive/route.ts
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// TODO: User needs to set up a Google Cloud project and provide the credentials.
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function POST(req: Request) {
  const { code, content, fileName } = await req.json();

  if (code) {
    // Exchange authorization code for access token
    try {
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);

      // TODO: Store the tokens in the user's session or database

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error getting access token', error);
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 500 });
    }
  } else if (content && fileName) {
    // Save file to Google Drive
    try {
      const drive = google.drive({ version: 'v3', auth: oAuth2Client });

      const fileMetadata = {
        name: fileName,
        mimeType: 'text/plain',
      };

      const media = {
        mimeType: 'text/plain',
        body: content,
      };

      await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id',
      });

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error saving file to Google Drive', error);
      return NextResponse.json({ error: 'Failed to save file to Google Drive' }, { status: 500 });
    }
  } else {
    // Get authorization URL
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/drive.file'],
    });
    return NextResponse.json({ authUrl });
  }
}
