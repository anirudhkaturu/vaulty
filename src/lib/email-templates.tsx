import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ClientRequestEmailProps {
  professionalName: string;
  professionalCompany?: string | null;
  clientName: string;
  uploadLink: string;
  welcomeMessage?: string | null;
}

export const ClientRequestEmail = ({
  professionalName,
  professionalCompany,
  clientName,
  uploadLink,
  welcomeMessage,
}: ClientRequestEmailProps) => (
  <Html>
    <Head />
    <Preview>Document request from {professionalName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Document Request</Heading>
        <Text style={text}>Hello {clientName},</Text>
        <Text style={text}>
          {professionalName} {professionalCompany ? `from ${professionalCompany}` : ""} has requested some documents from you.
        </Text>
        {welcomeMessage && (
          <Section style={quoteSection}>
            <Text style={quoteText}>&quot;{welcomeMessage}&quot;</Text>
          </Section>
        )}
        <Section style={btnContainer}>
          <Button style={button} href={uploadLink}>
            View Request & Upload Documents
          </Button>
        </Section>
        <Text style={text}>
          Or copy and paste this URL into your browser:{" "}
          <Link href={uploadLink} style={link}>
            {uploadLink}
          </Link>
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          This request was sent via Vaulty - Secure Document Collection.
        </Text>
      </Container>
    </Body>
  </Html>
);

interface DocumentUploadedEmailProps {
  professionalName: string;
  clientName: string;
  documentName: string;
  requestLink: string;
}

export const DocumentUploadedEmail = ({
  professionalName,
  clientName,
  documentName,
  requestLink,
}: DocumentUploadedEmailProps) => (
  <Html>
    <Head />
    <Preview>New document uploaded by {clientName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Document Uploaded</Heading>
        <Text style={text}>Hello {professionalName},</Text>
        <Text style={text}>
          {clientName} has just uploaded a document: <strong>{documentName}</strong>.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={requestLink}>
            View Request Details
          </Button>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          Vaulty Notifications
        </Text>
      </Container>
    </Body>
  </Html>
);

interface RequestCompletedEmailProps {
  professionalName: string;
  clientName: string;
  requestLink: string;
}

export const RequestCompletedEmail = ({
  professionalName,
  clientName,
  requestLink,
}: RequestCompletedEmailProps) => (
  <Html>
    <Head />
    <Preview>Request completed by {clientName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Request Completed</Heading>
        <Text style={text}>Hello {professionalName},</Text>
        <Text style={text}>
          Great news! {clientName} has uploaded all the requested documents.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={requestLink}>
            Review Documents
          </Button>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          Vaulty Notifications
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  border: "1px solid #e6ebf1",
  borderRadius: "12px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const text = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "26px",
  textAlign: "left" as const,
  padding: "0 40px",
};

const quoteSection = {
  padding: "10px 40px",
  backgroundColor: "#f9fafb",
  margin: "20px 0",
};

const quoteText = {
  color: "#4b5563",
  fontSize: "14px",
  fontStyle: "italic",
  lineHeight: "24px",
};

const btnContainer = {
  textAlign: "center" as const,
  padding: "20px 0",
};

const button = {
  backgroundColor: "#4f46e5",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const link = {
  color: "#4f46e5",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  padding: "0 40px",
};
