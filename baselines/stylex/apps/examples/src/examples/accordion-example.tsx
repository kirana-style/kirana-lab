import * as stylex from "@stylexjs/stylex"
import { Example, ExampleWrapper } from "@/components/example"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { alpha, radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  exampleWrapper: {
    width: "100%",
    maxWidth: "56rem",
    // Restates the wrapper's two columns from `md`: an sx value replaces the
    // whole property, breakpoints included.
    gridTemplateColumns: {
      default: null,
      "@media (min-width: 48rem) and (max-width: 63.999rem)":
        "repeat(2, minmax(0, 1fr))",
      [breakpoint.lg]: "repeat(1, minmax(0, 1fr))",
    },
  },
  accordion: {
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    maxWidth: "32rem",
  },
  accordion2: {
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    maxWidth: "32rem",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  },
  accordionItem: {
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
    borderTopStyle: "solid",
    borderBottomStyle: "solid",
    borderInlineStartStyle: "solid",
    borderInlineEndStyle: "solid",
    borderTopWidth: "1px",
    borderBottomWidth: "1px",
    borderInlineStartWidth: "1px",
    borderInlineEndWidth: "1px",
    borderTopColor: theme.border,
    borderBottomColor: theme.border,
    borderInlineStartColor: theme.border,
    borderInlineEndColor: theme.border,
  },
  accordionTrigger: {
    paddingInlineStart: spacing["2.5"],
    paddingInlineEnd: spacing["2.5"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  },
  accordionContent: {
    paddingInlineStart: spacing["2.5"],
    paddingInlineEnd: spacing["2.5"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  },
  card: {
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    width: "100%",
    maxWidth: "32rem",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  },
  accordion3: {
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    maxWidth: "32rem",
    overflowX: "hidden",
    overflowY: "hidden",
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
    borderTopStyle: "solid",
    borderBottomStyle: "solid",
    borderInlineStartStyle: "solid",
    borderInlineEndStyle: "solid",
    borderTopWidth: "1px",
    borderBottomWidth: "1px",
    borderInlineStartWidth: "1px",
    borderInlineEndWidth: "1px",
    borderTopColor: theme.border,
    borderBottomColor: theme.border,
    borderInlineStartColor: theme.border,
    borderInlineEndColor: theme.border,
  },
  accordionItem2: {
    paddingTop: spacing["1"],
    paddingBottom: spacing["1"],
    paddingInlineStart: spacing["1"],
    paddingInlineEnd: spacing["1"],
    backgroundColor: { default: null, "[data-open]": alpha.muted50 },
  },
  accordionTrigger2: {
    paddingInlineStart: spacing["2.5"],
    paddingInlineEnd: spacing["2.5"],
  },
})

export default function AccordionExample() {
  return (
    <ExampleWrapper sx={styles.exampleWrapper}>
      <AccordionBasic />
      <AccordionMultiple />
      <AccordionWithBorders />
      <AccordionInCard />
      <AccordionWithDisabled />
    </ExampleWrapper>
  )
}

function AccordionBasic() {
  const items = [
    {
      value: "item-1",
      trigger: "Is it accessible?",
      content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      value: "item-2",
      trigger: "Is it styled?",
      content:
        "Yes. It comes with default styles that matches the other components' aesthetic.",
    },
    {
      value: "item-3",
      trigger: "Is it animated?",
      content:
        "Yes. It's animated by default, but you can disable it if you prefer.",
    },
  ]

  return (
    <Example title="Basic">
      <Accordion sx={styles.accordion}>
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Example>
  )
}

function AccordionMultiple() {
  const items = [
    {
      value: "item-1",
      trigger:
        "What are the key considerations when implementing a comprehensive enterprise-level authentication system?",
      content:
        "Implementing a robust enterprise authentication system requires careful consideration of multiple factors. This includes secure password hashing and storage, multi-factor authentication (MFA) implementation, session management, OAuth2 and SSO integration, regular security audits, rate limiting to prevent brute force attacks, and maintaining detailed audit logs. Additionally, you'll need to consider scalability, performance impact, and compliance with relevant data protection regulations such as GDPR or HIPAA.",
    },
    {
      value: "item-2",
      trigger:
        "How does modern distributed system architecture handle eventual consistency and data synchronization across multiple regions?",
      content:
        "Modern distributed systems employ various strategies to maintain data consistency across regions. This often involves using techniques like CRDT (Conflict-Free Replicated Data Types), vector clocks, and gossip protocols. Systems might implement event sourcing patterns, utilize message queues for asynchronous updates, and employ sophisticated conflict resolution strategies. Popular solutions like Amazon's DynamoDB and Google's Spanner demonstrate different approaches to solving these challenges, balancing between consistency, availability, and partition tolerance as described in the CAP theorem.",
    },
  ]

  return (
    <Example title="Multiple">
      <Accordion multiple sx={styles.accordion}>
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Example>
  )
}

function AccordionWithBorders() {
  const items = [
    {
      value: "billing",
      trigger: "How does billing work?",
      content:
        "We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime. All plans include automatic backups, 24/7 support, and unlimited team members. There are no hidden fees or setup costs.",
    },
    {
      value: "security",
      trigger: "Is my data secure?",
      content:
        "Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party security audits. All data is encrypted at rest and in transit using industry-standard protocols. We also offer optional two-factor authentication and single sign-on for enterprise customers.",
    },
    {
      value: "integration",
      trigger: "What integrations do you support?",
      content: (
        <>
          <p>
            We integrate with 500+ popular tools including Slack, Zapier,
            Salesforce, HubSpot, and more. You can also build custom
            integrations using our REST API and webhooks.{" "}
          </p>
          <p>
            Our API documentation includes code examples in 10+ programming
            languages.
          </p>
        </>
      ),
    },
  ]

  return (
    <Example title="With Borders">
      <Accordion sx={styles.accordion2}>
        {items.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            sx={styles.accordionItem}
          >
            <AccordionTrigger sx={styles.accordionTrigger}>
              {item.trigger}
            </AccordionTrigger>
            <AccordionContent sx={styles.accordionContent}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Example>
  )
}

function AccordionInCard() {
  const items = [
    {
      value: "plans",
      trigger: "What subscription plans do you offer?",
      content: (
        <>
          <p>
            We offer three subscription tiers: Starter ($9/month), Professional
            ($29/month), and Enterprise ($99/month). Each plan includes
            increasing storage limits, API access, priority support, and team
            collaboration features.
          </p>
          <p>
            <a href="#">Annual billing is available</a> with a 20% discount. All
            plans include a 14-day free trial with no credit card required.
          </p>
          <Button size="sm">
            View plans
            <Icon icon={ArrowUpRight01Icon} />
          </Button>
        </>
      ),
    },
    {
      value: "billing",
      trigger: "How does billing work?",
      content: (
        <>
          <p>
            Billing occurs automatically at the start of each billing cycle. We
            accept all major credit cards, PayPal, and ACH transfers for
            enterprise customers.
          </p>
          <p>
            You&apos;ll receive an invoice via email after each payment. You can
            update your payment method or billing information anytime in your
            account settings. Failed payments will trigger automated retry
            attempts and email notifications.
          </p>
        </>
      ),
    },
    {
      value: "upgrade",
      trigger: "Can I upgrade or downgrade my plan?",
      content: (
        <>
          <p>
            Yes, you can change your plan at any time. When upgrading,
            you&apos;ll be charged a prorated amount for the remainder of your
            billing cycle and immediately gain access to new features.
          </p>
          <p>
            When downgrading, the change takes effect at the end of your current
            billing period, and you&apos;ll retain access to premium features
            until then. No refunds are provided for downgrades.
          </p>
        </>
      ),
    },
    {
      value: "cancel",
      trigger: "How do I cancel my subscription?",
      content: (
        <>
          <p>
            You can cancel your subscription anytime from your account settings.
            There are no cancellation fees or penalties. Your access will
            continue until the end of your current billing period.
          </p>
          <p>
            After cancellation, your data is retained for 30 days in case you
            want to reactivate. You can export all your data before or after
            canceling. We&apos;d love to hear your feedback about why
            you&apos;re leaving.
          </p>
        </>
      ),
    },
    {
      value: "refund",
      trigger: "What is your refund policy?",
      content: (
        <>
          <p>
            We offer a 30-day money-back guarantee for new subscriptions. If
            you&apos;re not satisfied within the first 30 days, contact our
            support team for a full refund.
          </p>
          <p>
            After 30 days, we don&apos;t provide refunds for partial billing
            periods, but you can cancel anytime to avoid future charges.
            Enterprise customers have custom refund terms outlined in their
            contracts.
          </p>
        </>
      ),
    },
  ]

  return (
    <Example title="In Card">
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Subscription & Billing</CardTitle>
          <CardDescription>
            Common questions about your account, plans, and payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion multiple defaultValue={["plans"]}>
            {items.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </Example>
  )
}

function AccordionWithDisabled() {
  const items = [
    {
      value: "item-1",
      trigger: "Can I access my account history?",
      content:
        "Yes, you can view your complete account history including all transactions, plan changes, and support tickets in the Account History section of your dashboard.",
      disabled: false,
    },
    {
      value: "item-2",
      trigger: "Premium feature information",
      content:
        "This section contains information about premium features. Upgrade your plan to access this content.",
      disabled: true,
    },
    {
      value: "item-3",
      trigger: "How do I update my email address?",
      content:
        "You can update your email address in your account settings. You'll receive a verification email at your new address to confirm the change.",
      disabled: false,
    },
  ]

  return (
    <Example title="With Disabled">
      <Accordion sx={styles.accordion3}>
        {items.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            sx={styles.accordionItem2}
          >
            <AccordionTrigger sx={styles.accordionTrigger2}>
              {item.trigger}
            </AccordionTrigger>
            <AccordionContent sx={styles.accordionTrigger2}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Example>
  )
}
