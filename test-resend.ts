import { Resend } from "resend";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const resend = new Resend(process.env.RESEND_API_KEY);

async function run() {
  const { data, error } = await resend.emails.send({
      from: 'Arihant <arihant@spectrumhq.in>',
      replyTo: 'jainari1208@gmail.com',
      to: ['arihant@spectrumhq.in'],
      subject: 'welcome to spectrum ui / quick question',
      text: `Hey there, Arihant here.`,
  });
  console.log("Data:", data);
  console.log("Error:", error);
}

run();
