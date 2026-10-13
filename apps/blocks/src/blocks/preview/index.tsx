import { css } from "@kirana-style/core"
import { ActivateAgentDialog } from "@/blocks/preview/cards/activate-agent-dialog"
import { AnalyticsCard } from "@/blocks/preview/cards/analytics-card"
import { AnomalyAlert } from "@/blocks/preview/cards/anomaly-alert"
import { BarChartCard } from "@/blocks/preview/cards/bar-chart-card"
import { BookAppointment } from "@/blocks/preview/cards/book-appointment"
import { CodespacesCard } from "@/blocks/preview/cards/codespaces-card"
import { ContributionsActivity } from "@/blocks/preview/cards/contributions-activity"
import { Contributors } from "@/blocks/preview/cards/contributors"
import { EnvironmentVariables } from "@/blocks/preview/cards/environment-variables"
import { FeedbackForm } from "@/blocks/preview/cards/feedback-form"
import { FileUpload } from "@/blocks/preview/cards/file-upload"
import { GithubProfile } from "@/blocks/preview/cards/github-profile"
import { IconPreviewGrid } from "@/blocks/preview/cards/icon-preview-grid"
import { InviteTeam } from "@/blocks/preview/cards/invite-team"
import { Invoice } from "@/blocks/preview/cards/invoice"
import { LiveWaveformCard } from "@/blocks/preview/cards/live-waveform"
import { NoTeamMembers } from "@/blocks/preview/cards/no-team-members"
import { NotFound } from "@/blocks/preview/cards/not-found"
import { ObservabilityCard } from "@/blocks/preview/cards/observability-card"
import { PieChartCard } from "@/blocks/preview/cards/pie-chart-card"
import { ReportBug } from "@/blocks/preview/cards/report-bug"
import { ShippingAddress } from "@/blocks/preview/cards/shipping-address"
import { Shortcuts } from "@/blocks/preview/cards/shortcuts"
import { SkeletonLoading } from "@/blocks/preview/cards/skeleton-loading"
import { SleepReport } from "@/blocks/preview/cards/sleep-report"
import { StyleOverview } from "@/blocks/preview/cards/style-overview"
import { TypographySpecimen } from "@/blocks/preview/cards/typography-specimen"
import { UIElements } from "@/blocks/preview/cards/ui-elements"
import { UsageCard } from "@/blocks/preview/cards/usage-card"
import { Visitors } from "@/blocks/preview/cards/visitors"
import { WeeklyFitnessSummary } from "@/blocks/preview/cards/weekly-fitness-summary"
import { ctx } from "@workspace/ui/theme/context"
import { surface } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  box: css({
    overflowX: "auto",
    overflowY: "hidden",
    backgroundColor: surface.page,
    contain: "paint",
    // The gap every column and card in the canvas reads. Was `--gap`. The
    // narrow value is set here and the wider ones on the row inside, which
    // inherits this one below `md`.
    [ctx.gap]: spacing["4"],
  }),
  row: css({
    display: "flex",
    width: "100%",
    minWidth: "max-content",
    justifyContent: "center",
    [ctx.gap]: {
      "@media (min-width: 48rem) and (max-width: 99.999rem)": spacing["10"],
      [breakpoint["3xl"]]: spacing["12"],
    },
  }),
  grid: css({
    display: "grid",
    width: { base: "2400px", [breakpoint.md]: "3000px" },
    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    alignItems: "flex-start",
    gap: ctx.gap,
    backgroundColor: surface.page,
    padding: ctx.gap,
  }),
  stack: css({
    display: "flex",
    flexDirection: "column",
    gap: ctx.gap,
    padding: "1px",
    containIntrinsicSize: "380px 1200px",
    contentVisibility: "auto",
  }),
  box2: css({
    display: { [breakpoint.md]: "none" },
  }),
  box3: css({
    display: { base: "none", [breakpoint.md]: "flex" },
    width: "100%",
  }),
}

export default function PreviewExample() {
  return (
    <div sx={styles.box}>
      <div sx={styles.row}>
        <div sx={styles.grid} data-slot="capture-target">
          <div sx={styles.stack}>
            <StyleOverview />
            <TypographySpecimen />
            <div sx={styles.box2}>
              <UIElements />
            </div>
            <CodespacesCard />
            <Invoice />
          </div>
          <div sx={styles.stack}>
            <IconPreviewGrid />
            <div sx={styles.box3}>
              <UIElements />
            </div>
            <ObservabilityCard />
            <ShippingAddress />
          </div>
          <div sx={styles.stack}>
            <EnvironmentVariables />
            <BarChartCard />
            <InviteTeam />
            <ActivateAgentDialog />
          </div>
          <div sx={styles.stack}>
            <SkeletonLoading />
            <PieChartCard />
            <NoTeamMembers />
            <ReportBug />
            <Contributors />
          </div>
          <div sx={styles.stack}>
            <FeedbackForm />
            <BookAppointment />
            <SleepReport />
            <GithubProfile />
          </div>
          <div sx={styles.stack}>
            <WeeklyFitnessSummary />
            <FileUpload />
            <AnalyticsCard />
            <UsageCard />
            <Shortcuts />
          </div>
          <div sx={styles.stack}>
            <AnomalyAlert />
            <LiveWaveformCard />
            <Visitors />
            <ContributionsActivity />
            <NotFound />
          </div>
        </div>
      </div>
    </div>
  )
}
