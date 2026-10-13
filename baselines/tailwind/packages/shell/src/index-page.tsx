import { Link } from "@tanstack/react-router"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { flattenNav } from "./nav"
import type { NavGroup } from "./nav"

export function IndexPage({
  title,
  description,
  groups,
}: {
  title: string
  description: string
  groups: NavGroup[]
}) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-4 sm:p-6 lg:p-12">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-medium">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {groups.map((group) => (
        <section key={group.label} className="flex flex-col gap-3">
          <h2 className="text-sm font-medium text-muted-foreground">
            {group.label}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {flattenNav([group]).map((item) => (
              <Link key={item.href} to={item.href} className="rounded-xl">
                <Card
                  size="sm"
                  className="h-full transition-colors hover:bg-muted"
                >
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>
                      {item.description ?? item.href}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
