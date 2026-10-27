/**
 * The free workflow rebuild: Algosoup's lead offer. A prospect describes one
 * manual workflow; within three hours a director sends back an AI-optimised
 * version plus the Claude skills to run it. Copy for the form lives here.
 */

export const stackOffer = {
  title: "Get one manual workflow redone, free",
  lead: "Tell us a job your team does by hand. Within three hours, one of us sends it back redesigned around AI, with the Claude skills your team needs to run it.",
  workflowLabel: "The workflow",
  workflowHelp: "Describe the steps as you'd explain them to a new starter.",
  workflowPlaceholder: "e.g. Every Monday someone copies sales numbers from the CRM into a spreadsheet and writes the board update",
  toolsLabel: "Tools it touches",
  toolsHelp: "Optional. Type a tool and press Enter, or pick from the list.",
  companyLabel: "Company",
  emailLabel: "Work email",
  painLabel: "Who does it, and how often?",
  submit: "Send my workflow",
  promise: "Free. No call needed. Read by Nathaniel or Oree, not a bot.",
  success: {
    title: "Got it.",
    body: "Your reworked workflow and Claude skills will be in your inbox within three hours.",
  },
  /** Common mid-market tools, offered as quick picks. Users can type anything. */
  suggestions: [
    "Excel",
    "Outlook",
    "Microsoft 365",
    "Google Workspace",
    "Slack",
    "Salesforce",
    "HubSpot",
    "Xero",
    "Notion",
    "Asana",
    "Zendesk",
    "Power BI",
  ],
  page: {
    title: "Free workflow rebuild",
    intro:
      "Tell us one job your team does by hand. We'll show you what an AI version looks like, and send the Claude skills to run it. It'll be in your inbox within three hours.",
  },
};
