import * as stylex from "@stylexjs/stylex"
import { AccountAccess } from "@/blocks/preview-02/cards/account-access"
import { CardOverview } from "@/blocks/preview-02/cards/card-overview"
import { ClaimableBalance } from "@/blocks/preview-02/cards/claimable-balance"
import { ContributionHistory } from "@/blocks/preview-02/cards/contribution-history"
import { CoverArt } from "@/blocks/preview-02/cards/cover-art"
import { DividendIncome } from "@/blocks/preview-02/cards/dividend-income"
import { EmptyConnectBank } from "@/blocks/preview-02/cards/empty-connect-bank"
import { EmptyDistributeTrack } from "@/blocks/preview-02/cards/empty-distribute-track"
import { EmptyExploreCatalog } from "@/blocks/preview-02/cards/empty-explore-catalog"
import { Faq } from "@/blocks/preview-02/cards/faq"
import { FrontDoor } from "@/blocks/preview-02/cards/front-door"
import { IndexInvesting } from "@/blocks/preview-02/cards/index-investing"
import { KitchenIsland } from "@/blocks/preview-02/cards/kitchen-island"
import { LoadingCard } from "@/blocks/preview-02/cards/loading-card"
import { NewMilestone } from "@/blocks/preview-02/cards/new-milestone"
import { NotificationSettings } from "@/blocks/preview-02/cards/notification-settings"
import { Payments } from "@/blocks/preview-02/cards/payments"
import { PayoutThreshold } from "@/blocks/preview-02/cards/payout-threshold"
import { PowerUsage } from "@/blocks/preview-02/cards/power-usage"
import { Preferences } from "@/blocks/preview-02/cards/preferences"
import { QrConnect } from "@/blocks/preview-02/cards/qr-connect"
import { ReceivingMethod } from "@/blocks/preview-02/cards/receiving-method"
import { RecentTransactions } from "@/blocks/preview-02/cards/recent-transactions"
import { ReleaseCatalog } from "@/blocks/preview-02/cards/release-catalog"
import { RollerShades } from "@/blocks/preview-02/cards/roller-shades"
import { SavingsProgress } from "@/blocks/preview-02/cards/savings-progress"
import { SavingsTargets } from "@/blocks/preview-02/cards/savings-targets"
import { SidebarNav } from "@/blocks/preview-02/cards/sidebar-nav"
import { SocialLinks } from "@/blocks/preview-02/cards/social-links"
import { StockPerformance } from "@/blocks/preview-02/cards/stock-performance"
import { SyncingState } from "@/blocks/preview-02/cards/syncing-state"
import { TransferFunds } from "@/blocks/preview-02/cards/transfer-funds"
import { UpcomingPayments } from "@/blocks/preview-02/cards/upcoming-payments"
import { ctx } from "@workspace/ui/theme/context.stylex"
import { surface } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  box: {
    overflowX: "auto",
    overflowY: "hidden",
    backgroundColor: surface.page,
    contain: "paint",
    // The gap every column and card in the canvas reads. Was `--gap`. The
    // narrow value is set here and the wider ones on the row inside: StyleX
    // emits a custom property's plain value outside the cascade layers, where
    // it would beat a breakpoint written beside it on the same element.
    [ctx.gap]: spacing["4"],
  },
  row: {
    display: "flex",
    width: "100%",
    minWidth: "max-content",
    justifyContent: "center",
    [ctx.gap]: {
      default: null,
      "@media (min-width: 48rem) and (max-width: 99.999rem)": spacing["10"],
      [breakpoint["3xl"]]: spacing["12"],
    },
  },
  grid: {
    display: "grid",
    width: { default: "2400px", [breakpoint.md]: "3000px" },
    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    alignItems: "flex-start",
    gap: ctx.gap,
    backgroundColor: surface.page,
    padding: ctx.gap,
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: ctx.gap,
    padding: spacing["1"],
    containIntrinsicSize: "380px 1200px",
    contentVisibility: "auto",
  },
  stack2: {
    gridColumnStart: "span 2",
    gridColumnEnd: "span 2",
    display: "flex",
    flexDirection: "column",
    gap: ctx.gap,
    padding: spacing["1"],
    containIntrinsicSize: "760px 1200px",
    contentVisibility: "auto",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    alignItems: "flex-start",
    gap: ctx.gap,
  },
  stack3: {
    display: "flex",
    flexDirection: "column",
    gap: ctx.gap,
  },
})

export default function Preview02Example() {
  return (
    <div sx={styles.box}>
      <div sx={styles.row}>
        <div sx={styles.grid} data-slot="capture-target">
          <div sx={styles.stack}>
            <ContributionHistory />
            <EmptyDistributeTrack />
            <QrConnect />
            <DividendIncome />
            <IndexInvesting />
            <SyncingState />
          </div>
          <div sx={styles.stack}>
            <PayoutThreshold />
            <ClaimableBalance />
            <Preferences />
            <SavingsProgress />
            <KitchenIsland />
          </div>
          <div sx={styles.stack2}>
            <SavingsTargets />
            <RecentTransactions />
            <div sx={styles.grid2}>
              <div sx={styles.stack3}>
                <SidebarNav />
                <Faq />
              </div>
              <div sx={styles.stack3}>
                <Payments />
                <FrontDoor />
              </div>
            </div>
            <ReleaseCatalog />
          </div>
          <div sx={styles.stack}>
            <AccountAccess />
            <CardOverview />
            <TransferFunds />
            <CoverArt />
            <LoadingCard />
          </div>
          <div sx={styles.stack}>
            <ReceivingMethod />
            <PowerUsage />
            <EmptyConnectBank />
            <UpcomingPayments />
            <RollerShades />
          </div>
          <div sx={styles.stack}>
            <StockPerformance />
            <EmptyExploreCatalog />
            <NewMilestone />
            <SocialLinks />
            <NotificationSettings />
          </div>
        </div>
      </div>
    </div>
  )
}
