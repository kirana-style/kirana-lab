import { css } from "@kirana-style/core"
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import { Search01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  row: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing["3"],
  }),
  inputGroup: css({
    maxWidth: "24rem",
  }),
  row2: css({
    display: "flex",
    width: spacing["12"],
    height: spacing["12"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    borderStyle: "solid",
    borderWidth: "1px",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    borderColor: theme.border,
  }),
  itemDescription: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    letterSpacing: letterSpacing.wider,
    textTransform: "uppercase",
  }),
  row3: css({
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    gap: spacing["6"],
  }),
  stack: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: spacing["0.5"],
  }),
  text: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    letterSpacing: letterSpacing.wider,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  text2: css({
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
}

const HOLDINGS = [
  {
    ticker: "VOO",
    name: "Vanguard S&P 500 ETF",
    type: "ETF",
    added: "Jan 2021",
    shares: "112",
    value: "$48,230.40",
  },
  {
    ticker: "VIG",
    name: "Vanguard Dividend Appreciation",
    type: "ETF",
    added: "Mar 2022",
    shares: "450",
    value: "$26,033.79",
  },
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    type: "Stock",
    added: "Nov 2020",
    shares: "85",
    value: "$18,488.90",
  },
  {
    ticker: "O",
    name: "Realty Income Corp",
    type: "REIT",
    added: "Jun 2023",
    shares: "320",
    value: "$15,136.59",
  },
]

export function ReleaseCatalog() {
  return (
    <Card>
      <CardHeader>
        <div sx={styles.row}>
          <InputGroup sx={styles.inputGroup}>
            <InputGroupAddon>
              <Icon icon={Search01Icon} />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search holdings or tickers..." />
          </InputGroup>
          <ToggleGroup defaultValue={["etfs"]} variant="outline" spacing={1}>
            <ToggleGroupItem value="stocks">Stocks</ToggleGroupItem>
            <ToggleGroupItem value="etfs">ETFs</ToggleGroupItem>
            <ToggleGroupItem value="reits">REITs</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {HOLDINGS.map((holding) => (
            <Item key={holding.ticker} variant="muted">
              <ItemMedia>
                <div sx={styles.row2}>{holding.ticker}</div>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{holding.name}</ItemTitle>
                <ItemDescription sx={styles.itemDescription}>
                  {holding.shares} Shares · {holding.added}
                </ItemDescription>
              </ItemContent>
              <div sx={styles.row3}>
                <Badge variant="outline">{holding.type}</Badge>
                <div sx={styles.stack}>
                  <span sx={styles.text}>Value</span>
                  <span sx={styles.text2}>{holding.value}</span>
                </div>
              </div>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
