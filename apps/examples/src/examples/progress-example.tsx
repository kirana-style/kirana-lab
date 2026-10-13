import { css } from "@kirana-style/core"
import * as React from "react"

import { Example, ExampleWrapper } from "@/components/example"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@workspace/ui/components/progress"
import { Slider } from "@workspace/ui/components/slider"
import { FileIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import { fontSize, lineHeight } from "@workspace/ui/tokens/typography"

const styles = {
  stack: css({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: spacing["4"],
  }),
  progress: css({
    width: "100%",
  }),
  item: css({
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
  }),
  icon: css({
    width: spacing["5"],
    height: spacing["5"],
  }),
  itemContent: css({
    display: "inline-block",
    overflowX: "hidden",
    overflowY: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  itemTitle: css({
    display: "inline",
  }),
  progress2: css({
    width: spacing["32"],
  }),
  itemActions: css({
    width: spacing["16"],
    justifyContent: "flex-end",
  }),
  text: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

export default function ProgressExample() {
  return (
    <ExampleWrapper>
      <ProgressValues />
      <ProgressWithLabel />
      <ProgressControlled />
      <FileUploadList />
    </ExampleWrapper>
  )
}

function ProgressValues() {
  return (
    <Example title="Progress Bar">
      <div sx={styles.stack}>
        <Progress value={0} />
        <Progress value={25} sx={styles.progress} />
        <Progress value={50} />
        <Progress value={75} />
        <Progress value={100} />
      </div>
    </Example>
  )
}

function ProgressWithLabel() {
  return (
    <Example title="With Label">
      <Progress value={56}>
        <ProgressLabel>Upload progress</ProgressLabel>
        <ProgressValue />
      </Progress>
    </Example>
  )
}

function ProgressControlled() {
  const [value, setValue] = React.useState(50)

  return (
    <Example title="Controlled">
      <div sx={styles.stack}>
        <Progress value={value} sx={styles.progress} />
        <Slider
          value={value}
          onValueChange={(next) => setValue(next as number)}
          min={0}
          max={100}
          step={1}
        />
      </div>
    </Example>
  )
}

function FileUploadList() {
  const files = React.useMemo(
    () => [
      {
        id: "1",
        name: "document.pdf",
        progress: 45,
        timeRemaining: "2m 30s",
      },
      {
        id: "2",
        name: "presentation.pptx",
        progress: 78,
        timeRemaining: "45s",
      },
      {
        id: "3",
        name: "spreadsheet.xlsx",
        progress: 12,
        timeRemaining: "5m 12s",
      },
      {
        id: "4",
        name: "image.jpg",
        progress: 100,
        timeRemaining: "Complete",
      },
    ],
    []
  )

  return (
    <Example title="File Upload List">
      <ItemGroup>
        {files.map((file) => (
          <Item key={file.id} size="xs" sx={styles.item}>
            <ItemMedia variant="icon">
              <Icon
                icon={FileIcon}

                sx={styles.icon}
              />
            </ItemMedia>
            <ItemContent sx={styles.itemContent}>
              <ItemTitle sx={styles.itemTitle}>{file.name}</ItemTitle>
            </ItemContent>
            <ItemContent>
              <Progress value={file.progress} sx={styles.progress2} />
            </ItemContent>
            <ItemActions sx={styles.itemActions}>
              <span sx={styles.text}>{file.timeRemaining}</span>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </Example>
  )
}
