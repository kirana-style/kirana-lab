import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import {
  ArrowRight01Icon,
  File01Icon,
  Folder01Icon,
  MinusSignIcon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { surface, theme } from "@workspace/ui/theme/semantic.stylex"
import { duration, easing } from "@workspace/ui/tokens/motion.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { mergeSx } from "@workspace/ui/lib/sx"

const styles = stylex.create({
  button: {
    width: "100%",
    justifyContent: "flex-start",
    transitionProperty: "none",
    // The ghost button's open state is restated after the hover it outranks.
    backgroundColor: {
      default: null,
      ":hover": theme.accent,
      '[aria-expanded="true"]': surface.hover,
    },
    color: {
      default: null,
      ":hover": theme.accentForeground,
      '[aria-expanded="true"]': theme.foreground,
    },
  },
  icon: {
    // The trigger button carries the default marker. Base UI marks an open
    // trigger `data-panel-open`; the original's `data-[state=open]` is Radix's
    // name and never matched, so the chevron did not turn.
    rotate: {
      default: null,
      [stylex.when.ancestor("[data-panel-open]")]: "90deg",
    },
    transitionProperty: "transform, translate, scale, rotate",
    transitionTimingFunction: easing.inOut,
    transitionDuration: duration["150"],
  },
  collapsibleContent: {
    marginTop: spacing["1"],
    marginLeft: spacing["5"],
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["1"],
  },
  button2: {
    width: "100%",
    justifyContent: "flex-start",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
    color: theme.foreground,
  },
  example: {
    alignItems: "center",
  },
  card: {
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    width: "100%",
    maxWidth: "16rem",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  },
  tabsList: {
    width: "100%",
  },
  card2: {
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    width: "100%",
    maxWidth: "20rem",
  },
  collapsible: {
    display: "flex",
    alignItems: "flex-start",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  },
  fieldGroup: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  },
  fieldLabel: {
    position: "absolute",
    width: "1px",
    // A vertical Field stretches its children; this keeps the hidden label 1px.
    maxWidth: "1px",
    height: "1px",
    paddingTop: 0,
    paddingBottom: 0,
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
    marginTop: "-1px",
    marginBottom: "-1px",
    marginInlineStart: "-1px",
    marginInlineEnd: "-1px",
    overflowX: "hidden",
    overflowY: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderInlineStartWidth: 0,
    borderInlineEndWidth: 0,
    borderTopColor: theme.border,
    borderBottomColor: theme.border,
    borderInlineStartColor: theme.border,
    borderInlineEndColor: theme.border,
  },
  collapsibleContent2: {
    gridColumnStart: "1",
    gridColumnEnd: "-1",
    display: "grid",
    gridTemplateColumns: "subgrid",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  },
})

export default function CollapsibleExample() {
  return (
    <ExampleWrapper>
      <CollapsibleFileTree />
      <CollapsibleSettings />
    </ExampleWrapper>
  )
}

type FileTreeItem = { name: string } | { name: string; items: FileTreeItem[] }

function CollapsibleFileTree() {
  const fileTree: FileTreeItem[] = [
    {
      name: "components",
      items: [
        {
          name: "ui",
          items: [
            { name: "button.tsx" },
            { name: "card.tsx" },
            { name: "dialog.tsx" },
            { name: "input.tsx" },
            { name: "select.tsx" },
            { name: "table.tsx" },
          ],
        },
        { name: "login-form.tsx" },
        { name: "register-form.tsx" },
      ],
    },
    {
      name: "lib",
      items: [{ name: "utils.ts" }, { name: "cn.ts" }, { name: "api.ts" }],
    },
    {
      name: "hooks",
      items: [
        { name: "use-media-query.ts" },
        { name: "use-debounce.ts" },
        { name: "use-local-storage.ts" },
      ],
    },
    {
      name: "types",
      items: [{ name: "index.d.ts" }, { name: "api.d.ts" }],
    },
    {
      name: "public",
      items: [
        { name: "favicon.ico" },
        { name: "logo.svg" },
        { name: "images" },
      ],
    },
    { name: "app.tsx" },
    { name: "layout.tsx" },
    { name: "globals.css" },
    { name: "package.json" },
    { name: "tsconfig.json" },
    { name: "README.md" },
    { name: ".gitignore" },
  ]

  const renderItem = (fileItem: FileTreeItem) => {
    if ("items" in fileItem) {
      return (
        <Collapsible key={fileItem.name}>
          <CollapsibleTrigger
            render={
              <Button
                variant="ghost"
                size="sm"
                sx={mergeSx(stylex.defaultMarker(), styles.button)}
              />
            }
          >
            <Icon
              icon={ArrowRight01Icon}

              sx={styles.icon}
            />
            <Icon icon={Folder01Icon} />
            {fileItem.name}
          </CollapsibleTrigger>
          <CollapsibleContent sx={styles.collapsibleContent}>
            <div sx={styles.stack}>
              {fileItem.items.map((child) => renderItem(child))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )
    }
    return (
      <Button key={fileItem.name} variant="link" size="sm" sx={styles.button2}>
        <Icon icon={File01Icon} />
        <span>{fileItem.name}</span>
      </Button>
    )
  }

  return (
    <Example title="File Tree" sx={styles.example}>
      <Card sx={styles.card} size="sm">
        <CardHeader>
          <Tabs defaultValue="explorer">
            <TabsList sx={styles.tabsList}>
              <TabsTrigger value="explorer">Explorer</TabsTrigger>
              <TabsTrigger value="settings">Outline</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div sx={styles.stack}>
            {fileTree.map((item) => renderItem(item))}
          </div>
        </CardContent>
      </Card>
    </Example>
  )
}

function CollapsibleSettings() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Example title="Settings" sx={styles.example}>
      <Card sx={styles.card2} size="sm">
        <CardHeader>
          <CardTitle>Radius</CardTitle>
          <CardDescription>
            Set the corner radius of the element.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            sx={styles.collapsible}
          >
            <FieldGroup sx={styles.fieldGroup}>
              <Field>
                <FieldLabel htmlFor="radius-x" sx={styles.fieldLabel}>
                  Radius X
                </FieldLabel>
                <Input id="radius" placeholder="0" defaultValue={0} />
              </Field>
              <Field>
                <FieldLabel htmlFor="radius-y" sx={styles.fieldLabel}>
                  Radius Y
                </FieldLabel>
                <Input id="radius" placeholder="0" defaultValue={0} />
              </Field>
              <CollapsibleContent sx={styles.collapsibleContent2}>
                <Field>
                  <FieldLabel htmlFor="radius-x" sx={styles.fieldLabel}>
                    Radius X
                  </FieldLabel>
                  <Input id="radius" placeholder="0" defaultValue={0} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="radius-y" sx={styles.fieldLabel}>
                    Radius Y
                  </FieldLabel>
                  <Input id="radius" placeholder="0" defaultValue={0} />
                </Field>
              </CollapsibleContent>
            </FieldGroup>
            <CollapsibleTrigger
              render={<Button variant="outline" size="icon" />}
            >
              {isOpen ? (
                <Icon icon={MinusSignIcon} />
              ) : (
                <Icon icon={PlusSignIcon} />
              )}
            </CollapsibleTrigger>
          </Collapsible>
        </CardContent>
      </Card>
    </Example>
  )
}
