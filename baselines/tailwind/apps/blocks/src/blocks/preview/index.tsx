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

export default function PreviewExample() {
  return (
    <div className="overflow-x-auto overflow-y-hidden bg-muted contain-[paint] [--gap:--spacing(4)] md:[--gap:--spacing(10)] 3xl:[--gap:--spacing(12)] dark:bg-background">
      <div className="flex w-full min-w-max justify-center">
        <div
          className="grid w-[2400px] grid-cols-7 items-start gap-(--gap) bg-muted p-(--gap) md:w-[3000px] dark:bg-background *:[div]:gap-(--gap)"
          data-slot="capture-target"
        >
          <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <StyleOverview />
            <TypographySpecimen />
            <div className="md:hidden">
              <UIElements />
            </div>
            <CodespacesCard />
            <Invoice />
          </div>
          <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <IconPreviewGrid />
            <div className="hidden w-full md:flex">
              <UIElements />
            </div>
            <ObservabilityCard />
            <ShippingAddress />
          </div>
          <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <EnvironmentVariables />
            <BarChartCard />
            <InviteTeam />
            <ActivateAgentDialog />
          </div>
          <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <SkeletonLoading />
            <PieChartCard />
            <NoTeamMembers />
            <ReportBug />
            <Contributors />
          </div>
          <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <FeedbackForm />
            <BookAppointment />
            <SleepReport />
            <GithubProfile />
          </div>
          <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <WeeklyFitnessSummary />
            <FileUpload />
            <AnalyticsCard />
            <UsageCard />
            <Shortcuts />
          </div>
          <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
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
