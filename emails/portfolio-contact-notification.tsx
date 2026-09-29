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

export interface PortfolioContactNotificationProps {
  name: string;
  email: string;
  message: string;
  submittedAt?: string;
}

export const PortfolioContactNotification: React.FC<PortfolioContactNotificationProps> = ({
  name = "John Doe",
  email = "john@example.com",
  message = "Hi Shahidur,\nI found your portfolio and would like to discuss a full-stack project.",
  submittedAt,
}) => {
  const previewText = `New portfolio inquiry from ${name} — "${message.slice(0, 80)}${
    message.length > 80 ? "..." : ""
  }"`;

  return (
    <Html lang="en">
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={wrapper}>

          {/* ── HEADER ── */}
          <Section style={header}>
            <Row>
              <Column>
                <Text style={brandMark}>
                  <span style={dot}>▸</span> SHAHIDUR.DEV
                </Text>
                <Text style={headerSub}>PORTFOLIO CONTACT SYSTEM</Text>
              </Column>
              <Column align="right">
                <Text style={badgePill}>⬤ NEW INQUIRY</Text>
              </Column>
            </Row>
          </Section>

          {/* ── HERO STRIP ── */}
          <Section style={heroStrip}>
            <Heading as="h1" style={heroTitle}>You Have a New Message</Heading>
            <Text style={heroSub}>
              Received via{" "}
              <Link href="https://shahidur.dev" style={heroLink}>shahidur.dev</Link>
              {submittedAt ? ` · ${submittedAt}` : ""}
            </Text>
          </Section>

          {/* ── SENDER CARD ── */}
          <Section style={body}>
            <Text style={sectionLabel}>SENDER DETAILS</Text>

            <Section style={senderCard}>
              {/* Name row */}
              <Row style={cardRow}>
                <Column style={cardLabelCol}>
                  <Text style={cardLabel}>FROM</Text>
                </Column>
                <Column style={cardValueCol}>
                  <Text style={cardValueStrong}>{name}</Text>
                </Column>
              </Row>
              <Hr style={cardDivider} />
              {/* Email row (plain text display, no mailto link) */}
              <Row style={cardRow}>
                <Column style={cardLabelCol}>
                  <Text style={cardLabel}>EMAIL</Text>
                </Column>
                <Column style={cardValueCol}>
                  <Text style={cardValueStrong}>{email}</Text>
                </Column>
              </Row>
            </Section>

            {/* ── MESSAGE ── */}
            <Text style={sectionLabel}>MESSAGE</Text>
            <Section style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </Section>

            {/* ── CTA ── */}
            <Section style={ctaBlock}>
              <Text style={ctaLabel}>QUICK REPLY</Text>
              <Text style={ctaHint}>
                Hit <strong>Reply</strong> in your email client to respond directly to{" "}
                <strong style={{ color: "#ffffff" }}>{name}</strong> ({email}).
              </Text>

              {/* Full-width wrapped button pointing to branded contact section */}
              <Row>
                <Column align="center" style={{ width: "100%" }}>
                  <Button href="https://shahidur.dev/contact" style={replyButton}>
                    Open Contact Portal &rarr;
                  </Button>
                </Column>
              </Row>

              <Text style={ctaSubHint}>
                Reply-To header is set to {email} &bull; Manage inquiries at{" "}
                <Link href="https://shahidur.dev/contact" style={emailMini}>shahidur.dev/contact</Link>
              </Text>
            </Section>
          </Section>

          {/* ── FOOTER ── */}
          <Section style={footer}>
            <Hr style={footerDivider} />
            <Row>
              <Column>
                <Text style={footerLeft}>
                  <Link href="https://shahidur.dev" style={footerBrandLink}>shahidur.dev</Link>
                </Text>
                <Text style={footerRoutedTo}>
                  Routed to: hello@shahidur.dev · shahidur8381@gmail.com · hamid2207103@yahoo.com
                </Text>
              </Column>
              <Column align="right">
                <Text style={footerLinks}>
                  <Link href="https://shahidur.dev" style={fLink}>Web</Link>
                  {" · "}
                  <Link href="https://shahidur.dev/contact/github" style={fLink}>GitHub</Link>
                  {" · "}
                  <Link href="https://shahidur.dev/contact/linkedin" style={fLink}>LinkedIn</Link>
                </Text>
              </Column>
            </Row>
          </Section>

        </Container>
      </Body>
    </Html>
  );
};

export default PortfolioContactNotification;

/* ─────────────────────────────────────
   STYLES
───────────────────────────────────── */

const main: React.CSSProperties = {
  backgroundColor: "#060908",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  margin: "0",
  padding: "32px 12px 48px",
};

const wrapper: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#0b140f",
  borderRadius: "12px",
  border: "1px solid rgba(0,245,155,0.2)",
  overflow: "hidden",
};

/* Header */
const header: React.CSSProperties = {
  padding: "20px 28px",
  backgroundColor: "#070d09",
  borderBottom: "1px solid rgba(0,245,155,0.12)",
};

const brandMark: React.CSSProperties = {
  margin: "0",
  fontSize: "13px",
  fontWeight: 800,
  letterSpacing: "0.1em",
  color: "#00f59b",
};

const dot: React.CSSProperties = {
  color: "#00f59b",
  marginRight: "5px",
};

const headerSub: React.CSSProperties = {
  margin: "3px 0 0",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  color: "#64748b",
};

const badgePill: React.CSSProperties = {
  display: "inline-block",
  margin: "0",
  padding: "4px 10px",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.07em",
  color: "#00f59b",
  backgroundColor: "rgba(0,245,155,0.08)",
  border: "1px solid rgba(0,245,155,0.3)",
  borderRadius: "100px",
};

/* Hero strip */
const heroStrip: React.CSSProperties = {
  padding: "22px 28px 18px",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
};

const heroTitle: React.CSSProperties = {
  margin: "0 0 5px",
  fontSize: "20px",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: "#ffffff",
};

const heroSub: React.CSSProperties = {
  margin: "0",
  fontSize: "13px",
  color: "#64748b",
};

const heroLink: React.CSSProperties = {
  color: "#10b981",
  textDecoration: "none",
};

/* Body */
const body: React.CSSProperties = {
  padding: "24px 28px",
};

const sectionLabel: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: "10px",
  fontWeight: 800,
  letterSpacing: "0.1em",
  color: "#94a3b8",
  textTransform: "uppercase",
};

/* Sender card */
const senderCard: React.CSSProperties = {
  backgroundColor: "#070d09",
  border: "1px solid rgba(0,245,155,0.15)",
  borderRadius: "8px",
  padding: "14px 18px",
  marginBottom: "24px",
};

const cardRow: React.CSSProperties = {
  padding: "4px 0",
};

const cardDivider: React.CSSProperties = {
  borderColor: "rgba(255,255,255,0.06)",
  margin: "8px 0",
};

const cardLabelCol: React.CSSProperties = {
  width: "58px",
  verticalAlign: "middle",
};

const cardValueCol: React.CSSProperties = {
  verticalAlign: "middle",
};

const cardLabel: React.CSSProperties = {
  margin: "0",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.07em",
  color: "#00f59b",
};

const cardValueStrong: React.CSSProperties = {
  margin: "0",
  fontSize: "14px",
  fontWeight: 600,
  color: "#ffffff",
  wordBreak: "break-word",
};

/* Message box */
const messageBox: React.CSSProperties = {
  backgroundColor: "#070d09",
  border: "1px solid rgba(0,245,155,0.16)",
  borderLeft: "3px solid #00f59b",
  borderRadius: "8px",
  padding: "18px 20px",
  marginBottom: "26px",
};

const messageText: React.CSSProperties = {
  margin: "0",
  fontSize: "14px",
  lineHeight: "1.7",
  color: "#e2e8f0",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};

/* CTA */
const ctaBlock: React.CSSProperties = {
  backgroundColor: "#070d09",
  border: "1px solid rgba(0,245,155,0.14)",
  borderRadius: "10px",
  padding: "20px 22px",
};

const ctaLabel: React.CSSProperties = {
  margin: "0 0 6px",
  fontSize: "10px",
  fontWeight: 800,
  letterSpacing: "0.1em",
  color: "#00f59b",
  textTransform: "uppercase",
};

const ctaHint: React.CSSProperties = {
  margin: "0 0 16px",
  fontSize: "13px",
  color: "#94a3b8",
  lineHeight: "1.5",
};

/* Full-width emerald reply button with auto-wrapping */
const replyButton: React.CSSProperties = {
  display: "block",
  width: "100%",
  backgroundColor: "#00f59b",
  color: "#060908",
  fontSize: "14px",
  fontWeight: 800,
  letterSpacing: "0.03em",
  lineHeight: "1.4",
  padding: "14px 20px",
  borderRadius: "8px",
  textDecoration: "none",
  textAlign: "center",
  boxSizing: "border-box",
  whiteSpace: "normal",
  wordBreak: "break-word",
};

const ctaSubHint: React.CSSProperties = {
  margin: "12px 0 0",
  fontSize: "11px",
  color: "#64748b",
  textAlign: "center",
};

const emailMini: React.CSSProperties = {
  color: "#10b981",
  textDecoration: "none",
};

/* Footer */
const footer: React.CSSProperties = {
  padding: "0 28px 24px",
};

const footerDivider: React.CSSProperties = {
  borderColor: "rgba(0,245,155,0.1)",
  margin: "0 0 16px",
};

const footerLeft: React.CSSProperties = {
  margin: "0 0 3px",
  fontSize: "12px",
  fontWeight: 700,
};

const footerBrandLink: React.CSSProperties = {
  color: "#00f59b",
  textDecoration: "none",
  letterSpacing: "0.05em",
};

const footerRoutedTo: React.CSSProperties = {
  margin: "0",
  fontSize: "10px",
  color: "#475569",
  wordBreak: "break-word",
};

const footerLinks: React.CSSProperties = {
  margin: "0",
  fontSize: "11px",
  color: "#475569",
};

const fLink: React.CSSProperties = {
  color: "#10b981",
  textDecoration: "none",
};
