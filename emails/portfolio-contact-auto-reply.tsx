import * as React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

export interface PortfolioContactAutoReplyProps {
  name: string;
  email?: string;
  message: string;
  submittedAt?: string;
}

export const PortfolioContactAutoReply: React.FC<PortfolioContactAutoReplyProps> = ({
  name = "Friend",
  email,
  message = "Hi Shahidur, I found your portfolio and would like to connect.",
  submittedAt,
}) => {
  const greetingName = name?.trim() ? name.trim() : "there";
  const previewText = `Thanks for reaching out! Your message is safely in my inbox.`;

  // Truncate message to at most 2-3 lines (~150 chars max)
  const getTruncatedMessage = (text: string) => {
    if (!text) return "";
    const rawLines = text.split(/\r?\n/);
    const nonBlankLines = rawLines.filter((l) => l.trim().length > 0);
    const hasManyLines = nonBlankLines.length > 3;

    // Take at most 3 non-empty lines
    const slicedLines = nonBlankLines.slice(0, 3).join("\n");
    const CHAR_LIMIT = 150;

    if (slicedLines.length > CHAR_LIMIT) {
      return slicedLines.slice(0, CHAR_LIMIT).replace(/\s+\S*$/, "") + "…";
    }

    if (hasManyLines || text.length > slicedLines.length) {
      return slicedLines + "…";
    }

    return slicedLines;
  };

  const messagePreview = getTruncatedMessage(message);

  return (
    <Html lang="en">
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* 1. Brand Header */}
          <Section style={headerSection}>
            <Row>
              <Column style={{ verticalAlign: "middle" }}>
                <Text style={brandHeader}>
                  <span style={emeraldDot}>&#9679;</span> SHAHIDUR.DEV
                </Text>
                <Text style={brandSubtitle}>
                  FULL-STACK &bull; 3D WEB DEVELOPER
                </Text>
              </Column>
              <Column align="right" style={{ verticalAlign: "middle" }}>
                <Text style={badge}>MESSAGE RECEIVED &#10003;</Text>
              </Column>
            </Row>
          </Section>

          {/* 2. Message Received Confirmation Banner */}
          <Section style={confirmationBannerSection}>
            <Section style={confirmationCard}>
              <Text style={confirmationKicker}>CONFIRMATION</Text>
              <Heading as="h2" style={confirmationHeading}>
                Your message is safely in my inbox.
              </Heading>
              <Text style={confirmationSubtext}>
                Thank you for visiting{" "}
                <Link href="https://shahidur.dev" style={linkEmerald}>
                  shahidur.dev
                </Link>
                . I appreciate your note.
              </Text>
            </Section>
          </Section>

          {/* 3. Personal Greeting & Acknowledgement */}
          <Section style={contentSection}>
            <Heading as="h1" style={greetingHeading}>
              Hi {greetingName},
            </Heading>

            <Text style={paragraph}>
              Thanks for reaching out through my portfolio.
            </Text>

            <Text style={paragraph}>
              I&apos;ve received your message and will review it shortly. I
              typically respond within <strong>24&ndash;48 hours</strong>.
            </Text>

            {/* 4. Submitted Message Preview (truncated) */}
            <Section style={messagePreviewSection}>
              <Text style={sectionKicker}>YOUR MESSAGE</Text>
              <Section style={messageCard}>
                <Text style={messageContent}>{messagePreview}</Text>
              </Section>
            </Section>

            {/* 5. Response Expectation Strip */}
            <Section style={responseStrip}>
              <Row>
                <Column style={{ verticalAlign: "middle" }}>
                  <Text style={responseStripLabel}>EXPECTED RESPONSE</Text>
                  <Text style={responseStripValue}>
                    Usually within 24&ndash;48 hours
                  </Text>
                </Column>
                <Column align="right" style={{ verticalAlign: "middle" }}>
                  <Text style={statusIndicator}>
                    <span style={statusPulse}>&#9679;</span> ACTIVE INBOX
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* 6. Direct Contact Section (Quick Reply) */}
            <Section style={directContactSection}>
              <Text style={directContactKicker}>NEED A QUICKER REPLY?</Text>
              <Text style={directContactIntro}>
                If your inquiry is time-sensitive, you can reach me directly:
              </Text>

              <Row style={buttonRow}>
                <Column style={buttonColumnLeft}>
                  <Button
                    href="https://shahidur.dev/contact/telegram"
                    style={telegramButton}
                  >
                    Telegram
                  </Button>
                </Column>
                <Column style={buttonColumnRight}>
                  <Button
                    href="https://shahidur.dev/contact/whatsapp"
                    style={whatsappButton}
                  >
                    WhatsApp
                  </Button>
                </Column>
              </Row>
            </Section>

            {/* 7. Signature Block */}
            <Section style={signatureSection}>
              <Text style={signoffText}>Best regards,</Text>
              <Text style={authorName}>Shahidur Rahman</Text>
              <Text style={authorRole}>Full-Stack Engineer</Text>
              <Text style={authorSpecialization}>
                AI/ML &bull; Web &bull; Blockchain
              </Text>
            </Section>
          </Section>

          {/* 8 & 9. Social Navigation & Minimal Dark Footer */}
          <Section style={footerSection}>
            <Hr style={subtleDivider} />

            <Row style={footerRow}>
              <Column style={{ verticalAlign: "middle" }}>
                <Text style={footerBrand}>
                  <Link href="https://shahidur.dev" style={footerBrandLink}>
                    shahidur.dev
                  </Link>
                </Text>
                <Text style={footerCopyright}>
                  &copy; {new Date().getFullYear()} Shahidur Rahman
                </Text>
              </Column>
              <Column align="right" style={{ verticalAlign: "middle" }}>
                <Text style={socialLinks}>
                  <Link href="https://shahidur.dev" style={footerSocialLink}>
                    Website
                  </Link>
                  {" \u2022 "}
                  <Link
                    href="https://shahidur.dev/contact/github"
                    style={footerSocialLink}
                  >
                    GitHub
                  </Link>
                  {" \u2022 "}
                  <Link
                    href="https://shahidur.dev/contact/linkedin"
                    style={footerSocialLink}
                  >
                    LinkedIn
                  </Link>
                </Text>
              </Column>
            </Row>

            <Text style={disclaimerText}>
              This confirmation was sent automatically in response to your
              message submitted on{" "}
              <Link href="https://shahidur.dev" style={disclaimerLink}>
                shahidur.dev
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default PortfolioContactAutoReply;

/* --- Enhanced Design Styles --- */
const main: React.CSSProperties = {
  backgroundColor: "#070a08",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  margin: "0",
  padding: "36px 12px",
  color: "#f1f5f9",
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#0b140f",
  borderRadius: "14px",
  border: "1px solid rgba(0, 245, 155, 0.22)",
  overflow: "hidden",
  boxShadow: "0 14px 40px rgba(0, 0, 0, 0.6)",
};

const headerSection: React.CSSProperties = {
  padding: "24px 32px",
  backgroundColor: "#070d09",
  borderBottom: "1px solid rgba(0, 245, 155, 0.14)",
};

const brandHeader: React.CSSProperties = {
  margin: "0",
  fontSize: "13px",
  fontWeight: 800,
  letterSpacing: "0.12em",
  color: "#ffffff",
};

const emeraldDot: React.CSSProperties = {
  color: "#00f59b",
  fontSize: "12px",
  marginRight: "6px",
  verticalAlign: "middle",
};

const brandSubtitle: React.CSSProperties = {
  margin: "4px 0 0 0",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  color: "#94a3b8",
};

const badge: React.CSSProperties = {
  display: "inline-block",
  margin: "0",
  padding: "5px 12px",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  color: "#00f59b",
  backgroundColor: "rgba(0, 245, 155, 0.1)",
  border: "1px solid rgba(0, 245, 155, 0.32)",
  borderRadius: "9999px",
};

const confirmationBannerSection: React.CSSProperties = {
  padding: "24px 32px 0 32px",
};

const confirmationCard: React.CSSProperties = {
  backgroundColor: "#070d09",
  border: "1px solid rgba(0, 245, 155, 0.22)",
  borderLeft: "3px solid #00f59b",
  borderRadius: "10px",
  padding: "18px 22px",
  boxShadow: "0 0 24px rgba(0, 245, 155, 0.05)",
};

const confirmationKicker: React.CSSProperties = {
  margin: "0 0 4px 0",
  fontSize: "10px",
  fontWeight: 800,
  letterSpacing: "0.1em",
  color: "#00f59b",
  textTransform: "uppercase",
};

const confirmationHeading: React.CSSProperties = {
  margin: "0 0 6px 0",
  fontSize: "18px",
  fontWeight: 700,
  letterSpacing: "-0.01em",
  color: "#ffffff",
  lineHeight: "1.35",
};

const confirmationSubtext: React.CSSProperties = {
  margin: "0",
  fontSize: "13px",
  color: "#94a3b8",
  lineHeight: "1.5",
};

const contentSection: React.CSSProperties = {
  padding: "28px 32px 24px 32px",
};

const greetingHeading: React.CSSProperties = {
  margin: "0 0 16px 0",
  fontSize: "22px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: "#ffffff",
};

const paragraph: React.CSSProperties = {
  margin: "0 0 14px 0",
  fontSize: "15px",
  lineHeight: "1.65",
  color: "#cbd5e1",
};

const messagePreviewSection: React.CSSProperties = {
  margin: "24px 0 20px 0",
};

const sectionKicker: React.CSSProperties = {
  margin: "0 0 8px 0",
  fontSize: "11px",
  fontWeight: 800,
  letterSpacing: "0.08em",
  color: "#94a3b8",
  textTransform: "uppercase",
};

const messageCard: React.CSSProperties = {
  backgroundColor: "#070d09",
  border: "1px solid rgba(0, 245, 155, 0.18)",
  borderLeft: "3px solid #00f59b",
  borderRadius: "8px",
  padding: "18px 22px",
};

const messageContent: React.CSSProperties = {
  margin: "0",
  fontSize: "14px",
  lineHeight: "1.65",
  color: "#e2e8f0",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};

const responseStrip: React.CSSProperties = {
  backgroundColor: "#070d09",
  border: "1px solid rgba(255, 255, 255, 0.07)",
  borderRadius: "8px",
  padding: "12px 18px",
  margin: "20px 0 26px 0",
};

const responseStripLabel: React.CSSProperties = {
  margin: "0 0 2px 0",
  fontSize: "10px",
  fontWeight: 800,
  letterSpacing: "0.08em",
  color: "#94a3b8",
  textTransform: "uppercase",
};

const responseStripValue: React.CSSProperties = {
  margin: "0",
  fontSize: "13px",
  fontWeight: 600,
  color: "#00f59b",
};

const statusIndicator: React.CSSProperties = {
  margin: "0",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  color: "#cbd5e1",
};

const statusPulse: React.CSSProperties = {
  color: "#00f59b",
  fontSize: "10px",
  marginRight: "4px",
  verticalAlign: "middle",
};

const directContactSection: React.CSSProperties = {
  margin: "26px 0",
  padding: "20px 22px",
  backgroundColor: "#070d09",
  borderRadius: "10px",
  border: "1px solid rgba(0, 245, 155, 0.18)",
};

const directContactKicker: React.CSSProperties = {
  margin: "0 0 4px 0",
  fontSize: "11px",
  fontWeight: 800,
  letterSpacing: "0.08em",
  color: "#00f59b",
  textTransform: "uppercase",
};

const directContactIntro: React.CSSProperties = {
  margin: "0 0 16px 0",
  fontSize: "13px",
  color: "#94a3b8",
  lineHeight: "1.5",
};

const buttonRow: React.CSSProperties = {
  width: "100%",
};

const buttonColumnLeft: React.CSSProperties = {
  width: "50%",
  paddingRight: "8px",
  verticalAlign: "top",
};

const buttonColumnRight: React.CSSProperties = {
  width: "50%",
  paddingLeft: "8px",
  verticalAlign: "top",
};

const telegramButton: React.CSSProperties = {
  display: "block",
  backgroundColor: "#0088cc",
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "0.03em",
  padding: "13px 18px",
  borderRadius: "8px",
  textDecoration: "none",
  textAlign: "center",
  boxShadow: "0 4px 14px rgba(0, 136, 204, 0.35)",
};

const whatsappButton: React.CSSProperties = {
  display: "block",
  backgroundColor: "#075e54",
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "0.03em",
  padding: "13px 18px",
  borderRadius: "8px",
  textDecoration: "none",
  textAlign: "center",
  boxShadow: "0 4px 14px rgba(7, 94, 84, 0.35)",
};

const signatureSection: React.CSSProperties = {
  marginTop: "28px",
  paddingTop: "6px",
};

const signoffText: React.CSSProperties = {
  margin: "0 0 6px 0",
  fontSize: "14px",
  color: "#94a3b8",
};

const authorName: React.CSSProperties = {
  margin: "0",
  fontSize: "16px",
  fontWeight: 700,
  color: "#ffffff",
  letterSpacing: "-0.01em",
};

const authorRole: React.CSSProperties = {
  margin: "2px 0 0 0",
  fontSize: "13px",
  fontWeight: 600,
  color: "#00f59b",
};

const authorSpecialization: React.CSSProperties = {
  margin: "3px 0 0 0",
  fontSize: "12px",
  color: "#64748b",
};

const footerSection: React.CSSProperties = {
  padding: "0 32px 28px 32px",
};

const subtleDivider: React.CSSProperties = {
  borderColor: "rgba(0, 245, 155, 0.12)",
  margin: "18px 0",
};

const footerRow: React.CSSProperties = {
  marginBottom: "12px",
};

const footerBrand: React.CSSProperties = {
  margin: "0",
  fontSize: "13px",
  fontWeight: 700,
};

const footerBrandLink: React.CSSProperties = {
  color: "#00f59b",
  textDecoration: "none",
  letterSpacing: "0.04em",
};

const footerCopyright: React.CSSProperties = {
  margin: "2px 0 0 0",
  fontSize: "11px",
  color: "#64748b",
};

const socialLinks: React.CSSProperties = {
  margin: "0",
  fontSize: "12px",
  color: "#64748b",
};

const footerSocialLink: React.CSSProperties = {
  color: "#10b981",
  textDecoration: "none",
};

const linkEmerald: React.CSSProperties = {
  color: "#00f59b",
  textDecoration: "none",
};

const disclaimerText: React.CSSProperties = {
  margin: "14px 0 0 0",
  fontSize: "11px",
  color: "#475569",
  lineHeight: "1.4",
  textAlign: "center",
};

const disclaimerLink: React.CSSProperties = {
  color: "#64748b",
  textDecoration: "underline",
};
