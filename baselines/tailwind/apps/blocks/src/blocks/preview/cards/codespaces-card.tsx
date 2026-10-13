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
import { HugeiconsIcon } from "@hugeicons/react"
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

export function CodespacesCard() {
  const [isCreatingCodespace, setIsCreatingCodespace] = React.useState(false)
  return (
    <Card>
      <CardContent>
        <Tabs defaultValue="codespaces">
          <TabsList className="w-full">
            <TabsTrigger value="codespaces">Codespaces</TabsTrigger>
            <TabsTrigger value="local">Local</TabsTrigger>
          </TabsList>
          <TabsContent value="codespaces">
            <Item size="sm" className="px-1 pt-2">
              <ItemContent>
                <ItemTitle>Codespaces</ItemTitle>
                <ItemDescription>Your workspaces in the cloud</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Tooltip>
                  <TooltipTrigger
                    render={<Button variant="ghost" size="icon-sm" />}
                  >
                    <HugeiconsIcon
                      strokeWidth={2}

                      icon={PlusSignIcon}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    Create a codespace on main
                  </TooltipContent>
                </Tooltip>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" size="icon-sm" />}
                  >
                    <HugeiconsIcon
                      strokeWidth={2}

                      icon={MoreHorizontalCircle01Icon}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={PlusSignIcon}
                        />
                        New with options...
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={CubeIcon}
                        />
                        Configure container
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={ZapIcon}
                        />
                        Set up prebuilds
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={ServerStackIcon}
                        />
                        Manage codespaces
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={Share03Icon}
                        />
                        Share deep link
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={AlertCircleIcon}
                        />
                        What are codespaces?
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ItemActions>
            </Item>
            <Separator className="-mx-2 my-2 w-auto!" />
            <Empty className="p-4">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <HugeiconsIcon
                    strokeWidth={2}

                    icon={ServerStackIcon}
                  />
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
                <a
                  href="#learn-more"
                  className="text-xs text-muted-foreground underline underline-offset-4"
                >
                  Learn more about codespaces
                </a>
              </EmptyContent>
            </Empty>
            <Separator className="-mx-2 my-2 w-auto!" />
            <div className="p-1.5 text-xs text-muted-foreground">
              Codespace usage for this repository is paid for by{" "}
              <span className="font-medium">shadcn</span>.
            </div>
          </TabsContent>
          <TabsContent value="local">
            <Item size="sm" className="hidden p-0">
              <ItemContent>
                <ItemTitle className="gap-2">
                  <HugeiconsIcon
                    strokeWidth={2}

                    icon={ComputerTerminal01Icon}

                    className="size-4"
                  />
                  Clone
                </ItemTitle>
              </ItemContent>
              <ItemActions>
                <Tooltip>
                  <TooltipTrigger
                    render={<Button variant="ghost" size="icon" />}
                  >
                    <HugeiconsIcon
                      strokeWidth={2}

                      icon={AlertCircleIcon}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    Which remote URL should I use?
                  </TooltipContent>
                </Tooltip>
              </ItemActions>
            </Item>
            <Tabs defaultValue="https">
              <TabsList
                variant="line"
                className="w-full justify-start border-b *:[button]:flex-0"
              >
                <TabsTrigger value="https">HTTPS</TabsTrigger>
                <TabsTrigger value="ssh">SSH</TabsTrigger>
                <TabsTrigger value="cli">GitHub CLI</TabsTrigger>
              </TabsList>
              <div className="rounded-md border bg-muted/30 p-2">
                <TabsContent value="https">
                  <Field className="gap-2">
                    <FieldLabel htmlFor="https-url" className="sr-only">
                      HTTPS URL
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="ghost" size="icon-xs">
                          <HugeiconsIcon
                            strokeWidth={2}

                            icon={Copy01Icon}
                          />
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
                  <Field className="gap-2">
                    <FieldLabel htmlFor="ssh-url" className="sr-only">
                      SSH URL
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="ghost" size="icon-xs">
                          <HugeiconsIcon
                            strokeWidth={2}

                            icon={Copy01Icon}
                          />
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
                  <Field className="gap-2">
                    <FieldLabel htmlFor="cli-command" className="sr-only">
                      CLI Command
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="ghost" size="icon-xs">
                          <HugeiconsIcon
                            strokeWidth={2}

                            icon={Copy01Icon}
                          />
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
            <Separator className="-mx-2 my-2 w-auto!" />
            <div className="flex flex-col">
              <Button
                variant="ghost"
                size="sm"
                className="justify-start gap-1.5"
              >
                <HugeiconsIcon
                  strokeWidth={2}

                  icon={ComputerIcon}

                  data-icon="inline-start"
                />
                Open with GitHub Desktop
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start gap-1.5"
              >
                <HugeiconsIcon
                  strokeWidth={2}

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
