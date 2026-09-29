import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/components";
import React from "react";
import PortfolioContactNotification from "../../../emails/portfolio-contact-notification";
import PortfolioContactAutoReply from "../../../emails/portfolio-contact-auto-reply";

// Email regex for server-side format validation
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(request: NextRequest) {
  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const { name, email, message, website } = body || {};

    // 1. Anti-spam honeypot check
    // If the hidden 'website' field is populated, a bot filled it out.
    // Return success silently without sending emails.
    if (website && typeof website === "string" && website.trim().length > 0) {
      console.warn("[Contact API] Bot submission detected via honeypot field.");
      return NextResponse.json(
        { success: true, message: "Message received." },
        { status: 200 }
      );
    }

    // 2. Validate field types
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    // 3. Length and format validations
    if (trimmedName.length === 0) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (trimmedName.length > 100) {
      return NextResponse.json(
        { error: "Name is too long (maximum 100 characters)." },
        { status: 400 }
      );
    }

    if (
      trimmedEmail.length === 0 ||
      trimmedEmail.length > 254 ||
      !EMAIL_REGEX.test(trimmedEmail)
    ) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (trimmedMessage.length === 0) {
      return NextResponse.json(
        { error: "Please enter a message before sending." },
        { status: 400 }
      );
    }

    if (trimmedMessage.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long (maximum 5,000 characters)." },
        { status: 400 }
      );
    }

    // 4. Initialize Resend client with server environment variable
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error(
        "[Contact API] RESEND_API_KEY is not defined in environment variables."
      );
      return NextResponse.json(
        {
          error:
            "Email service is temporarily unavailable. Please try again later or email hello@shahidur.dev directly.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const submittedAt = new Date().toUTCString();

    // Pre-render React Email templates
    const notificationElement = React.createElement(
      PortfolioContactNotification,
      {
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
        submittedAt,
      }
    );

    const autoReplyElement = React.createElement(PortfolioContactAutoReply, {
      name: trimmedName,
      message: trimmedMessage,
      submittedAt,
    });

    const [notificationHtml, notificationText, autoReplyHtml, autoReplyText] =
      await Promise.all([
        render(notificationElement),
        render(notificationElement, { plainText: true }),
        render(autoReplyElement),
        render(autoReplyElement, { plainText: true }),
      ]);

    // 5. Send both emails concurrently via Promise.allSettled
    const [notificationOutcome, autoReplyOutcome] = await Promise.allSettled([
      // Internal notification to Shahidur (all 3 notification addresses)
      resend.emails.send({
        from: "Shahidur Rahman <hello@shahidur.dev>",
        to: [
          "hello@shahidur.dev",
          "shahidur8381@gmail.com",
          "hamid2207103@yahoo.com",
        ],
        replyTo: trimmedEmail,
        subject: `New portfolio inquiry from ${trimmedName}`,
        html: notificationHtml,
        text: notificationText,
      }),
      // External auto-reply to visitor
      resend.emails.send({
        from: "Shahidur Rahman <hello@shahidur.dev>",
        to: [trimmedEmail],
        subject: "Thanks for reaching out \u2014 Shahidur Rahman",
        html: autoReplyHtml,
        text: autoReplyText,
      }),
    ]);

    // Check notification email result
    const notificationFailed =
      notificationOutcome.status === "rejected" ||
      Boolean(notificationOutcome.value?.error);

    if (notificationFailed) {
      const err =
        notificationOutcome.status === "rejected"
          ? notificationOutcome.reason
          : notificationOutcome.value?.error;
      console.error("[Contact API] Notification email failed:", err);

      return NextResponse.json(
        {
          error:
            "Failed to deliver your message. Please try again or email hello@shahidur.dev directly.",
        },
        { status: 500 }
      );
    }

    // Check auto-reply email result
    const autoReplyFailed =
      autoReplyOutcome.status === "rejected" ||
      Boolean(autoReplyOutcome.value?.error);

    if (autoReplyFailed) {
      const autoErr =
        autoReplyOutcome.status === "rejected"
          ? autoReplyOutcome.reason
          : autoReplyOutcome.value?.error;
      console.warn("[Contact API] Auto-reply email failed:", autoErr);
      // We still return 200 because the primary notification was successfully delivered!
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API] Unexpected error in contact handler:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while sending your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
