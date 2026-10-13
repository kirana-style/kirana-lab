import { css } from "@kirana-style/core"
import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@workspace/ui/components/item"
import { Separator } from "@workspace/ui/components/separator"
import { Spinner } from "@workspace/ui/components/spinner"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import {
  AlertCircleIcon,
  ComputerIcon,
  ComputerTerminal01Icon,
  Copy01Icon,
  CubeIcon,
  DownloadIcon,
  MoreHorizontalCircle01Icon,
  PlusSignIcon,
  ServerStackIcon,
  Share03Icon,
  ZapIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  tabsList: css({
    width: "100%",
  }),
  item: css({
    paddingInlineStart: spacing["1"],
    paddingInlineEnd: spacing["1"],
    paddingTop: spacing["2"],
  }),
  dropdownMenuContent: css({
    width: spacing["56"],
  }),
  separator: css({
    marginInlineStart: `calc(${spacing["2"]} * -1)`,
    marginInlineEnd: `calc(${spacing["2"]} * -1)`,
    marginTop: spacing["2"],
    marginBottom: spacing["2"],
    // `w-auto!`: under the Separator's own horizontal condition, which the
    // original needed `!important` to beat.
    width: { '[data-orientation="horizontal"]': "auto" },
  }),
  empty: css({
    paddingTop: spacing["4"],
    paddingBottom: spacing["4"],
    paddingInlineStart: spacing["4"],
    paddingInlineEnd: spacing["4"],
  }),
  link: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
    textDecorationLine: "underline",
    textUnderlineOffset: "4px",
  }),
  box: css({
    padding: spacing["1.5"],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  text: css({
    fontWeight: fontWeight.medium,
  }),
  item2: css({
    display: "none",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
  }),
  itemTitle: css({
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  }),
  icon: css({
    width: spacing["4"],
    height: spacing["4"],
  }),
  tabsTrigger: css({ flex: 0 }),
  tabsList2: css({
    width: "100%",
    justifyContent: "flex-start",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: theme.border,
  }),
  box2: css({
    borderRadius: radius.md,
    borderStyle: "solid",
    borderWidth: "1px",
    backgroundColor: `color-mix(in oklab, ${theme.muted} 30%, transparent)`,
    padding: spacing["2"],
    borderColor: theme.border,
  }),
  fieldLabel: css({
    position: "absolute",
    width: "1px",
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
  }),
  stack: css({
    display: "flex",
    flexDirection: "column",
  }),
  button: css({
    justifyContent: "flex-start",
    rowGap: spacing["1.5"],
    columnGap: spacing["1.5"],
  }),
}

export function CodespacesCard() {
  const [isCreatingCodespace, setIsCreatingCodespace] = React.useState(false)
  return (
    <Card>
      <CardContent>
        <Tabs defaultValue="codespaces">
          <TabsList sx={styles.tabsList}>
            <TabsTrigger value="codespaces">Codespaces</TabsTrigger>
            <TabsTrigger value="local">Local</TabsTrigger>
          </TabsList>
          <TabsContent value="codespaces">
            <Item size="sm" sx={styles.item}>
              <ItemContent>
                <ItemTitle>Codespaces</ItemTitle>
                <ItemDescription>Your workspaces in the cloud</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Tooltip>
                  <TooltipTrigger
                    render={<Button variant="ghost" size="icon-sm" />}
                  >
                    <Icon icon={PlusSignIcon} />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    Create a codespace on main
                  </TooltipContent>
                </Tooltip>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" size="icon-sm" />}
                  >
                    <Icon icon={MoreHorizontalCircle01Icon} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    sx={styles.dropdownMenuContent}
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Icon icon={PlusSignIcon} />
                        New with options...
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icon icon={CubeIcon} />
                        Configure container
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icon icon={ZapIcon} />
                        Set up prebuilds
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Icon icon={ServerStackIcon} />
                        Manage codespaces
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icon icon={Share03Icon} />
                        Share deep link
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icon icon={AlertCircleIcon} />
                        What are codespaces?
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ItemActions>
            </Item>
            <Separator sx={styles.separator} />
            <Empty sx={styles.empty}>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Icon icon={ServerStackIcon} />
                </EmptyMedia>
                <EmptyTitle>No codespaces</EmptyTitle>
                <EmptyDescription>
                  You don&apos;t have any codespaces with this repository
                  checked out
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  size="sm"
                  onClick={() => {
                    setIsCreatingCodespace(true)
                    setTimeout(() => {
                      setIsCreatingCodespace(false)
                    }, 2000)
                  }}
                  disabled={isCreatingCodespace}
                >
                  {isCreatingCodespace ? (
                    <Spinner data-icon="inline-start" />
                  ) : (
                    ""
                  )}
                  Create Codespace
                </Button>
                <a href="#learn-more" sx={styles.link}>
                  Learn more about codespaces
                </a>
              </EmptyContent>
            </Empty>
            <Separator sx={styles.separator} />
            <div sx={styles.box}>
              Codespace usage for this repository is paid for by{" "}
              <span sx={styles.text}>shadcn</span>.
            </div>
          </TabsContent>
          <TabsContent value="local">
            <Item size="sm" sx={styles.item2}>
              <ItemContent>
                <ItemTitle sx={styles.itemTitle}>
                  <Icon
                    icon={ComputerTerminal01Icon}

                    sx={styles.icon}
                  />
                  Clone
                </ItemTitle>
              </ItemContent>
              <ItemActions>
                <Tooltip>
                  <TooltipTrigger
                    render={<Button variant="ghost" size="icon" />}
                  >
                    <Icon icon={AlertCircleIcon} />
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    Which remote URL should I use?
                  </TooltipContent>
                </Tooltip>
              </ItemActions>
            </Item>
            <Tabs defaultValue="https">
              <TabsList variant="line" sx={styles.tabsList2}>
                <TabsTrigger value="https" sx={styles.tabsTrigger}>
                  HTTPS
                </TabsTrigger>
                <TabsTrigger value="ssh" sx={styles.tabsTrigger}>
                  SSH
                </TabsTrigger>
                <TabsTrigger value="cli" sx={styles.tabsTrigger}>
                  GitHub CLI
                </TabsTrigger>
              </TabsList>
              <div sx={styles.box2}>
                <TabsContent value="https">
                  <Field sx={styles.itemTitle}>
                    <FieldLabel htmlFor="https-url" sx={styles.fieldLabel}>
                      HTTPS URL
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="ghost" size="icon-xs">
                          <Icon icon={Copy01Icon} />
                        </InputGroupButton>
                      </InputGroupAddon>
                      <InputGroupInput
                        id="https-url"
                        defaultValue="https://github.com/shadcn-ui/ui.git"
                        readOnly
                      />
                    </InputGroup>
                    <FieldDescription>
                      Clone using the web URL.
                    </FieldDescription>
                  </Field>
                </TabsContent>
                <TabsContent value="ssh">
                  <Field sx={styles.itemTitle}>
                    <FieldLabel htmlFor="ssh-url" sx={styles.fieldLabel}>
                      SSH URL
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="ghost" size="icon-xs">
                          <Icon icon={Copy01Icon} />
                        </InputGroupButton>
                      </InputGroupAddon>
                      <InputGroupInput
                        id="ssh-url"
                        defaultValue="git@github.com:shadcn-ui/ui.git"
                        readOnly
                      />
                    </InputGroup>
                    <FieldDescription>
                      Use a password-protected SSH key.
                    </FieldDescription>
                  </Field>
                </TabsContent>
                <TabsContent value="cli">
                  <Field sx={styles.itemTitle}>
                    <FieldLabel htmlFor="cli-command" sx={styles.fieldLabel}>
                      CLI Command
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="ghost" size="icon-xs">
                          <Icon icon={Copy01Icon} />
                        </InputGroupButton>
                      </InputGroupAddon>
                      <InputGroupInput
                        id="cli-command"
                        defaultValue="gh repo clone shadcn-ui/ui"
                        readOnly
                      />
                    </InputGroup>
                    <FieldDescription>
                      Work fast with our official CLI.{" "}
                      <a href="#learn-more">Learn more</a>
                    </FieldDescription>
                  </Field>
                </TabsContent>
              </div>
            </Tabs>
            <Separator sx={styles.separator} />
            <div sx={styles.stack}>
              <Button variant="ghost" size="sm" sx={styles.button}>
                <Icon
                  icon={ComputerIcon}

                  data-icon="inline-start"
                />
                Open with GitHub Desktop
              </Button>
              <Button variant="ghost" size="sm" sx={styles.button}>
                <Icon
                  icon={DownloadIcon}

                  data-icon="inline-start"
                />
                Download ZIP
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
