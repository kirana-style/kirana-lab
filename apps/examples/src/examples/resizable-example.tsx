import { css } from "@kirana-style/core"
import * as React from "react"
import type { Layout } from "react-resizable-panels"

import { Example, ExampleWrapper } from "@/components/example"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable"
import { radius, theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import { fontWeight } from "@workspace/ui/tokens/typography"

const styles = {
  resizablePanelGroup: css({
    minHeight: "200px",
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
  }),
  row: css({
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing["6"],
  }),
  text: css({
    fontWeight: fontWeight.semibold,
  }),
  resizablePanelGroup2: css({
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
  }),
  row2: css({
    display: "flex",
    height: "200px",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing["6"],
  }),
  stack: css({
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["2"],
    padding: spacing["6"],
  }),
}

export default function ResizableExample() {
  return (
    <ExampleWrapper>
      <ResizableHorizontal />
      <ResizableVertical />
      <ResizableWithHandle />
      <ResizableNested />
      <ResizableControlled />
    </ExampleWrapper>
  )
}

function ResizableHorizontal() {
  return (
    <Example title="Horizontal">
      <ResizablePanelGroup
        orientation="horizontal"
        sx={styles.resizablePanelGroup}
      >
        <ResizablePanel defaultSize="25%">
          <div sx={styles.row}>
            <span sx={styles.text}>Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="75%">
          <div sx={styles.row}>
            <span sx={styles.text}>Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>
  )
}

function ResizableVertical() {
  return (
    <Example title="Vertical">
      <ResizablePanelGroup
        orientation="vertical"
        sx={styles.resizablePanelGroup}
      >
        <ResizablePanel defaultSize="25%">
          <div sx={styles.row}>
            <span sx={styles.text}>Header</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="75%">
          <div sx={styles.row}>
            <span sx={styles.text}>Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>
  )
}

function ResizableWithHandle() {
  return (
    <Example title="With Handle">
      <ResizablePanelGroup
        orientation="horizontal"
        sx={styles.resizablePanelGroup}
      >
        <ResizablePanel defaultSize="25%">
          <div sx={styles.row}>
            <span sx={styles.text}>Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="75%">
          <div sx={styles.row}>
            <span sx={styles.text}>Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>
  )
}

function ResizableNested() {
  return (
    <Example title="Nested">
      <ResizablePanelGroup
        orientation="horizontal"
        sx={styles.resizablePanelGroup2}
      >
        <ResizablePanel defaultSize="50%">
          <div sx={styles.row2}>
            <span sx={styles.text}>One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="50%">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize="25%">
              <div sx={styles.row}>
                <span sx={styles.text}>Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize="75%">
              <div sx={styles.row}>
                <span sx={styles.text}>Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>
  )
}

function ResizableControlled() {
  const [layout, setLayout] = React.useState<Layout>({})

  return (
    <Example title="Controlled">
      <ResizablePanelGroup
        orientation="horizontal"
        sx={styles.resizablePanelGroup}
        onLayoutChange={setLayout}
      >
        <ResizablePanel defaultSize="30%" id="left" minSize="20%">
          <div sx={styles.stack}>
            <span sx={styles.text}>{Math.round(layout.left ?? 30)}%</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="70%" id="right" minSize="30%">
          <div sx={styles.stack}>
            <span sx={styles.text}>{Math.round(layout.right ?? 70)}%</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>
  )
}
